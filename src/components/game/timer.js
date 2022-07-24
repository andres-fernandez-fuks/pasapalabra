import React from 'react';

const TIMER_MAX = 200;

export default function Timer(props) {
    const [gameTimer, setGameTimer] = React.useState(null);

    React.useEffect(() => {
        if (gameTimer === null) return;
        
        if (gameTimer === 0) props.setGameOver(true);
        else setTimeout(() => setGameTimer(gameTimer -1), 1000);
    }, [gameTimer]);

    React.useEffect(() => {
        if (props.startTimer)
            setGameTimer(TIMER_MAX);
    }, [props.startTimer]);

    return (
        <> {gameTimer} </>
    )
    
}