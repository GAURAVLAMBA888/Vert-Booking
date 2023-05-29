import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/home/Home";
import List from "./Pages/list/List";
import Hotel from "./Pages/hotel/Hotel";
import Login from "./Pages/login/Login";

function App() {
    return <div className="App">
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/hotels" element={<List />} />
            <Route exact path="/hotels/:id" element={<Hotel />} />
            <Route exact path='/login' element={<Login />} />
        </Routes>
        </BrowserRouter>
	</div>;
}

export default App;
