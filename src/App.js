import React from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Create from './components/Create';
import Home from './components/Home';
import Menu from './components/Menu';
import Pnf  from './components/Pnf';
import Update  from './components/Update';

import {ToastContainer} from 'react-toastify'
import'react-toastify/dist/ReactToastify.css';

function App(props) {
  return (
    <BrowserRouter>
     <Menu/>
     <ToastContainer autoClose={2000} position={"bottom-center"}/>
     <Routes> 
      <Route path={`/`} element={<Home itemCount={4}/>}/>
      <Route path={`/home`} element={<Home itemCount={4}/>}/>
      <Route path={`/create`} element={<Create/>}/>
      <Route path={`/update/:contactId`} element={<Update/>}/>
      {/* <Route path={`/*`} element={<Pnf/>}/> */}
     </Routes>
    </BrowserRouter>
  )
}

export default App
