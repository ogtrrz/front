import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useRouter } from "next/router";
import NextLink from "next/link";
import _ from "lodash";
import moment from "moment";

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
	Avatar,
	IconButton,
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
import ReviewsIcon from "@mui/icons-material/Reviews";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

// import { useDemoData } from '@mui/x-data-grid-generator';

import { useSession } from "next-auth/react";
import { graphql } from "@apollo/client/react/hoc";
import gql from "graphql-tag";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Tarjeta from "components/Tarjeta";
import useSessionStorageState from "use-session-storage-state";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";

const Busqueda = gql`
	query ($autorInput: String!, $paginaInput: Int!) {
		show(autor: $autorInput, page: $paginaInput)
			@rest(
				type: "Comentario"
				path: "comentarios?autor.equals={args.autor}&{args.page}=0&size=32"
			) {
			id
			autor
			comentario
			extra1
			extra2
			extra3
		}
	}
`;

const Delete = gql`
	mutation deleteComentario($idComentario: String!, $idReporte: String!) {
		show(idComentario: $idComentario, idReporte: $idReporte)
			@rest(
				type: "Comentario"
				path: "comentarios2/{args.idComentario}/{args.idReporte}"
				method: "DELETE"
			) {
			idComentario
		}
	}
`;

const Comentarios = () => {
	const router = useRouter();

	const { Autor, Page } = router.query;

	const {
		loading: lodingBusqueda,
		error: errorBusqueda,
		data: dataBusqueda,
	} = useQuery(Busqueda, {
		variables: { autorInput: Autor, paginaInput: Page },
		// fetchPolicy: "cache-and-network",
		// nextFetchPolicy: "cache-first",
	});

	const [deleteComentario] = useMutation(Delete);

	const [dataArray, setDataArray] = useState([]);

	useEffect(() => {
		if (dataBusqueda?.show) {
			setDataArray(_.orderBy(dataBusqueda.show, ["id"], ["desc"]));
			// console.log("dataArray", dataArray);
		}
	}, [dataBusqueda]);

	const handleEdit = (id) => {
		console.log("handleEdit", id);
	};

	const handleDelete = (idComentario, idReporte) => {
		// console.log("idComentario", idComentario);
		// console.log("idReporte", idReporte);
		deleteComentario({
			variables: {
				idComentario: idComentario,
				idReporte: idReporte,
			},
			update(cache) {
				const cacheId = cache.identify({
					__typename: "Comentario",
					id: idComentario,
				});
				// console.log("cacheId", cacheId);
				cache.evict({ id: cacheId });
				cache.gc();
			},
		});
	};

	console.log("dataBusqueda", dataBusqueda);
	//TODO agregar fecha del comentario
	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Stack direction='column' spacing={2}>
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

					<Typography color='text'>{`Mis Comentarios`}</Typography>
				</Breadcrumbs>
				<Grid
					container
					direction={"row"}
					align='center'
					spacing={{ xs: 2, sm: 3, md: 5 }}
					columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}>
					{dataBusqueda?.show?.map((item) => {
						return (
							<React.Fragment key={item.id}>
								<Grid xs={3} item={true}>
									<Card sx={{ maxWidth: 340 }}>
										<div align='left'>
											<NextLink href={`/view/denuncia/${item.extra1}?Page=0`}>
												<CardHeader
													avatar={<ReviewsIcon color='primary' />}
													title={"Comentario"}
													titleTypographyProps={{
														variant: "subtitle1",
														color: "primary",
														component: "span",
													}}
													subheader={
														item.extra2
															? `Creado el ${moment(item.extra2).format(
																	"DD/MM/YY"
															  )}, por ${item.autor}.`
															: ""
													}
													subheaderTypographyProps={{
														variant: "body2",
														color: "secondary",
														component: "span",
													}}
												/>
												<CardContent>
													<Typography
														variant='subtitle2'
														color='primary'
														sx={{
															"&:hover": {
																textDecoration: "underline",
															},
															whiteSpace: "pre-line",
														}}>
														{item?.extra3 ? `${item?.extra3}` : ""}
													</Typography>
													<Typography
														variant='body1'
														color='text'
														sx={{
															"&:hover": {
																textDecoration: "underline",
															},
															whiteSpace: "pre-line",
														}}>
														{item.comentario}
													</Typography>
												</CardContent>
											</NextLink>
										</div>
										<CardActions>
											<Button
												variant='contained'
												size='small'
												endIcon={<SendIcon />}
												onClick={() => handleEdit(item.id)}>
												Editar
											</Button>
											<Button
												variant='outlined'
												size='small'
												endIcon={<DeleteIcon />}
												onClick={() => handleDelete(item.id, item.extra1)}>
												Borrar
											</Button>
										</CardActions>
									</Card>
								</Grid>
							</React.Fragment>
						);
					})}
				</Grid>
			</Stack>
		</Box>
	);
};

export default Comentarios;
