import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer';
import Home from './page/Home';

function App() {

  return (
    <div className="app">
      <Router basename="/">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  )
}

export default App
