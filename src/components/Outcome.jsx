import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import AntiConfetti from './Anticonfetti'

function Outcome(props) {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: document.body.scrollHeight + 150
    })

    // update dimensions dynamically when window is resized
    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: document.body.scrollHeight + 150
            })
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, []
    )

    return (
        <>
            {props.score >= 5 ? <Confetti width={windowDimensions.width} height={windowDimensions.height}/> : <AntiConfetti/>}
            <h3>Your score: {props.score} / {props.length}</h3>
            <button className="outcome--reset-btn" onClick={props.onClick}>Play again</button>
        </>
    )
}

export default Outcome