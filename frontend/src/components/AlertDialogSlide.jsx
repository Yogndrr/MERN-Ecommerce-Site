import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { GreenButton, RedButton } from "../utils/buttonStyles";

const AlertDialogSlide = ({ dialog, showDialog, setShowDialog, taskHandler }) => {
    const handleClose = () => {
        setShowDialog(false);
    };
    return (
        <Dialog
            open={showDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{dialog}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    You won't be able to recover it back.
                    Decide Now
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <GreenButton onClick={handleClose}>No</GreenButton>
                </div>
                <div>
                    <RedButton onClick={() => {
                        handleClose()
                        taskHandler()
                    }}>Yes</RedButton>
                </div>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialogSlide;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});