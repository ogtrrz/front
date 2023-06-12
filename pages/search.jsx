import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useRouter } from "next/router";
import NextLink from "next/link";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import Grid from "@mui/material/Grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// import { useDemoData } from '@mui/x-data-grid-generator';

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Tarjeta from "components/Tarjeta";
import NotFoundPage from "components/NotFoundPage";

const Busqueda = gql`
	query ($searchInput: String!) {
		show(search: $searchInput)
			@rest(
				type: "Reporte"
				path: "_search2/caso-texts?query={args.search}&sort=id,desc"
			) {
			id @export(as: "showId")
			titulo
			caso
			img
			fechaix
			ciudad
			estado
			pais
			informacion {
				id
				comentarios
				vistas
				rating
			}
		}
	}
`;
//path: "_search/reportes?query={args.search}&page=0&size=32"

// const Pagina = gql`
// 	query REPORTES_QUERY($paginaInput: String!) {
// 		show(pagina: $paginaInput)
// 			@rest(
// 				type: "Reporte"
// 				path: "reportes?page={args.pagina}&size=32&sort=id,desc"
// 			) {
// 			id @export(as: "showId")
// 			titulo
// 			caso
// 			img
// 			fechaix
// 			ciudad
// 			estado
// 			pais
// 			informacion {
// 				id
// 				comentarios
// 				vistas
// 				rating
// 			}
// 		}
// 	}
// `;

const Home = () => {
	// const [searchInput, setSearchInput] = useState("hola");

	//reactivo
	const router = useRouter();

	const { SearchCode } = router.query;

	// const [page, setPage] = useState(0);

	// const [paginaTotal, setPaginaTotal] = useState(0);

	// const [paginaTotal, setPaginaTotal] = useSessionLocalState(
	// 	"transas_page_total",
	// 	{
	// 		defaultValue: 0,
	// 	}
	// );

	// const { loading, error, data, fetchMore } = useQuery(Pagina, {
	const { loading, error, data } = useQuery(Busqueda, {
		variables: { searchInput: SearchCode },
		// fetchPolicy: "cache-and-network",
		// nextFetchPolicy: "cache-first",
	});

	// const handleChangePagination = (event, value) => {
	// 	setPage(value);
	// 	router.push(
	// 		{
	// 			pathname: `/`,
	// 		},
	// 		`/?Pages=${value}`,
	// 		{ shallow: true }
	// 	);
	// };

	// https://github.com/apollographql/apollo-client/issues/7131
	// useEffect(() => {
	// 	console.log(`fetch More Pagina ===================== ${page+1}`);
	// 	fetchMore({
	// 		variables: { paginaInput: page+1 },
	// 	});
	// }, [!loading]);
	// useEffect(() => {
	// 	if (Page) {
	// 		setPage(Page);
	// 	}
	// 	if (paginaTotal === 0) {
	// 		var requestOptions = {
	// 			method: "GET",
	// 		};

	// 		fetch(
	// 			"http://localhost:8080/api/reportes/count?distinct=true",
	// 			requestOptions
	// 		)
	// 			.then((response) => response.text())
	// 			.then((result) => setPaginaTotal(result))
	// 			.catch((error) => console.log("error", error));
	// 	}
	// }, []);

	const [dataArray, setDataArray] = useState([]);
	// let dataArray = []
	useEffect(() => {
		if (data?.show) {
			setDataArray(_.orderBy(data.show, ["id"], ["desc"]));
			// console.log("dataArray", dataArray);
		}
	}, [data]);

	if (error) {
		return <NotFoundPage />;
	}

	// useEffect(() => {
	// 	if (SearchCode) {
	// 		console.log("SEARCH effecy =========", SearchCode);
	// 	}
	// }, [SearchCode]);

	// const getAfter = (data) =>
	// 	data.edges && data.edges.length > 0
	// 		? data.edges[data.edges.length - 1].cursor
	// 		: null;

	if (loading) {
		return (
			<Backdrop
				sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
		);
	}

	// console.log("data", data.show);

	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Stack direction='column' spacing={2}>
				<br />
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
							&nbsp;&nbsp;&nbsp;Inicio
						</Typography>
					</NextLink>

					<Typography color='text'>{`Resultados de:  ${SearchCode}`}</Typography>
				</Breadcrumbs>
				<br />
				<Grid
					container
					align='center'
					alignItems='stretch'
					spacing={{ xs: 2, sm: 3, md: 5 }}
					columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}>
					{dataArray.map((item) => {
						return (
							<React.Fragment key={item.id}>
								<Grid xs={3} item={true} style={{ display: "flex" }}>
									<Tarjeta item={item} Page={1} />
								</Grid>
							</React.Fragment>
						);
					})}
				</Grid>
			</Stack>
		</Box>
	);
};

export default Home;

// export async function getServerSideProps() {
//     // console.log('context', context.query.page);
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_REST}/api/reportes`);
//     const data = await res.json();
//     if (!data) {
//         return {
//             notFound: true
//         };
//     }

//     return {
//         props: { data: data }
//     };
// }
