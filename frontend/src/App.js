import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Pocetna from "./pages/Pocetna/Pocetna";
import Programi from "./pages/Programi/Programi";
import Blog from "./pages/Blog/Blog";
import Omeni from "./pages/Omeni/Omeni";
import MojProfil from "./pages/MojProfil/MojProfil";
import Kontakt from "./pages/Kontakt/Kontakt";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar će uvek biti prikazan */}
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/programi" element={<Programi />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/o-meni" element={<Omeni />} />
        <Route path="/moj-profil" element={<MojProfil />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
