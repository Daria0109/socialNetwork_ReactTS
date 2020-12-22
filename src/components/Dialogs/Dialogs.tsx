import React, {FC} from 'react';
import c from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';
import {Textarea} from '../common/FormControls/FormControls';
import {maxLengthValidatorCreator, required} from '../utilities/validators/validators';
import {DialogsInitialStateType} from '../../redux/dialogs-reducer/dialogs-reducer';

type DialogsPropsType = {
  dialogsPage: DialogsInitialStateType
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
const Dialogs: FC<DialogsPropsType> = function ({dialogsPage, addMessage}) {

  const onAddMessage = (value: MessageValuePropsType) => {
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