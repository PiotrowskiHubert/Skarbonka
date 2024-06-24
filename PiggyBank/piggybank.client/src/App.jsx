import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './Home';
import { Expenses } from './Expenses';
import { Login } from './Login';
import { Register } from './Register';
import { Rooms } from './Rooms';
import { Profile } from './Profile'
function App() {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='expenses' element={<Expenses />}></Route>
                        <Route path='login' element={<Login />}></Route>
                        <Route path='register' element={<Register />}></Route>
                        <Route path='available-rooms' element={<Rooms />}></Route>
                        <Route path='profile' element={<Profile /> }></Route>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    )
}

export default App;