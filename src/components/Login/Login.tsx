import React from 'react';
import {reduxForm, InjectedFormProps} from 'redux-form';
import {Field} from 'redux-form';
import {maxLengthValidatorCreator, required} from '../utilities/validators/validators';
import {Input} from '../common/FormControls/FormControls';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {login} from '../../redux/auth-reducer/auth-reducer';
import { Redirect } from 'react-router-dom';
import s from '../common/FormControls/FormControls.module.css'


type LoginFormPropsType = {}

const maxLength20 = maxLengthValidatorCreator(20);
const LoginForm = reduxForm<any, any>({form: 'login'})((props: InjectedFormProps<LoginValuesPropsType>) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Input} name='email' placeholder='Email...' validate={[required, maxLength20]}/>
      </div>
      <div>
        <Field component={Input} name='password' placeholder='Password...' validate={[required, maxLength20]}/>
      </div>
      <div>
        <Field component='input' type='checkbox' name='rememberMe' placeholder='Password...'/> remember me
      </div>
      {props.error && <div className={s.errorSubmit}>{props.error}</div>}
      <button>Submit</button>
    </form>
  )
})


type LoginValuesPropsType = {
  email: string
  password: string
  rememberMe: boolean
}
type LoginPropsType = {
  login: (email: string, password: string, rememberMe: boolean) => void
  isAuth: boolean
}
const Login = function (props: LoginPropsType) {
  const onSubmit = (formData: LoginValuesPropsType) => {
    props.login(formData.email, formData.password, formData.rememberMe)
  }

    if (props.isAuth) {
      return <Redirect to='/profile'/>
    }

    return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit}/>
    </div>
  )
}

const mapStatePropsType = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
})
export default connect(mapStatePropsType, {login})(Login);