"use strict";

import { useEffect, useState } from "react";
import bomb from '../../assets/bomb.gif'
const ROWS = 9; // Change to 6
const COLS = 9; // Change to 6
const rays= {
    "2":"40",
    "3":"20",
    "4":"20",
    "5":"20",
    "6":"20",
    "7":"20",
    "8":"20",
    "9":"10",
    "10":"10",
}
export default function Mines() {
    const [board, setBoard] = useState(
        Array.from({ length: ROWS }, () =>
            Array.from({ length: COLS }, () => ({ v: "", o: false }))
        )
        );
        const [win, setWin] = useState(1);
        const ray = rays[COLS]
  useEffect(() => {
    initializeBoard();
  }, []); // Empty dependency array to run only once

  const initializeBoard = () => {
    const nbrMines = Math.floor(Math.sqrt(ROWS * COLS)); // Ensure nbrMines is an integer
    let newBoard = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({ v: "", o: false }))
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
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (!board[rowIndex][colIndex].o) {
      const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
      newBoard[rowIndex][colIndex].o = true;
      if (board[rowIndex][colIndex].v === "X") {
        setWin(2);
        newBoard.forEach((row) => row.forEach((cell) => cell.o = true));
      } else if (board[rowIndex][colIndex].v !== "X") {
        newBoard[rowIndex][colIndex].v = calculateNbrMines(rowIndex, colIndex);
        if (newBoard[rowIndex][colIndex].v === 0) {
          revealEmptyCells(newBoard, rowIndex, colIndex);
        }
      }

      setBoard(newBoard);
    }
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
          if (i >= 0 && i < ROWS && j >= 0 && j < COLS && !board[i][j].o) {
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

  const handleReset = () => {
    initializeBoard();
    setWin(1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Find Mines</h1>
      <div className={`grid grid-cols-${COLS} gap-2`}> {/* Explicit number of columns */}
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              disabled={win !== 1}
              key={`${rowIndex}-${colIndex}`}
              className={`w-${ray} h-${ray}  border-2 rounded-md transition-colors flex items-center justify-center font-extrabold ${
                cell.o
                  ? " bg-secondary hover:bg-red-100"
                  : "hover:bg-gray-100 bg-slate-400"
              } ${win !== 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {/* <Bomb className="w-10 h-10" />  */}
              {cell.o && cell.v === "X" ? (
                <img
                  alt="bomb"
                  src={bomb}
                  className=" w-full h-full object-contain"
                />
              ) : (
                cell.v == "X" || cell.v == 0 ? (
                  ""
                ) : (
                  cell.v
                )
              )}
            </button>
          ))
        )}
      </div>

      <button
        className="mt-8 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}