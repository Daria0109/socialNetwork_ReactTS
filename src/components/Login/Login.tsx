import React, {FC} from 'react';
import {reduxForm, InjectedFormProps} from 'redux-form';
import {maxLengthValidatorCreator, required} from '../utilities/validators/validators';
import {createForm, Input} from '../common/FormControls/FormControls';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {login} from '../../redux/auth-reducer/auth-reducer';
import { Redirect } from 'react-router-dom';
import s from '../common/FormControls/FormControls.module.css'


type LoginFormPropsType = {
  captchaUrl: null | string
}

const maxLength20 = maxLengthValidatorCreator(20);
const LoginForm = reduxForm<any, any>({form: 'login'})(
  (props: InjectedFormProps<LoginValuesPropsType> & LoginFormPropsType) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createForm(Input, 'email', 'Email...', [required, maxLength20])}
      {createForm(Input, 'password', 'Password...', [required, maxLength20])}
      {createForm('input', 'rememberMe', null, [], {type: 'checkbox'}, 'remember me')}

      {props.captchaUrl && <img src={props.captchaUrl}/>}
      {props.captchaUrl && createForm(Input, 'captcha', 'Enter symbols...', [required])}
      {props.error && <div className={s.errorSubmit}>{props.error}</div>}
      <button>Submit</button>
    </form>
  )
})


type LoginValuesPropsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
type LoginPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
  isAuth: boolean
  captchaUrl: null | string
}
const Login: FC<LoginPropsType> = function ({login, isAuth, captchaUrl}) {
  const onSubmit = (formData: LoginValuesPropsType) => {
    login(formData.email, formData.password, formData.rememberMe, formData.captcha as string)
  }

    if (isAuth) {
      return <Redirect to='/profile'/>
    }

    return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  )
}

const mapStatePropsType = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})
export default connect(mapStatePropsType, {login})(Login);