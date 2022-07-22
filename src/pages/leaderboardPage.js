import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSVReader from 'react-csv-reader'
import Board from '../components/leaderboard/board'

export default function leaderBoard() {
  return (
    <div className="App" id='main'>
        <Board></Board>
    </div>
  );
}