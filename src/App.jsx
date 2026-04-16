import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upcoming from "./pages/Upcoming";



function App() {
  

  return (
    <main>
      <Navbar />
      <div className="pattern">
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upcoming" element={<Upcoming />}/>
          </Routes>
        </div>
      </div>
    </main>
  )
}

export default App
