import {NavLink} from 'react-router-dom';
import React from 'react';
import c from './Friend.module.css'


type FriendPropsType = {
    id: number
    name: string
    avatar: string
}
const Friend = function (props: FriendPropsType) {
        return (
        <NavLink to={`/profile/${props.name}`}>
        <div className={c.friend}>
            <img className={c.avatar} src={props.avatar} alt={props.name}/>
            <div className={c.name}>{props.name}</div>
        </div>
    </NavLink>
    )
}
export default Friend;