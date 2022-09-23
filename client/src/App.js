import React from 'react'
import { useSelector } from "react-redux"
import {useRoutes} from "./routes"
import * as selectors from './selectors'


function App() {
  const isToken = !!useSelector(selectors.token)
  const isUser = !!useSelector(selectors.userId)
  const isAuthenticated = (isToken && isUser)
  const isCompletely = useSelector(selectors.userCompletely)
  const userType = useSelector(selectors.userType)

  const routes = useRoutes(isAuthenticated, isCompletely, userType)
  
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
