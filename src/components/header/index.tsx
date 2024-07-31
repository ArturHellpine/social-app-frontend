import React, { useContext } from "react"
import { ThemeContext } from "../theme-provider"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Switch,
} from "@nextui-org/react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectIsAuthenticated } from "../../features/user/userSlice"
import {Link, useNavigate} from "react-router-dom"
import {CiLogout} from "react-icons/ci";
import {SlSocialGithub, SlSocialInstagram} from "react-icons/sl";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/auth')
  }

  return (
      <Navbar className={`${localStorage.getItem('theme') === 'light' ? 'bg-default-200/50' : 'bg-default-100/50'} py-1`}>
        <NavbarBrand className='flex flex-row items-center'>
          <Link to='https://github.com/ArturHellpine'>
            <SlSocialGithub size={18} />
          </Link>
          <p className="font-bold text-inherit ml-2">Network Social</p>
        </NavbarBrand>
        <NavbarContent justify='end'>
          <NavbarItem className='lg:flex text-2xl cursor-pointer' onClick={() => toggleTheme()}>
            { theme === 'light' ? <FaRegMoon size={20} /> : <LuSunMedium size={20} /> }
          </NavbarItem>
          <NavbarItem>
            {
              isAuthenticated &&
                <Button
                    color='default'
                    variant='flat'
                    className='gap-2'
                    onClick={handleLogout}
                >
                    <CiLogout size={ 16 } /> <span>Вийти</span>
                </Button>
            }
          </NavbarItem>
        </NavbarContent>
      </Navbar>
  );
};

export default Header;