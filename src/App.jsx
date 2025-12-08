import RecipePage from "./components/RecipePage";
import InstaEmbed from "./components/InstaEmbed";

import "./App.css";

export default function App() {
  const instaEmbedUrls = [
    // 1) Reel
    "https://www.instagram.com/reel/DQMyQdYjBKC/?utm_source=ig_embed&utm_campaign=loading",

    "https://www.instagram.com/reel/DOHqKOhk-Xj/?utm_source=ig_embed&utm_campaign=loading",

    // 2) Post normal
    "https://www.instagram.com/p/DPoCk2KiDPx/?utm_source=ig_embed&utm_campaign=loading",
  ];

  return (
    <div className="App">
      <RecipePage />

      <div className="insta-embed-section">
        {instaEmbedUrls.map((url, index) => (
          <InstaEmbed key={index} url={url} />
        ))}
      </div>
    </div>
  );
}
