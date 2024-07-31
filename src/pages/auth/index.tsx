import React, { useEffect, useState } from "react"
import {Card, CardBody, Tab, Tabs} from "@nextui-org/react"
import Login from "../../features/user/login";
import Register from "../../features/user/register";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/user/userSlice";

const Auth = () => {
  const [selected, setSelected] = useState('login')
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/')
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="m-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
                fullWidth
                size="md"
                selectedKey={ selected }
                onSelectionChange={ (key) => setSelected(key as string) }
            >
              <Tab key='login' title='Вхід'>
                <Login setSelected={ setSelected } />
              </Tab>
              <Tab key='sign-up' title='Реєстрація'>
                <Register setSelected={ setSelected } />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Auth;