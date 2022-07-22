import React from 'react'
import './style.css'

export default function profiles({ Leaderboard }) {
    debugger;
  return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
  )
}


function Item(data){
    return (
        <>
            {
                data.map((value, index) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            <img className="avatar-img" src={value.imgPath} alt="" />
                            <div className="info">
                                <h3 className='name text-dark'>{value.name}</h3>    
                                <span>{value.location}</span>
                            </div>                
                        </div>
                        <div className="item">
                            <span style={{color:"green"}}> + {value.correctAnswers}</span>
                        </div>
                        <div className="item">
                            <span style={{marginLeft:"100px", color:"red"}}> - {value.incorrectAnswers}</span>
                        </div>
                    </div>
                    )
                )
            }
        </>

        
    )
}
