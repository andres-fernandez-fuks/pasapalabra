import React from 'react';

const TIMER_MAX = 146;

export default function Timer(props) {
    const [gameTimer, setGameTimer] = React.useState(null);

    React.useEffect(() => {
        if (gameTimer === null) return;
        gameTimer > 0 && setTimeout(() => setGameTimer(gameTimer -1), 1000);
    }, [gameTimer]);

    React.useEffect(() => {
        if (props.startTimer)
            setGameTimer(TIMER_MAX);
    }, [props.startTimer]);

    return (
        <> {gameTimer} </>
    )
    
}