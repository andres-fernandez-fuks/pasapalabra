import React from 'react'
import './style.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Profiles({ Leaderboard }) {
  let navigate = useNavigate();
  return (
    <div className="leaderboard-main-div">
        <div className="leaderboard-table-div">
            <h1 className='leaderboard'>Ranking</h1>
            <table className="scoreboard-table ">
                <tr>
                    <th className='th'>Nombre</th>
                    <th className='th'>Correctas</th>
                    <th className='th'>Incorrectas</th>
                    <th className='th'>Tiempo restante</th>
                </tr>
                {Item(Leaderboard)}
            </table>
        </div>
        <Button
            className="leaderboard-back-button"
            style={{marginTop: "25px", marginBottom: "25px"}}
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
    if (!data) return <></>;
    return (
        <>
            {
                data.map((value, index) => (
                    <tr>
                        <td className='td'>{value.name}</td>                
                        <td className='td' style={{color:"darkGreen"}}>{value.correctAnswers}</td>
                        <td className='td' style={{marginLeft:"100px", color:"darkRed"}}>{value.incorrectAnswers}</td>
                        <td className='td' style={{marginLeft:"100px", color:"darkBlue"}}>{value.remainingTime}</td>
                    </tr>
                    )
                )
            }
        </>

        
    )
}
