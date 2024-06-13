import { useEffect, useState } from "react";
import bomb from "../../assets/bomb.gif";
import flag from "../../assets/flag-2.png";
import { Bomb, Flag } from "lucide-react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";

const MAX_ROWS_COLS = 10;

export default function Mines() {
  const [board, setBoard] = useState([]);
  const [win, setWin] = useState(1);
  const [nbrMines, setNbrMines] = useState(0);
  const [nbrFlags, setNbrFlags] = useState(0);
  const [mode, setMode] = useState("reveal");
  const [modalOpen, setModalOpen] = useState(true);
  const { width, height } = useWindowSize();

  const ray = 20; // Default ray value

  // Modal input states
  const [ROWS, setROWS] = useState(6);
  const [COLS, setCOLS] = useState(6);

  useEffect(() => {
    initializeBoard(ROWS, COLS);
  }, [ROWS, COLS]);

  const initializeBoard = (rows, cols) => {
    const nbrMines = Math.floor(Math.sqrt(rows * cols));
    setNbrMines(nbrMines);
    let newBoard = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ v: "", o: false, flagged: false }))
    );
    let minesIndex = new Set();

    while (minesIndex.size < nbrMines) {
      let cellIndex = Math.floor(Math.random() * rows * cols);
      minesIndex.add(cellIndex);
    }

    minesIndex.forEach((cellIndex) => {
      const rowIndex = Math.floor(cellIndex / cols);
      const colIndex = cellIndex % cols;
      newBoard[rowIndex][colIndex].v = "X";
    });

    setBoard(newBoard);
    setNbrFlags(0);
    setWin(1);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (mode === "reveal") {
      if (!board[rowIndex][colIndex].o && !board[rowIndex][colIndex].flagged) {
        const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
        newBoard[rowIndex][colIndex].o = true;
        if (board[rowIndex][colIndex].v === "X") {
          setWin(2);
          newBoard.forEach((row) => row.forEach((cell) => (cell.o = true)));
        } else if (board[rowIndex][colIndex].v !== "X") {
          newBoard[rowIndex][colIndex].v = calculateNbrMines(
            rowIndex,
            colIndex
          );
          if (newBoard[rowIndex][colIndex].v === 0) {
            revealEmptyCells(newBoard, rowIndex, colIndex);
          }
        }

        setBoard(newBoard);
        checkForWin(newBoard);
      }
    } else if (mode === "flag") {
      handleCellToggle(rowIndex, colIndex);
    }
  };

  const handleRightClick = (e, rowIndex, colIndex) => {
    e.preventDefault();
    handleCellToggle(rowIndex, colIndex);
  };

  const handleCellToggle = (rowIndex, colIndex) => {
    const cell = board[rowIndex][colIndex];
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

    if (cell.flagged) {
      // Remove the flag
      newBoard[rowIndex][colIndex].flagged = false;
      setNbrFlags(nbrFlags - 1);
    } else if (nbrFlags < nbrMines) {
      // Place the flag only if there are available flags
      newBoard[rowIndex][colIndex].flagged = true;
      setNbrFlags(nbrFlags + 1);
    }

    setBoard(newBoard);
    checkForWin(newBoard);
  };

  const calculateNbrMines = (row, col) => {
    let ctr = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (board[i] && board[i][j] && board[i][j].v === "X") {
          ctr++;
        }
      }
    }
    return ctr;
  };

  const revealEmptyCells = (board, row, col) => {
    const queue = [[row, col]];

    while (queue.length > 0) {
      const [currentRow, currentCol] = queue.shift();
      for (let i = currentRow - 1; i <= currentRow + 1; i++) {
        for (let j = currentCol - 1; j <= currentCol + 1; j++) {
          if (
            i >= 0 &&
            i < ROWS &&
            j >= 0 &&
            j < COLS &&
            !board[i][j].o &&
            !board[i][j].flagged
          ) {
            board[i][j].o = true;
            board[i][j].v = calculateNbrMines(i, j);
            if (board[i][j].v === 0) {
              queue.push([i, j]);
            }
          }
        }
      }
    }
  };

  const checkForWin = (board) => {
    let correctlyFlagged = 0;
    let uncoveredCells = 0;
    let allBombsUnrevealed = true;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (board[row][col].v === "X") {
          if (board[row][col].flagged) {
            correctlyFlagged++;
          }
          if (board[row][col].o) {
            allBombsUnrevealed = false;
          }
        } else if (board[row][col].o) {
          uncoveredCells++;
        }
      }
    }

    if (
      correctlyFlagged === nbrMines ||
      (uncoveredCells === ROWS * COLS - nbrMines && allBombsUnrevealed)
    ) {
      setWin(3); // 3 represents a win state
    }
  };

  const handleReset = () => {
    initializeBoard(ROWS, COLS);
    // setModalOpen(true)
  };
  const handleSubmitModal = () => {
    if (ROWS > 0 && COLS > 0 && COLS <= MAX_ROWS_COLS) {
      setModalOpen(false);
    } else {
      alert(`Please enter valid  columns (max ${MAX_ROWS_COLS}).`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-5">
      <Dialog defaultOpen open={modalOpen} >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader >
            <DialogTitle>Create a game Grid</DialogTitle>
            <DialogDescription>
              Enter the number of rows and columns for your game grid.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 ">
              <Label htmlFor="rows" className="text-left">
                Rows
              </Label>
              <Input
                id="rows"
                type="number"
                min="2"
                max="10"
                value={ROWS}
                onChange={(e) => setROWS(parseInt(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 ">
              <Label htmlFor="columns" className="text-left">
                Columns
              </Label>
              <Input
                id="columns"
                type="number"
                min="2"
                max="10"
                value={COLS}
                onChange={(e) => setCOLS(parseInt(e.target.value))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmitModal}>Start Game</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <h1 className="text-4xl font-bold mb-4">Find Mines</h1>

      <div className="text-lg mb-8">
        <div>Number of Bombs: {nbrMines}</div>
        <div>Available Flags: {nbrMines - nbrFlags}</div>
      </div>
      <div className="flex items-center mb-4">
        <Button
                   className={`px-4 py-2 rounded-r-none`}

          onClick={() => setMode("reveal")}
          variant={`${
            mode === "reveal" ? "" : "secondary"
          }`}
        >
          Reveal
        </Button>
        <Button
          className={`px-4 py-2 rounded-l-none`}
          variant={`${
            mode === "flag" ? "" : "secondary"
          }`}
          onClick={() => setMode("flag")}
        >
          Flag 
        </Button>
        <span className="bg-pink-800 h-full ml-5 px-5  rounded flex items-center gap-2 text-white"> <Flag /> {nbrMines - nbrFlags}</span>
        <span className="bg-slate-800 h-full ml-5 px-5  rounded flex items-center gap-2 text-white"> <Bomb /> {nbrMines}</span>
      </div>
      <div className={`grid grid-cols-${COLS} gap-2`}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`w-${ray} h-${ray} border-2 rounded-md transition-colors flex items-center justify-center font-extrabold ${
                cell.o
                  ? "bg-secondary hover:bg-red-100"
                  : "hover:bg-gray-100 bg-slate-400"
              } ${win !== 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
            >
              {cell.o && cell.v === "X" ? (
                <img
                  alt="bomb"
                  src={bomb}
                  className="w-full h-full object-contain"
                />
              ) : cell.flagged ? (
                <img
                  alt="flag"
                  src={flag}
                  className="w-full h-full object-contain"
                />
              ) : cell.v === "X" || cell.v === 0 ? (
                ""
              ) : (
                cell.v
              )}
            </button>
          ))
        )}
      </div>
      {win === 3 && (
        <div className="mt-8 text-2xl font-bold text-green-600">
          Congratulations! You won!
          <Confetti width={width - 5} height={height} />
        </div>
      )}
      {win === 2 && (
        <div className="mt-8 text-2xl font-bold text-red-600">
          Game Over! You hit a mine!
        </div>
      )}
      <div className="my-5 w-full flex items-center justify-center gap-5">
      <Button
        
        onClick={handleReset}
      >
        Reset
      </Button>

      <Button
        variant="secondary"
        onClick={()=>{
          handleReset() ;
          setModalOpen(true)}}
      >
        Restart 
      </Button>
      </div>
    </div>
  );
}
