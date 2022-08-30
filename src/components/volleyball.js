import "bulma/css/bulma.css";
import * as React from "react";
import defaults from "../assets/defaults.json";

export function VolleyballRival() {

  var uniqueIDCounter = 0;
  function uniqueId() {
    uniqueIDCounter += 1
    return uniqueIDCounter;
  }

  const [team, setTeam] = React.useState(defaults.rivalPlayers);
  console.log(team);

  let rightsubs = [team[0]]
  let rightside = [team[1], team[2]];
  let middleide = [team[6], team[3]];
  let leftside = [team[5], team[4]];
  let leftsubs = [team[7]]

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

    let id = uniqueId()
    return (
      <div className="card my-5 has-background-grey-lighter has-text-centered"
        draggable="true"
        id={player.position} // need this for event attributes
        key={id}
        onDragOver={(event) => allowDrop(event)}
        onDragStart={(event) => startDrag(event)}
        onDrop={(event) => swap(event)}
      >
        <div className="card-content">
          <div className="title">
            {player.name.charAt(0)}
          </div>
          <p className="has-background-primary" 
            contentEditable="true"
            suppressContentEditableWarning="true"
            onBlur={(event) => overwritePlayer(event, player)}
            onKeyDown={(event) => allowKeyDown(event)}>
            {player.name}
          </p>
        </div>
      </div>
    )
  }

  function allowDrop(event) {
    event.preventDefault(); // Default behavior is not to allow drop, so we will allow this
  }

  function allowKeyDown(event) {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      event.target.blur();
    }
  }

  function overwritePlayer(event, player) {
    event.preventDefault();
    let newName = event.target.innerHTML.replace("<br>", "")
    player.name = newName
    setTeam([...team]);
  }

  function startDrag(event) {
    event.dataTransfer.setData("text/plain", event.target.getAttribute("id"));
  }

  function swap(event) {
    event.preventDefault();

    let oldPosition = parseInt(event.dataTransfer.getData("text"), 10);

    let checkParent = parseInt(event.target.parentNode.getAttribute("id"), 10);
    let checkGrandParent = parseInt(event.target.parentNode.parentNode.getAttribute("id"), 10);

    let newPosition
    if (Number.isNaN(checkParent)) {
      newPosition = checkGrandParent
    } else {
      newPosition = checkParent
    }

    let temp = team[oldPosition];

    team[oldPosition] = team[newPosition];
    team[newPosition] = temp

    team[oldPosition].position = oldPosition;
    team[newPosition].position = newPosition;

    setTeam([...team]);
  }
}

export function VolleyballFriendly() {

  var uniqueIDCounter = 0;
  function uniqueId() {
    uniqueIDCounter -= 1
    return uniqueIDCounter;
  }

  const [team, setTeam] = React.useState(defaults.friendlyPlayers);
  console.log(team);

  let rightsubs = [team[0]]
  let rightside = [team[2], team[1]];
  let middleide = [team[3], team[6]];
  let leftside =  [team[4], team[5]];
  let leftsubs = [team[7]]

  return (
    <div className="columns is-mobile is-vcentered">
      <div className="column is-one-fifth">
        {leftsubs.map(createPlayerCard)}
      </div>
      <div className="box has-background-grey-light column">
        <div className="columns is-mobile is-vcentered">
          <div className="column">
            {leftside.map(createPlayerCard)}
          </div>
          <div className="column">
            {middleide.map(createPlayerCard)}
          </div>
          <div className="column">
            {rightside.map(createPlayerCard)}
          </div>
        </div>
      </div>
      <div className="column is-one-fifth">
        {rightsubs.map(createPlayerCard)}
      </div>
    </div>
  )

  function createPlayerCard(player) {
    let id = uniqueId()
    return (
      <div className="card my-5 has-background-grey-lighter has-text-centered"
        draggable="true"
        id={player.position} // need this for event attributes
        key={id}
        onDragOver={(event) => allowDrop(event)}
        onDragStart={(event) => startDrag(event)}
        onDrop={(event) => swap(event)}
      >
        <div className="card-content">
          <div className="title">
            {player.name.charAt(0)}
          </div>
          <p className="has-background-primary" 
            contentEditable="true"
            suppressContentEditableWarning="true"
            onBlur={(event) => overwritePlayer(event, player)}
            onKeyDown={(event) => allowKeyDown(event)}>
            {player.name}
          </p>
        </div>
      </div>
    )
  }

  function allowDrop(event) {
    event.preventDefault(); // Default behavior is not to allow drop, so we will allow this
  }

  function allowKeyDown(event) {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      event.target.blur();
    }
  }

  function clickHandler(event) {
    
  }

  function overwritePlayer(event, player) {
    event.preventDefault();
    let newName = event.target.innerHTML.replace("<br>", "")
    player.name = newName
    setTeam([...team]);
  }

  function startDrag(event) {
    event.dataTransfer.setData("text/plain", event.target.getAttribute("id"));
  }

  function swap(event) {
    event.preventDefault();

    let oldPosition = parseInt(event.dataTransfer.getData("text"), 10);

    let checkParent = parseInt(event.target.parentNode.getAttribute("id"), 10);
    let checkGrandParent = parseInt(event.target.parentNode.parentNode.getAttribute("id"), 10);

    let newPosition
    if (Number.isNaN(checkParent)) {
      newPosition = checkGrandParent
    } else {
      newPosition = checkParent
    }

    let temp = team[oldPosition];

    team[oldPosition] = team[newPosition];
    team[newPosition] = temp

    team[oldPosition].position = oldPosition;
    team[newPosition].position = newPosition;

    setTeam([...team]);
  }
}