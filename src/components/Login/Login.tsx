import React from 'react';
import {DecoratedComponentClass, DecoratedFormProps, reduxForm} from 'redux-form';
import {maxLengthValidatorCreator, required} from '../utilities/validators/validators';
import {createForm, Input} from '../common/FormControls/FormControls';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {login} from '../../redux/auth-reducer/auth-reducer';
import {Redirect} from 'react-router-dom';
import s from '../common/FormControls/FormControls.module.css'
import {Nullable} from '../../redux/types/types';


type LoginFormOwnPropsType = {
  captchaUrl: Nullable<string>
}

const maxLength20 = maxLengthValidatorCreator(20);
const LoginForm: DecoratedComponentClass<LoginFormValuesPropsType, DecoratedFormProps<LoginFormValuesPropsType, LoginFormOwnPropsType>> =
  reduxForm<LoginFormValuesPropsType, LoginFormOwnPropsType>({form: 'login'})(
    ({handleSubmit, captchaUrl, error}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createForm<LoginFormKeysType>(Input, 'email', 'Email...', [required, maxLength20])}
      {createForm<LoginFormKeysType>(Input, 'password', 'Password...', [required, maxLength20])}
      {createForm<LoginFormKeysType>('input', 'rememberMe', null, [], {type: 'checkbox'}, 'remember me')}

      {captchaUrl && <img src={captchaUrl}/>}
      {captchaUrl && createForm<LoginFormKeysType>(Input, 'captcha', 'Enter symbols...', [required])}
      {error && <div className={s.errorSubmit}>{error}</div>}
      <button>Submit</button>
    </form>
  )
})


type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: Nullable<string>
}
type MapDispatchPropsType  = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginFormValuesPropsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
type LoginFormKeysType = Extract<keyof LoginFormValuesPropsType, string>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = ({login, isAuth, captchaUrl}) => {
  const onSubmit = (formData: LoginFormValuesPropsType) => {
    login(formData.email, formData.password, formData.rememberMe, formData.captcha as string)
  }

    if (isAuth) {
      return <Redirect to='/profile'/>
    }
    return <div>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  }


const mapStateToPropsType = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToPropsType, {login})(Login);