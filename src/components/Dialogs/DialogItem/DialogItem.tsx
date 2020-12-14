import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import c from './DialogItem.module.css'

export type DialogItemPropsType = {
    name: string
    id: number
    avatar: string
}
const DialogItem: FC<DialogItemPropsType> = function ({name, id, avatar}) {
    return (
       <div>
            <NavLink to={`/dialogs/${id}`}>
                <div className={c.dialog__item}>
                <img className={c.avatar} src={avatar} alt=""/>
                <div className={c.name}>{name}</div>
                </div>
            </NavLink>
        </div>

    )
}

export default DialogItem;