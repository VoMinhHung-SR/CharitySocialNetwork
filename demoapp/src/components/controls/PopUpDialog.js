import React from 'react';
import {
    Dialog, DialogTitle, DialogActions, DialogContent,
    Button, Typography
} from "@mui/material"




export default function PopupDialog(props) {

    const { title, children, openPopup, setOpenPopup } = props;

    const handleClose = () => {
        setOpenPopup(false);
    };
    return (
        <>
            <Dialog open={openPopup} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                <div  style={{"textAlign":"center"}}>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </div>
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">Cancel</Button>
                    <Button onClick={handleClose} color="success">submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )

} 