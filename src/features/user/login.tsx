import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import Input from "../../components/input"
import { Button, Link } from "@nextui-org/react"
import { useLazyCurrentQuery, useLoginMutation } from "../../app/services/userApi";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/error-message";
import {hasErrorField} from "../../utils/has-error-field";

type Login = {
  email: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

const Login: FC<Props> = ({ setSelected }) => {
  const { handleSubmit, control, formState: { errors } } = useForm<Login>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: { email: '', password: '' }
  })

  const [login, { isLoading }] = useLoginMutation()
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap()
      await triggerCurrentQuery().unwrap()
      navigate('/')
    } catch (error) {
      if(hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
            control={ control }
            name='email'
            label='Пошта'
            type='email'
            required='Обов’язкове поле'
        />
        <Input
            control={ control }
            name='password'
            label='Пароль'
            type='password'
            required='Обов’язкове поле'
        />

        <ErrorMessage error={error} />

        <div className='flex gap-2 justify-end'>
          <Button fullWidth color='primary' type='submit' isLoading={ isLoading }>Ввійти</Button>
        </div>

        <p className='text-center text-sm'>
          Немає аккаунта?{' '}
          <Link
              size='sm'
              className='cursor-pointer'
              onPress={() => setSelected('sign-up')}
          >
            Зареєструватись
          </Link>
        </p>
      </form>
  );
};

export default Login;