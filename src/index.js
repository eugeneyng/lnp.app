import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

import * as Pages from "./pages";

function Volleyboard() {
  return (
    <Pages.Home />
  );
}

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(<Volleyboard />);
