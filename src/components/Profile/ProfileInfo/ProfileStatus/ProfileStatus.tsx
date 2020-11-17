import React from 'react';


type ProfileStatusPropsType = {
  status: string
}
type StateType = {
  editMode: boolean
}

class ProfileStatus extends React.Component<ProfileStatusPropsType> {
  state: StateType = {
    editMode: false
  }
  onEditMode = () => {
    debugger
    this.setState({editMode: true})
  }
  offEditMode = () => {
    this.setState({editMode: false})
  }

  render() {
    return <>
      {this.state.editMode
        ? <div>
          <input value={this.props.status} onBlur={this.offEditMode} autoFocus/>
        </div>
        : <div>
          <span onDoubleClick={this.onEditMode}>{this.props.status}</span>
        </div>}
    </>
  }
}

export default ProfileStatus;