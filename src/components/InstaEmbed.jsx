import { useEffect } from "react";

export default function InstaEmbed({ url }) {
  useEffect(() => {
    // Depois de o componente aparecer no ecrã, pedimos ao Instagram
    // para processar os <blockquote> e transformá-los em embeds
    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, []); // [] = só corre uma vez quando o componente monta

  return (
    <div className="insta-embed-wrapper">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
      ></blockquote>
    </div>
  );
}
