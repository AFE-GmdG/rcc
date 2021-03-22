import React from "react";
import {render} from "react-dom";

import "./app.css";

const App: React.FC = () => (
  <>
    <h1>Hello, World!</h1>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est nemo iure possimus, veritatis rem debitis consequuntur beatae, mollitia provident ipsam omnis neque.</p>
  </>
);

render(
  <App />,
  document.getElementById("app"),
);
