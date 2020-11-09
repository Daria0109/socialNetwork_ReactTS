import React, {ChangeEvent} from 'react';
import c from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {DialogsReducerType} from '../../redux/dialogs-reducer';

type DialogsPropsType = {
    dialogsPage: DialogsReducerType
    addMessage: () => void
    updateMessage: (updatedMessageText: string) => void
}
const Dialogs = function (props: DialogsPropsType) {

    const onAddMessage = () => {
        props.addMessage();
    }
    const onUpdateMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateMessage(e.currentTarget.value)
    }

    const dialogElement = props.dialogsPage.dialogs.map(dialog =>
        <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar}/>)

    const messageElement = props.dialogsPage.messages.map(message =>
        <Message text={message.text} id={message.id}/>)

    return (
        <div className={c.dialogs}>
            <div className={c.dialog}>
                {dialogElement}
            </div>

            <div className={c.message}>
                {messageElement}
                <div><textarea value={props.dialogsPage.newTextMessage}
                               onChange={onUpdateMessage}></textarea></div>
                <div>
                    <button onClick={onAddMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}
export default Dialogs;