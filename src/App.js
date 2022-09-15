import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoMatch from './components/NoMatch';


function App() {
  return (
    <div className='App'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/add' element={<AddTask />} />
        <Route exact path='/edit/:id' element={<EditTask />} />
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
    </div>
  );
}

export default App;
