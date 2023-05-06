import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const DialogDelete = ({onOpen, on_Close, onCancel, onOk}) => {
	return (
		<Dialog
			open={onOpen}
			onClose={on_Close}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'>
			<DialogTitle id='alert-dialog-title' color='primary'>
				Borrar
			</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					Esta seguro que quiere borrar los datos, no podrán ser recuperados.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' onClick={onCancel} endIcon={<CancelIcon />}>
					Cancelar
				</Button>
				<Button
					variant='contained'
					onClick={onOk}
					autoFocus
					endIcon={<CheckCircleIcon />}>
					Aceptar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DialogDelete;
