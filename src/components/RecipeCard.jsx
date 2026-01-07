export default function RecipeCard({ recipe }) {
  return (
    <div className="card recipe-card h-100 mb-4">
      {/* IMAGEM */}
      <div className="card-img-wrapper">
        <img
          src={recipe.img}
          className="card-img-top card-img"
          alt={recipe.name}
        />
        <div className="card-img-overlay">
          <p className="rate">⭐ {recipe.rate}</p>
        </div>
      </div>

      {/* CORPO DO CARD */}
      <div className="card-body">
        <div className="card-text">
          <p className="card-devices">{recipe.devices.join(", ")}</p>
        </div>

        <div className="card-heading">
          <h5 className="card-title">{recipe.name}</h5>
        </div>

        <div className="card-text">
          <div className="time-container">
            <div>
              <p className="subtitle">Preparação: </p>
              <p>{recipe.time.preparation}min🕒</p>
            </div>
            <div>
              <p className="subtitle">Total:</p>
              <p>{recipe.time.total}min🕒</p>
            </div>
          </div>

          <div className="info-container">
            <div className="d-flex align-items-center">
              <p className="subtitle">Doses:</p>

              {recipe.servings.map((serving, i) => {
                return (
                  <p key={i} className="serving-item">
                    {serving}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="card-footer">
        <a href={recipe.link} target="_blank" rel="noreferrer">
          Ver receita na Cookidoo
        </a>
      </div>
    </div>
  );
}
