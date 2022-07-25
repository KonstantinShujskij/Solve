import React from 'react'
import {useRoutes} from "./routes";
import { useSelector } from "react-redux";
import * as selectors from './selectors'



function App() {
  const isToken = !!useSelector(selectors.token)
  const isUser = !!useSelector(selectors.userId)
  const isAuthenticated = (isToken && isUser)
  const isCompletely = useSelector(selectors.userCompletely)
  const userType = useSelector(selectors.userType)

  const routes = useRoutes(isAuthenticated, isCompletely, userType)
  
  return (
    <div className="container">
      {routes}
    </div>
  );
}

export default App;
