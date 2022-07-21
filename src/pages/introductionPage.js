import React from 'react';
import Button from '@mui/material/Button';
import './introductionPage.css';
import { withStyles } from "@material-ui/core/styles";
import { IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import routes from '../utils/routes';
import { useNavigate  } from "react-router-dom";

import cakeGif from '../assets/cake.gif';
import messageGif from '../assets/message.gif';
import balloonsGif from '../assets/balloons.gif';
import titleGif from '../assets/title.gif';
import title2Gif from '../assets/title-2.gif';
import { playHappyBirthdaySong } from '../components/game/audioPlayer';
import confettiGif from '../assets/confetti.gif';

const PINK_BACKGOUND = "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)";
const BLUE_BACKGROUND = "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)";
const GREEN_BACKGROUND = "linear-gradient(45deg, #4CAF50 30%, #C8E6C9 90%)";

const CustomButton = withStyles({
    root: {
      background: props => props.background,
      borderRadius: 0,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      width: "200px",
    },
    label: {
      textTransform: "lowercase",
    }
  })(props => <Button {...props} />);

export default function IntroductionPage(props) {
    const [audioEnabled, setAudioEnabled] = React.useState(false);

    let navigate = useNavigate();

    React.useEffect(() => {
        if (audioEnabled) {
            playHappyBirthdaySong();
        }
    }, [audioEnabled]);

    const handleClick = () => {
        setAudioEnabled(!audioEnabled);
    }

    const audioButtonDiv = () => {
        return (
            <div>
                <IconButton
                    onClick={handleClick}
                    size="large"
                >
                    {audioEnabled ?
                        <VolumeUpIcon className='audio-button'  sx={{ fontSize: "50px"}}/> :
                        <VolumeOffIcon className='audio-button'  sx={{ fontSize: "50px"}}/>}
                </IconButton>
            </div>
        )
    }

    return (
        <div className="main-div" id='main'>
            {/* <div className="cake-div">
                <img className="cake-img" src={cakeGif} alt="Torta" />
            </div>
            <div className="message-div">
                <img src={messageGif} alt="Mensaje" />
            </div> */}
            <div className="audio-button-div">
                {audioButtonDiv()}
            </div>
            <div className="balloons-div-1">
                <img className="balloon-img" src={balloonsGif} alt="Globos" />
            </div>
            <div className="balloons-div-2">
                <img className="balloon-img" src={balloonsGif} alt="Globos" />
            </div>
            <div className="title-1-div">
                <img className="title-1-img" src={titleGif} alt="Título" />
            </div>
            <div className="title-2-div">
                <img className="title-2-img" src={title2Gif} alt="Título" />
            </div>
            <div className="buttons-div">
                <CustomButton
                    style={{ margin: "15px", color: "black", fontWeight: "bold", fontSize:"24px", fontFamily: "Papyrus", width: "300px", textTransform: "none"}}
                    background={PINK_BACKGOUND}
                    variant="contained"
                    color="success"
                    onClick={e => navigate(routes.gamePage)}
                >
                    Iniciar juego &nbsp;
                </CustomButton>
                <CustomButton
                    style={{ margin: "15px", color: "black", fontWeight: "bold", fontSize:"24px", fontFamily: "Papyrus", width: "300px", textTransform: "none"}}
                    background={BLUE_BACKGROUND}
                    variant="contained"
                    color="info"
                    onClick={props.startFunction}
                >
                    Instrucciones &nbsp;
                </CustomButton>
                <CustomButton
                    style={{ margin: "15px", color: "black", fontWeight: "bold", fontSize:"24px", fontFamily: "Papyrus", width: "300px", textTransform: "none"}}
                    background={GREEN_BACKGROUND}
                    variant="contained"
                    color="warning"
                    onClick={props.startFunction}
                >
                    Puntajes &nbsp;
                </CustomButton>
            </div>
            <div className="confetti-div">
                <img className="confetti-img" src={confettiGif} alt="Título" />
            </div>
            <div className="confetti-div-2">
                <img className="confetti-img" src={confettiGif} alt="Título" />
            </div>
        </div>
    )
}