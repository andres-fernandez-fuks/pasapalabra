import Button from '@mui/material/Button';
import '../style.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function ButtonsDiv(props) {
    return (
        <div className="button-div">
            <div>
                <Button
                    variant="contained"
                    color="success"
                    onClick={props.startFunction}
                >
                    Iniciar juego &nbsp;
                    <PlayCircleOutlineIcon />
                </Button>
            </div>
            <div style={{paddingTop: "30px"}}>
                <Button variant="contained" color="primary" onClick={props.resumeFunction}>
                    Reanudar &nbsp;
                    <PlayCircleOutlineIcon />
                </Button>
            </div>
            <div style={{paddingTop: "30px"}}>
                <Button variant="contained" color="secondary">
                    Pasapalabra &nbsp;
                    <PlayCircleOutlineIcon />
                </Button>
            </div>
            <div style={{paddingTop: "30px"}}>
                <Button variant="contained" color="warning" onClick={props.testFunction}> 
                    Test &nbsp;
                    <PlayCircleOutlineIcon />
                </Button>
            </div>
            <div style={{paddingTop: "30px"}}>
                <Button variant="contained" color="info" onClick={props.restartFunction}> 
                    Resetear &nbsp;
                    <PlayCircleOutlineIcon />
                </Button>
            </div>
        </div>
    )
}