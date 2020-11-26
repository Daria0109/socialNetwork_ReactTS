import React from 'react';
import c from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {DialogsReducerType} from '../../redux/dialogs-reducer/dialogs-reducer';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';
import {Textarea} from '../common/FormControls/FormControls';
import {maxLengthValidatorCreator, required} from '../utilities/validators/validators';

type DialogsPropsType = {
  dialogsPage: DialogsReducerType
  addMessage: (message: string) => void
}
const maxLength10 = maxLengthValidatorCreator(10);
const MessageForm = reduxForm<any, any>({form: 'message'})((props: InjectedFormProps<MessageValuePropsType>) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name='message' placeholder='New message...' validate={[required, maxLength10]}/>
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
})


type MessageValuePropsType = {
  message: string
}
const Dialogs = function (props: DialogsPropsType) {

  const onAddMessage = (value: MessageValuePropsType) => {
    props.addMessage(value.message);
  }

  const dialogElement = props.dialogsPage.dialogs.map(d =>
    <DialogItem key={d.id} name={d.name} id={d.id} avatar={d.avatar}/>)

  const messageElement = props.dialogsPage.messages.map(m =>
    <Message key={m.id} text={m.text} id={m.id}/>)

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