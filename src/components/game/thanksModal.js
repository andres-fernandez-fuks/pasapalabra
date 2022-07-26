import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import presentatorImage from '../../assets/presentator.png';
import './style.css';
import { useNavigate } from 'react-router-dom';

const dialogStyles = makeStyles(theme => ({
    root: {
        color: 'black',
    },
    dialogPaper: {
        height : '400px',
        width : '400px',
        justifyContent: "center",
        backgroundColor: "white",
    },
}));

const selectStyles = { 
    menu: styles => ({
        ...styles,
        zIndex: 999,
        overflow: 'visible',
        color: "black",
        backgroundColor: "white",
    })
}

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const classes = dialogStyles();
  let navigate = useNavigate();

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <div >
      <Dialog maxWidth="lg" open={props.open} onClose={handleReturn} classes={{ paper : classes.dialogPaper}}>
        <DialogContent>
          <div className="modal-main-div">
            <div>
              <img className="presentator-img" src={presentatorImage} alt="Presentador" />
            </div>
            <div style={{paddingTop: "5px"}}>
            ¡¡Gracias por jugar!!
            </div>
            <div style={{marginTop:"10px"}}/>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
