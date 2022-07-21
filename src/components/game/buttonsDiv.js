import { IconButton } from '@mui/material';
import './style.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function ButtonsDiv(props) {

    const styles = {
        button: {
            width: 64, height: 64,
            padding: 0
        },
        icon: {
            width: 250, height: 250,
            fontSize:40,
            color:'#fffff'
        },
        tooltip: {
            marginLeft:7
        }
    };

    return (
        <div className="button-div">
            <div>
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