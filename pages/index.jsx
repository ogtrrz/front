import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Stack, Box, Typography, Pagination, Breadcrumbs } from "@mui/material";
import Grid from "@mui/material/Grid";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Tarjeta from "components/Tarjeta";
import useLocalStorageState from "use-local-storage-state";

//TODO order by id o por fechaix el id si jala fechaix no jala tan bien
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

const Home = (props) => {
	console.log("props", props);
	const { data } = props;
	console.log("data", data);
	// const [searchInput, setSearchInput] = useState("hola");

	//TODO prefetch 5 paginas de manera silenciosa en cache
	//TODO Skeleton
	//reactivo
	const router = useRouter();

	const { Page, Search } = router.query;

	const [page, setPage] = useState(0);

	const [paginaTotal, setPaginaTotal] = useState(0);

	const [paginaTotalMemoria, setPaginaTotalMemoria] = useLocalStorageState(
		"transas_total_paginas",
		{
			defaultValue: 0,
		}
	);

	//TODO historia para el BreadCrumb
	const [historia, setHistoria] = useLocalStorageState("transas_historia", {
		defaultValue: [],
	});

	// const { loading, error, data, fetchMore } = useQuery(Pagina, {
	// const { loading, error, data } = useQuery(Pagina, {
	// 	variables: { paginaInput: page - 1 },
	// 	// fetchPolicy: "cache-and-network",
	// 	// nextFetchPolicy: "cache-first",
	// });

	const handleChangePagination = (event, value) => {
		setPage(value);
		router.push(
			{
				pathname: `/`,
			},
			`/?Pages=${value}`,
			{ shallow: true }
		);
	};

	//TODO se me hace que no jala
	// https://github.com/apollographql/apollo-client/issues/7131
	// useEffect(() => {
	// 	console.log(`fetch More Pagina ===================== ${page+1}`);
	// 	fetchMore({
	// 		variables: { paginaInput: page+1 },
	// 	});
	// }, [!loading]);
	//TODO poner Page if loaded y no volver a corer el fetch

	const descripcionMeta = data?.map((item) => `${item.titulo}`).join(", ");

	// console.log("descripcionMeta", descripcionMeta);

	// const test = async () => {
	// 	const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING}/api/reportes`, {
	// 		method: "GET",
	// 		headers: {
	// 			"x-total-count": "x-total-count",
	// 		},
	// 	});
	// 	console.log("res", res);
	// 	const data = await res.json();
	// 	console.log("headers", res.headers["x-total-count"]);
	// 	console.log("data", data);
	// 	if (!data) {
	// 		return {
	// 			notFound: true,
	// 		};
	// 	}
	// 	// console.log("data", data);
	// 	return {
	// 		props: { data: data },
	// 	};
	// };
	// useEffect(() => {
	// 	test();
	// }, []);

	useEffect(() => {
		if (Page) {
			setPage(parseInt(Page));
		}
		const pag = data[0]?.extra10 ? data[0]?.extra10 : 0;
		// TODO no sirbe paginacion???
		console.log("Pagina0", pag);
		console.log("paginaTotalMemoria", paginaTotalMemoria);
		if (parseInt(paginaTotalMemoria) !== parseInt(pag)) {
			//|| parseInt(pag) === 0) {
			setPaginaTotal(parseInt(pag));
			setPaginaTotalMemoria(pag);
			console.log("Pagina", pag);
		}
	}, [data]);

	// const getAfter = (data) =>
	// 	data.edges && data.edges.length > 0
	// 		? data.edges[data.edges.length - 1].cursor
	// 		: null;

	// if (error) {
	// 	return <p>Error</p>;
	// }

	// if (loading) {
	// 	return (
	// 		<Backdrop
	// 			sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
	// 			open={loading}>
	// 			<CircularProgress color='inherit' />
	// 		</Backdrop>
	// 	);
	// }

	// console.log("data", data);

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
				sx={{ border: "1px dashed grey", display: "flex" }}
				justifyContent='center'
				alignItems='center'>
				<Stack direction='column' spacing={2}>
					<Breadcrumbs aria-label='breadcrumb'>
						<Typography color='text'>Inicio</Typography>
					</Breadcrumbs>
					<Grid
						container
						align='center'
						spacing={{ xs: 2, sm: 3, md: 5 }}
						columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}>
						{data?.map((item) => {
							return (
								<React.Fragment key={item.id}>
									<Grid xs={3} item={true}>
										<Tarjeta item={item} Page={page === 0 ? 1 : page} />
									</Grid>
								</React.Fragment>
							);
						})}
					</Grid>

					{paginaTotal > 12 ? (
						<Box
							display='flex'
							justifyContent='center'
							alignItems='center'
							minHeight='10vh'>
							<Pagination
								count={Math.ceil(paginaTotal / 12)}
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
export async function getServerSideProps() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING}/api/reportes`);
	const data = await res.json();
	if (!data) {
		return {
			notFound: true,
		};
	}
	// console.log("data", data);
	return {
		props: { data: data },

		// revalidate: 10,
		// notFound: true, //regresa el 404
		// redirect: { //redirecciona a la pagina
		// 	destination: '/no-data'
		// }
	};
}
