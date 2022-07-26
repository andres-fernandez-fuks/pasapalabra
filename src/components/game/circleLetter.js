import { useEffect } from 'react';
import './style.css';

export default function CircleLetter(props) {

    useEffect(() => {
        determineBackgroundColor();
    } , [props.status]);
    
    const determineBackgroundColor = () => {
        switch (props.status) {
            case 'pending':
                return '#28B3CF';
            case 'success':
                return '#32B634';
            case 'failure':
                return '#ff0000';
            case 'skipped':
                return '#E6E616';
            default:
                return '#f5f5f5';
        }
    }

    const determineBorder = () => {
        if (props.letter === props.currentLetter) {
            return '3px solid #32B634';
        }
        return 'None';
    }

    return (
            <div
                className="circle-letter"
                style={
                    {
                        backgroundColor:determineBackgroundColor(),
                        border: determineBorder()
                    }
                }
            >
                {props.letter}
            </div>
    )
}