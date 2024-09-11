import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Message from './page/Message';

function App() {
  if (typeof global === 'undefined') {
    window.global = window;
  }

  return (
    <div className="app">
      <Router basename="/">
        <main className="content">
          <Routes>
            <Route path="/" element={<Message />} />
          </Routes>
        </main>
      </Router>
      {/* <Footer /> */}
    </div>
  )
}

export default App
