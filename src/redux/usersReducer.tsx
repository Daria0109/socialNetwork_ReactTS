export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_USERS = 'SET-USERS';
export const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
export const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"

export type UsersAC = ReturnType<typeof followAC> |
    ReturnType<typeof unfollowAC> |
    ReturnType<typeof setUsersAC> |
    ReturnType<typeof setCurrentPageAC> |
    ReturnType<typeof setTotalUsersCountAC>;

export const followAC = (userId: number) => ({type: FOLLOW, userId} as const);
export const unfollowAC = (userId: number) => ({type: UNFOLLOW, userId} as const);
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const);
export const setCurrentPageAC = (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber} as const);
export const setTotalUsersCountAC = (totalUsers: number) => ({
    type: SET_TOTAL_USERS_COUNT,  totalUsers
} as const)



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
    users: Array<UserType>,
    pageSize: number
    totalUsersCount: number
    currentPage: number
}
export type UsersReducerType = typeof initialState;

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
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
                users: state.users = action.users
            }
        }
            ;
        case (SET_CURRENT_PAGE): {
            return {
                ...state,
                currentPage: state.currentPage = action.pageNumber
            }
        };
        case (SET_TOTAL_USERS_COUNT): {
            return {
                ...state,
                totalUsersCount: state.totalUsersCount = action.totalUsers
            }
        }
        default:
            return state;
    }
}


export default usersReducer;