import React, { useState } from 'react'
import Profiles from './profiles';
import './style.css';
import getData from './dataReader'

export default function Board() {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    getData().then(data => {
        setData(data);
    }).catch(err => {
        console.log(err);
    });
  }, [])
    
  console.log("Data: ", data);
  return (
        <Profiles Leaderboard={data}></Profiles>
  )
}

