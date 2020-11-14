import React, {ComponentType} from 'react';
import {AppStateType} from '../../redux/redux-store';
import {addMessage, DialogType, MessageType, updateMessage} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

// type DialogsPropsType = {
//     store: RootStoreType
// }
type MapStatePropsType = {
  dialogsPage: {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newTextMessage: string
  }
}
type MapDispatchPropsType = {
  addMessage: () => void
  updateMessage: (message: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

// const AuthRedirectComponent = withAuthRedirect(Dialogs)
// const DialogsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
// (mapStateToProps, {addMessage, updateMessage})(AuthRedirectComponent);
// export default DialogsContainer;

export default compose<ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
  (mapStateToProps, {addMessage, updateMessage}),
  withAuthRedirect
)(Dialogs);


// const DialogsContainer = function (props: DialogsPropsType) {
//     let state = props.store.getState();
//
//     const addMessage = () => {
//         let action = addMessageActionCreator();
//         props.store.dispatch(action);
//     }
//     const updateMessage = (updatedMessageText: string) => {
//         let action = updateMessageActionCreator(updatedMessageText);
//         props.store.dispatch(action);
//     }
//
//     return (
//         <Dialogs dialogsPage={state.dialogsPage}
//                  addMessage={addMessage}
//                  updateMessage={updateMessage}/>
//     )
// }
// export default DialogsContainer;
