import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Route';

// tanstack query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

// for helmet (page title changing according to the visiting page)
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Provider/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* auth provider/functions,user,variables */}
      <QueryClientProvider client={queryClient}>{/* tanstack query */}
        <HelmetProvider> {/* helmet provider/title of the page*/}
          <div className='max-w-screen-xl mx-auto'>
            <RouterProvider router={router} />{/* router/routes provider */}
          </div>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
