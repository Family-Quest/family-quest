export type UserForm = Readonly<{
  email: string
  password: string
}>

export type UserPasswordForm = Pick<UserForm, 'password'>
