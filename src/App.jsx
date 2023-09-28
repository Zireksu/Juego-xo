import { useState } from "react"

const TURNS = {
  X: 'X',
  O: 'O'
}


const Square = ({children, isSelected, updateBoard, index}) =>{

  const className = `square ${isSelected ? 'is-selected' :''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

  const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
  ]



function App() {
  //funcion para tear y actualizar el arreglo del tablero
  const [board, setBoard] = useState(
    Array(9).fill(null)
  );
  

  const [turn, setTurn] = useState(TURNS.X)
  //null no hay ganador y false hay empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardtoCheck) => {

    //ciclo for que trae los elementos del arreglo para compararlos con un if y verificar si hay ganador
    for (const combo of WINNER_COMBOS){
      const [a ,b ,c] = combo
      if (
        boardtoCheck[a] &&
        boardtoCheck[a] === boardtoCheck[b] &&
        boardtoCheck[a] === boardtoCheck[c]
      ){
        return boardtoCheck[a]
      }
    }
    //si el for no encuentra ganador, se retorna un null
    return null
  }


  //reiniciar juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
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

    //revisdar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      setWinner(newWinner)
    }
  }


  //tablero que se envia y se muestra en el index html
 return (
  <main className='board'>
  <h1>tic tac toe</h1>
  <button onClick={resetGame}>Reiniciar juego</button>
  <section className="game">
    {
      board.map((_, index) => {
        return (
          <Square 
          key={index}
          index={index}
          updateBoard={updateBoard}
          >
            {board[index]}
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


  
  { //para saber el esatado final de la partida
    winner != null && (
      <section className="winner">
        <div className="text">
          <h2>
            {
              winner === false
              ? 'Empate'
              : 'Ganó'
            }
          </h2>

          <header className="win">
            {winner && <Square>{winner}</Square>}
          </header>

          <footer className="">
            <button onClick={resetGame}>Empezar de nuevo</button>
          </footer>
        </div>
      </section>
    )
  }
  </main>
 )
}

export default App
