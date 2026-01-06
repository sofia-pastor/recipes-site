import { useEffect } from "react";

export default function InstaEmbed({ videos }) {
  useEffect(() => {
    // Depois de o componente aparecer no ecrã, pedimos ao Instagram
    // para processar os <blockquote> e transformá-los em embeds
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, [videos]); // [] = só corre uma vez quando o componente monta

  let embedsData = [];

  if (videos && videos.length > 0) {
    embedsData = videos.map(function (video) {
      return {
        url: video.url,
        titleElement: video.title,
      };
    });
  }

  // 2️⃣ JSX só renderiza
  return (
    <div className="insta-embed-section">
      {embedsData.map(function (embed) {
        return (
          <div key={embed.url} className="insta-embed-wrapper">
            <h5>{embed.titleElement}</h5>

            <blockquote
              className="instagram-media"
              data-instgrm-permalink={embed.url}
              data-instgrm-version="14"
            />
          </div>
        );
      })}
    </div>
  );
}
