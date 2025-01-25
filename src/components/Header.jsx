import { useState } from 'react';

function Header(props) {
    console.log("Rendering start page");
    const [name, setName] = useState("");

    return (
        <>
            <h1>Trivia Quiz</h1>
            <label>Enter your name: <input type="text" placeholder="Your name" onChange={e => setName(e.target.value)}/></label>
            <p>Are you ready for ultimate quiz? Click start to begin!</p>
            <button className="header--start-btn" onClick={() => props.onClick(name)} disabled={!name.trim()}>Start</button>
        </>
    )
}

export default Header