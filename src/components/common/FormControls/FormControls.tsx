import React, {FC} from 'react';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from 'redux-form/lib/Field';
import s from './FormControls.module.css'
import {Field} from 'redux-form';

export interface WrappedFieldProps {
  input: WrappedFieldInputProps;
  meta: WrappedFieldMetaProps;
}
type FormControlPropsType = {
  placeholder: string
  children: React.ReactNode
} & WrappedFieldProps
export const FormControl = (props: FormControlPropsType) => {
  const {input, meta, children, ...restProps} = props;
  const havingError = meta.touched && meta.error;
  return (
    <div className={`${s.formControl} ${havingError ? s.error : ''}`}>
      <div>
        {children}
      </div>
      {havingError && <span>{meta.error}</span>}
    </div>
  )
}

type TextareaPropsType = {
  placeholder: string
  children: React.ReactNode
} & WrappedFieldProps
export const Textarea = (props: TextareaPropsType) => {
  const {input, meta, children, ...restProps} = props;
  return (
      <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
  )
}

type InputPropsType = {
  placeholder: string
  children: React.ReactNode
} & WrappedFieldProps
export const Input = (props: InputPropsType) => {
  const {input, meta, children, ...restProps} = props;
  return (
      <FormControl {...props}><input {...input} {...restProps}/></FormControl>
  )
}

export const createForm = (component: string | FC<any>, name: string, placeholder: null | string,
                           validators: any, props: any = {}, text: string = '' ) => {
  return (
    <div>
      <Field component={component}
             name={name}
             placeholder={placeholder}
             validate={validators}
             {...props}/> {text}
    </div>
  )
}