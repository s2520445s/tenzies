import { useState } from "react"
import Dice from "./dice"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
export default function App()
{
    const { width, height } = useWindowSize()
    const [generate,func]=useState(generateAllNewDice)
    let gameWon = false
    if(generate.every(dice=>dice.isHeld===true&&dice.value===generate[0].value)){
        console.log("win")
        gameWon=true
    }
    function generateAllNewDice()
    {
        const numbers=[]
        for(let i=0;i<10;i++)
        {
            const number=Math.ceil(Math.random()*6)
            numbers.push({value:number, 
                          isHeld:false,
                          id: nanoid()})
        }   
        return(numbers)
    }
    
    function reroll()
    {
        if(gameWon===false)(
        func(prev=>prev.map(dice=>dice.isHeld===false?{...dice,value:Math.ceil(Math.random()*6)}:dice)))
        else{
            func(generateAllNewDice())
        }
    }

    function hold(id)
    {
        func(prev=>prev.map(dice=>dice.id===id?{...dice,isHeld:!dice.isHeld}:dice))
    }
    const diceElements= generate.map((diceObejct)=><Dice isHeld={diceObejct.isHeld} key={diceObejct.id} value={diceObejct.value}
                                    hold={hold} id={diceObejct.id}/>)
    return(
        <main>
             {gameWon && <Confetti width={window.innerWidth} height={window.innerHeight} />}
            <h1 className="title">Tenzies</h1>
            <div className="dice">
                {diceElements}
            </div>
             <button onClick={reroll}className="roll">{gameWon?"New Game":"Reroll"}</button>
        </main>
    )
}

