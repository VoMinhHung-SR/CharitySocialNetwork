import axios from 'axios'
import cookies from 'react-cookies'

export let endpoints = {
    'posts': '/posts/',
    'add-post': '/posts/add-post/',
    'delete-post': (postID) => `/posts/${postID}/`,
    'postDetail':(postID) => `/posts/${postID}/`,
    'sharing':(postID) => `/posts/${postID}/sharing/`,
    'comments': (postID) => `/posts/${postID}/comments/`,
    'auctions': (postID) => `/posts/${postID}/auctions/`,
    'like-post': (postID)=> `/posts/${postID}/like/`,
    'add-comment':(postID) => `/posts/${postID}/add-comment/`,
    'add-auction': (postID) =>`/posts/${postID}/add-auction/`,
    'add-tags': (postID) => `/posts/${postID}/tags/`,
    
    'comment': (commentID) => `/comments/${commentID}/`,
    

    'login': '/o/token/',
    'current-user':'/users/current-user/',
    'register': '/users/',

    'post-owner':(userID) => `/users/${userID}/post-owner/`,
    'post-shared':(userID) => `/users/${userID}/post-shared/`,
    'notifications': (userID) => `/users/${userID}/notifications/`,

    'delete-sharing':(shareID) => `/sharing/${shareID}/`

    
}
export const authApi = () => {
    return axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            'Authorization': `Bearer ${cookies.load('token')}`
        }
    })
}

export const authMediaApi = () => {
    return axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            'Authorization': `Bearer ${cookies.load('token')}`,
            'Content-Type' : 'multipart/form-data',
        }
    })
}

export default axios.create({
    baseURL: "http://localhost:8000"
})