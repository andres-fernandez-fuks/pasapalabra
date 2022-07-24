import { IconButton } from '@mui/material';
import './style.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

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