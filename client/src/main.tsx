import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import ReactQueryClientProvider from './contexts/ReactQueryClientProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

// const initialOptions = {
//   'client-id': 'test',
//   'enable-funding': 'venmo',
//   'disable-funding': '',
//   'buyer-country': 'US',
//   currency: 'USD',
//   'data-page-type': 'product-details',
//   components: 'buttons',
//   'data-sdk-integration-source': 'developer-studio',
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ReactQueryClientProvider>
        <App />
      </ReactQueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
