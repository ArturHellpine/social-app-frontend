import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrent} from "../../features/user/userSlice";
import {Link} from "react-router-dom";
import {Card, CardBody} from "@nextui-org/react";
import User from "../../components/user";
import {FaUsers} from "react-icons/fa";
import {FiUsers} from "react-icons/fi";

const Following = () => {
  const currentUser = useSelector(selectCurrent)
  if(!currentUser) {
    return null
  }

  return currentUser.following.length > 0 ?
      <div className='gap-5 flex flex-col'>
        <p className='text-xl flex items-center gap-2'><FiUsers size={16} />Підписки</p>
        {currentUser.following.map(user =>
            <Link to={`/users/${user.following.id}`} key={user.following.id}>
              <Card>
                <CardBody className='block'>
                  <User
                      name={user.following.name ?? ''}
                      avatarUrl={user.following.avatarUrl ?? ''}
                      description={user.following.email ?? ''}
                  />
                </CardBody>
              </Card>
            </Link>
        )}
      </div>
      : <h2 className='text-center'>У вас немає підписок</h2>
};

export default Following;
