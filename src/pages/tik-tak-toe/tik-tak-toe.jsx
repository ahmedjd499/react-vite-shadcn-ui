
// "use strict"

// import { useState } from "react"

// export default function TikTakToe() {
//   const [board, setBoard] = useState(Array(9).fill(null))
//   const [currentPlayer, setCurrentPlayer] = useState("X")
//   const handleCellClick = (index) => {
//     if (board[index] === null) {
//       const newBoard = [...board]
//       newBoard[index] = currentPlayer
//       setBoard(newBoard)
//       setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
//     }
//   }
//   const checkWin = () => {
//     const winningCombos = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ]
//     for (let i = 0; i < winningCombos.length; i++) {
//       const [a, b, c] = winningCombos[i]
//       if (board[a] && board[a] === board[b] && board[b] === board[c]) {
//         return board[a]
//       }
//     }
//     if (!board.includes(null)) {
//       return "tie"
//     }
//     return null
//   }
//   const winner = checkWin()
//   const handleReset = () => {
//     setBoard(Array(9).fill(null))
//     setCurrentPlayer("X")
//   }
//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
//       <div className="grid grid-cols-3 gap-4">
//         {board.map((cell, index) => (
//           <button
//             key={index}
//             className={`w-20 h-20 text-4xl font-bold border-2 rounded-md transition-colors ${
//               cell === "X"
//                 ? "text-blue-500 hover:bg-blue-100"
//                 : cell === "O"
//                 ? "text-red-500 hover:bg-red-100"
//                 : "hover:bg-gray-100"
//             }`}
//             onClick={() => handleCellClick(index)}
//           >
//             {cell}
//           </button>
//         ))}
//       </div>
//       {winner && (
//         <div className="mt-8 text-2xl font-bold">{winner === "tie" ? "It's a tie!" : `Player ${winner} wins!`}</div>
//       )}
//       {
//         !winner && (
//           <div className="mt-8 text-2xl font-bold">
//          Player  {currentPlayer} turn 
//     </div>

//         )
//       }
//       <button
//         className="mt-8 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
//         onClick={handleReset}
//       >
//         Reset
//       </button>
//     </div>
//   )
// }



import Congrats from "@/components/component/Congrats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardPaste, Copy } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function TikTakToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [socket, setSocket] = useState(null);
  const [gameId, setGameId] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [gameIdInput, setGameIdInput] = useState("");
  const [gameOver, setGameOver] = useState(false); // New state variable
  const [winner, setWinner] = useState(null);
  const gameIdInputRef = useRef(null);
  const playerSymbolRef = useRef(null);

  const wsUrl = import.meta.env.VITE_WSBACKEND_API || "ws://localhost:3000";

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(ws);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      switch (data.type) {
        case "created":
          setGameId(data.gameId);
          setPlayerSymbol("X");
          playerSymbolRef.current = "X"; // Update ref
          break;
        case "start":
          if (playerSymbolRef.current === null) {
            setPlayerSymbol("O");
            playerSymbolRef.current = "O"; // Update ref
          }
          setCurrentPlayer("X");
          setGameId(data.gameId);
          break;
        case "update":
          setBoard(data.board);
          setCurrentPlayer(data.currentPlayer);
          break;
        case "reset":
          setBoard(Array(9).fill(null));
          setCurrentPlayer("X");
          setGameOver(false); // Reset game over state
          setWinner(null); // Reset winner state
          break;
        case "error":
          alert(data.message);
          break;
        default:
          break;
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (ws.readyState === 1) { // <-- This is important
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    const winner = checkWin();
    if (winner) {
      setGameOver(true);
      setWinner(winner);
    }
  }, [board]);

  const handleCellClick = (index) => {
    if (!gameOver && board[index] === null && playerSymbol === currentPlayer) {
      socket.send(JSON.stringify({ type: "move", gameId, index }));
    }
  };

  const handleCreateGame = () => {
    socket.send(JSON.stringify({ type: "create" }));
  };

  const handleJoinGame = () => {
    if (gameIdInput.trim() !== "") {
      socket.send(JSON.stringify({ type: "join", gameId: gameIdInput }));
    } else {
      alert("Please enter a valid Game ID.");
    }
  };

  const handleReset = () => {
    socket.send(JSON.stringify({ type: "reset", gameId }));
    setCurrentPlayer("X");
  };

  const checkWin = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check for winner
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }

    // Check for tie if there are no empty cells
    if (!board.includes(null)) {
      return "tie";
    }

    // Check for potential tie if there are empty cells
    if (isPotentialTie(board)) {
      return "tie";
    }

    return null;
  };

  const isPotentialTie = (board, player = "X") => {
    // Base case: if there's a winner, it's not a tie
    const winner = checkWinner(board);
    if (winner) {
      return false;
    }
  
    // If all cells are filled and no winner, it's a tie
    if (!board.includes(null)) {
      return true;
    }
  
    // Recursive case: try all possible moves
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = player;
  
        // If the opponent can't force a tie, it's not a guaranteed tie
        if (!isPotentialTie(newBoard, player === "X" ? "O" : "X")) {
          return false;
        }
      }
    }
  
    // If all moves lead to a tie, it's a guaranteed tie
    return true;
  };

  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // alert("Game ID copied to clipboard!");
    }).catch((err) => {
      console.error("Could not copy text: ", err);
    });
  };
  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      console.log(text);
      setGameIdInput(text);
    } catch (error) {
      console.error("Error pasting:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-2">Tic Tac Toe</h1>

      {!gameId ? (
        <div className="container px-4 md:px-6 mb-5">
          <div className="mx-auto max-w-md ">
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Enter a game ID to join an existing game, or create a new one.
            </p>
            <div className="space-y-4">
              <div className="space-y-2 flex gap-2 ">
                <Input
                  id="gameId"
                  placeholder="Enter game ID"
                  className="flex-1"
                  value={gameIdInput}
                  ref={gameIdInputRef}
                  onChange={(e) => setGameIdInput(e.target.value)}
                />
                <ClipboardPaste className="cursor-pointer " onClick={(e) => paste() }
                />
              </div>
              <div className="flex justify-between gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleJoinGame}
                >
                  Join Game
                </Button>
                <Button className="flex-1" onClick={handleCreateGame}>
                  Create New Game
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          className="my-2 gap-2"
          onClick={() => copyToClipboard(gameId)}
        >
          <Copy /> {gameId}
        </Button>
      )}
      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`w-20 h-20 text-4xl font-bold border-2 rounded-md transition-colors ${
              cell === "X"
                ? "text-blue-500 hover:bg-blue-100"
                : cell === "O"
                ? "text-red-500 hover:bg-red-100"
                : "hover:bg-gray-100"
            } ${currentPlayer === playerSymbol && !gameOver ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={() => handleCellClick(index)}
            disabled={gameOver} // Disable button if game is over
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <div className="mt-8 text-2xl font-bold">
          {winner === "tie" ? "It's a tie!" : `Player ${winner} wins!`}
        </div>
      )}
      {
        winner && <Congrats winner={winner =='tie' ? 'tie' : playerSymbol == 'X' && winner=='X' ? 'X' :playerSymbol == 'X' && winner=='O' ? 'O' : playerSymbol == 'O' && winner=='O' ? 'X':playerSymbol == 'O' && winner=='X' ? 'O' :''}/>
      }
      {!winner && (
        <div className="mt-8 text-2xl font-bold">
          Player {currentPlayer} turn
        </div>
      )}
      {playerSymbol === "X" && (
        <button
          className="mt-8 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          onClick={handleReset}
        >
          Reset
        </button>
      )}
    </div>
  );
}
