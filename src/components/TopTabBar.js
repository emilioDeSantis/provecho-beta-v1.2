import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import style from '../style';

const TopTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={style.top_bar}>
            <TouchableOpacity
                key = 'search_screen'
                accessibilityRole="button"
                onPress={() => navigation.navigate('search')}
                style={style.top_bar_button}
            >
                <Text style={{ color: '#333536' }}>
                    search
                </Text>
            </TouchableOpacity>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key = {label}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={style.top_bar_button}
                    >
                        <Text style={{ color: isFocused ? '#f98' : '#333536' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default TopTabBar
