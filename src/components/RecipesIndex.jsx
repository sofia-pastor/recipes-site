export default function RecipesIndex({ tagNames }) {
  return (
    <div className="recipes-index-container">
      <ul className="recipes-index">
        {tagNames.map((tagName, i) => {
          return (
            <li key={i} className="text-capitalize">
              <a href={`#${tagName}`}>{tagName}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
