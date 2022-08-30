import "bulma/css/bulma.css";
import * as React from "react";
import { VolleyballFriendly, VolleyballRival } from "../components/volleyball";
import defaults from "../assets/defaults.json";

export default function Home() {

  return (
    <div className="hero is-fullheight">
      <div className="hero-head">

      </div>
      <div className="hero-body">
        <div className="container">

          {/* TODO: Use + and x buttons to add or delete players, instead of this form */}

          {/* This section is for the opposing team */}
          <VolleyballRival className="section py-0" />

          {/* This section is for the net */}
          <div className="section py-0 has-text-centered">
            <hr />
            <div>Net</div>
            <hr />
          </div>

          {/* This section is for the friendly team */}
          <VolleyballFriendly className="section py-0" />

          {/* <div className="section has-text-centered">
            <div className="button">Save</div>
          </div> */}

        </div>
      </div>
      <div className="hero-foot">

      </div>
    </div>
  );
}
