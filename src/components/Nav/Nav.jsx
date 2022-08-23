import "./Nav.scss";
import logoImg from "../../assets/instagram.png";

function Nav(props) {
  return (
    <nav>
      <div className="logo">
        <img src={logoImg} alt="logo" className="logoImg" />
      </div>
      <input className="search" type="text" placeholder="search" />

      <div className="nav-btns">
        <i className="fas fa-home" title="Home" />

        <i className="fas fa-comment-alt" title="Comments" />

        <i className="fas fa-compass" title="Reels" />

        <i className="fas fa-heart" title="Heart" />
      </div>
    </nav>
  );
}

export default Nav;
