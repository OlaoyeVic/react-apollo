import React from 'react';
import logo from './logo.svg';
import './../styles/App.css';
import LinkLists from './LinkLists';
import CreateLink from './CreateLink';
import Header from './Header';
import Login from './Login'
import { Route, Routes } from 'react-router-dom';

function App() {
  return <div>
    <Header />
    <div className="ph3 pv1 background-gray">
      <Routes>
        <Route path="/" element={<LinkLists />}></Route>
        <Route path="/create" element={<CreateLink />}></Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  </div>
}

export default App;
