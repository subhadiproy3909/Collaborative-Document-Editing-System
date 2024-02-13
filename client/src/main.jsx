import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"


import App from './App.jsx'
import Provider from './context/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider>
        <App />
      </Provider>
  </React.StrictMode>,
)
