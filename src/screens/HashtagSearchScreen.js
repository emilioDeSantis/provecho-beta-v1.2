import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Amplify from 'aws-amplify';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore'
import { PostType, Chef, Recipe, Post, Tip, Comment, Like, Stash, Follow, Hashtag } from '../models'

import awsconfig from '../aws-exports';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});

import { StackActions, useNavigationState } from '@react-navigation/native';

import * as storage from '../functions/storage'
import Stream from '../components/Stream'
import style from '../style';
import { v4 as uuidv4 } from 'uuid';

import HashtagStream from '../components/HashtagStream'

import * as global from '../functions/global'

const fetchHashtagStreams = async (page, limit) => {
    const db_data = await DataStore.query(Hashtag)
        console.log('data... ',db_data);
        const hashtags = await global.format_hashtags(db_data)
        return hashtags
}

const HashtagSearchScreen = () => {

    return (
        <View style={style.feed_container}>
            <Stream Article={HashtagStream} fetchArticles={fetchHashtagStreams} />
        </View>
    );
}

export default HashtagSearchScreen;