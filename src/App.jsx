import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ReportFound from './components/FoundItemForm';
import FoundItemsList from './components/FoundItemsList';
import FoundItemDetails from './components/FoundItemDetails';
import LostItemForm from './components/LostItemForm';
import LostItemList from './components/LostItemList';
import LostItemDetails from './components/LostItemDetails';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgetPassword';
import Conversations from './components/Conversations';
import ChatPage from './components/ChatPage';


function App() {
  return (
    <Router>
      <Layout>
      <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/found/report' element={<ReportFound/>}/>
          <Route path='/found/all' element={<FoundItemsList/>}/>
          <Route path='/found/item/:id' element={<FoundItemDetails/>}/>
          <Route path='/lost/all' element={<LostItemList/>}/>
          <Route path='/lost/report' element={<LostItemForm/>}/>
          <Route path='/lost/item/:id' element={<LostItemDetails/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/conversations' element={<Conversations/>}/>
          <Route path='/messages/:conversationId' element={<ChatPage/>}/>
          {/* Other routes will go here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
