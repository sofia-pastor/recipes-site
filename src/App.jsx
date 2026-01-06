import { Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/navbar";
import RecipePage from "./components/RecipePage";
import InstaEmbed from "./components/InstaEmbed";

import "./App.css";

export default function App() {
  const instaVideos = [
    // 1) Reel
    {
      title: "Como colocar a mandolina",
      url: "https://www.instagram.com/reel/DQMyQdYjBKC/?utm_source=ig_embed&utm_campaign=loading",
    },
    {
      title: "Brownie com abacate (ingrediente secreto)",
      url: "https://www.instagram.com/reel/DOHqKOhk-Xj/?utm_source=ig_embed&utm_campaign=loading",
    },

    {
      title: "Biberão na temperatura certa",
      url: "https://www.instagram.com/reel/DAeSgDqA2rL/?utm_source=ig_embed&amp;utm_campaign=loading",
    },

    {
      title: "Aquecer a comida na Varoma",
      url: "https://www.instagram.com/reel/DHhC__XA6yR/?utm_source=ig_embed&amp;utm_campaign=loading",
    },

    {
      title: "Truque infalível para descobrir quantas claras estão congeladas",
      url: "https://www.instagram.com/reel/DHHIb_LNM2W/?utm_source=ig_embed&amp;utm_campaign=loading",
    },

    {
      title: "Cozer batatas no modo ovos",
      url: "https://www.instagram.com/reel/DG3x4H-Av8q/?utm_source=ig_embed&amp;utm_campaign=loading",
    },

    // 2) Post normal
    {
      title: "Ponto do ovo cozido",
      url: "https://www.instagram.com/p/DPoCk2KiDPx/?utm_source=ig_embed&utm_campaign=loading",
    },
  ];

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<RecipePage />} />
        <Route path="/cookidoo" element={<RecipePage />} />
        <Route path="/tips" element={<InstaEmbed videos={instaVideos} />} />
      </Routes>
    </div>
  );
}
