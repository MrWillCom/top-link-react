import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Index from './index/index';
import Admin from './admin';
import About from './about';
import Profile from './profile';
import Register from './user/register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path='/register' element={<Register/>}></Route>
        <Route path="/:username" element={<Profile />} />
        <Route path="*" element={<div>404</div>} />
      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
