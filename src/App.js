import { Fragment } from "react";
import { Nav, Gallery, Bio } from "./components/index";
import "./App.scss";

function App() {
  return (
    <Fragment>
      <Nav />
      <div className="container">
        <Bio />
        <Gallery />
      </div>
    </Fragment>
  );
}

export default App;
