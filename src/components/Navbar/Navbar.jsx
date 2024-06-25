import React, { useState } from "react";
import "./navbar.css";
import { useModes } from "../../contexts/context.jsx";
import styled from "styled-components";

export default function Navbar() {
  // const [algo,setAlgo] = useState('')
  const { mode, setMode, algo, setAlgo, setRes, setRun, weight, setWeight } = useModes();


  return (
    <div className="navbar">
      <div className="container">
        <button
          type="button"
          className={[
            "btn",
            "btn-success",
            mode == "setstart" ? "selected" : "",
          ].join(" ")}
          onClick={() => {
            if (mode == "setStart") setMode(null);
            else {
              setMode("setStart");
            }
          }}
        >
          Start <i className="bi bi-geo-alt"></i>
        </button>
        <button
          type="button"
          className={[
            "btn",
            "btn-success",
            mode == "settarget" ? "selected" : "",
          ].join(" ")}
          onClick={() => {
            if (mode == "setTarget") setMode(null);
            else {
              setMode("setTarget");
            }
          }}
        >
          Target
          <i className="bi bi-geo"></i>
        </button>
        <button
          type="button"
          className={[
            "btn",
            "btn-success",
            mode == "addBricks" ? "selected" : "",
          ].join(" ")}
          onClick={() => {
            if (mode == "addBricks") setMode(null);
            else {
              setMode("addBricks");
            }
          }}
        >
          Add Wall <i className="bi bi-bricks"></i>
        </button>
        <button
          type="button"
          className={[
            "btn",
            "btn-success",
            mode == "addWeight" ? "selected" : "",
          ].join(" ")}
          onClick={() => {
            if (mode == "addWeight") setMode(null);
            else {
              setMode("addWeight");
            }
          }}
        >
          <StyledInput
            type="number"
            placeholder="Weight"
            onChange={(e) => setWeight(e.target.value)}
          />
          Add Weight <i className="bi bi-virus"></i>
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            setRes((old) => {
              return !old;
            });
          }}
        >
          Reset <i className="bi bi-arrow-counterclockwise"></i>
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            console.log("clicked !!");
            setRun((old) => {
              return !old;
            });
          }}
        >
          Run Algorithm <i className="bi bi-caret-right"></i>
        </button>
        <div>
          <select
            className="form-select"
            aria-label="Default select example"
            value={algo}
            onChange={(e) => {
              setAlgo(e.target.value);
            }}
          >
            <option value="">Choose your algorithm</option>
            <option value="Dijkstra">Dijkstra</option>
            <option value="BDS">BDS</option>
            <option value="BFS">BFS</option>
          </select>
        </div>
      </div>
    </div>
  );
}


const StyledInput = styled.input`
  width: 100px;
  padding: 1px 15px;
  border-radius: 15px;
  margin: 0 10px 0 0;
  background-color: green;
`