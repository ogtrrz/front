import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Tarjeta from "components/Tarjeta";

/*
const Pagina = gql`
	query REPORTES_QUERY($paginaInput: String!) {
		show(pagina: $paginaInput)
			@rest(
				type: "Reporte"
				path: "reportes?page={args.pagina}&size=12&sort=id,desc"
			) {
			id @export(as: "showId")
			titulo
			caso
			img
			fechaix
			ciudad
			estado
			pais
			extra10
			informacion {
				id
				comentarios
				vistas
				rating
			}
		}
	}
`;
*/
const Home = ({ data, paginasTotales, paginaActual }) => {
	const router = useRouter();

	const [page, setPage] = useState(parseInt(paginaActual) || 1);

	// const [historia, setHistoria] = useLocalStorageState("transas_historia", {
	// 	defaultValue: [],
	// });

	const handleChangePagination = (event, value) => {
		const pag = value === 0 ? 1 : value;
		console.log("value", pag);
		setPage(pag);
		router.push(
			{
				pathname: `${pag}`,
			},
			`${pag}`,
			{ shallow: false }
		);
	};

	const descripcionMeta = data?.map((item) => `${item.titulo}`).join(", ");

	return (
		<React.Fragment>
			<Head>
				<title>{`Transotas.org, el poder del consumidor, sitio de denuncia.`}</title>
				<meta name='robots' content='index, follow' />
				<link
					rel='canonical'
					href={`${process.env.NEXT_PUBLIC_URL}${router.asPath}`}
				/>
				<meta name='description' content={`Transotas de ${descripcionMeta}`} />
			</Head>

			<Box
				sx={{ display: "flex", pt: { xs: 0, md: 25 }, pl: { xs: 25, md: 50 } }}
				justifyContent='center'
				alignItems='center'>
				<Stack direction='column' spacing={2}>
					<br />
					<Breadcrumbs aria-label='breadcrumb'>
						<Typography color='text'>&nbsp;&nbsp;&nbsp;Inicio</Typography>
					</Breadcrumbs>
					<br />
					<Grid
						container
						align='center'
						alignItems='stretch'
						spacing={{ xs: 2, sm: 3, md: 5 }}
						columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}>
						{data?.map((item) => {
							return (
								<React.Fragment key={item.id}>
									<Grid xs={3} item={true} style={{ display: "flex" }}>
										<Tarjeta item={item} Page={page === 0 ? 1 : page} />
									</Grid>
								</React.Fragment>
							);
						})}
					</Grid>

					{paginasTotales > 12 ? (
						<Box
							display='flex'
							justifyContent='center'
							alignItems='center'
							minHeight='10vh'>
							<Pagination
								count={Math.ceil(paginasTotales / 12)}
								page={page}
								siblingCount={1}
								boundaryCount={1}
								onChange={handleChangePagination}
								variant='outlined'
								color='primary'
							/>
						</Box>
					) : (
						""
					)}
				</Stack>
			</Box>
		</React.Fragment>
	);
};

export default React.memo(Home);

// export async function getStaticProps()
export async function getStaticProps(context) {
	const { params } = context;
	const paginaActual = params.paginaActual;
	const resp = await fetch(
		`${process.env.NEXT_PUBLIC_SPRING}/api/reportes?&page=${paginaActual}&size=12&sort=id,desc`
	);
	const contentType = resp.headers.get("X-Total-Count");
	const data = await resp.json();
	if (!data) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			data: data,
			paginasTotales: contentType,
			paginaActual: paginaActual,
		},

		revalidate: 86400,
		// notFound: true, //regresa el 404
		// redirect: { //redirecciona a la pagina
		// 	destination: '/no-data'
		// }
	};
}

export async function getStaticPaths() {
	let pathsWithParams = [];
	for (let i = 0; i < 77; i++) {
		pathsWithParams.push({ params: { paginaActual: i + "" } });
	}
	return {
		paths: pathsWithParams,
		fallback: "blocking",
	};
}
