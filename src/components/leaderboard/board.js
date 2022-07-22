import React, { useState } from 'react'
import Profiles from './profiles';
import { Leaderboard } from './database';
import './style.css';
import getData from './dataReader'

export default function Board() {

  const [period, setPeriod] = useState(0);

  const handleClick = (e) => {
    setPeriod(e.target.dataset.id)
  }

  const [data, setData] = useState([]);

  React.useEffect(() => {
    getData().then(data => {
        setData(data);
    }).catch(err => {
        console.log(err);
    });
  }, [])
    

  return (
    <div className="board">
        <h1 className='leaderboard'>Ranking</h1>
        <Profiles Leaderboard={between(data)}></Profiles>
    </div>
  )
}



function between(data){
    return data.sort((a, b) => {
        if (a.correctAnswers > b.correctAnswers) {
            return -1;
        } if (a.correctAnswers < b.correctAnswers) {
            return 1;
        }
        if (a.incorrectAnswers > b.incorrectAnswers) {
            return 1;
        } if (a.incorrectAnswers < b.incorrectAnswers) {
            return -1;
        } else {
            return 0;
        }
    }).slice(0, 10);
}
