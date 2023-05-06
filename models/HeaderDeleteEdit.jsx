import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const HeaderDeleteEdit = ({title, onDelete, onEdit}) => {
	return (
		<Stack direction='row' spacing={2}>
			<Typography variant='h6' color='primary'>
				{`${title}`}
			</Typography>
			<Button
				variant='outlined'
				endIcon={<DeleteIcon />}
				onClick={onDelete}>
				Borrar
			</Button>
			<Button
				variant='contained'
				endIcon={<ModeEditIcon />}
				onClick={onEdit}>
				Editar
			</Button>
		</Stack>
	);
};

export default HeaderDeleteEdit;
