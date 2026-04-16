import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upcoming from "./pages/Upcoming";
import Details from "./pages/Details";



function App() {
  

  return (
    <main>
      <Navbar />
      <div className="pattern">
        <div className="wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upcoming" element={<Upcoming />}/>
              <Route path="/movie/:id" element={<Details />}/>
            </Routes>
        </div>
      </div>
    </main>
  )
}

export default App
