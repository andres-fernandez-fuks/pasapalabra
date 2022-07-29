import './gamePage.css';
import React, { useState } from 'react';
import CircleLetter from '../components/game/circleLetter';
import ButtonsDiv, {StopButtonDiv} from '../components/game/buttonsDiv';
import Dictaphone from '../components/game/dictaphone';
import AudioPlayer from '../components/game/audioPlayer';
import ScoreDiv from '../components/game/scoreDiv';
import { dialogClasses } from '@mui/material';
import Timer from '../components/game/timer';
import NameModal from '../components/game/nameModal';
import { addNewScore } from '../components/leaderboard/dataReader';
import routes from '../utils/routes';
import { useNavigate } from 'react-router-dom';
import ThanksModal from '../components/game/thanksModal';
import MicIcon from '@mui/icons-material/Mic';

const POSSIBLE_STATUSES = ['pending', 'success', 'failure', 'skipped'];
const TOTAL_QUESTIONS = 25;
const QUESTION_NUMBER = Math.floor(Math.random() * 2);

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const DEFAULT_INFO = {
    'A': {status: 'pending', nextLetter: 'B', correct_answers: ['anchorena']},
    'B': {status: 'pending', nextLetter: 'C', correct_answers: ['benchi', 'benjamín', 'enchi', 'benci', 'venchi', 'benji', 'denki', 'bengie']},
    'C': {status: 'pending', nextLetter: 'D', correct_answers: ['chacabuco']},
    'D': {status: 'pending', nextLetter: 'E', correct_answers: ['duda', 'dura']},
    'E': {status: 'pending', nextLetter: 'F', correct_answers: ['encarta']},
    'F': {status: 'pending', nextLetter: 'G', correct_answers: ['familia']},
    'G': {status: 'pending', nextLetter: 'H', correct_answers: ['ginebra', 'gin', 'sin']},
    'H': {status: 'pending', nextLetter: 'I', correct_answers: ['hortigueras', 'hortiguera', 'hortiguero', 'cordillera', 'cordilleras']},
    'I': {status: 'pending', nextLetter: 'J', correct_answers: ['miriam makeva', 'makeva', 'miriam', 'miriam makeba', 'makeba']},
    'J': {status: 'pending', nextLetter: 'L', correct_answers: ['jeroglífico', 'jeroglíficos']},
    'L': {status: 'pending', nextLetter: 'M', correct_answers: ['litoral']},
    'M': {status: 'pending', nextLetter: 'N', correct_answers: ['mitsubishi', 'shuichi', 'mitsu']},
    'N': {status: 'pending', nextLetter: 'Ñ', correct_answers: ['nómade', 'nómada', 'nómades', 'nomás', 'nómadas']},
    'Ñ': {status: 'pending', nextLetter: 'O', correct_answers: ['alimaña', 'alemania']},
    'O': {status: 'pending', nextLetter: 'P', correct_answers: ['ornitorrinco']},
    'P': {status: 'pending', nextLetter: 'Q', correct_answers: ['penélope']},
    'Q': {status: 'pending', nextLetter: 'R', correct_answers: ['quesero', 'quesera']},
    'R': {status: 'pending', nextLetter: 'S', correct_answers: ['rizoma']},
    'S': {status: 'pending', nextLetter: 'T', correct_answers: ['sapiencia']},
    'T': {status: 'pending', nextLetter: 'U', correct_answers: ['trampolín']},
    'U': {status: 'pending', nextLetter: 'V', correct_answers: ['utopía']},
    'V': {status: 'pending', nextLetter: 'X', correct_answers: ['valiant', 'radiante', 'radiant', 'valiente']},
    'X': {status: 'pending', nextLetter: 'Y', correct_answers: ['axioma']},
    'Y': {status: 'pending', nextLetter: 'Z', correct_answers: ['harry']},
    'Z': {status: 'pending', nextLetter: 'A', correct_answers: ['zicovich', 'sicoin', 'zicoin', '5 bits', 'sí coach', 'si coach']},
}

export default function App() {
  const [statuses, setStatuses] = useState(DEFAULT_INFO);
  const [dictaphoneActive, setDictaphoneActive] = useState(false);
  const [activeLetter, setActiveLetter] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [resetTranscript, setResetTranscript] = useState(false);
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
  const [answerLog, setAnswerLog] = useState({});
  const [openThanksModal, setOpenThanksModal] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playNext, setPlayNext] = useState(false);
  const [alreadyPlaying, setAlreadyPlaying] = useState(false);
  const [canRestartRound, setCanRestartRound] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);

  React.useEffect(() => {
    setOpenModal(true);
  }, []);

  React.useEffect(() => {
    let canRestart = true;
    for (let key in statuses) {
      if (statuses[key].status === 'skipped') {
        canRestart = false;
      }
    }
    if (canRestart)
      setCanRestartRound(true);
    else
      setCanRestartRound(false);
  }, [statuses]);


  React.useEffect( () => {
      if (activeLetter && !dictaphoneActive) {
        if (activeLetter === 'A' && alreadyPlaying && !canRestartRound) {
          updateRound();
          return;
        }
        if (statuses[activeLetter].status === 'pending') {
          playNextQuestion();
        } else {
          setActiveLetter(statuses[activeLetter].nextLetter);
        }
      }
  }, [activeLetter, dictaphoneActive, canRestartRound]);

  React.useEffect( () => {
    if (gameOver) {
      handleGameOver();
    }
  }, [gameOver]);

  React.useEffect( () => {
    let totalAnswered = gameStatus.correct + gameStatus.incorrect;
    if (totalAnswered === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
  }, [gameStatus]);

  React.useEffect( () => {
    if (!currentAudio || gameOver) return;
    console.log("Letra actual: ", activeLetter);
    currentAudio.play();
    currentAudio.onended = () => {
      setDictaphoneActive(true);
    }
  }, [currentAudio]);

  React.useEffect(() => {
    if (!isPlaying) return;
    if (answer === null) return; // if answer is null, we don't have any audio to play
    console.log("answer: ", answer);
    var is_correct_answer = statuses[activeLetter].correct_answers.includes(answer.toLowerCase());
    let answer_status;
    if (is_correct_answer) {
        setStatuses({...statuses, [activeLetter]: {...statuses[activeLetter], status: 'success'}});
        setGameStatus({...gameStatus, correct: gameStatus.correct + 1});
        answer_status = 'success';
    } else if (answer.includes('pasapalabra') || answer.includes('pasa palabra')) {
        setStatuses({...statuses, [activeLetter]: {...statuses[activeLetter], status: 'skipped'}});
        setGameStatus({...gameStatus, skipped: gameStatus.skipped + 1});
        answer_status = 'skipped';
    } else {
        setStatuses({...statuses, [activeLetter]: {...statuses[activeLetter], status: 'failure'}});
        setGameStatus({...gameStatus, incorrect: gameStatus.incorrect + 1});
        answer_status = 'failure';
    }
    handleNextStep(answer_status);
  }, [answer]);

  const handleNextStep = (answer_status) => {
    setActiveLetter(statuses[activeLetter].nextLetter);
    setAnswer(null);
    setDictaphoneActive(false);
    setResetTranscript(true);
    var log = `${answer} - ${answer_status}`;
    setAnswerLog({...answerLog, [activeLetter]: log});
    setPlayNext(true);  // triggers playNextQuestion
    if (!alreadyPlaying) setAlreadyPlaying(true);
  }

  let navigate = useNavigate();

  const updateRound = () => {
    let oldStatuses = {...statuses};
    for (var letter in statuses) {
      if (oldStatuses[letter].status === 'skipped') {
        oldStatuses[letter].status = 'pending';
      }
    }
    setStatuses(oldStatuses);
  }

  const dictaphoneUpdateFunction = (finalTranscript) => {
    setAnswer(finalTranscript);
  }

  const playNextQuestion = () => {
    setPlayNext(false);
    var audio = AudioPlayer(activeLetter, QUESTION_NUMBER);
    setCurrentAudio(audio); // triggers audio play and then dictaphone starts
  }

  const startFunction = () => {
    setActiveLetter('A');
    setIsPlaying(true);
    setPlayNext(true);
  }

  const nameSelectionFunction = (name) => {
    setPlayerName(name);
    setAnswerLog({...answerLog, 'playerName': name})
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
          <Timer startTimer={isPlaying} setGameOver={setGameOver} updateFunction={setRemainingTime} />
        </div>
      )
    }
  }

  const isSpecialPlayer = () => {
    return ['Ady', 'Adi', 'Adriana', 'Adyta', 'Adita'].includes(playerName);
  }

  const handleGameOver = () => {
    if (currentAudio) currentAudio.pause();
    setIsPlaying(false);
    let score = {
        name: playerName,
        correct: gameStatus.correct,
        incorrect: gameStatus.incorrect,
        remaining: remainingTime,
    }
    addNewScore(score, answerLog);
    setOpenThanksModal(true);
    delay(2000).then(() => {
      setOpenThanksModal(false);
      if (isSpecialPlayer())
        navigate(routes.congratulationsPage);
      else
        navigate(routes.introductionPage);
    });
  }

  const stopPlaying = () => {
    setGameOver(true);
  }

 
  return (
    <div className="game-main-div">
      <div>
        <div className='circle-container'>
          <div className='deg0'> <CircleLetter currentLetter={activeLetter} letter="G" status ={statuses["G"].status}/> </div>
          <div className='deg14'> <CircleLetter currentLetter={activeLetter} letter="H" status ={statuses["H"].status}/> </div>
          <div className='deg28'> <CircleLetter currentLetter={activeLetter} letter="I" status ={statuses["I"].status}/> </div>
          <div className='deg42'> <CircleLetter currentLetter={activeLetter} letter="J" status ={statuses["J"].status}/> </div>
          <div className='deg56'> <CircleLetter currentLetter={activeLetter} letter="L" status ={statuses["L"].status}/> </div>
          <div className='deg70'> <CircleLetter currentLetter={activeLetter} letter="M" status ={statuses["M"].status}/> </div>
          <div className='deg84'> <CircleLetter currentLetter={activeLetter} letter="N" status ={statuses["N"].status}/> </div>
          <div className='deg98'> <CircleLetter currentLetter={activeLetter} letter="Ñ" status ={statuses["Ñ"].status}/> </div>
          <div className='deg112'> <CircleLetter currentLetter={activeLetter} letter="O" status ={statuses["O"].status}/> </div>
          <div className='deg126'> <CircleLetter currentLetter={activeLetter} letter="P" status ={statuses["P"].status}/> </div>
          <div className='deg140'> <CircleLetter currentLetter={activeLetter} letter="Q" status ={statuses["Q"].status}/> </div>
          <div className='deg154'> <CircleLetter currentLetter={activeLetter} letter="R" status ={statuses["R"].status}/> </div>
          <div className='deg168'> <CircleLetter currentLetter={activeLetter} letter="S" status ={statuses["S"].status}/> </div>
          <div className='deg182'> <CircleLetter currentLetter={activeLetter} letter="T" status ={statuses["T"].status}/> </div>
          <div className='deg196'> <CircleLetter currentLetter={activeLetter} letter="U" status ={statuses["U"].status}/> </div>
          <div className='deg210'> <CircleLetter currentLetter={activeLetter} letter="V" status ={statuses["V"].status}/> </div>
          <div className='deg224'> <CircleLetter currentLetter={activeLetter} letter="X" status ={statuses["X"].status}/> </div>
          <div className='deg238'> <CircleLetter currentLetter={activeLetter} letter="Y" status ={statuses["Y"].status}/> </div>
          <div className='deg252'> <CircleLetter currentLetter={activeLetter} letter="Z" status ={statuses["Z"].status}/> </div>
          <div className='deg266'> <CircleLetter currentLetter={activeLetter} letter="A" status ={statuses["A"].status}/> </div>
          <div className='deg280'> <CircleLetter currentLetter={activeLetter} letter="B" status ={statuses["B"].status}/> </div>
          <div className='deg294'> <CircleLetter currentLetter={activeLetter} letter="C" status ={statuses["C"].status}/> </div>
          <div className='deg308'> <CircleLetter currentLetter={activeLetter} letter="D" status ={statuses["D"].status}/> </div>
          <div className='deg322'> <CircleLetter currentLetter={activeLetter} letter="E" status ={statuses["E"].status}/> </div>
          <div className='deg336'> <CircleLetter currentLetter={activeLetter} letter="F" status ={statuses["F"].status}/> </div>
        </div>
      </div>
      <Dictaphone
        dictaphoneActive={dictaphoneActive}
        answer={answer}
        updateFunction={dictaphoneUpdateFunction}
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
      <div className="stop-button-div">
        <StopButtonDiv stopFunction={stopPlaying} hidden={!isPlaying}  />
      </div>
      <ThanksModal open={gameOver} />
      <div className="mic-icon-div">
        <MicIcon
          hidden={!dictaphoneActive}
          className="mic-icon"
          sx={{ fontSize: "200px", display:dictaphoneActive ? 'block' : 'none' }}/>
      </div>
    </div>
  );
}

