import React from "react";
import track_a from "../assets/audio/pregunta-A.mp3";
import track_b from "../assets/audio/pregunta-B.mp3";
import track_c from "../assets/audio/pregunta-C.mp3";
import track_d from "../assets/audio/pregunta-D.mp3";
import track_e from "../assets/audio/pregunta-E.mp3";
import track_f from "../assets/audio/pregunta-F.mp3";
import track_g from "../assets/audio/pregunta-G.mp3";
import track_h from "../assets/audio/pregunta-H.mp3";
import track_i from "../assets/audio/pregunta-I.mp3";
import track_j from "../assets/audio/pregunta-J.mp3";
import track_l from "../assets/audio/pregunta-L.mp3";
import track_m from "../assets/audio/pregunta-M.mp3";
import track_n from "../assets/audio/pregunta-N.mp3";
import track_ni from "../assets/audio/pregunta-Ñ.mp3";
import track_o from "../assets/audio/pregunta-O.mp3";
import track_p from "../assets/audio/pregunta-P.mp3";
import track_q from "../assets/audio/pregunta-Q.mp3";
import track_r from "../assets/audio/pregunta-R.mp3";
import track_s from "../assets/audio/pregunta-S.mp3";
import track_t from "../assets/audio/pregunta-T.mp3";
import track_u from "../assets/audio/pregunta-U.mp3";
import track_v from "../assets/audio/pregunta-V.mp3";
import track_x from "../assets/audio/pregunta-X.mp3";
import track_y from "../assets/audio/pregunta-Y.mp3";
import track_z from "../assets/audio/pregunta-Z.mp3";

const determineTrack = (letter) => {
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
            return track_l;
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

export default function AudioPlayer(letter) {
  var track = determineTrack(letter);
  const audio = new Audio(track);
  audio.loop = false;
  return audio;
};
