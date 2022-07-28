import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import './style.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PanToolIcon from '@mui/icons-material/PanTool';
import MicIcon from '@mui/icons-material/Mic';

export default function ButtonsDiv(props) {

    return (
        <div >
            <div className="intro-button-div">
                <IconButton
                    variant="contained"
                    onClick={props.startFunction}
                >
                    <PlayCircleOutlineIcon sx={{ fontSize: "250px" }}/>
                </IconButton>
            </div>
        </div>
    )
}

export function StopButtonDiv(props) {
    debugger;
    return (
        <div >
            <Button
                style={{background: "red", display: props.hidden ? 'none' : undefined }}
                variant="contained"
                color="warning"
                size="large"
                onClick={props.stopFunction}
                hidden={props.hidden}
            >
                <PanToolIcon style={{marginRight:"10px"}}/>
                Finalizar juego
            </Button>
        </div>
    )
}