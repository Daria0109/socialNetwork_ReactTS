export const ADD_POST = 'ADD-POST';
export const UPDATE_POST = 'UPDATE-POST'

export type PostActionsTypes = ReturnType<typeof addPostActionCreator> |
    ReturnType<typeof updatePostActionCreator>;

export type PostType = {
    id: number
    message: string
    likesCount: number
    avatar: string
};
export type ProfileInitialStateType = {
    posts: Array<PostType>
    newTextPost: string
}

export type ProfileReducerType = typeof initialState;

export let addPostActionCreator = () => ({
    type: ADD_POST
} as const);
export let updatePostActionCreator = (post: string) => ({
    type: UPDATE_POST,
    updatedPost: post
} as const);

let initialState = {
    posts: [
        {
            id: 1,
            message: 'Hey, how are you?',
            likesCount: 15,
            avatar: 'https://i.pinimg.com/originals/32/3b/c2/323bc2e28f35a760b8d7afe48f3ffe48.png'
        },
        {
            id: 2,
            message: 'This is my first post',
            likesCount: 25,
            avatar: 'https://i.pinimg.com/originals/5a/f1/dd/5af1ddcde07255e8a999abcc061dd201.png'
        },
        {
            id: 3,
            message: 'Hey, how are you?',
            likesCount: 15,
            avatar: 'https://i.pinimg.com/originals/32/3b/c2/323bc2e28f35a760b8d7afe48f3ffe48.png'
        },
        {
            id: 4,
            message: 'This is my first post',
            likesCount: 25,
            avatar: 'https://i.pinimg.com/originals/5a/f1/dd/5af1ddcde07255e8a999abcc061dd201.png'
        }
    ],
    newTextPost: ""
}

let profileReducer = (state = initialState, action: PostActionsTypes): ProfileReducerType => {
    switch (action.type) {
        case (ADD_POST): {
            let newPost = {
                id: 5,
                message: state.newTextPost,
                likesCount: 0,
                avatar: 'https://finance.kz/static/images/default-avatar.png'
            }
            return {
                ...state,
                newTextPost: '',
                posts: [...state.posts, newPost]
            }
        }
        case(UPDATE_POST): {
            return {
                ...state,
                newTextPost: action.updatedPost,
            }
        }
        default:
            return state;
    }
}

    export default profileReducer;