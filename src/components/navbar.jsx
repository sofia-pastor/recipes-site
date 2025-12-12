import { NavLink } from "react-router-dom";

import "../styles/navbar.css";

export default function navbar() {
  return (
    <nav className="Navbar">
      <div className="navbar-container">
        <NavLink to="/cookidoo">Cookidoo</NavLink>
        <NavLink to="/instaRecipes">Instagram</NavLink>
        <NavLink to="/tips">Dicas</NavLink>
        <NavLink to="manualRecipes">Receitas sem Bimby</NavLink>
      </div>
    </nav>
  );
}
