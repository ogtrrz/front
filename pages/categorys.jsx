import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import orderBy from "lodash/orderBy"

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";

import Grid from "@mui/material/Grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Tarjeta from "components/Tarjeta";
import useLocalStorageState from "use-local-storage-state";
import NotFoundPage from "components/NotFoundPage";

const Busqueda = gql`
	query REPORTES_QUERY($queryInput: String!, $paginaInput: String!) {
		show(query: $queryInput, page: $pageInput)
			@rest(
				type: "Reporte"
				path: "reportes?{args.query}&page={args.page}&size=32"
			) {
			id
			titulo
			caso
			img
			fechaix
			ciudad
			estado
			pais
			autor
			autorix
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

const Home = () => {
	const router = useRouter();

	const { Page, CategoryCode, Category, Query } = router.query;

	const [page, setPage] = useState(0);

	// const [paginaTotal, setPaginaTotal] = useState(0);

	const [paginaTotal, setPaginaTotal] = useLocalStorageState(
		"transas_page_total",
		{
			defaultValue: 0,
		}
	);

	// console.log("Query", Query);
	// const { loading, error, data, fetchMore } = useQuery(Pagina, {
	const { loading, error, data } = useQuery(Busqueda, {
		variables: {
			paginaInput: page,
			queryInput: Query,
		},
		// fetchPolicy: "cache-and-network",
		// nextFetchPolicy: "cache-first",
	});

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

	useEffect(() => {
		if (Page) {
			setPage(Page);
		}
		const pag = data?.show[0]?.extra10 ? data?.show[0]?.extra10 : 0;
		setPaginaTotal(pag);
	}, []);

	const [dataArray, setDataArray] = useState([]);
	// let dataArray = []
	useEffect(() => {
		// console.log("Query", Query);
		// console.log("data", data);
		if (Page) {
			setPage(Page);
		}
		if (data?.show) {
			setDataArray(orderBy(data.show, ["id"], ["desc"]));
			const pag = data?.show[0]?.extra10 ? data?.show[0]?.extra10 : 0;
			setPaginaTotal(pag);
			// console.log("dataArray", dataArray);
		}
	}, [data]);

	if (error) {
		return <NotFoundPage />;
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

					<Typography color='text'>{`${Category}`}</Typography>
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

				{paginaTotal > 32 ? (
					<Box
						display='flex'
						justifyContent='center'
						alignItems='center'
						minHeight='10vh'>
						<Pagination
							count={Math.ceil(paginaTotal / 32)}
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
