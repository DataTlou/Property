// import logo from "./logo.svg";
import "./App.css";
// import Testing from './components/function';
import Greet from "./components/Greet";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Menu from "./components/Menu";
import Function from "./components/Function";
import Search from './components/Search'
import { Button } from 'antd';
import React from 'react';

const App: React.FC = () =>
{
  return(
  <div className="App">
    <Router>
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <p>Tenant System</p> */}
          {/* <Testing /> */}
          {/* <Link to="/menu"><Button type="primary">Hello</Button></Link> */}

          <Routes>
            <Route index='/'/>
            <Route path="/Greet" element={<Greet />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/user" element={<Function />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </header>
        
      </Router>
    
  </div>
  )
  
}
// function App() {
//   return (
//     <div className="App">
      // <Router>
      //   <header className="App-header">
      //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
      //     <p>Hello World</p>
      //     {/* <Testing /> */}
      //     <Link to="/menu">Menu</Link>

      //     <Routes>
      //       <Route path="/Greet" element={<Greet />} />
      //       <Route path="/menu" element={<Menu />} />
      //       <Route path="/user" element={<Function />} />
      //     </Routes>
      //   </header>
      // </Router>
//     </div>
//   );
// }

export default App;
