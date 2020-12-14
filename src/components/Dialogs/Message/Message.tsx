import React, {FC} from 'react';


export type MessagePropsType = {
    text: string
}
const Message: FC<MessagePropsType> = function ({text}) {
    return (
        <div>{text}</div>
    )
}
export default Message;