import React, { FC, useContext, useState } from "react"
import { User } from "../../app/types"
import { ThemeContext } from "../theme-provider"
import { useUpdateUserMutation } from "../../app/services/userApi"
import { useParams } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@nextui-org/react"
import Input from "../input"
import { MdOutlineEmail } from "react-icons/md"
import ErrorMessage from "../error-message"
import {hasErrorField} from "../../utils/has-error-field";

type Props = {
  isOpen: boolean
  onClose: () => void
  user?: User
}

const EditProfile: FC<Props> = ({ user, onClose, isOpen }) => {
  const { theme } = useContext(ThemeContext)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [error, setError] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { id } = useParams<{ id: string }>()

  const { handleSubmit, control } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files !== null) {
      setSelectedFile(e.target.files[0])
    }
  }

  const onSubmit = async (data: User) => {
    if(id) {
      try {
        const formData = new FormData()
        data.name && formData.append('name', data.name)
        data.email && data.email !== user?.email && formData.append('email', data.email)
        data.dateOfBirth && formData.append('dateOfBirth', new Date(data.dateOfBirth).toISOString())
        data.bio && formData.append('bio', data.bio)
        data.location && formData.append('location', data.location)
        selectedFile && formData.append('avatar', selectedFile)
        await updateUser({ userData: formData, id }).unwrap()
        onClose()
      } catch (error) {
        if(hasErrorField(error)) {
          setError(error.data.error)
        }
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
    >
      <ModalContent className='pt-2 pb-4'>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-2 text-center">
              Редагувати профіль
            </ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  name="email"
                  label="Пошта"
                  type="email"
                  control={control}
                  endContent={<MdOutlineEmail />}
                />
                <Input
                  name="name"
                  label="Повне ім’я"
                  type="text"
                  control={control}
                />
                <input
                  className='w-max cursor-pointer'
                  type="file"
                  name="avatarUrl"
                  placeholder="Виберіть файл"
                  onChange={handleFileChange}
                />
                <Input
                  name="dateOfBirth"
                  label="Дата народження"
                  type="date"
                  placeholder="Дата народження"
                  control={control}
                />
                <Controller
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Розкажіть про себе"
                    />
                  )}
                  name="bio"
                  control={control}
                />
                <Input
                  name="location"
                  label="Місцезнаходження"
                  type="text"
                  control={control}
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Зберегти зміни
                  </Button>
                  <Button
                      fullWidth
                      color="default"
                      type="button"
                      onPress={onClose}
                      isLoading={isLoading}
                  >
                    Скасувати
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditProfile;