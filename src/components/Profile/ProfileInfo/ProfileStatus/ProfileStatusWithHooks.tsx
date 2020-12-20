import React, {ChangeEvent, useEffect, useState} from 'react';


type ProfileStatusPropsType = {
  status: string
  updateStatus: (status: string) => void
}

const ProfileStatusWithHooks =(props: ProfileStatusPropsType) => {
  const[editMode, setEditMode] = useState(false);
  const[status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus((props.status))
  }, [props.status])

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
          <span onDoubleClick={onEditMode}><b>{props.status || 'No status...'}</b></span>
        </div>}
    </>

}

export default ProfileStatusWithHooks;