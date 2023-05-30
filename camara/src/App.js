import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Home } from "./pages/home";
import { Feed } from "./pages/feed";
import { Deputados } from "./pages/deputados"
import { RedeSocial } from "./pages/redesocial"
import { Noticias } from "./pages/noticias";
import { Estatisticas } from "./pages/estatisticas";
import { VideosP } from "./pages/videosP";
import { Frentes} from "./pages/frentes";
import { Fdetalhes } from "./pages/Fdetalhes"; 
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/deputados" element={<Deputados/>} />       
        <Route path="/redesocial" element={<RedeSocial/>} />  
        <Route path="/noticias" element={<Noticias/>} />
        <Route path="/estatisticas" element={<Estatisticas/>} />        
        <Route path="/videos" element={<VideosP/>} />        
        <Route path="/frentes" element={<Frentes/>} />
        <Route path="/frentes/detalhes" element={<Fdetalhes/>} />

      </Routes>
    </Router>
  );
};

export default App;
