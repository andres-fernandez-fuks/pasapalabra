import './gamePage.css';
import React, { useState } from 'react';
import CircleLetter from '../components/game/circleLetter';
import ButtonsDiv from '../components/game/buttonsDiv';
import Dictaphone from '../components/game/dictaphone';
import AudioPlayer from '../components/game/audioPlayer';
import ScoreDiv from '../components/game/scoreDiv';
import { dialogClasses } from '@mui/material';
import Timer from '../components/game/timer';
import NameModal from '../components/game/nameModal';
import { addNewScore } from '../components/leaderboard/dataReader';
import routes from '../utils/routes';
import { useNavigate } from 'react-router-dom';

const POSSIBLE_STATUSES = ['pending', 'success', 'failure', 'skipped'];

const DEFAULT_INFO = {
    'A': {status: 'pending', nextLetter: 'B', correct_answer: 'ampolla'},
    'B': {status: 'pending', nextLetter: 'C', correct_answer: 'batallar'},
    'C': {status: 'pending', nextLetter: 'D', correct_answer: 'contrabando'},
    'D': {status: 'pending', nextLetter: 'E', correct_answer: 'desproporcionado'},
    'E': {status: 'pending', nextLetter: 'F', correct_answer: 'egeo'},
    'F': {status: 'pending', nextLetter: 'G', correct_answer: 'férula'},
    'G': {status: 'pending', nextLetter: 'H', correct_answer: 'graduación'},
    'H': {status: 'pending', nextLetter: 'I', correct_answer: 'harakiri'},
    'I': {status: 'pending', nextLetter: 'J', correct_answer: 'insurrección'},
    'J': {status: 'pending', nextLetter: 'L', correct_answer: 'justa'},
    'L': {status: 'pending', nextLetter: 'M', correct_answer: 'litoral'},
    'M': {status: 'pending', nextLetter: 'N', correct_answer: 'mártir'},
    'N': {status: 'pending', nextLetter: 'Ñ', correct_answer: 'nómade'},
    'Ñ': {status: 'pending', nextLetter: 'O', correct_answer: 'antaño'},
    'O': {status: 'pending', nextLetter: 'P', correct_answer: 'odisea'},
    'P': {status: 'pending', nextLetter: 'Q', correct_answer: 'pugilista'},
    'Q': {status: 'pending', nextLetter: 'R', correct_answer: 'anaraquía'},
    'R': {status: 'pending', nextLetter: 'S', correct_answer: 'repiqueteo'},
    'S': {status: 'pending', nextLetter: 'T', correct_answer: 'subcutáneo'},
    'T': {status: 'pending', nextLetter: 'U', correct_answer: 'trampolín'},
    'U': {status: 'pending', nextLetter: 'V', correct_answer: 'arturo'},
    'V': {status: 'pending', nextLetter: 'X', correct_answer: 'volear'},
    'X': {status: 'pending', nextLetter: 'Y', correct_answer: 'próximo'},
    'Y': {status: 'pending', nextLetter: 'Z', correct_answer: 'peyorativo'},
    'Z': {status: 'pending', nextLetter: 'A', correct_answer: 'zarpas'},
}


export default function App() {
  const [statuses, setStatuses] = useState(DEFAULT_INFO);
  const [dictaphoneActive, setDictaphoneActive] = useState(false);
  const [activeLetter, setActiveLetter] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [resetTranscript, setResetTranscript] = useState(false);
  const [dictaphoneListening, setDictaphoneListening] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = React.useState(
    {
      correct: 0,
      incorrect: 0,
      skipped: 0,
    }
  );

  React.useEffect(() => {
    setOpenModal(true);
  }, []);

  React.useEffect( () => {
      if (activeLetter && !dictaphoneActive)
        playNextQuestion();
  }, [activeLetter, dictaphoneActive]);

  React.useEffect( () => {
    if (gameOver) {
      handleGameOver();
    }
  }, [gameOver]);

  React.useEffect(() => {
    if (!isPlaying) return;
    if (answer === null) return; // if answer is null, we don't have any audio to play
    var is_correct_answer = answer.toLowerCase() === statuses[activeLetter].correct_answer;
    if (is_correct_answer) {
        setStatuses({...statuses, [activeLetter]: {...statuses[activeLetter], status: 'success'}});
        setGameStatus({...gameStatus, correct: gameStatus.correct + 1});
    } else if (answer.includes('pasapalabra') || answer.includes('pasa palabra')) {
        setStatuses({...statuses, [activeLetter]: {...statuses[activeLetter], status: 'skipped'}});
        setGameStatus({...gameStatus, skipped: gameStatus.skipped + 1});
    } else {
        setStatuses({...statuses, [activeLetter]: {...statuses[activeLetter], status: 'failure'}});
        setGameStatus({...gameStatus, incorrect: gameStatus.incorrect + 1});
    }
    setAnswer(null);
    setDictaphoneActive(false);
    setResetTranscript(true);
    setActiveLetter(statuses[activeLetter].nextLetter);  // triggers playNextQuestion
  }, [answer]);

  let navigate = useNavigate();

  const dictaphoneUpdateFunction = (finalTranscript) => {
    setAnswer(finalTranscript);
  }

  const dictaphoneListeningFunction = (isListening) => {
    setDictaphoneListening(isListening);
  }

  const playNextQuestion = () => {
    var audio = AudioPlayer(activeLetter);
    audio.play();
    audio.onended = () => {
      setDictaphoneActive(true);
    }
  }

  const startFunction = () => {
    setIsPlaying(true);
    setActiveLetter('A'); // triggers playNextQuestion
  }

  const nameSelectionFunction = (name) => {
    setPlayerName(name);
    setOpenModal(false);
  }


  const renderCentralDiv = () => {
    if (!isPlaying) {
      return (
        <div className="button-div">
          <ButtonsDiv startFunction={startFunction} />
        </div>
      )
    } else {
      return (
        <div className="timer-div">
          <Timer startTimer={isPlaying} setGameOver={setGameOver} />
        </div>
      )
    }
  }

  const handleGameOver = () => {
    setIsPlaying(false);
    let score = {
      name: playerName,
      correct: gameStatus.correct,
      incorrect: gameStatus.incorrect,
    }
    addNewScore(score).then (() => {
      navigate(routes.introductionPage)
    }).catch((error) => {
      console.log(error);
    });
  }
    
 
  return (
    <div className="game-main-div">
      <div>
        <div className='circle-container'>
          <div className='deg0'> <CircleLetter letter="G" status ={statuses["G"].status}/> </div>
          <div className='deg14'> <CircleLetter letter="H" status ={statuses["H"].status}/> </div>
          <div className='deg28'> <CircleLetter letter="I" status ={statuses["I"].status}/> </div>
          <div className='deg42'> <CircleLetter letter="J" status ={statuses["J"].status}/> </div>
          <div className='deg56'> <CircleLetter letter="L" status ={statuses["L"].status}/> </div>
          <div className='deg70'> <CircleLetter letter="M" status ={statuses["M"].status}/> </div>
          <div className='deg84'> <CircleLetter letter="N" status ={statuses["N"].status}/> </div>
          <div className='deg98'> <CircleLetter letter="Ñ" status ={statuses["Ñ"].status}/> </div>
          <div className='deg112'> <CircleLetter letter="O" status ={statuses["O"].status}/> </div>
          <div className='deg126'> <CircleLetter letter="P" status ={statuses["P"].status}/> </div>
          <div className='deg140'> <CircleLetter letter="Q" status ={statuses["Q"].status}/> </div>
          <div className='deg154'> <CircleLetter letter="R" status ={statuses["R"].status}/> </div>
          <div className='deg168'> <CircleLetter letter="S" status ={statuses["S"].status}/> </div>
          <div className='deg182'> <CircleLetter letter="T" status ={statuses["T"].status}/> </div>
          <div className='deg196'> <CircleLetter letter="U" status ={statuses["U"].status}/> </div>
          <div className='deg210'> <CircleLetter letter="V" status ={statuses["V"].status}/> </div>
          <div className='deg224'> <CircleLetter letter="X" status ={statuses["X"].status}/> </div>
          <div className='deg238'> <CircleLetter letter="Y" status ={statuses["Y"].status}/> </div>
          <div className='deg252'> <CircleLetter letter="Z" status ={statuses["Z"].status}/> </div>
          <div className='deg266'> <CircleLetter letter="A" status ={statuses["A"].status}/> </div>
          <div className='deg280'> <CircleLetter letter="B" status ={statuses["B"].status}/> </div>
          <div className='deg294'> <CircleLetter letter="C" status ={statuses["C"].status}/> </div>
          <div className='deg308'> <CircleLetter letter="D" status ={statuses["D"].status}/> </div>
          <div className='deg322'> <CircleLetter letter="E" status ={statuses["E"].status}/> </div>
          <div className='deg336'> <CircleLetter letter="F" status ={statuses["F"].status}/> </div>
        </div>
      </div>
      <Dictaphone
        dictaphoneActive={dictaphoneActive}
        answer={answer}
        updateFunction={dictaphoneUpdateFunction}
        listeningFunction={dictaphoneListeningFunction}
        resetTranscript={resetTranscript}
      />
      <ScoreDiv
        playerName={playerName}
        correct={gameStatus.correct}
        incorrect={gameStatus.incorrect}
        skipped={gameStatus.skipped}
      />
      {renderCentralDiv()}
      <NameModal open={openModal} selectionFunction={nameSelectionFunction}/>
    </div>
  );
}

