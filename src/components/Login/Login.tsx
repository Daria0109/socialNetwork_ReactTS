import React from 'react';
import {DecoratedComponentClass, DecoratedFormProps, reduxForm} from 'redux-form';
import {maxLengthValidatorCreator, required} from '../utilities/validators/validators';
import {createForm, Input} from '../common/FormControls/FormControls';
import {useDispatch, useSelector} from 'react-redux';
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



type LoginFormValuesPropsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
type LoginFormKeysType = Extract<keyof LoginFormValuesPropsType, string>

const Login: React.FC = ({}) => {
  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth);
  const captchaUrl = useSelector<AppStateType, Nullable<string>>(state => state.auth.captchaUrl)

  const dispatch = useDispatch();

  const onSubmit = (formData: LoginFormValuesPropsType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha as string));
  }

    if (isAuth) {
      return <Redirect to='/profile'/>
    }
    return <div>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  }

export default Login;