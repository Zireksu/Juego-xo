import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js";
import { checkWinnerfrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";



function App() {


  //funcion para tear y actualizar el arreglo del tablero
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    }
  );
  

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  //null no hay ganador y false hay empate
  const [winner, setWinner] = useState(null)


  //reiniciar juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('board')
  }



  const updateBoard = (index) => {
    //decision para no reescribir la posicionb del tablero
    if (board[index] || winner) return 

    //Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cmabiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    //revisdar si hay ganador
    const newWinner = checkWinnerfrom(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false) //significa empate
    }
  }


  //tablero que se envia y se muestra en el index html
 return (
  <main className='board'>
  <h1>tic tac toe</h1>
  <button onClick={resetGame}>Reiniciar juego</button>
  <section className="game">
  {
      board.map((square, index) => {
        return (
          <Square 
          key={index}
          index={index}
          updateBoard={updateBoard}
          >
            {square}
          </Square>
        )
      })
    }
  </section>

  {//section para saber si es turno de x u o 
  }
  <section className="turn">
    <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
    <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
  </section>


  <WinnerModal resetGame={resetGame} winner={winner}/>
  </main>
 )
}

export default App
