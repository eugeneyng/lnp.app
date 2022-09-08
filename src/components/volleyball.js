import "bulma/css/bulma.css";
import * as React from "react";
import defaults from "../assets/defaults.json";

var uniqueIDCounter = 0;

export function Volleyball() {

  function uniqueId() {
    uniqueIDCounter += 1;
    return uniqueIDCounter;
  }

  const [team, setTeam] = React.useState(defaults.rivalPlayers);
  const [rightSubs, setRightSubs] = React.useState([]);
  const [leftSubs, setLeftSubs] = React.useState([]);

  let leftSide = [team[4], team[3]];
  let middle = [team[5], team[2]];
  let rightSide = [team[0], team[1]];

  return (
    <div className="columns is-mobile is-vcentered">
      <div className="column is-one-fifth">
        {rightSubs.map(createPlayerCard)}
        {createAddPlayerCard("right")}
      </div>
      <div className="box has-background-grey-light column">
        <div className="has-text-centered">
          <div className="button" onClick={(event) => rotate(event)}>
            Rotate
          </div>
        </div>
        <div className="columns is-mobile is-vcentered">
          <div className="column">{rightSide.map(createPlayerCard)}</div>
          <div className="column">{middle.map(createPlayerCard)}</div>
          <div className="column">{leftSide.map(createPlayerCard)}</div>
        </div>
      </div>
      <div className="column is-one-fifth">
        {leftSubs.map(createPlayerCard)}
        {createAddPlayerCard("left")}
      </div>
      <div className="modal" id="right-modal">
        <div
          className="modal-background"
          onClick={() =>
            document.querySelector("#right-modal").classList.toggle("is-active")
          }
        ></div>
        <div className="modal-content">
          <input
            className="input"
            type="text"
            placeholder="New Player Name"
            onBlur={(event) => {
              rightSubs.push({ name: event.target.value, position: -100 }); // Position -100 tells us it is a right sub
              setRightSubs([...rightSubs]);
              document
                .querySelector("#right-modal")
                .classList.toggle("is-active");
              event.target.value = "";
            }}
            onKeyDown={(event) => allowKeyDown(event)}
          ></input>
        </div>
      </div>
      <div className="modal" id="left-modal">
        <div
          className="modal-background"
          onClick={
            () =>
              document
                .querySelector("#left-modal")
                .classList.toggle("is-active")
            // document.getElementById("leftModalText").Focus();
          }
        ></div>
        <div className="modal-content">
          <input
            className="input"
            // id="leftModalText"
            type="text"
            placeholder="New Player Name"
            onBlur={(event) => {
              leftSubs.push({ name: event.target.value, position: -200 }); // Position -200 tells us it is a left sub
              setLeftSubs([...leftSubs]);
              document
                .querySelector("#left-modal")
                .classList.toggle("is-active");
              event.target.value = "";
            }}
            onKeyDown={(event) => allowKeyDown(event)}
          ></input>
        </div>
      </div>
    </div>
  );

  function createAddPlayerCard(side) {
    return (
      <div
        className="card my-5 has-background-grey-lighter has-text-centered"
        onClick={() => {
          if (side == "right") {
            document
              .querySelector("#right-modal")
              .classList.toggle("is-active");
          } else {
            document.querySelector("#left-modal").classList.toggle("is-active");
          }
        }}
      >
        <div className="card-content">
          <div className="title">+</div>
        </div>
      </div>
    );
  }

  function createPlayerCard(player) {
    let id = uniqueId();
    return (
      <div
        className="card my-5 has-background-grey-lighter has-text-centered"
        draggable="true"
        id={player.position} // need this for event attributes
        key={id}
        onDragOver={(event) => allowDrop(event)}
        onDragStart={(event) => startDrag(event)}
        onDrop={(event) => swap(event)}
      >
        <div className="card-content">
          <div className="title">{player.name.charAt(0)}</div>
          <p
            className="has-background-primary"
            contentEditable="true"
            suppressContentEditableWarning="true"
            onBlur={(event) => overwritePlayer(event, player)}
            onKeyDown={(event) => allowKeyDown(event)}
          >
            {player.name}
          </p>
        </div>
      </div>
    );
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
    let newName = event.target.innerHTML.replace("<br>", "");
    player.name = newName;
    setTeam([...team]);
  }

  function rotate(event) {
    let first = team.shift();
    team.push(first);

    if (rightSubs.length > 0) {
      let subRightIn = rightSubs.shift();
      team.splice(0, 0, subRightIn);
      let subRightOut = team.splice(1, 1)[0];
      subRightOut.position = -100;
      rightSubs.push(subRightOut);
    }
    if (leftSubs.length > 0) {
      let subLeftIn = leftSubs.pop();
      team.splice(3, 0, subLeftIn);
      let subLeftOut = team.splice(4, 1)[0];
      subLeftOut.position = -200;
      leftSubs.unshift(subLeftOut);
    }

    for (let i = 0; i < team.length; i++) {
      team[i].position = i;
    }

    setTeam([...team]);
    setLeftSubs([...leftSubs]);
    setRightSubs([...rightSubs]);
  }

  function startDrag(event) {
    event.dataTransfer.setData("text/plain", event.target.getAttribute("id"));
  }

  function swap(event) {
    event.preventDefault();

    let oldPosition = parseInt(event.dataTransfer.getData("text"), 10);

    let checkParent = parseInt(event.target.parentNode.getAttribute("id"), 10);
    let checkGrandParent = parseInt(
      event.target.parentNode.parentNode.getAttribute("id"),
      10
    );

    let newPosition;
    if (Number.isNaN(checkParent)) {
      newPosition = checkGrandParent;
    } else {
      newPosition = checkParent;
    }

    let temp = team[oldPosition];

    team[oldPosition] = team[newPosition];
    team[newPosition] = temp;

    team[oldPosition].position = oldPosition;
    team[newPosition].position = newPosition;

    setTeam([...team]);
  }
}

