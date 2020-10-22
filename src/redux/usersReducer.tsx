export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET-USERS';

export type UsersAC = ReturnType<typeof followAC> |
    ReturnType<typeof unfollowAC> | ReturnType<typeof setUsersAC>;

export const followAC = (userId: number) => ({type: FOLLOW, userId} as const);
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId} as const);
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const);

export type UserType = {
    name: string
    id: number
    uniqueUrlName: null
    photos: {
        small: null | undefined
        large: null | undefined
    }
    status: null
    followed: boolean
};
export type UsersInitialStateType = {
    users: Array<never | UserType>
}
export type UsersReducerType = typeof initialState;

let initialState = {
    users: [] as Array<UserType>
}

let usersReducer = (state = initialState, action: UsersAC): UsersReducerType => {
    switch (action.type) {
        case (FOLLOW): {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: u.followed = true}
                    } else {
                        return u
                    }
                })
            }
        }
            ;
        case (UNFOLLOW): {
            return {
                ...state,
                users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: u.followed = false}
                        } else {
                            return {...u}
                        }
                    }
                )
            }
        }
            ;
        case (SET_USERS): {
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        }
        default:
            return state;
    }
}


export default usersReducer;