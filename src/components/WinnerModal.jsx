import { Square } from "./Square.jsx"

export function WinnerModal ({winner, resetGame}) {
    if (winner === null) return null

    const winnertext = winner === false ? 'Empate' : 'Ganó'

    return (
         //para saber el esatado final de la partida
           
              <section className="winner">
                <div className="text">
                  <h2>
                    {winnertext}
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