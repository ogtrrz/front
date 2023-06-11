import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const E500 = () => {
	return (
		<React.Fragment>
			<Box sx={{ p: 165, border: "1px dashed grey" }} />
			<Typography variant='h4' style={{ textAlign: "center" }}>
				<strong>Error: 500</strong>
			</Typography>
			<Typography variant='h4' style={{ textAlign: "center" }}>
				<strong>Transotas.org esta fuera de servicio temporalmente</strong>
			</Typography>
			<Typography variant='h4' style={{ textAlign: "center" }}>
				<strong>Estamos trabajando duro para restablecerlo</strong>
			</Typography>
			
			<Box sx={{ p: 165, border: "1px dashed grey" }} />
		</React.Fragment>
	);
};

export default E500;
