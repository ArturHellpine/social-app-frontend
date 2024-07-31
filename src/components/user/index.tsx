import React, {FC} from "react"
import { User as NextUiUser } from '@nextui-org/react'
import {BASE_URL} from "../../constants";

type Props = {
  name: string
  avatarUrl: string
  description?: string
  className?: string
}

const User: FC<Props> = ({ name = '', className = '', description = '', avatarUrl = '' }) => {
  return (
      <NextUiUser
        name={name}
        className={className}
        description={description}
        avatarProps={{
          src: `${BASE_URL}${avatarUrl}`
        }}
      />
  )
}

export default User
