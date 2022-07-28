import cakeGif from '../assets/cake.gif';
import familyMessage from '../assets/family-msg.gif';
import './congratulationsPage.css';
import message1 from '../assets/message-1.gif';
import message2 from '../assets/message-2.gif';
import heart from '../assets/heart.gif';
import { playBeatlesSong } from '../components/game/audioPlayer';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../utils/routes';

const MAX_TIME = 210;

export default function CongratulationsPage() {
    const [counter, setCounter] = React.useState(null);

    let navigate = useNavigate();
    React.useEffect(() => {
        playBeatlesSong();
        setCounter(MAX_TIME);
    }, []);

    React.useEffect(() => {
        if (counter === null) return;

        if (counter === 0) {
            navigate(routes.introductionPage);
        }
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <>
            <div className="congratulations-main-div">
                {/* <img className="photo-1-img" src={photo1} alt="Nosotros" /> */}
                <img className="cake-img" src={cakeGif} alt="Torta" />
                <img className="family-msg" src={familyMessage} alt="Mensaje" />
                <img className="message-1" src={message1} alt="Mensaje" />
                <img className="message-2" src={message2} alt="Mensaje" />
                <img className="heart-img-1" src={heart} alt="Corazón" />
                <img className="heart-img-2" src={heart} alt="Corazón" />
            </div>

        </>
    )
}