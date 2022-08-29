import "bulma/css/bulma.css";
import * as React from "react";
import defaults from "../assets/defaults.json";

export default function Home() {

  const [rivals, setRivals] = React.useState(defaults.players);
  const [friends, setFriends] = React.useState(defaults.players);

  return (
    <div className="hero is-fullheight">
      <div className="hero-head">

      </div>
      <div className="hero-body">
        <div className="container">

          {/* TODO: Use + and x buttons to add or delete players, instead of this form */}

          {/* This section is for the opposing team */}
          <div className="section py-0">
            <RivalTeam />
          </div>

          {/* This section is for the net */}
          <div className="section py-0">
            <hr />
            <button>Rotate</button>
            <hr />
          </div>

          {/* This section is for the friendly team */}
          <div className="section py-0">
            <FriendlyTeam />
          </div>

          <div className="section has-text-centered">
            <button>Save</button>
          </div>
          
        </div>
      </div>
      <div className="hero-foot">

      </div>
    </div>
  );

  function createPlayerCard(player) {
    return (
      <div className="card my-5 has-background-grey-lighter has-text-centered"
           draggable="true"
           key={player.name}
           onDragOver={(event) => allowDrop(event)}
           onDragStart={(event) => startDrag(event)}
           onDrop={(event) => swap(event)}>
        <div className="card-content">
          <div className="title">
            {player.name.charAt(0)}
          </div>
          <p contentEditable="true"
             suppressContentEditableWarning="true"
             onKeyDown={(event) => allowKeyDown(event, player)}>
            {player.name}
          </p>
        </div>
      </div>
    )
  }

  function allowDrop(event) {
    event.preventDefault(); // Default behavior is not to allow drop, so we will allow this
  }
  
  function allowKeyDown(event, player) {
    if (event.key === "Enter") {
      event.preventDefault();
      player.name = event.target.innerHTML.replace(/\br/g,'')
      setFriends(friends);
      setRivals(rivals);
      event.target.blur();
    }
  }
  
  function startDrag(event) {
    console.log("Dragging ...")
  }

  function swap(event) {
    console.log("Swapping ...")
    event.preventDefault();
  }

  function RivalTeam() {

    let rightsubs = [rivals[0]]
    let rightside = [rivals[1], rivals[2]];
    let middleide = [rivals[6], rivals[3]];
    let leftside =  [rivals[5], rivals[4]];
    let leftsubs = [rivals[7]]

    return (
      <div className="columns is-mobile is-vcentered">
        <div className="column is-one-fifth">
          {rightsubs.map(createPlayerCard)}
        </div>
        <div className="box has-background-grey-light column">
          <div className="columns is-mobile is-vcentered">
            <div className="column">
              {rightside.map(createPlayerCard)}
            </div>
            <div className="column">
              {middleide.map(createPlayerCard)}
            </div>
            <div className="column">
              {leftside.map(createPlayerCard)}
            </div>
          </div>
        </div>
        <div className="column is-one-fifth">
          {leftsubs.map(createPlayerCard)}
        </div>
      </div>
    )

  }

  function FriendlyTeam() {

    let rightsubs = [friends[7]]
    let rightside = [friends[4], friends[5]];
    let middleide = [friends[3], friends[6]];
    let leftside =  [friends[2], friends[1]];
    let leftsubs = [friends[0]]

    return (
      <div className="columns is-mobile is-vcentered">
        <div className="column is-one-fifth">
          {rightsubs.map(createPlayerCard)}
        </div>
        <div className="box has-background-grey-light column">
          <div className="columns is-mobile is-vcentered">
            <div className="column">
              {rightside.map(createPlayerCard)}
            </div>
            <div className="column">
              {middleide.map(createPlayerCard)}
            </div>
            <div className="column">
              {leftside.map(createPlayerCard)}
            </div>
          </div>
        </div>
        <div className="column is-one-fifth">
          {leftsubs.map(createPlayerCard)}
        </div>
      </div>
    )
  }
}
