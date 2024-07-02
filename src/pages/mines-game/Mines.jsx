import { useEffect, useState } from "react";
import bomb from "../../assets/bomb.gif";
import flag from "../../assets/flag-2.png";
import {
  Bomb,
  Flag,
  Gamepad2,
  HelpCircle,
  Keyboard,
  Lightbulb,
  ShieldQuestion,
  Trophy,
} from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { addMineApi, getMines } from "@/api/mineApi";
import { useUserStore } from "@/store/User";

const MAX_ROWS_COLS = 12;
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
  11: "10",
  12: "10",
};
export default function Mines() {
  const [board, setBoard] = useState([]);
  const [win, setWin] = useState(1);
  const [nbrMines, setNbrMines] = useState(0);
  const [nbrFlags, setNbrFlags] = useState(0);
  const [mode, setMode] = useState("reveal");
  const [modalOpen, setModalOpen] = useState(true);
  const { width, height } = useWindowSize();

  // Modal input states
  const [ROWS, setROWS] = useState(6);
  const [COLS, setCOLS] = useState(6);
  const ray = rays[COLS]; // Default ray value

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
          handlePause();
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
      handlePause();
      setWin(3); // 3 represents a win state
    }
  };

  const handleReset = () => {
    initializeBoard(ROWS, COLS);
    handleTimerReset();
    handleStart();
  };
  const handleSubmitModal = () => {
    handleReset();
    if (ROWS > 1 && COLS > 1 && COLS <= MAX_ROWS_COLS) {
      setModalOpen(false);
    } else {
      alert(`Please enter valid  columns (max ${MAX_ROWS_COLS}).`);
    }
  };
  /////////TIMER/////////

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  const handleStart = () => {
    setIsRunning(true);
  };
  const handlePause = () => {
    setIsRunning(false);
  };
  const handleTimerReset = () => {
    setTime(0);
    setIsRunning(false);
  };
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  /////////TIMER/////////

  /////////STATS/////////
  const [totalgames, setTotalgames] = useState([]);
  const [bestScore, setBestScore] = useState({s:0,m:0});
  const user = useUserStore.getState().user;
  useEffect(() => { 
    getMines({
      createdBy: user.id,
    })
      .then((res) => {
        setTotalgames(res.data.data);
        
        res.map((game) => {});
      })
      .catch((err) => console.log(err));
  }, [win]);

  /////////STATS/////////

  useEffect(() => {
    if (win === 3 || win === 2) {
      addMineApi({
        rows: ROWS,
        cols: COLS,
        duration: {
          seconds,
          minutes,
        },
        is_a_win: win === 3 ? true : false,
      })
        .then((res) => {
        })
        .catch((err) => console.log(err));
    }
  }, [win]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-5">
      <Dialog defaultOpen open={modalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
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
                max="12"
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
                max="12"
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

      <div className="flex items-center mb-4">
        <Button
          className={`px-4 py-2 rounded-r-none`}
          onClick={() => setMode("reveal")}
          variant={`${mode === "reveal" ? "" : "secondary"}`}
        >
          Reveal
        </Button>
        <Button
          className={`px-4 py-2 rounded-l-none`}
          variant={`${mode === "flag" ? "" : "secondary"}`}
          onClick={() => setMode("flag")}
        >
          Flag
        </Button>
        <span className="bg-pink-800 h-full ml-5 px-5  rounded flex items-center gap-2 text-white">
          <Flag /> {nbrMines - nbrFlags}
        </span>
        <span className="bg-slate-800 h-full ml-5 px-5  rounded flex items-center gap-2 text-white">
          <Bomb /> {nbrMines}
        </span>
        <Dialog defaultOpen={false}>
          <DialogTrigger asChild>
            <Button variant="outline" className="ml-5 ">
              <HelpCircle />
            </Button>
          </DialogTrigger>

          <DialogContent className="overflow-y-auto	 max-h-[75dvh] ">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-1">
                Objective <ShieldQuestion />
              </DialogTitle>
              <DialogDescription>
                The objective of the game is to reveal all the safe cells
                without hitting any mines. The game is won when all safe cells
                are revealed, and all mines are correctly flagged.
              </DialogDescription>
            </DialogHeader>
            <DialogTitle className="flex items-center gap-1">
              Gameplay
              <Gamepad2 />
            </DialogTitle>
            <ul className="list-disc  px-5">
              <DialogDescription className="mb-1 list-item">
                The game board consists of a grid of cells, each of which may
                contain a mine or be safe.
              </DialogDescription>
              <DialogDescription className="mb-1 list-item">
                The number of mines on the board is displayed at the top of the
                screen.
              </DialogDescription>
              <DialogDescription className="mb-1 list-item">
                You can toggle between two modes: "Reveal" and "Flag".
              </DialogDescription>
              <DialogDescription className="mb-1 list-item">
                In "Reveal" mode, clicking a cell will reveal its content. If
                the cell is safe, it will display a number indicating how many
                mines are adjacent to it (including diagonally adjacent cells).
                If the cell has no adjacent mines, it will be blank, and all the
                surrounding safe cells will be automatically revealed.
              </DialogDescription>
              <DialogDescription className="mb-1 list-item">
                If you reveal a cell containing a mine, the game is over, and
                all mines will be shown on the board.
              </DialogDescription>
              <DialogDescription className="mb-1 list-item">
                In "Flag" mode, clicking a cell will toggle a flag on that cell
                . You can use flags to mark the cells you suspect contain mines.
                The number of available flags is displayed at the top of the
                screen and is equal to the number of mines on the board.
              </DialogDescription>
            </ul>
            <DialogTitle className="flex items-center gap-1">
              Winning <Trophy />
            </DialogTitle>
            <DialogDescription>
              You win the game when all safe cells have been revealed, and all
              mines have been correctly flagged.
            </DialogDescription>
            <DialogTitle className="flex items-center gap-1">
              Controls <Keyboard />
            </DialogTitle>
            <ul className="list-disc  px-5">
              <DialogDescription className="mb-1 list-item">
                On Desktop:
                <DialogDescription className="ms-2 list-item list-none">
                  - Left-click a cell to reveal it or toggle a flag (depending
                  on the current mode).
                </DialogDescription>
              </DialogDescription>
              <DialogDescription className="mb-1 list-item">
                On Mobile/Tablet:
                <DialogDescription className="ms-2 list-item list-none">
                  - Tap a cell to reveal it or toggle a flag (depending on the
                  current mode).
                </DialogDescription>
              </DialogDescription>
              <DialogDescription className="mb-1 list-item">
                Use the "Reveal" and "Flag" buttons to switch between modes.
              </DialogDescription>
              <DialogDescription className="mb-1 list-item">
                Use the "Reveal" and "Flag" buttons to switch between modes.
              </DialogDescription>
            </ul>

            <DialogTitle className="flex items-center gap-1">
              Tips <Lightbulb />
            </DialogTitle>
            <ul className="list-disc  px-5">
              <DialogDescription className="mb-1 list-item">
                Pay close attention to the numbers revealed on safe cells. They
                will help you deduce the locations of mines.
              </DialogDescription>

              <DialogDescription className="mb-1 list-item">
                Use flags wisely. If you run out of flags, you won't be able to
                mark any remaining mines.
              </DialogDescription>
              <DialogDescription className="mb-1 list-item">
                If you're stuck, try revealing cells near the edges of the board
                or cells with high adjacent mine counts.
              </DialogDescription>
            </ul>
          </DialogContent>
        </Dialog>
      </div>
      <div className="text-4xl font-bold border rounded mb-2 py-1 md:px-12 px-3">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <div className={`grid grid-cols-${COLS} gap-1`}>
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
        <Button onClick={handleReset}>Reset</Button>

        <Button
          variant="secondary"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Restart
        </Button>
      </div>

      <div className="my-5  flex items-center justify-center gap-5 rounded border py-1 px-2 font-bold">
        <span>Total games : {totalgames.length}</span>{" "}
        <span>| win : {totalgames.filter((x) => x.is_a_win).length}</span>
        <span>| lost : {totalgames.filter((x) => !x.is_a_win).length}</span>
        <span>| best score : {totalgames.filter((x) => !x.is_a_win).length}</span>
      </div>
    </div>
  );
}
