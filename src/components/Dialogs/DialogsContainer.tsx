import React from 'react';
import {RootStoreType} from '../../redux/redux-store';
import {addMessageActionCreator, MessageActionsTypes, updateMessageActionCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';

// type DialogsPropsType = {
//     store: RootStoreType
// }

const mapStateToProps = (state: RootStoreType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch: (action: MessageActionsTypes) => void) => {
    return {
        addMessage: () => dispatch(addMessageActionCreator()),
        updateMessage: (updatedMessageText: string) =>
            dispatch(updateMessageActionCreator(updatedMessageText))
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
export default DialogsContainer;






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
