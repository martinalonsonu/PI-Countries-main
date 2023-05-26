import './App.css';
import axios from 'axios'
import { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/NavBar';
import { useState } from 'react';


function App() {

    const [countries, setCountries] = useState([])

    const { pathname } = useLocation();

    useEffect(() => {
        const fetchCountries = async () => {
            const url = 'http://localhost:3001/countries';
            try {
                const { data } = await axios.get(url);
                setCountries(data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchCountries();
    }, []);

    const searchCountries = async (name) => {
        const url = name ? `http://localhost:3001/countries?name=${name}`
            : 'http://localhost:3001/countries';
        try {
            const { data } = await axios.get(url);
            data ? setCountries(data)
                : alert("¡No se trajeron los datos de la Api!");
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="App">
            <div>
                {pathname !== "/" && <NavBar searchCountries={searchCountries} />}
            </div>
            <div>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/home' element={<Home countries={countries} />} />
                    <Route path='/detail/:id' element={<Detail />} />
                    <Route path='/activities' element={<Form />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
