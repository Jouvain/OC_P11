import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/home/index.jsx'
import SigninPage from './pages/signin/index.jsx'
import UserPage from './pages/user/index.jsx'
import ErrorPage from './pages/error/index.jsx'
import Footer from './components/Footer/index.jsx'
import Header from './components/Header/index.jsx'
import { store } from './store.js'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Provider} from "react-redux"
import './index.css'
import { useDispatch } from 'react-redux'
import { rememberUser } from './features/users/usersSlice.js'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <Router>
            <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/signin' element={<SigninPage />} />
                    <Route path='/user' element={<UserPage />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            <Footer />
        </Router> 
    </Provider> 
  </React.StrictMode>,
)
