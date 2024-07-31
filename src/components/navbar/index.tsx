import React from "react"
import NavButton from "../nav-button"
import { BsPostcard } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"
import {FaUser, FaUsers} from "react-icons/fa"
import {useSelector} from "react-redux";
import {selectCurrent} from "../../features/user/userSlice";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const current = useSelector(selectCurrent)
  const { name, id } = current
  const navigate = useNavigate()

  return (
    <nav>
      <ul className='flex flex-col items-center p-4 mb-2 bg-default-200/50 rounded-xl'>
        <li className='cursor-pointer flex flex-row items-center gap-3' onClick={() => navigate(`/users/${id}`)}>
          <FaUser />
          {name && name}
        </li>
      </ul>
      <ul className="flex flex-col gap-3 p-4 bg-default-100 rounded-xl">
        <li>
          <NavButton href="/" icon={<BsPostcard />}>
            Пости
          </NavButton>
        </li>
        <li>
          <NavButton href="following" icon={<FiUsers />}>
            Підписки
          </NavButton>
        </li>
        <li>
          <NavButton href="followers" icon={<FaUsers />}>
            Підписники
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
