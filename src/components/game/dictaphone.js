import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = (props) => {

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();

  const [counter, setCounter] = React.useState(null);

  React.useEffect(() => {
    if (counter === null) {
      console.log("ahora el counter es null")
      return;
    }
    console.log("counter: " + counter);

    if (!props.dictaphoneActive) return;

    if (counter === 5) {
      props.updateFunction("pasapalabra");
      setCounter(null);
      return;
    }
    setTimeout(() => setCounter(counter + 1), 1000);
  }, [counter]);

  React.useEffect(() => {
    if (props.resetTranscript) {
        console.log("reseteando transcript");
        resetTranscript();
      }
  }, [props.resetTranscript]);

  React.useEffect(() => {
    if (props.dictaphoneActive && finalTranscript) {
      props.updateFunction(finalTranscript);
      console.log("enviando transcript")
      setCounter(null);
      resetTranscript();
    }
  }, [finalTranscript]);

  React.useEffect(() => {
    if (props.dictaphoneActive) {
      console.log("activando microfono...");
        SpeechRecognition.startListening({language: 'es-AR'});
        setCounter(0);
    }
    else {
        console.log("desactivando microfono...");
        console.log("el counter es: " + counter);
        SpeechRecognition.abortListening();
    }
  }, [props.dictaphoneActive]);

  return null;

};
export default Dictaphone;