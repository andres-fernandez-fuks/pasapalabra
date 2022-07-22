import React from 'react';
import Papa from 'papaparse';


const parseOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
    delimiter: ",",
};

const getImgPath = (imgNumber) => {
    return require(`/src/assets/avatars/${imgNumber}.png`)
}

async function getData() {
    const data = Papa.parse(await fetchCsv(), parseOptions);
    const new_data = data.data.map(playerInfo => {
        var imgNumber = Math.floor(Math.random() * 10);
        return {
            name: playerInfo[0],
            correctAnswers: playerInfo[1],
            incorrectAnswers: playerInfo[2],
            imgPath: getImgPath(imgNumber),
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
    console.log('csv', csv);
    return csv;
}

export default getData;
