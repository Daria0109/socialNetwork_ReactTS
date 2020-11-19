import React, {ChangeEvent} from 'react';


type ProfileStatusPropsType = {
  status: string
  updateStatus: (status: string) => void
}
type StateType = {
  editMode: boolean
  status: string
}

class ProfileStatus extends React.Component<ProfileStatusPropsType> {
  state: StateType = {
    editMode: false,
    status: this.props.status
  }
  onEditMode = () => {
    debugger
    this.setState({editMode: true})
  }
  offEditMode = () => {
    this.setState({editMode: false});
    this.props.updateStatus(this.state.status)
  }
  changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({status: e.currentTarget.value})
  }
  componentDidUpdate = (prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>, snapshot?: any) => {
    if (prevProps.status !== this.props.status) {
      this.setState({status: this.props.status})
    }
  }

  render() {
    return <>
      {this.state.editMode
        ? <div>
          <input value={this.state.status}
                 onBlur={this.offEditMode}
                 autoFocus onChange={this.changeStatus}/>
        </div>
        : <div>
          <span onDoubleClick={this.onEditMode}>{this.props.status || "No status..."}</span>
        </div>}
    </>
  }
}

export default ProfileStatus;