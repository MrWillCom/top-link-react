import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Index from './index/index';
import Admin from './admin';
import About from './about';
import Profile from './profile';
import Explore from './explore/explore';
import Login from './user/login';
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
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/explore' element={<Explore></Explore>}></Route> 
        <Route path="/404" element={<div>来到了一片荒原，这里什么都没有</div>} />
        <Route path="/:username" element={<Profile />} />
        <Route path="*" element={<div>404</div>} />
      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
