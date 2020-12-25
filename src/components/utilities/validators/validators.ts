export type FieldValidatorType = (value: string) => undefined | string

export const required: FieldValidatorType = (value) => {
  return value ? undefined : 'Field is required'
}

export const maxLengthValidatorCreator = (max: number): FieldValidatorType => (value) => {
  return (value && value.length > max) ? `Field can't be more than ${max} symbols` : undefined
}

