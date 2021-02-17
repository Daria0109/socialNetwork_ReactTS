import React from 'react';
import {Field, Form, Formik} from 'formik';
import {UsersSearchFormType} from '../../redux/types/types';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';


const validate = (values: any) => {
  const errors = {};
  return errors
}

type UsersSearchFormPropsType = {
  onFilterChanged: (filter: UsersSearchFormType) => void
}
type TempFilterFormType = {
  term: string
  friend: 'null' | 'true' | 'false'
}


const UsersSearchForm: React.FC<UsersSearchFormPropsType> = React.memo(({onFilterChanged}) => {
  const filter = useSelector<AppStateType, UsersSearchFormType>(state => state.usersPage.filter);

  const submit = (values: TempFilterFormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void}) => {
    const filter: UsersSearchFormType = {
      term: values.term,
      friend: values.friend === 'true' ? true : values.friend === 'false' ? false : null
    }
    onFilterChanged(filter);
    setSubmitting(false)
  }

  return <div>
    <Formik
      enableReinitialize
      initialValues={{term: filter.term, friend: String(filter.friend)} as TempFilterFormType}
      validate={validate}
      onSubmit={submit}
    >
      {({isSubmitting}) => (
        <Form>
          <Field type="text" name="term"/>
          <Field name="friend" as="select">
            <option value="null">All</option>
            <option value="true">Followed</option>
            <option value="false">Unfollowed</option>
          </Field>
          <button type="submit" disabled={isSubmitting}>Search</button>
        </Form>
      )}
    </Formik>
  </div>
})
export default UsersSearchForm;