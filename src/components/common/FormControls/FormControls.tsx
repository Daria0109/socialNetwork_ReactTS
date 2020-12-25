import React from 'react';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from 'redux-form/lib/Field';
import s from './FormControls.module.css'
import {Field} from 'redux-form';
import {FieldValidatorType} from '../../utilities/validators/validators';
import {Nullable} from '../../../redux/types/types';


export interface WrappedFieldProps {
  input: WrappedFieldInputProps;
  meta: WrappedFieldMetaProps;
}

export const FormControl: React.FC<WrappedFieldProps> = (
  {input, meta, children, ...restProps}) => {
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

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const {input, meta, ...restProps} = props;
  return (
    <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
  )
}

export const Input = (props: WrappedFieldProps) => {
  const {input, meta, ...restProps} = props;
  return (
    <FormControl {...props}><input {...input} {...restProps}/></FormControl>
  )
}

export function createForm<KeyFormProps extends string>(component: React.FC<WrappedFieldProps> | 'input' | 'textarea',
                                         name: KeyFormProps,
                                         placeholder: Nullable<string>,
                                         validators: Array<FieldValidatorType>,
                                         props = {}, text = '') {
  return <div>
    <Field component={component}
           name={name}
           placeholder={placeholder}
           validate={validators}
           {...props}/>
    {text}
  </div>
}