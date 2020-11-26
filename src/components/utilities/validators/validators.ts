type ValidatorType = (value: string | null) => undefined | string

export const required: ValidatorType = (value) => {
  return value ? undefined : 'Field is required'
}

export const maxLengthValidatorCreator = (max: number): ValidatorType => (value) => {
  return (value && value.length > max) ? `Field can't be more than ${max} symbols` : undefined
}

