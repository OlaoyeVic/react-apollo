import React from 'react';
import logo from './logo.svg';
import './../styles/App.css';
import LinkLists from './LinkLists';
import CreateLink from './CreateLink';
import Header from './Header';
import Login from './Login'
import { Navigate, Route, Routes } from 'react-router-dom';
import Search from './Search';

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route path="/" element={<Navigate replace to="/new/1" />} />
          <Route path="/create" element={<CreateLink />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/top" element={<LinkLists />} />
          <Route path="/new/:page" element={<LinkLists />} />
        </Routes>
      </div>
    </div >
  )
}

export default App;
