import Amplify, { Storage } from 'aws-amplify'

import awsconfig from '../aws-exports'
Amplify.configure(awsconfig);

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const upload = async (uri) => {
    try {
        const res = await fetch(uri)
        const blob = await res.blob()
        const { key } = await Storage.put(uuidv4(), blob, {
            contentType: 'image/jpeg'
        })
        return key
    } catch (err) {
        console.log(err)
    }
}

const format_post = async (item) => {
    const post_image = await Storage.get(item.image)
    const chef_image = await Storage.get(item.chef.image)
    delete item.image
    delete item.chef.image
    const chef = {
        ...item.chef,
        image: chef_image,
        key: uuidv4(),
    }
    const post = {
        ...item,
        image: post_image,
        chef,
        key: uuidv4(),
    }
    console.log("postngfdhg...",post);
    return post
}
const getPosts = async (list) => {
    return Promise.all(list.map(post => format_post(post)))
}
export const format_posts = async (db_data) => {
    const posts = await getPosts(db_data).then((data) => {
        return data
    })
    return posts
}

export const format_chef = async (item) => {
    const chef_image = await Storage.get(item.image)
    delete item.image
    const chef = {
        ...item,
        image: chef_image,
        key: uuidv4(),
    }
    return chef
}
const getChefs = async (list) => {
    return Promise.all(list.map(chef => format_chef(chef)))
}
export const format_chefs = async (db_data) => {
    const chefs = await getChefs(db_data).then((data) => {
        return data
    })
    return chefs
}
