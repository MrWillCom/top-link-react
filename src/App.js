import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Admin from './admin';
import About from './about';
import Profile from './profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<About/>} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="*" element={<div>404</div>} />
      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
