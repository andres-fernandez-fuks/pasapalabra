import { useNavigate } from 'react-router-dom';
import routes from '../utils/routes';
import './instructionsPage.css';
import scrollImage from '../assets/scroll.png';
import Button from '@mui/material/Button';
import React from 'react';

export default function InstructionsPage() {
    const [loading, setLoading] = React.useState(true);
    let navigate = useNavigate();

    const handleImageLoaded = () => {
        setLoading(false);
    }

    const renderInstructions = () => {
        return (
            loading ?
            <></> :
            <>
                <h1 className="instructions-title">Instrucciones</h1>
                <div className="instructions-div">
                    <p className="warning">
                        Es necesario tener un micrófono para poder jugar
                    </p>
                    <ol>
                        <li className="instruction">
                            Introducí tu nombre y clickeá en el botón de Play para <br/> iniciar el juego .
                        </li>
                        <li className="instruction">
                            Respondé las preguntas lo más claramente posible (para que <br/>funcione el reconocimiento de voz).
                        </li>
                        <li className="instruction" style={{color:"red"}}>
                            ¡Esperá a que aparezca el ícono del micrófono a la derecha <br/> antes de responder!
                        </li>
                        <li className="instruction">
                            Sumás puntos por cada respuesta correcta. Las respuestas <br/> incorrectas y el tiempo restante son un criterio de desempate.
                        </li>
 
                        <li className="instruction">
                            Si no querés responder, decí "Pasapalabra" o esperá a que <br/> pasen 5 segundos.
                        </li>
                    </ol>
                    <div className="instructions-buttons-div">
                        <Button
                            variant="contained"
                            size="small"
                            color="info"
                            onClick={() => {navigate("/game");}}>
                            Empezar
                        </Button>
                        <Button
                            style={{marginLeft: "10px"}}
                            variant="contained"
                            size="small"
                            color="warning"
                            onClick={() => {navigate("/");}}>
                            Volver
                        </Button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="instructions-main-div">
            <img
                className="scroll-img"
                src={scrollImage}
                alt="Scroll"
                onLoad={handleImageLoaded}
            />
            {renderInstructions()}
        </div>
    );
}