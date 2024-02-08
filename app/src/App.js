import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.js'
import About from './Pages/About.js'
import Inventory from './Pages/Inventory.js'
import Contact from './Pages/Contact.js'

function App() {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/inventory" element={<Inventory />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App