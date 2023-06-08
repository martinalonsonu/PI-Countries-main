import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/NavBar';
import Activity from './components/Activity/Activity';
import NotFound from './components/NotFound/NotFound';

function App() {
    const { pathname } = useLocation();

    return (
        <div className='App-container'>
            {pathname !== "/" && <NavBar />}
            <div>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/detail/:id' element={<Detail />} />
                    <Route path='/activities' element={<Activity />} />
                    <Route path='/create-activity' element={<Form />} />
                    <Route path='/update-activity/:id' element={<Form />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
