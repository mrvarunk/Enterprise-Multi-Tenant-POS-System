import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from './context/SidebarContext';
// import { Provider } from 'react-redux'
// import globalState from './redux/globalState'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SidebarProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SidebarProvider>
    </React.StrictMode>
)