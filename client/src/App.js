import React from 'react'
import { useSelector } from "react-redux"
import Alert from './components/Alert'
import {useRoutes} from "./routes"
import * as selectors from './selectors'



function App() {
  const isToken = !!useSelector(selectors.token)
  const isUser = !!useSelector(selectors.userId)
  const isAuthenticated = (isToken && isUser)
  const isConfirm = useSelector(selectors.userConfirm)
  const isCompletely = useSelector(selectors.userCompletely)
  const userType = useSelector(selectors.userType)

  const routes = useRoutes(isAuthenticated, isConfirm, isCompletely, userType)
  
  return (
    <div>
      {routes}
      <Alert />
    </div>
  )
}

export default App
