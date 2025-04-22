import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "bootstrap/dist/css/bootstrap.min.css"
import App from './App.jsx'
import {LoginUerProvider} from "./provider/LoginUserProvider.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient=new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <LoginUerProvider>
            {/* LoginUerProvider => UseLoinUserContext.value={[loginUser,setLoginUser]} */}
            <App />
          </LoginUerProvider>
      </QueryClientProvider>
  </StrictMode>,
)
