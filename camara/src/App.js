import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import { Home } from "./pages/home";
import { Feed } from "./pages/feed";
import { Deputados } from "./pages/deputados"
import { RedeSocial } from "./pages/redesocial"
import { Noticias } from "./pages/noticias";
import Estatisticas from "./pages/estatisticas";
import { Eventos } from "./pages/eventos";
import { VideosP } from "./pages/videosP";
import { Faleconosco } from "./pages/faleconosco";

function App() {

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/deputados" element={<Deputados />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
          <Route path="/redesocial" element={<RedeSocial />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/videos" element={<VideosP />} />
          <Route path="/faleconosco" element={<Faleconosco />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
