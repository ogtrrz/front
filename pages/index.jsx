import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useRouter } from "next/router";

import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
	Link,
	Pagination,
	Breadcrumbs,
	FormControl,
	InputLabel,
	Select,
} from "@mui/material";
import Grid from "@mui/material/Grid";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";



// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
import { DataGrid, esES } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// import { useDemoData } from '@mui/x-data-grid-generator';

import { useSession } from "next-auth/react";
import Reporte from "pages/api/Reporte";
import { graphql } from "@apollo/client/react/hoc";
import gql from "graphql-tag";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Tarjeta from "components/Tarjeta";

const Busqueda = gql`
	query ($searchInput: String!) {
		show(search: $searchInput)
			@rest(
				type: "Reporte"
				path: "_search/reportes?query=:search&page=0&size=20"
			) {
			id @export(as: "showId")
			titulo
			caso
			img
			fechaix
			ciudad
			estado
			pais
		}
	}
`;


//TODO order by id o por fechaix el id si jala fechaix no jala tan bien
const Pagina = gql`
	query REPORTES_QUERY($paginaInput: String!) {
		show(pagina: $paginaInput)
			@rest(
				type: "Reporte"
				path: "reportes?page=:pagina&size=32&sort=id,desc"
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



const Home = () => {
	// const [searchInput, setSearchInput] = useState("hola");

	//TODO prefetch 5 paginas de manera silenciosa en cache
	//TODO Skeleton
	//reactivo
	const [paginaTotal, setPaginaTotal] = useState(0);
	const [page, setPage] = useState(0);

	// const { loading, error, data, fetchMore } = useQuery(Pagina, {
	const { loading, error, data } = useQuery(Pagina, {
		variables: { paginaInput: page - 1 },
		// fetchPolicy: "cache-and-network",
		// nextFetchPolicy: "cache-first",
	});

	const handleChangePagination = (event, value) => {
		setPage(value);
	};



	//TODO se me hace que no jala
	// https://github.com/apollographql/apollo-client/issues/7131
	// useEffect(() => {
	// 	console.log(`fetch More Pagina ===================== ${page+1}`);
	// 	fetchMore({
	// 		variables: { paginaInput: page+1 },
	// 	});
	// }, [!loading]);

	useEffect(() => {
		if (paginaTotal === 0) {
			var requestOptions = {
				method: "GET",
			};

			fetch(
				"http://localhost:8080/api/reportes/count?distinct=true",
				requestOptions
			)
				.then((response) => response.text())
				.then((result) => setPaginaTotal(result))
				.catch((error) => console.log("error", error));
		}
	}, []);

	// const getAfter = (data) =>
	// 	data.edges && data.edges.length > 0
	// 		? data.edges[data.edges.length - 1].cursor
	// 		: null;

	if (error) {
		return <p>Error</p>;
	}

	if (loading) {
		return (
			<Backdrop
				sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}>
				<CircularProgress color='inherit' />
			</Backdrop>
		);
	}

	console.log("data", data.show);

	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Stack direction='column' spacing={2}>
				<Breadcrumbs aria-label='breadcrumb'>
					<Typography color='text'>Inicio</Typography>
				</Breadcrumbs>
				<Grid
					container
					spacing={{ xs: 2, sm: 3, md: 5 }}
					columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}>
					{data.show.map((item) => {
						return (
							<React.Fragment key={item.id}>
								<Grid xs={3}>
									<Tarjeta item={item} />
								</Grid>
							</React.Fragment>
						);
					})}
				</Grid>

				<Pagination
					count={Math.ceil(paginaTotal / 32)}
					page={page}
					onChange={handleChangePagination}
					variant='outlined'
					color='primary'
				/>
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
