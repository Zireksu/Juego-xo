import { WINNER_COMBOS } from "../constants.js"

export const checkWinnerfrom = (boardtoCheck) => {

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

  export const checkEndGame = (newBoard) =>{
    //verficar que todo el tablero este lleno
    return newBoard.every((Square) => Square != null)
  }