import React from 'react';
import Papa from 'papaparse';
import { dbGet, dbPost } from '../../utils/dbFetcher';

async function getData() {
    let data = await dbGet('scores');
    debugger;
    const new_data = data.map(playerInfo => {
        return {
            name: playerInfo[0],
            correctAnswers: playerInfo[1],
            incorrectAnswers: playerInfo[2],
            remainingTime: playerInfo[3]
        }
    })
    return new_data;
}

export async function addNewScore(score, answerLog) {
    let data = {
        "result": score ? [score.name, score.correct.toString(), score.incorrect.toString(), score.remaining.toString()] : null,
        "log": [score.name, answerLog]
    }
    await dbPost('scores', data);
}

export default getData;
