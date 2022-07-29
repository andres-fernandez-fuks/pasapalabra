import React from 'react';
import Papa from 'papaparse';
import { dbGet, dbPut } from '../../utils/dbFetcher';

async function getData() {
    let data = await dbGet('scores');
    const utf8 = require('utf8');
    const new_data = data.map(playerInfo => {
        let name;
        try {
            name = utf8.decode(playerInfo[0]);
        } catch (e) {
            name = playerInfo[0];
        }
        return {
            name: name,
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
        "log": answerLog
    }
    await dbPut('scores', data);
}

export default getData;
