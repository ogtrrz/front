/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import {
	Paper,
	Box,
	Typography,
	Chip,
	Stack,
	Breadcrumbs,
	TextField,
	Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Badge from "@mui/material/Badge";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PestControlIcon from "@mui/icons-material/PestControl";
import ReviewsIcon from "@mui/icons-material/Reviews";
//import VisibilityIcon from '@mui/icons-material/Visibility';
import AdsClickIcon from "@mui/icons-material/AdsClick";
import gql from "graphql-tag";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import useLocalStorageState from "use-local-storage-state";
import { FacebookShareButton } from "react-share";
import { useSession } from "next-auth/react";
// import { useLocalStorage, useEffectOnce } from "usehooks-ts";

// import IconButton from "material-ui/IconButton";
// import ActionHome from "material-ui/svg-icons/action/home";

// import Image from "../img/main.jpg"; // Import using relative path
// <Paper sx={{ backgroundImage: `url(${Image})` }}></Paper>;

//TODO read from cache if exist o el manejo es automatico???
const ReporteQuery = gql`
	query REPORTE_QUERY($idReporte: String!) {
		show(id: $idReporte) @rest(type: "Reporte", path: "reportes/{args.id}") {
			id @export(as: "showId")
			titulo
			caso
			img
			fechaix
			ciudad
			estado
			pais
			autor
			autorix
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
			}
		}
	}
`;

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
			}
		}
	}
`;

const CasoQuery = gql`
	query CASO_QUERY($idCaso: String!) {
		show(id: $idCaso) @rest(type: "Caso", path: "caso-texts/{args.id}") {
			id @export(as: "showId")
			descripcion
		}
	}
`;

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

const Denuncia = () => {
	const router = useRouter();
	const { Denuncia, Page } = router.query;
	const { data: session } = useSession();

	const [comentarioState, setComentarioState] = useState("");
	const [
		getReporte,
		{ loading: loadingReporte, error: errorReporte, data: dataReporte },
	] = useLazyQuery(ReporteQuery, {
		// variables: { idReporte: ReporteId },
		// fetchPolicy: "cache-and-network",
		// nextFetchPolicy: "cache-first",
	});

	const [getCaso, { loading: loadingCaso, error: errorCaso, data: dataCaso }] =
		useLazyQuery(CasoQuery);

	const [patchInformacion, { loading, error, data }] = useMutation(
		PATCH_INFORMACION,
		{
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
							id: dataReporte?.show?.id,
							informacion: {
								comentarios: patchInformacion.comentarios,
								vistas: patchInformacion.vistas,
								rating: patchInformacion.rating,
							},
						},
					},
					variables: {
						idReporte: dataReporte?.show?.id,
					},
				});
			},
		}
	);

	const [
		postComentario,
		{
			loading: lodingComentario,
			error: errorComentario,
			data: dataComentarios,
		},
	] = useMutation(POST_COMENTARIO, {
		update(cache, { data: { postComentario } }) {
			// const cacheId = cache.identify(item);
			// console.log("postComentario", postComentario);

			cache.writeQuery({
				query: gql`
					query WriteComentario($id: Int!) {
						Comentario(id: $id) {
							id
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
				`,
				data: {
					Reporte: {
						__typename: "Reporte",
						id: item.id,
						comentarios: {
							id: postComentario.id,
							autor: postComentario.autor,
							comentario: postComentario.comentario,
							extra1: postComentario.extra1,
							extra2: postComentario.extra2,
							extra3: postComentario.extra3,
						},
					},
				},
				variables: {
					idComentario: postComentario.id,
				},
			});
		},
	});

	const [patchReporte] = useMutation(PATCH_REPORTE);

	const [viewStorage, setViewStorage] = useLocalStorageState("transas_view", {
		defaultValue: [],
	});

	const [pestesStorage, setPestesStorage] = useLocalStorageState(
		"transas_pestes",
		{
			defaultValue: [],
		}
	);

	const chipFilter = (item) => {
		// console.log(item.id);//categoria
		router.push(
			`/categorys?Query=categorysId.equals=${item.id}&Category=Categoría:%20${item.categoria}&Page=0`
		);
	};

	const handleView = () => {
		// console.log("View", viewStorage);
		const findView = _.findIndex(viewStorage, (item) => item === Denuncia);
		// console.log("findView", findView);
		if (findView === -1) {
			setViewStorage([...viewStorage, Denuncia]);
			// console.log("findView Entro0");
			// console.log("findView Entro", dataReporte?.show?.informacion);
			let info = {};
			info = _.cloneDeep(dataReporte?.show?.informacion);
			// console.log("info", info);
			info.vistas = 0;
			info.vistas = dataReporte?.show?.informacion?.vistas
				? dataReporte?.show?.informacion?.vistas + 1
				: 1;
			patchInformacion({
				variables: {
					id: info.id,
					input: info,
				},
			});
		}
	};

	useEffect(() => {
		if (Denuncia) {
			getReporte({ variables: { idReporte: Denuncia } });
		}
	}, [Denuncia]);

	useEffect(() => {
		if (!loadingReporte && dataReporte) {
			// console.log("idCaso", dataReporte?.show?.casoText?.id);
			getCaso({ variables: { idCaso: dataReporte?.show?.casoText?.id } });
			handleView();
		}
	}, [loadingReporte]);

	const handleSubmitComentario = (e) => {
		// console.log("comentarioState", comentarioState);
		if ([...comentarioState].length > 0) {
			const request = {
				// autor:
				// 	session === null || session === undefined
				// 		? "Anonimo"
				// 		: session?.username,
				comentario: comentarioState,
				extra1: Denuncia,
				extra3: dataReporte?.show?.titulo,
			};
			let variables = {};
			variables.id = Denuncia;
			variables.comentarios = [request];
			// console.log("variables", variables);
			patchReporte({
				variables: {
					id: Denuncia,
					input: variables,
				},
			}).then((req) => {
				console.log("req", req);
			});

			setComentarioState("");
		}
	};

	const handlePestes = () => {
		const findView = _.findIndex(pestesStorage, (item) => item === Denuncia);
		let info = _.cloneDeep(dataReporte?.show?.informacion);
		if (findView === -1) {
			// console.log("entro agregar");
			setPestesStorage([...pestesStorage, Denuncia]);
			info.rating = dataReporte?.show?.informacion.rating + 1;
			// console.log("info", info);
		} else {
			// console.log("entro remove");
			let pestesArray = _.cloneDeep(pestesStorage);
			// console.log("entro remove1", pestesArray);
			_.remove(pestesArray, (item) => item === Denuncia);
			// console.log("entro remove2", pestesArray);
			setPestesStorage(pestesArray);
			info.rating = dataReporte?.show?.informacion.rating - 1;
		}
		patchInformacion({
			variables: {
				id: info.id,
				input: info,
			},
		}).then((res) => console.log("res", res));
	};

	//ordenar comentarios por id
	const comentariosArray = _.orderBy(
		dataReporte?.show?.comentarios,
		["id"],
		["desc"]
	);
	// console.log("comentariosArray", comentariosArray);
	const informacionItem = dataReporte?.show?.informacion;
	// console.log("dataReporte", dataReporte);

	// console.log("dataCaso", dataCaso);
	//TODO el Breadcrumbs debe traer la pagina de la que llega y el page debe estar en url por si gurdan en favoritos
	if (!loadingReporte && !loadingCaso && dataCaso && dataReporte) {
		return (
			<React.Fragment>
				<Head>
					<title>{`Transotas.org | ${dataReporte?.show?.titulo}`}</title>
					<meta name='robots' content='index, follow' />
					<link
						rel='canonical'
						href={`${process.env.NEXT_PUBLIC_URL}${router.asPath}`}
					/>
					<meta
						name='description'
						content={`Transota, ${dataReporte?.show?.caso}`}
					/>
					<meta property='og:type' content='website' />
					<meta
						property='og:title'
						content={`Transota, ${dataReporte?.show?.titulo}`}
					/>
					<meta
						property='og:description'
						content={`Transota, ${dataReporte?.show?.caso}`}
					/>
					<meta
						property='og:image'
						content={
							dataReporte?.show?.img ? dataReporte?.show?.img : "/transotas.jpg"
						}
					/>
					<meta
						property='og:url'
						content={`${process.env.NEXT_PUBLIC_URL}${router.asPath}`}
					/>
				</Head>
				<Box sx={{ p: 3, border: "1px dashed grey" }}>
					<Paper
						elevation={6}
						style={{
							padding: 24,
						}}>
						<Breadcrumbs
							separator={<NavigateNextIcon fontSize='small' color='primary' />}
							aria-label='Link al Inicio'>
							<NextLink href={`/?Page=${Page}`} shallow={true}>
								<Typography
									sx={{
										"&:hover": {
											textDecoration: "underline",
										},
									}}
									color='primary.main'>
									{`Inicio (${Page})`}
								</Typography>
							</NextLink>

							<Typography color='text.primary'>{`Transota,  ${dataReporte?.show?.titulo}`}</Typography>
						</Breadcrumbs>

						<Box
							sx={{ position: "relative", mt: 40 }}
							display='flex'
							justifyContent='center'
							alignItems='center'>
							{dataReporte?.show?.img ? (
								<img
									src={dataReporte?.show?.img}
									alt={`Transotas ${dataReporte?.show?.titulo}`}
									height='250'
								/>
							) : (
								<img src='/transotas.jpg' alt='Transotas' height='250' />
							)}

							<Box
								display='flex'
								sx={{
									position: "absolute",
									bottom: 0,
									left: 0,
									width: "100%",
									bgcolor: "rgba(142, 3, 45, 0.85)",
									color: "white",
									padding: "10px",
								}}>
								<Typography variant='h1' color='white'>
									{`Transota, ${dataReporte?.show?.titulo}`}
								</Typography>
							</Box>
						</Box>

						<Stack spacing={40}>
							<Typography variant='body1' color='secondary'>
								{`Denunciado por ${dataReporte?.show?.autor} el ${moment(
									dataReporte?.show?.fechaix
								).format("DD/MM/YY")} en 
								${dataReporte?.show?.estado}, ${dataReporte?.show?.ciudad}, 
								${dataReporte?.show?.pais}
								`}
							</Typography>

							<Typography
								variant='body1'
								color='text'
								style={{ whiteSpace: "pre-line" }}>
								{dataCaso?.show?.descripcion.replaceAll("\n", "\n\n")}
							</Typography>
						</Stack>

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
							<Tooltip
								title='Control de Pestes, ponganlo en primera plana.'
								arrow>
								<IconButton
									aria-label='vota Control de Pestes'
									onClick={handlePestes}>
									<Badge
										badgeContent={informacionItem?.rating}
										color='primary'
										max={999}
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "right",
										}}>
										<PestControlIcon
											color={
												_.findIndex(
													pestesStorage,
													(item) => item === Denuncia
												) === -1
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
										badgeContent={informacionItem?.vistas}
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
										badgeContent={informacionItem?.comentarios}
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
							{dataReporte?.show?.categorys?.map((item) => {
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
								{dataReporte?.show?.comentarios?.length === 0
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
					</Paper>
				</Box>
			</React.Fragment>
		);
	}
};

// export async function getStaticProps() {
// 	return {props:{
		
// 	}}
// }


export default Denuncia;
