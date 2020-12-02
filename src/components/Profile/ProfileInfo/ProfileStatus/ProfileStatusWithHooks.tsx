import React, {ChangeEvent, useState} from 'react';


type ProfileStatusPropsType = {
  status: string
  updateStatus: (status: string) => void
}

const ProfileStatusWithHooks =(props: ProfileStatusPropsType) => {
  const[editMode, setEditMode] = useState(false);
  const[status, setStatus] = useState(props.status)

  const onEditMode = () => {
    setEditMode(true)
  }
  const offEditMode = () => {
    setEditMode(false);
    props.updateStatus(status)
  }
  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }
    return <>
      {editMode
        ? <div>
          <input value={status}
                 onBlur={offEditMode}
                 autoFocus
                 onChange={changeStatus}/>
        </div>
        : <div>
          <span onDoubleClick={onEditMode}>{props.status || "No status..."}</span>
        </div>}
    </>

}

export default ProfileStatusWithHooks;