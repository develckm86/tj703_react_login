import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "bootstrap/dist/css/bootstrap.min.css"
import App from './App.jsx'
import {LoginUerProvider} from "./provider/LoginUserProvider.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GoogleOAuthProvider} from "@react-oauth/google";

const queryClient=new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={"453194321429-lukj54ub0hcn1craed8e0svt8ijlgu0q.apps.googleusercontent.com"}>
              <LoginUerProvider>
                {/* LoginUerProvider => UseLoinUserContext.value={[loginUser,setLoginUser]} */}
                <App />
              </LoginUerProvider>
          </GoogleOAuthProvider>
      </QueryClientProvider>
  </StrictMode>,
)
