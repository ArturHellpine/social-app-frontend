import React, {FC, useState} from "react"
import Input from "../../components/input"
import { Button, Link } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import {useRegisterMutation} from "../../app/services/userApi";
import {hasErrorField} from "../../utils/has-error-field";
import ErrorMessage from "../../components/error-message";

type Register = {
  email: string
  name: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

const Register: FC<Props> = ({ setSelected }) => {
  const { handleSubmit, control, formState: { errors } } = useForm<Register>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: { email: '', name: '', password: '' }
  })

  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = useState('')

  const onSubmit = async (data: Register) => {
    try {
      await register(data).unwrap()
      setSelected('login')
    } catch (error) {
      if(hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={ control }
        name="name"
        label="Повне ім’я"
        type="text"
        required="Обов’язкове поле"
      />
      <Input
          control={ control }
          name="email"
          label="Пошта"
          type="email"
          required="Обов’язкове поле"
      />
      <Input
        control={ control }
        name="password"
        label="Пароль"
        type="password"
        required="Обов’язкове поле"
      />

      <ErrorMessage error={error} />

      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>Зареєструватись</Button>
      </div>

      <p className="text-center text-sm">
        Вже зареєстровані?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected('login')}
        >
          Ввійти
        </Link>
      </p>
    </form>
  )
}

export default Register
