import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/NavBar';
import Activity from './components/Activity/Activity';



function App() {
    const { pathname } = useLocation();

    return (
        <div className={pathname === '/' ? 'Landing' : 'App'} >
            <div>
                {pathname === "/" ? "" : <NavBar />}
            </div>
            <div>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/detail/:id' element={<Detail />} />
                    <Route path='/createactivity' element={<Form />} />
                    <Route path='/activities' element={<Activity />} />

                </Routes>
            </div>
        </div>
    );
}

export default App;
