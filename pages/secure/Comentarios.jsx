import React, { useState } from "react";
// import axios from "axios";
import { useRouter } from "next/router";
import NextLink from "next/link";
// import orderBy from "lodash/orderBy";
import moment from "moment";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CancelIcon from "@mui/icons-material/Cancel";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";

// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReviewsIcon from "@mui/icons-material/Reviews";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

// import { useDemoData } from '@mui/x-data-grid-generator';

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

const Busqueda = gql`
	query ($autorInput: String!, $paginaInput: Int!) {
		show(autor: $autorInput, page: $paginaInput)
			@rest(
				type: "Comentario"
				path: "/comentarios?autor.equals={args.autor}&{args.page}=0&size=32"
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

const Edit = gql`
	mutation editComentario($comentarioId: Int!, $input: ComentarioRequest!) {
		show(id: $comentarioId, input: $input)
			@rest(
				type: "Comentario"
				path: "/comentarios2/{args.id}"
				method: "PATCH"
				bodyKey: "input"
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
				path: "/comentarios2/{args.idComentario}/{args.idReporte}"
				method: "DELETE"
			) {
			idComentario
		}
	}
`;

const Comentarios = () => {
	const router = useRouter();

	const [editId, setEditId] = useState(0);
	const [comentarioState, setComentarioState] = useState("");

	//const { Autor, Page } = router.query;
	const Autor = "omar.gutierrez.e"
	const Page = "0"

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

	const [editComentario] = useMutation(Edit);
	// , {
	// 	update(cache, { data: { editComentario } }) {
	// 		// const cacheId = cache.identify(editComentario);
	// 		// console.log("cacheId", cacheId);
	// 		console.log("editComentario", editComentario);
	// 		cache.writeQuery({
	// 			query: gql`
	// 				query WriteComentario($id: Int!) {
	// 					Comentario(id: $id) {
	// 						id
	// 						comentario
	// 					}
	// 				}
	// 			`,
	// 			data: {
	// 				Comentario: {
	// 					__typename: "Comentario",
	// 					id: editComentario.id,
	// 					comentario: editComentario.comentario,
	// 				},
	// 			},
	// 			variables: {
	// 				id: editComentario.id,
	// 			},
	// 		});
	// 	},
	// });

	// const [dataArray, setDataArray] = useState([]);

	// useEffect(() => {
	// 	if (dataBusqueda?.show) {
	// 		setDataArray(orderBy(dataBusqueda.show, ["id"], ["desc"]));
	// 		// console.log("dataArray", dataArray);
	// 	}
	// }, [dataBusqueda]);

	const handleEdit = (id, comentario) => {
		console.log("handleEdit", id);
		console.log("comentario", comentario);
		setEditId(id);
		setComentarioState(comentario);
	};

	const handleSave = (id) => {
		console.log("handleEdit", id);
		setEditId(0);
		// setComentarioState(comentario);
		let input = {};
		input.id = id;
		input.comentario = comentarioState;

		editComentario({
			variables: {
				comentarioId: id,
				input: input,
			},
			update(cache, { data: { editComentario } }) {},
		}).then((req) => {
			console.log("req", req);
		});
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
	return (
		<Box
			sx={{ display: "flex", pt: { xs: 15, md: 40 }, pl: { xs: 25, md: 50 } }}
			justifyContent='center'
			alignItems='center'>
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
					align='center'
					alignItems='stretch'
					spacing={{ xs: 2, sm: 3, md: 5 }}
					columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}>
					{dataBusqueda?.show?.map((item) => {
						return (
							<React.Fragment key={item.id}>
								<Grid xs={3} item={true} style={{ display: "flex" }}>
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
											</NextLink>
											<CardContent>
												<Typography
													variant='subtitle2'
													color='primary'
													sx={{
														whiteSpace: "pre-line",
													}}>
													{item?.extra3 ? `${item?.extra3}` : ""}
												</Typography>
												{editId === item.id ? (
													<React.Fragment>
														<br />
														<TextField
															id='comentario'
															label='Editar Comentario'
															variant='outlined'
															value={comentarioState}
															onChange={(e) => {
																setComentarioState(e.target.value);
															}}
															multiline
															rows={3}
															// maxRows={50}
														/>
													</React.Fragment>
												) : (
													<Typography
														variant='body1'
														color='text'
														sx={{
															whiteSpace: "pre-line",
														}}>
														{item.comentario}
													</Typography>
												)}
											</CardContent>
										</div>
										<CardActions>
											{editId === item.id ? (
												<React.Fragment>
													<Button
														variant='contained'
														size='small'
														endIcon={<SendIcon />}
														onClick={() => handleSave(item.id)}>
														Guardar
													</Button>
													<Button
														variant='outlined'
														size='small'
														endIcon={<CancelIcon />}
														onClick={() => setEditId(0)}>
														Cancelar
													</Button>
												</React.Fragment>
											) : (
												<React.Fragment>
													<Button
														variant='contained'
														size='small'
														endIcon={<SendIcon />}
														onClick={() =>
															handleEdit(item.id, item.comentario)
														}>
														Editar
													</Button>
													<Button
														variant='outlined'
														size='small'
														endIcon={<DeleteIcon />}
														onClick={() => handleDelete(item.id, item.extra1)}>
														Borrar
													</Button>
												</React.Fragment>
											)}
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
