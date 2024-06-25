import { createContext, useState, useEffect, useRef, useContext } from "react";
import { getGrid } from "../utils/startingGrid";

const ModeContext = createContext();

export const useModes = () => {
  return useContext(ModeContext)
}

export const ModeProvider = ({ children }) => {

  const [mode, setMode] = useState(null);
  const [algo, setAlgo] = useState("");
  const [run, setRun] = useState(false);
  const [grid, setGrid] = useState(getGrid(50, 25));
  const [editing, setEditFlag] = useState(false);
  const [res, setRes] = useState(false);
  const [weight, setWeight] = useState(1);
  const start = useRef({ x: 25, y: 12 });
  const end = useRef({ x: 48, y: 23 });


  useEffect(() => {
    restart()
  }, [res]);

  function restart() {
    setGrid(getGrid(50, 25));
  }

  const contextData = {
    mode,
    setMode,
    algo,
    setAlgo,
    grid,
    setGrid,
    setRes,
    weight, setWeight,
    editing,
    setEditFlag,
    start,
    end,
    run,
    setRun,
    res,
    restart
  };


  return (
    <ModeContext.Provider value={contextData}>
      {children}
    </ModeContext.Provider>
  );
};
