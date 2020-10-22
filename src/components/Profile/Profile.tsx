import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';


export type ProfilePropsType = {
    // store: RootStoreType
}

const Profile = function (props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}
export default Profile