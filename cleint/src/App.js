import logo from './logo.svg';
import './App.css';
import UserLits from './UserList/UserLits';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import AddUserForm from './AddUserForm/AddUserForm';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
            <Routes>
              <Route path='/' element={<UserLits/>}></Route>
              <Route path='/user' element={<AddUserForm/>}></Route>
            </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
