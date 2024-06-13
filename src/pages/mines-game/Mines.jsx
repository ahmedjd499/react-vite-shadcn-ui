"use strict";

import { useEffect, useState } from "react";
import bomb from "../../assets/bomb.gif";
import { Flag } from "lucide-react";
import { useWindowSize } from "react-use";
import Confetti from 'react-confetti'

const ROWS = 6; // Changed to 6
const COLS = 6; // Changed to 6
const rays = {
  2: "40",
  3: "20",
  4: "20",
  5: "20",
  6: "20",
  7: "20",
  8: "20",
  9: "10",
  10: "10",
};

export default function Mines() {
  const [board, setBoard] = useState(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({ v: "", o: false, flagged: false }))
    )
  );
  const [win, setWin] = useState(1);
  const [nbrMines, setNbrMines] = useState(0); // State to track number of bombs
  const [nbrFlags, setNbrFlags] = useState(0); // State to track number of flags
  const [mode, setMode] = useState("reveal"); // 'reveal' or 'flag'
  const { width, height } = useWindowSize()
  const ray = rays[COLS];

  useEffect(() => {
    initializeBoard();
  }, []); // Empty dependency array to run only once

  const initializeBoard = () => {
    const nbrMines = Math.floor(Math.sqrt(ROWS * COLS)); // Ensure nbrMines is an integer
    setNbrMines(nbrMines);
    let newBoard = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({ v: "", o: false, flagged: false }))
    );
    let minesIndex = new Set();

    while (minesIndex.size < nbrMines) {
      let cellIndex = Math.floor(Math.random() * ROWS * COLS);
      minesIndex.add(cellIndex);
    }

    minesIndex.forEach((cellIndex) => {
      const rowIndex = Math.floor(cellIndex / COLS);
      const colIndex = cellIndex % COLS;
      newBoard[rowIndex][colIndex].v = "X";
    });

    setBoard(newBoard);
    setNbrFlags(0); // Reset number of flags
    setWin(1); // Reset win state
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
    initializeBoard();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Find Mines</h1>
      <div className="text-lg mb-8">
        <div>Number of Bombs: {nbrMines}</div>
        <div>Available Flags: {nbrMines - nbrFlags}</div>
      </div>
      <div className="flex items-center mb-4">
        <button
          className={`px-4 py-2 rounded-l-md ${
            mode === "reveal" ? "bg-gray-900 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("reveal")}
        >
          Reveal
        </button>
        <button
          className={`px-4 py-2 rounded-r-md ${
            mode === "flag" ? "bg-gray-900 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("flag")}
        >
          Flag
        </button>
      </div>
      <div className={`grid grid-cols-${COLS} gap-2`}>
        {" "}
        {/* Explicit number of columns */}
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              disabled={win !== 1}
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
                <Flag />
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
          <Confetti  
              width={width -5}
      height={height}
    />
        </div>
      )}
      {win === 2 && (
        <div className="mt-8 text-2xl font-bold text-red-600">
          Game Over! You hit a mine!
        </div>
      )}
      <button
        className="mt-8 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        onClick={handleReset}
      >
        Reset
      </button>
     
    </div>
  );
}



