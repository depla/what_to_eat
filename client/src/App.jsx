// import './App.css'

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect } from 'react';

import HomePage from './pages/HomePage/HomePage';
import ChoosePage from './pages/ChoosePage/ChoosePage';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';


function App() {
  return <MantineProvider>{
    <Router>
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/choose' element={<ChoosePage />} />
      </Routes>
    </Router>
  }</MantineProvider>;
}

export default App
