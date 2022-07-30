import React from "react";
import track_a from "../../assets/audio/pregunta-A.ogg";
import track_b from "../../assets/audio/pregunta-B.ogg";
import track_c from "../../assets/audio/pregunta-C.ogg";
import track_d from "../../assets/audio/pregunta-D.ogg";
import track_e from "../../assets/audio/pregunta-E.ogg";
import track_f from "../../assets/audio/pregunta-F.ogg";
import track_g from "../../assets/audio/pregunta-G.mp3";
import track_h from "../../assets/audio/pregunta-H.ogg";
import track_i from "../../assets/audio/pregunta-I.ogg";
import track_j from "../../assets/audio/pregunta-J.mp3";
import track_l from "../../assets/audio/pregunta-L.mp3";
import track_l_alt from "../../assets/audio/pregunta-L-2.mp3";
import track_m from "../../assets/audio/pregunta-M.ogg";
import track_n from "../../assets/audio/pregunta-N.oga";
import track_ni from "../../assets/audio/pregunta-Ñ.mp3";
import track_o from "../../assets/audio/pregunta-O.ogg";
import track_p from "../../assets/audio/pregunta-P.ogg";
import track_q from "../../assets/audio/pregunta-Q.ogg";
import track_r from "../../assets/audio/pregunta-R.ogg";
import track_s from "../../assets/audio/pregunta-S.ogg";
import track_t from "../../assets/audio/pregunta-T.ogg";
import track_u from "../../assets/audio/pregunta-U.ogg";
import track_v from "../../assets/audio/pregunta-V.ogg";
import track_x from "../../assets/audio/pregunta-X.mp3";
import track_y from "../../assets/audio/pregunta-Y.mp4";
import track_z from "../../assets/audio/pregunta-Z.ogg";
import happyBirthdayAudio from "../../assets/audio/happy-birthday.mp3";
import beatlesSong from "../../assets/audio/beatles-song.mp3";

const determineTrack = (letter, questionNumber) => {
    switch (letter) {
        case "A":
            return track_a;
        case "B":
            return track_b;
        case "C":
            return track_c;
        case "D":
            return track_d;
        case "E":
            return track_e;
        case "F":
            return track_f;
        case "G":
            return track_g;
        case "H":
            return track_h;
        case "I":
            return track_i;
        case "J":
            return track_j;
        case "L":
            if (questionNumber === 0)
                return track_l;
            return track_l_alt;
        case "M":
            return track_m;
        case "N":
            return track_n;
        case "Ñ":
            return track_ni;
        case "O":
            return track_o;
        case "P":
            return track_p;
        case "Q":
            return track_q;
        case "R":
            return track_r;
        case "S":
            return track_s;
        case "T":
            return track_t;
        case "U":
            return track_u;
        case "V":
            return track_v;
        case "X":
            return track_x;
        case "Y":
            return track_y;
        case "Z":
            return track_z;
        default:
            return "";
    }
}

export default function AudioPlayer(letter, questionNumber) {
  var track = determineTrack(letter, questionNumber);
  const audio = new Audio(track);
  audio.loop = false;
  return audio;
};

export function SongPlayer(props) {
    const audio = React.useMemo(() => new Audio(happyBirthdayAudio), []);
    audio.loop = true;

    React.useEffect(() => {
        if (props.audioEnabled) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [props.audioEnabled]);
  };

  export function playBeatlesSong() {
    let audio = new Audio(beatlesSong);
    audio.loop = false;
    audio.play();
  };