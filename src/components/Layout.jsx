import React from 'react';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      
        <Navbar/>

      {/* Main */}
      <main className="flex-grow container mx-auto p-4">
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm p-4">
        © {new Date().getFullYear()} FindIt. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
