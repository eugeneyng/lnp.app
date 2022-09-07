import "bulma/css/bulma.css";
import * as React from "react";
import { VolleyballFriendly, VolleyballRival } from "../components/volleyball";
import { DonateKofi, DonatePayPal } from "../components/donate";
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  auto as followSystemColorScheme
} from 'darkreader';

export default function Home() {
  return (
    <div className="hero is-fullheight">
      <div className="hero-head"></div>
      <div className="hero-body">
        <div className="container">

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

          <div className="has-text-centered">
            <DonateKofi />
            <p>If you enjoyed using this website, help pay for domain name and hosting costs!</p>
          </div>
          <div className="has-text-centered">
            <button className="button" onClick={() => {
              enableDarkMode({
                brightness: 100,
                contrast: 90,
                sepia: 10,
              })
            }}>Dark Mode</button>
          </div>
        </div>
      </div>
      <div className="hero-foot"></div>
    </div>
  );
}
