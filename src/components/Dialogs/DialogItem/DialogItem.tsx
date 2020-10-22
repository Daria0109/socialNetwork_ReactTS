import React from 'react';
import {NavLink} from 'react-router-dom';
import c from './DialogItem.module.css'

export type DialogItemPropsType = {
    name: string
    id: number
    avatar: string
}
const DialogItem = function (props: DialogItemPropsType) {
    return (
       <div>
            <NavLink to={`/dialogs/${props.id}`}>
                <div className={c.dialog__item}>
                <img className={c.avatar} src={props.avatar} alt=""/>
                <div className={c.name}>{props.name}</div>
                </div>
            </NavLink>
        </div>

    )
}

export default DialogItem;