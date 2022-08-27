import "bulma/css/bulma.css";
import * as React from "react";
import defaults from "../assets/defaults.json";

export default function Home() {

  return (
    <div className="hero is-fullheight">
      <div className="hero-head">

      </div>
      <div className="hero-body">
        <div className="container">

          {/* This section is for form controls */}
          <div className="section field is-grouped is-grouped-centered is-grouped-multiline is-mobile">

            {/* <label className="label"># Players</label> */}
            <div className="control">
              <input className="input" type="number" placeholder="Number of Players"></input>
            </div>

            {/* <label className="label"># Subs</label> */}
            <div className="control">
              <input className="input" type="number" placeholder="Number of Subs"></input>
            </div>
          
          </div>

          {/* This section is for the opposing team */}
          <div className="section">
            <div className="columns is-mobile is-vcentered">
              <RivalTeam />
            </div>
          </div>

          {/* This section is for the net */}
          <div className="section">
            <hr />
          </div>

          {/* This section is for the friendly team */}
          <div className="section">
            <div className="columns is-mobile is-vcentered">
              <FriendlyTeam />
            </div>
          </div>
          
        </div>
      </div>
      <div className="hero-foot">

      </div>
    </div>
  );

  function RivalTeam() {

    function CreateRivalRotation() {
      const [rivals, setRivals] = React.useState(defaults.players);

      let backrow = [rivals[0].name, rivals[1].name, rivals[2].name]
      let frontrow = [rivals[3].name, rivals[4].name, rivals[5].name]

      return rivals.map(createPlayerCard);
    }

    function createPlayerCard(player) {
      return (
        <div className="column">
          <div className="card" key={player.id}>
            {player.name} : {player.sub.toString()}
          </div>
        </div>
      )
    }

    return (
      <CreateRivalRotation />
    )

  }

  function FriendlyTeam() {

    function CreateFriendRotation() {

      const [friends, setFriends] = React.useState(defaults.players);

      return friends.map(createPlayerCard);

    }
    function createPlayerCard(player) {
      return (
        <div className="column">
          <div className="card" key={player.id}>
            {player.name}
          </div>
        </div>
      )
    }

    return (
      <CreateFriendRotation />
    )
  }
}
