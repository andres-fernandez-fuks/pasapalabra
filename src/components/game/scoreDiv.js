import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function ScoreDiv(props) {
    return (
        <>
            <div className="score-main-div">
                <div className='name-div'>
                    Jugador: {props.playerName}
                </div>
                <div className="score-div">
                    <div className="score-div-inner" style={{color:"#16860F"}}>
                        <CheckCircleOutlineIcon />
                        <span style={{marginLeft: "25px"}}>{props.correct}</span>
                    </div>
                    <div className="score-div-inner" style={{color:"#ff0000"}}>
                        <CloseIcon />
                        <span style={{marginLeft: "25px"}}>{props.incorrect}</span>
                    </div>
                    <div className="score-div-inner" style={{color:"#E6E616"}}>
                        <SkipNextIcon />
                        <span style={{marginLeft: "25px"}}>{props.skipped}</span>
                    </div>
                </div>
            </div>
        </>
    )
}