import React from "react"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"
import { BASE_URL } from "../../constants"
import { Link } from "react-router-dom"
import { MdAlternateEmail } from "react-icons/md"

const Profile = () => {
  const current = useSelector(selectCurrent)

  if(!current) {
    return null
  }

  const { name, email, avatarUrl, id } = current

  return (
      <Card className='py-2 w-[260px]'>
        <CardHeader className='pb-0 pt-2 px-4 flex flex-col items-center'>
          <Image
            alt='Card Profile'
            className='object-cover rounded-xl'
            src={ `${BASE_URL}${avatarUrl}` }
            width={ 370 }
          />
        </CardHeader>
        <CardBody>
          <Link to={ `/users/${id}` }>
            <h4 className='font-bold text-lg mb-2'>
              { name }
            </h4>
            <p className='text-default-500 flex items-center gap-1'>
              <MdAlternateEmail />
              { email }
            </p>
          </Link>
        </CardBody>
      </Card>
  );
};

export default Profile;