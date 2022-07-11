import React from 'react'
import AuthContext from './context/AuthContext'
import useAuth from './hooks/auth.hook'
import {useRoutes} from "./routes";


function App() {
  const auth = useAuth()
  const isAuthenticated = !!auth.token
  const routes = useRoutes(isAuthenticated, auth.isCompletely)
  
  return (
    <AuthContext.Provider value={{...auth, isAuthenticated}}>
      <div className="container">
        {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
