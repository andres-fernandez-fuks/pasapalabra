import React from 'react'
import './style.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Profiles({ Leaderboard }) {
  let navigate = useNavigate();
  return (
    <div className="leaderboard-main-div">
        <h1 className='leaderboard'>Ranking</h1>
        <table className="scoreboard-table ">
            <tr>
                <th className='th'>Nombre</th>
                <th className='th'>Correctas</th>
                <th className='th'>Incorrectas</th>
            </tr>
            {Item(Leaderboard)}
        </table>
        <Button
            style={{marginTop: "25px"}}
            variant="contained"
            size="large"
            color="warning"
            onClick={() => {navigate("/");}}>
            Volver
        </Button>
    </div>
  )
}

function Item(data){
    return (
        <>
            {
                data.map((value, index) => (
                    <tr>
                        <td className='td'>{value.name}</td>                
                        <td className='td' style={{color:"green"}}> + {value.correctAnswers}</td>
                        <td className='td' style={{marginLeft:"100px", color:"red"}}> - {value.incorrectAnswers}</td>
                    </tr>
                    )
                )
            }
        </>

        
    )
}
