import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSVReader from 'react-csv-reader'
import Board from '../components/leaderboard/board'

class App extends Component {

  render() {
    return (
      <CSVReader onFileLoaded={(data, fileInfo, originalFile) => console.dir(data, fileInfo, originalFile)} />
    )
  }
}

export default function leaderBoard() {
  return (
    <div className="App" id='main'>
        <Board></Board>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))