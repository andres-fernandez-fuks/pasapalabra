
import cakeGif from '../assets/cake.gif';
import messageGif from '../assets/message.gif';
import './congratulationsPage.css';
import starsImg from '../assets/stars.jpg';

export default function CongratulationsPage() {
    return (
        <div className="congratulations-main-div">
                <img className="cake-img" src={cakeGif} alt="Torta" />
                <img src={messageGif} alt="Mensaje" />
        </div>
    )
}