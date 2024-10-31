import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@/components/theme-provider'
import ErrorPage from '@/error-page'
import Astrology, { loader as astrologyLoader } from '@/routes/astrology'
import AstrologyProfile, { loader as astrologyProfileLoader } from '@/routes/astrology-profile'
import Root from '@/routes/root'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'astrology',
        element: <Astrology />,
        loader: astrologyLoader,
      },
      {
        path: 'astrology/profile/:profileId',
        element: <AstrologyProfile />,
        loader: astrologyProfileLoader,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
