import React from 'react';
import c from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {reduxForm, DecoratedComponentClass, DecoratedFormProps} from 'redux-form';
import {createForm, Textarea} from '../common/FormControls/FormControls';
import {maxLengthValidatorCreator, required} from '../utilities/validators/validators';
import {DialogsInitialStateType} from '../../redux/dialogs-reducer/dialogs-reducer';


const maxLength10 = maxLengthValidatorCreator(10);
const MessageForm: DecoratedComponentClass<MessageFormValuePropsType, DecoratedFormProps<MessageFormValuePropsType>> =
  reduxForm<MessageFormValuePropsType, {}>({form: 'message'})(({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createForm<MessageFormKeysType>(Textarea, 'message', 'New message...', [required, maxLength10])}
      <div>
        <button>Send</button>
      </div>
    </form>
  )
})


type DialogsPropsType = {
  dialogsPage: DialogsInitialStateType
  addMessage: (message: string) => void
}

type MessageFormValuePropsType = {
  message: string
}
type MessageFormKeysType = Extract<keyof MessageFormValuePropsType, string>

const Dialogs: React.FC<DialogsPropsType> = function ({dialogsPage, addMessage}) {

  const onAddMessage = (value: MessageFormValuePropsType) => {
    addMessage(value.message);
  }

  const dialogElement = dialogsPage.dialogs.map(d =>
    <DialogItem key={d.id} name={d.name} id={d.id} avatar={d.avatar}/>)

  const messageElement = dialogsPage.messages.map(m =>
    <Message key={m.id} text={m.text}/>)

  return (
    <div className={c.dialogs}>
      <div className={c.dialog}>
        {dialogElement}
      </div>

      <div className={c.message}>
        {messageElement}
        <MessageForm onSubmit={onAddMessage}/>
      </div>
    </div>
  )
}
export default Dialogs;