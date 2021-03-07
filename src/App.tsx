import React from 'react';
import logo from './logo.svg';
import './App.css';
import TabBar from './components/TabBar/TabBar';
import UserPanel from './components/UserPanel/UserPanel';
import MainInfo from './pages/MainInfo/MainInfo';

function App() {
  return (
    <>
      <TabBar />
      <UserPanel />
      <MainInfo />
    </>
  );
}

export default App;
