// import { Nav, Gallery, Bio } from "./components/index";
import { Nav, Gallery, Bio } from "./components/index";
import "./App.scss";

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Bio />
        <Gallery />
      </div>
    </>
  );
}

export default App;
