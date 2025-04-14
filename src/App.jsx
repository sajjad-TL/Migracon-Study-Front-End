import React, { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID='1096874794393-kpphuq91om905lk4papttobq3mv9bfsf.apps.googleusercontent.com'


function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AppRoutes />
    
  </GoogleOAuthProvider>
  )
}

export default App
