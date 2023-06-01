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
import { Eventos } from "./pages/estatisticas";
import { VideosP } from "./pages/videosP";
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/deputados" element={<Deputados/>} />       
        <Route path="/redesocial" element={<RedeSocial/>} />  
        <Route path="/noticias" element={<Noticias/>} />
        <Route path="/eventos" element={<Eventos/>} />        
        <Route path="/videos" element={<VideosP/>} />        


      </Routes>
    </Router>
  );
};

export default App;
