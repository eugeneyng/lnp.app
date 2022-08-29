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

          {/* TODO: Use + and x buttons to add or delete players, instead of this form */}

          {/* This section is for the opposing team */}
          <div className="section py-0">
            <RivalTeam />
          </div>

          {/* This section is for the net */}
          <div className="section py-0 has-text-centered">
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

  function RivalTeam() {

    const [rivals, setRivals] = React.useState(defaults.players);
    console.log(rivals);

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

    function createPlayerCard(player) {
      return (
        <div className="card my-5 has-background-grey-lighter has-text-centered"
             draggable="true"
             id={player.position} // need this for event attributes
             key={player.position} // TODO: React is getting confused by duplicating keys
             onDragOver={(event) => allowDrop(event)}
             onDragStart={(event) => startDrag(event)}
             onDrop={(event) => swap(event)}
        >
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
      if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        let newName = event.target.innerHTML.replace("<br>", "")
        player.name = newName
        setRivals([...rivals]);
        event.target.blur();
      }
    }
    
    function startDrag(event) {
      event.dataTransfer.setData("oldPosition", event.target.getAttribute("id"));
    }
  
    function swap(event, element) {
      event.preventDefault();

      let oldPosition = parseInt(event.dataTransfer.getData("oldPosition"), 10);
      let newPosition = parseInt(event.target.parentNode.getAttribute("id"), 10);
      if (!Number.isNaN(newPosition)) {
        let temp = rivals[oldPosition];
    
        rivals[oldPosition] = rivals[newPosition];
        rivals[newPosition] = temp
        
        rivals[oldPosition].position = oldPosition;
        rivals[newPosition].position = newPosition;
  
        setRivals([...rivals]);
      }
  
  
    }

  }

  function FriendlyTeam() {

    const [friends, setFriends] = React.useState(defaults.players);
    console.log(friends);

    let frightsubs = [friends[7]]
    let frightside = [friends[4], friends[5]];
    let fmiddleide = [friends[3], friends[6]];
    let fleftside =  [friends[2], friends[1]];
    let fleftsubs = [friends[0]]

    return (
      <div className="columns is-mobile is-vcentered">
        <div className="column is-one-fifth">
          {frightsubs.map(createPlayerCard)}
        </div>
        <div className="box has-background-grey-light column">
          <div className="columns is-mobile is-vcentered">
            <div className="column">
              {frightside.map(createPlayerCard)}
            </div>
            <div className="column">
              {fmiddleide.map(createPlayerCard)}
            </div>
            <div className="column">
              {fleftside.map(createPlayerCard)}
            </div>
          </div>
        </div>
        <div className="column is-one-fifth">
          {fleftsubs.map(createPlayerCard)}
        </div>
      </div>
    )

    function createPlayerCard(player) {
      return (
        <div className="card my-5 has-background-grey-lighter has-text-centered"
             draggable="true"
             id={player.position} // need this for event attributes
             key={player.name}
             onDragOver={(event) => allowDrop(event)}
             onDragStart={(event) => startDrag(event)}
             onDrop={(event) => swap(event)}
        >
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
        setFriends([...friends]);
        event.target.blur();
      }
    }
    
    function startDrag(event) {
      event.dataTransfer.setData("oldPosition", event.target.getAttribute("id"));
    }
  
    function swap(event) {
      event.preventDefault();

      let oldPosition = parseInt(event.dataTransfer.getData("oldPosition"), 10);
      let newPosition = parseInt(event.target.parentNode.getAttribute("id"), 10);
      if (!Number.isNaN(newPosition)) {
        let temp = friends[oldPosition];
    
        friends[oldPosition] = friends[newPosition];
        friends[newPosition] = temp
        
        friends[oldPosition].position = oldPosition;
        friends[newPosition].position = newPosition;
  
        setFriends([...friends]);
      }
  
  
    }
  }
}
