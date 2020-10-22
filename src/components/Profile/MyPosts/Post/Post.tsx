import React from 'react';
import c from './Post.module.css'
import {PostType} from '../../../../redux/profileReducer';

const Post = function (props: PostType) {
        return (
        <div className={c.item}>
            <img src={props.avatar} alt="Avatar"/>
            {props.message}
            <div>
                <span>{props.likesCount} likes</span>
            </div>
        </div>
    )
}
export default Post