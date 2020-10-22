import React from 'react';


export type MessagePropsType = {
    text: string
    id: number
}
const Message = function (props: MessagePropsType) {
    return (
        <div>{props.text}</div>

    )
}
export default Message;