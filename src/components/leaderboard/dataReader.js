import React from 'react';
import Papa from 'papaparse';


const parseOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
    delimiter: ",",
};


async function getData() {
    const data = Papa.parse(await fetchCsv(), parseOptions);
    const new_data = data.data.map(playerInfo => {
        return {
            name: playerInfo[0],
            correctAnswers: playerInfo[1],
            incorrectAnswers: playerInfo[2],
        }
    })
    return new_data;
}

async function fetchCsv() {
    const response = await fetch('/score.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
}

export default getData;
