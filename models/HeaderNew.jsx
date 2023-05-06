import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const HeaderNew = ({title, onNew}) => {
	return (
		<Stack direction='row' spacing={2}>
			<Typography variant='h6' color='primary'>
				{title}
			</Typography>

			<Button
				variant='contained'
				endIcon={<AddCircleIcon />}
				onClick={onNew}>
				Nuevo
			</Button>
		</Stack>
	);
};

export default HeaderNew;
