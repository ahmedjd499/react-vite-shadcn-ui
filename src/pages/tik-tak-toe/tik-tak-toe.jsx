
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






import { useState, useEffect, useRef } from "react";

export default function TikTakToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [socket, setSocket] = useState(null);
  const [gameId, setGameId] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [gameIdInput, setGameIdInput] = useState("");
  const gameIdInputRef = useRef(null);
  const playerSymbolRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

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
            setCurrentPlayer('X')
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
      ws.close();
    };
  }, []);

  
  const handleCellClick = (index) => {

    if (board[index] === null && playerSymbol === currentPlayer) {
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
    socket.send(JSON.stringify({ type: "reset", gameId: gameId
     }));
    setCurrentPlayer("X");
    // Ideally, send a reset message to the server
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
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    if (!board.includes(null)) {
      return "tie";
    }
    return null;
  };

  const winner = checkWin();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
      {gameId}
    {!gameId && (
        <div className="mb-4">
          <button
            className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
            onClick={handleCreateGame}
          >
            Create Game
          </button>
          <input
            type="text"
            placeholder="Game ID"
            className="mr-4 px-4 py-2 border rounded-md"
            value={gameIdInput}
            ref={gameIdInputRef}
            onChange={(e) => setGameIdInput(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
            onClick={handleJoinGame}
          >
            Join Game
          </button>
        </div>
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
            } ${currentPlayer===playerSymbol ? 'cursor-pointer':'cursor-not-allowed' }`}
            onClick={() => handleCellClick(index)}
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
      {!winner && (
        <div className="mt-8 text-2xl font-bold">
          Player {currentPlayer} turn
        </div>
      )}

      {
        playerSymbol==='X' &&
      
      <button
        className="mt-8 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        onClick={handleReset}
      >
        Reset
      </button>
    }
    </div>
  );
}
