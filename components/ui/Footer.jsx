import React from "react";
import NextLink from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//TODO Recepedia sitio de recetas
const Footer = () => {
	return (
		<React.Fragment>
			<Box sx={{ m: 24 }}></Box>
			<Grid
				container
				sx={{ bgcolor: "primary.main", color: "white" }}
				spacing={{ xs: 3, md: 6 }}
				columns={{ xs: 6, md: 12 }}>
				<Grid xs={5} sx={{ ml: 20, mt: 40, mb: 40 }} item={true}>
					<Typography variant='h3'>
						Transotas.org | Sitio de denuncias contra abusadores.
					</Typography>
					<Typography color={"text"} variant='body2'>
						Ya sean compañías, políticos, servidores público o personas para
						toda América Latina
					</Typography>
				</Grid>
				<Grid xs={5} sx={{ ml: 20, mt: 40, mb: 40 }} item={true}>
					<Typography variant='h3' id='legal'>
						Legal
					</Typography>
					<NextLink href={`/politicas`} shallow={true}>
						<Typography
							color={"text"}
							variant='body2'
							sx={{
								"&:hover": {
									textDecoration: "underline",
								},
							}}>
							Política de privacidad: Este sitio cumple con la Ley de
							denunciantes anónimos. Se recopilan datos con fines estadísticos.
						</Typography>
					</NextLink>
					<NextLink href={`/condiciones`} shallow={true}>
						<Typography
							color={"text"}
							variant='body2'
							sx={{
								"&:hover": {
									textDecoration: "underline",
								},
							}}>
							Condiciones de Servicio: Los creadores de este sitio no son
							responsables de su contenido.
						</Typography>
					</NextLink>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default React.memo(Footer);
