import React from "react";
import NextLink from "next/link";
import Head from "next/head";
import { serviciosData } from "data/serviciosData";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const politicas = ({ serviciosData }) => {
	// console.log("serviciosData", serviciosData);
	return (
		<React.Fragment>
			<Head>
				<title>{`Transotas.org, condiciones de servicio de Transotas.org`}</title>
				<meta name='robots' content='index, follow' />
				<link
					rel='canonical'
					href={`${process.env.NEXT_PUBLIC_URL}/politicas`}
				/>
				<meta name='description' content={`Condiciones de servicio  de Transotas.org`} />
			</Head>
			<Stack
				direction='column'
				spacing={8}
				justifyContent='flex-end'
				sx={{ pt: { xs: 25, md: 50 }, px: { xs: 25, md: 50 } }}>
				<Breadcrumbs
					separator={<NavigateNextIcon fontSize='small' color='primary' />}
					aria-label='Link al Inicio'>
					<NextLink href={`/`} shallow={true}>
						<Typography
							sx={{
								"&:hover": {
									textDecoration: "underline",
								},
							}}
							color='primary.main'>
							{`Inicio`}
						</Typography>
					</NextLink>
					<Typography color='text'>{`Términos y condiciones`}</Typography>
				</Breadcrumbs>
				<br />
				<Typography color='primary' variant='h1' style={{ textAlign: "left" }}>
					<strong>Términos y condiciones</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{serviciosData.Términos_y_condiciones.replaceAll("\n", "\n\n")}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>Cookies</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{serviciosData.Cookies.replaceAll("\n", "\n\n")}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>Licencia</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{serviciosData.Licencia.replaceAll("\n", "\n\n")}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>No debes</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{serviciosData.No_debes.replaceAll("\n", "\n\n")}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>Garantizas y declaras que</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{serviciosData.Garantizas_y_declaras_que.replaceAll("\n", "\n\n")}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>Responsabilidad del contenido</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{serviciosData.Responsabilidad_del_contenido.replaceAll("\n", "\n\n")}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>Reserva de derechos</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{serviciosData.Reserva_de_derechos.replaceAll("\n", "\n\n")}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>Eliminación de enlaces de nuestro sitio web</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{serviciosData.Eliminación_de_enlaces_de_nuestro_sitio_web.replaceAll(
						"\n",
						"\n\n"
					)}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>Exención de responsabilidad</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{serviciosData.Exención_de_responsabilidad.replaceAll("\n", "\n\n")}
				</Typography>
			</Stack>
		</React.Fragment>
	);
};

export default politicas;

export async function getStaticProps(context) {
	return { props: { serviciosData: serviciosData } };
}
