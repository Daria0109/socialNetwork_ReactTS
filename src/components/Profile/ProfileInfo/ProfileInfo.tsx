import React from 'react';
import c from './ProfileInfo.module.css'

const ProfileInfo = function () {
    return (
        <div>
            <div className={c.image_item}>
                <img className={c.image} src="https://miro.medium.com/max/8576/0*zBu6EBAwjXXXHz-z"
                     alt="Image"/>
            </div>
            <div className={c.description}>
                ava+description
            </div>
        </div>
    )
}
// @ts-ignore
export default ProfileInfo