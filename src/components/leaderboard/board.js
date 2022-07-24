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
        debugger;
        setData(data);
    }).catch(err => {
        console.log(err);
    });
  }, [])
    
  console.log("Data: ", data);
  return (
    <div>
        <Profiles Leaderboard={data}></Profiles>
    </div>
  )
}

