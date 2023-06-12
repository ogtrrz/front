import React from "react";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NotFoundPage = () => {
	return (
		<React.Fragment>
			<Box sx={{ p: 165, border: "1px dashed grey" }} />
			<Typography variant='h4' style={{ textAlign: "center" }}>
				<strong>Sin Resultados</strong>
			</Typography>
			<Typography variant='h4' style={{ textAlign: "center" }}>
				<strong>Intentelo nuevamente</strong>
			</Typography>
			<br/>
			<NextLink href={`/`} shallow={true}>
				<Typography
					variant='h4'
          style={{ textAlign: "center" }}
					sx={{
						"&:hover": {
							textDecoration: "underline",
						},
					}}
					color='primary.main'>
					<strong>Ir al Inicio</strong>
				</Typography>
			</NextLink>
			<Box sx={{ p: 165, border: "1px dashed grey" }} />
		</React.Fragment>
	);
};

export default NotFoundPage;
