import React from "react";
import NextLink from "next/link";
import Head from "next/head";
import { politicasData } from "data/politicasData";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const politicas = ({politicasData}) => {
	// console.log("politicasData", politicasData);
	return (
		<React.Fragment>
			<Head>
				<title>{`Transotas.org, politicas de privacidad de Transotas.org`}</title>
				<meta name='robots' content='index, follow' />
				<link
					rel='canonical'
					href={`${process.env.NEXT_PUBLIC_URL}/politicas`}
				/>
				<meta name='description' content={`Politicas de privacidad de Transotas.org`} />
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

					<Typography color='text'>{`Política de privacidad`}</Typography>
				</Breadcrumbs>
				<br />
				<Typography color='primary' variant='h1' style={{ textAlign: "left" }}>
					<strong>POLÍTICA DE PRIVACIDAD</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{politicasData.POLÍTICA_DE_PRIVACIDAD.replaceAll("\n", "\n\n")}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>Información que es recogida</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{politicasData.Información_que_es_recogida.replaceAll("\n", "\n\n")}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>Uso de la información recogida</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{politicasData.Uso_de_la_información_recogida.replaceAll(
						"\n",
						"\n\n"
					)}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>Cookies</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{politicasData.Cookies.replaceAll("\n", "\n\n")}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>Enlaces a Terceros</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{politicasData.Enlaces_a_Terceros.replaceAll("\n", "\n\n")}
				</Typography>
				<br />
				<Typography color='primary' variant='h6' style={{ textAlign: "left" }}>
					<strong>Control de su información personal</strong>
				</Typography>
				<Typography
					color='text'
					variant='body1'
					style={{ textAlign: "left", whiteSpace: "pre-line" }}>
					{politicasData.Control_de_su_información_personal.replaceAll(
						"\n",
						"\n\n"
					)}
				</Typography>
			</Stack>
		</React.Fragment>
	);
};

export default politicas;

export async function getStaticProps(context) {
	return { props: { politicasData: politicasData } };
}
