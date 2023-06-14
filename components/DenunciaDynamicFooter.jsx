/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
// import NextLink from "next/link";
// import Head from "next/head";
// import _ from "lodash";
import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";
import remove from "lodash/remove";
import orderBy from "lodash/orderBy";
// remove, orderBy
// import moment from "moment";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
import PestControlIcon from "@mui/icons-material/PestControl";
import ReviewsIcon from "@mui/icons-material/Reviews";
//import VisibilityIcon from '@mui/icons-material/Visibility';
import AdsClickIcon from "@mui/icons-material/AdsClick";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import useLocalStorageState from "use-local-storage-state";
import { FacebookShareButton } from "react-share";
// import { useSession } from "next-auth/react";
// import { useLocalStorage, useEffectOnce } from "usehooks-ts";

// import IconButton from "material-ui/IconButton";
// import ActionHome from "material-ui/svg-icons/action/home";

// import Image from "../img/main.jpg"; // Import using relative path
// <Paper sx={{ backgroundImage: `url(${Image})` }}></Paper>;

// const ReporteQuery = gql`
// 	query REPORTE_QUERY($idReporte: String!) {
// 		show(id: $idReporte) @rest(type: "Reporte", path: "reportes/{args.id}") {
// 			id @export(as: "showId")
// 			titulo
// 			caso
// 			img
// 			fechaix
// 			ciudad
// 			estado
// 			pais
// 			autor
// 			autorix
// 			informacion {
// 				id
// 				comentarios
// 				vistas
// 				rating
// 			}
// 			categorys {
// 				id
// 				categoria
// 			}
// 			casoText {
// 				id
// 			}
// 			comentarios {
// 				id
// 				autor
// 				comentario
// 			}
// 		}
// 	}
// `;

const PATCH_REPORTE = gql`
	mutation PatchReporte($id: Int!, $input: ReporteRequest!) {
		patchReporte(id: $id, input: $input)
			@rest(
				type: "Reporte"
				path: "/reportes2/{args.id}"
				method: "PATCH"
				bodyKey: "input"
			) {
			id
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
			categorys {
				id
				categoria
			}
			casoText {
				id
			}
			comentarios {
				id
				autor
				comentario
				extra1
				extra2
				extra3
			}
		}
	}
`;

// const CasoQuery = gql`
// 	query CASO_QUERY($idCaso: String!) {
// 		show(id: $idCaso) @rest(type: "Caso", path: "caso-texts/{args.id}") {
// 			id @export(as: "showId")
// 			descripcion
// 		}
// 	}
// `;

export const PATCH_INFORMACION = gql`
	mutation PatchInformacion($id: Int!, $input: InformacionRequest!) {
		patchInformacion(id: $id, input: $input)
			@rest(
				type: "Informacion"
				path: "/informacions/{args.id}"
				method: "PATCH"
				bodyKey: "input"
			) {
			id
			comentarios
			vistas
			rating
		}
	}
`;

export const POST_COMENTARIO = gql`
	mutation PostComentario($input: ComentarioRequest!) {
		postComentario(input: $input)
			@rest(
				type: "Comentario"
				path: "/comentarios"
				method: "POST"
				bodyKey: "input"
			) {
			id
			autor
			comentario
		}
	}
`;

// export const PATCH_COMENTARIO = gql`
// 	mutation PatchComentario($id: Int!, $input: ComentarioRequest!) {
// 		patchComentario(id: $id, input: $input)
// 			@rest(
// 				type: "Comentario"
// 				path: "/comentarios/{args.id}"
// 				method: "PATCH"
// 				bodyKey: "input"
// 			) {
// 			id
// 			autor
// 			comentario
// 		}
// 	}
// `;

// export const DELETE_COMENTARIO = gql`
// 	mutation DeleteComentario($id: Int!) {
// 		deleteComentario(id: $id)
// 			@rest(
// 				type: "Comentario"
// 				path: "/comentarios/{args.id}"
// 				method: "DELETE"
// 			)
// 	}
// `;

const DenunciaDynamicFooter = ({ data }) => {
	// console.log("props", props);

	const router = useRouter();
	// const { data: session } = useSession();
	// const { Denuncia, Page } = router.query;
	const [comentarioState, setComentarioState] = useState("");

	// const [
	// 	getReporte,
	// 	{ loading: loadingReporte, error: errorReporte, data: dataReporte },
	// ] = useLazyQuery(ReporteQuery, {
	// 	// variables: { idReporte: ReporteId },
	// 	// fetchPolicy: "cache-and-network",
	// 	// nextFetchPolicy: "cache-first",
	// });

	// const [getCaso, { loading: loadingCaso, error: errorCaso, data: dataCaso }] =
	// 	useLazyQuery(CasoQuery);

	const [patchInformacion] = useMutation(PATCH_INFORMACION, {
		update(cache, { data: { patchInformacion } }) {
			// const cacheId = cache.identify(item);
			// console.log("patchInformacion", patchInformacion);

			cache.writeQuery({
				query: gql`
					query WriteTodo($id: Int!) {
						Reporte(id: $id) {
							id
							informacion {
								comentarios
								vistas
								rating
							}
						}
					}
				`,
				data: {
					Reporte: {
						__typename: "Reporte",
						id: data.id,
						informacion: {
							comentarios: patchInformacion.comentarios,
							vistas: patchInformacion.vistas,
							rating: patchInformacion.rating,
						},
					},
				},
				variables: {
					idReporte: data.id,
				},
			});
		},
	});

	// const [
	// 	postComentario,
	// 	// {
	// 	// 	loading: lodingComentario,
	// 	// 	error: errorComentario,
	// 	// 	data: dataComentarios,
	// 	// },
	// ] = useMutation(POST_COMENTARIO, {
	// 	update(cache, { data: { postComentario } }) {
	// 		// const cacheId = cache.identify(item);
	// 		// console.log("postComentario", postComentario);

	// 		cache.writeQuery({
	// 			query: gql`
	// 				query WriteComentario($id: Int!) {
	// 					Comentario(id: $id) {
	// 						id
	// 						comentarios {
	// 							id
	// 							autor
	// 							comentario
	// 							extra1
	// 							extra2
	// 							extra3
	// 						}
	// 					}
	// 				}
	// 			`,
	// 			data: {
	// 				Reporte: {
	// 					__typename: "Reporte",
	// 					id: item.id,
	// 					comentarios: {
	// 						id: postComentario.id,
	// 						autor: postComentario.autor,
	// 						comentario: postComentario.comentario,
	// 						extra1: postComentario.extra1,
	// 						extra2: postComentario.extra2,
	// 						extra3: postComentario.extra3,
	// 					},
	// 				},
	// 			},
	// 			variables: {
	// 				idComentario: postComentario.id,
	// 			},
	// 		});
	// 	},
	// });

	const [patchReporte] = useMutation(PATCH_REPORTE);

	// const [viewStorage, setViewStorage] = useLocalStorageState("transas_view", {
	// 	defaultValue: [],
	// });

	const [pestesStorage, setPestesStorage] = useLocalStorageState(
		"transas_pestes",
		{
			defaultValue: [],
		}
	);

	const [pestesBadge, setPestesBadge] = useState(data.informacion);

	const chipFilter = (item) => {
		// console.log(item.id);//categoria
		router.push(
			`/categorys?Query=categorysId.equals=${item.id}&Category=Categoría:%20${item.categoria}&Page=0`
		);
	};

	// const handleView = () => {
	// 	// console.log("View", viewStorage);
	// 	const findView = _.findIndex(viewStorage, (item) => item === data.id);
	// 	// console.log("findView", findView);
	// 	if (findView === -1) {
	// 		setViewStorage([...viewStorage, data.id]);
	// 		// console.log("findView Entro0");
	// 		// console.log("findView Entro", data.informacion);
	// 		let info = {};
	// 		info = _.cloneDeep(data.informacion);
	// 		// console.log("info", info);
	// 		info.vistas = 0;
	// 		info.vistas = data.informacion?.vistas ? data.informacion?.vistas + 1 : 1;
	// 		patchInformacion({
	// 			variables: {
	// 				id: info.id,
	// 				input: info,
	// 			},
	// 		});
	// 	}
	// };

	// useEffect(() => {
	// 	if (Denuncia) {
	// 		getReporte({ variables: { idReporte: Denuncia } });
	// 	}
	// }, [Denuncia]);

	// useEffect(() => {
	// 	if (!loadingReporte && dataReporte) {
	// 		// console.log("idCaso", data.casoText?.id);
	// 		getCaso({ variables: { idCaso: data.casoText?.id } });
	// 		handleView();
	// 	}
	// }, [data]);

	const [comentariosData, setComentariosData] = useState(data.comentarios);

	const handleSubmitComentario = (e) => {
		// console.log("comentarioState", comentarioState);
		if ([...comentarioState].length > 0) {
			const request = {
				// autor:
				// 	session === null || session === undefined
				// 		? "Anonimo"
				// 		: session?.user?.name,
				comentario: comentarioState,
				extra1: data.id,
				extra3: data.titulo,
			};
			let variables = {};
			variables.id = data.id;
			variables.comentarios = [request];
			// console.log("variables", variables);
			patchReporte({
				variables: {
					id: data.id,
					input: variables,
				},
			}).then((req) => {
				console.log("req", req.data.patchReporte.comentarios);
				setComentariosData(req.data.patchReporte.comentarios);
			});

			setComentarioState("");
		}
	};

	const handlePestes = () => {
		const findView = findIndex(pestesStorage, (item) => item === data.id);
		let info = cloneDeep(data.informacion);
		if (findView === -1) {
			// console.log("entro agregar");
			setPestesStorage([...pestesStorage, data.id]);
			info.rating = pestesBadge.rating + 1;
			// console.log("info", info);
		} else {
			// console.log("entro remove");
			let pestesArray = cloneDeep(pestesStorage);
			// console.log("entro remove1", pestesArray);
			remove(pestesArray, (item) => item === data.id);
			// console.log("entro remove2", pestesArray);
			setPestesStorage(pestesArray);
			info.rating = pestesBadge.rating ;
		}
		patchInformacion({
			variables: {
				id: info.id,
				input: info,
			},
		}).then((res) => {
			console.log("res", res);
			console.log("res.data.patchInformacion", res.data.patchInformacion);
			setPestesBadge(res.data.patchInformacion);
		});
	};

	//ordenar comentarios por id
	const comentariosArray = orderBy(comentariosData, ["id"], ["desc"]);
	// console.log("comentariosArray", comentariosArray);
	// const informacionItem = data.informacion;
	// console.log("dataReporte", dataReporte);

	// console.log("dataCaso", dataCaso);
	// if (!loadingReporte && !loadingCaso && dataCaso && dataReporte)
	if (true) {
		return (
			<React.Fragment>
				<Box
					sx={{ flexDirection: "row", mt: 40, mb: 40 }}
					minHeight='5vh'
					alignItems='center'
					display='flex'>
					<Tooltip title='Facebookea al Transota' arrow>
						<FacebookShareButton
							url={"http://wf.com.mx"}
							quote={"Quote"}
							hashtag={"#Transotas"}
							description={"aiueo"}>
							<Badge
								badgeContent={4}
								color='primary'
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}>
								<FacebookIcon color='secondary' />
							</Badge>
						</FacebookShareButton>
					</Tooltip>
					&nbsp;&nbsp;&nbsp;
					<Tooltip title='Control de Pestes, ponganlo en primera plana.' arrow>
						<IconButton
							aria-label='vota Control de Pestes'
							onClick={handlePestes}>
							<Badge
								badgeContent={pestesBadge?.rating}
								color='primary'
								max={999}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}>
								<PestControlIcon
									color={
										findIndex(pestesStorage, (item) => item === data.id) === -1
											? ""
											: "secondary"
									}
								/>
							</Badge>
						</IconButton>
					</Tooltip>
					&nbsp;&nbsp;
					<Tooltip title='Personas que lo han visto.' arrow>
						<div>
							<Badge
								badgeContent={data.informacion?.vistas}
								color='primary'
								max={99}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}>
								<AdsClickIcon />
							</Badge>
						</div>
					</Tooltip>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<Tooltip title='Total de comentarios.' arrow>
						<div>
							<Badge
								badgeContent={data.informacion?.comentarios}
								color='primary'
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}>
								<ReviewsIcon />
							</Badge>
						</div>
					</Tooltip>
				</Box>

				<Stack direction='row' spacing={2}>
					{data.categorys?.map((item) => {
						return (
							<Chip
								key={item.id}
								label={`${item.categoria}`}
								variant='outlined'
								color='secondary'
								clickable={true}
								onClick={() => chipFilter(item)}
							/>
						);
					})}
				</Stack>
				<br />
				<Stack direction='column' spacing={20}>
					<TextField
						id='comentario'
						label='Agregar Comentario'
						variant='outlined'
						value={comentarioState}
						onChange={(e) => {
							setComentarioState(e.target.value);
						}}
						multiline
						rows={3}
						// maxRows={50}
					/>
					<Box>
						<Button
							variant='contained'
							component='label'
							onClick={handleSubmitComentario}
							disabled={[...comentarioState].length > 0 ? false : true}>
							Agregar Comentario
						</Button>
					</Box>
					<Typography
						variant='subtitle2'
						color='text'
						style={{ whiteSpace: "pre-line" }}>
						{data.comentarios?.length === 0
							? `Sea el primero en Comentar`
							: `Comentarios`}
					</Typography>
					<br />
				</Stack>

				{comentariosArray?.map((item) => {
					return (
						<React.Fragment key={item.id}>
							<Typography
								variant='body1'
								color='text'
								style={{ whiteSpace: "pre-line" }}>
								{item.comentario.replaceAll("<br/>", "\n")}
							</Typography>
							<Typography variant='body1' color='secondary'>
								{item.autor}
							</Typography>
							<br />
						</React.Fragment>
					);
				})}
			</React.Fragment>
		);
	}
};

export default React.memo(DenunciaDynamicFooter);
