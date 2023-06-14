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
// import useLocalStorageState from "use-local-storage-state";


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
				pathname: `?Pages=${pag}`,
			},
			`?Pages=${pag}`,
			{ shallow: true }
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
				sx={{ display: "flex",  pt: { xs: 0, md: 25 }, pl: {xs: 25, md: 50} }}
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

export default Home;

// export async function getStaticProps()
//TODO checar mis categorias y mis denuncias
//TODO pestes badge trae diferentes datos entre tarjeta y denuncia es 1 menos
// TODO verificar login en movil
//TODO resolver login
//TODO social Facebook y twitter
//TODO en index contar imagenes y ponerle priority true a la Imagen
//TODO nextjs check list https://nextjs.org/docs/pages/building-your-application/deploying/production-checklist
//TODO google analytics y WebVitals https://blog.appsignal.com/2020/09/02/getting-started-wit-web-vitals-in-nextjs.html
export async function getServerSideProps(context) {

	context.res.setHeader(
		"Cache-Control",
		"public, s-maxage=600, stale-while-revalidate=3600"
	);
	// 	"max-age=86400, must-revalidate"

	console.log("resolvedUrl", context.resolvedUrl);
	console.log("context.query", context.query);
	console.log("context.query.Pages", context.query.Pages);
	const paginaActual = context.query.Pages ? context.query.Pages : 1;
	console.log("paginaActual", paginaActual);
	const resp = await fetch(
		`${process.env.NEXT_PUBLIC_SPRING}/api/reportes?&page=${paginaActual}&size=12&sort=id,desc`
	);

	const contentType = resp.headers.get("X-Total-Count");
	// console.log("contentType", contentType);

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

		// revalidate: 10,
		// notFound: true, //regresa el 404
		// redirect: { //redirecciona a la pagina
		// 	destination: '/no-data'
		// }
	};
}
