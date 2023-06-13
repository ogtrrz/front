/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import Image from "next/image";
import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";
//cloneDeep findIndex
import moment from "moment";
import { useRouter } from "next/router";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import useLocalStorageState from "use-local-storage-state";
// import { useSession } from "next-auth/react";
import DenunciaDynamicFooter from "components/DenunciaDynamicFooter";
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

// const PATCH_REPORTE = gql`
// 	mutation PatchReporte($id: Int!, $input: ReporteRequest!) {
// 		patchReporte(id: $id, input: $input)
// 			@rest(
// 				type: "Reporte"
// 				path: "/reportes2/{args.id}"
// 				method: "PATCH"
// 				bodyKey: "input"
// 			) {
// 			id
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

const Denuncia = (props) => {
	const { data, caso } = props;
	// console.log("props", props);

	const router = useRouter();
	const { Denuncia, Pages } = router.query;
	// const { data: session } = useSession();

	// const [comentarioState, setComentarioState] = useState("");
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
	// 	{
	// 		loading: lodingComentario,
	// 		error: errorComentario,
	// 		data: dataComentarios,
	// 	},
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

	// const [patchReporte] = useMutation(PATCH_REPORTE);

	const [viewStorage, setViewStorage] = useLocalStorageState("transas_view", {
		defaultValue: [],
	});

	// const [pestesStorage, setPestesStorage] = useLocalStorageState(
	// 	"transas_pestes",
	// 	{
	// 		defaultValue: [],
	// 	}
	// );

	// const chipFilter = (item) => {
	// 	// console.log(item.id);//categoria
	// 	router.push(
	// 		`/categorys?Query=categorysId.equals=${item.id}&Category=Categoría:%20${item.categoria}&Pages=0`
	// 	);
	// };

	const handleView = () => {
		// console.log("View", viewStorage);
		const findView = findIndex(viewStorage, (item) => item === Denuncia);
		// console.log("findView", findView);
		if (findView === -1) {
			setViewStorage([...viewStorage, Denuncia]);
			// console.log("findView Entro0");
			// console.log("findView Entro", data.informacion);
			let info = {};
			info = cloneDeep(data.informacion);
			// console.log("info", info);
			info.vistas = 0;
			info.vistas = data.informacion?.vistas ? data.informacion?.vistas + 1 : 1;
			patchInformacion({
				variables: {
					id: info.id,
					input: info,
				},
			});
		}
	};

	// useEffect(() => {
	// 	if (Denuncia) {
	// 		getReporte({ variables: { idReporte: Denuncia } });
	// 	}
	// }, [Denuncia]);

	const [vista, setVista] = useState(true);

	useEffect(() => {
		if (vista) {
			handleView();
			setVista(false);
		}
	}, []);

	// const handleSubmitComentario = (e) => {
	// 	// console.log("comentarioState", comentarioState);
	// 	if ([...comentarioState].length > 0) {
	// 		const request = {
	// 			// autor:
	// 			// 	session === null || session === undefined
	// 			// 		? "Anonimo"
	// 			// 		: session?.username,
	// 			comentario: comentarioState,
	// 			extra1: Denuncia,
	// 			extra3: data.titulo,
	// 		};
	// 		let variables = {};
	// 		variables.id = Denuncia;
	// 		variables.comentarios = [request];
	// 		// console.log("variables", variables);
	// 		patchReporte({
	// 			variables: {
	// 				id: Denuncia,
	// 				input: variables,
	// 			},
	// 		}).then((req) => {
	// 			console.log("req", req);
	// 		});

	// 		setComentarioState("");
	// 	}
	// };

	// const handlePestes = () => {
	// 	const findView = _.findIndex(pestesStorage, (item) => item === Denuncia);
	// 	let info = _.cloneDeep(data.informacion);
	// 	if (findView === -1) {
	// 		// console.log("entro agregar");
	// 		setPestesStorage([...pestesStorage, Denuncia]);
	// 		info.rating = data.informacion.rating + 1;
	// 		// console.log("info", info);
	// 	} else {
	// 		// console.log("entro remove");
	// 		let pestesArray = _.cloneDeep(pestesStorage);
	// 		// console.log("entro remove1", pestesArray);
	// 		_.remove(pestesArray, (item) => item === Denuncia);
	// 		// console.log("entro remove2", pestesArray);
	// 		setPestesStorage(pestesArray);
	// 		info.rating = data.informacion.rating - 1;
	// 	}
	// 	patchInformacion({
	// 		variables: {
	// 			id: info.id,
	// 			input: info,
	// 		},
	// 	}).then((res) => console.log("res", res));
	// };

	//ordenar comentarios por id
	// const comentariosArray = _.orderBy(data.comentarios, ["id"], ["desc"]);
	// console.log("comentariosArray", comentariosArray);
	// const informacionItem = data.informacion;
	// console.log("dataReporte", dataReporte);

	// console.log("dataCaso", dataCaso);
	// if (!loadingReporte && !loadingCaso && dataCaso && dataReporte)

	return (
		<React.Fragment>
			<Head>
				<title>{`Transotas | ${data.titulo.substring(0, 48)}`}</title>
				<meta name='robots' content='index, follow' />
				<link
					rel='canonical'
					href={`${process.env.NEXT_PUBLIC_URL}${router.asPath}`}
				/>
				<meta
					name='description'
					content={`Transota, ${data.caso.substring(0, 159)}`}
				/>
				<meta property='og:type' content='website' />
				<meta
					property='og:title'
					content={`Transota, ${data.titulo.substring(0, 48)}`}
				/>
				<meta
					property='og:description'
					content={`Transota, ${data.caso.substring(0, 159)}`}
				/>
				<meta
					property='og:image'
					content={data.img ? data.img : "/transotas.jpg"}
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
					<br />
					<Breadcrumbs
						separator={<NavigateNextIcon fontSize='small' color='primary' />}
						aria-label='Link al Inicio'>
						<NextLink
							href={`/view/wrapper/${Pages ? Pages : 1}`}
							shallow={false}>
							<Typography
								sx={{
									"&:hover": {
										textDecoration: "underline",
									},
								}}
								color='primary.main'>
								{`Inicio (${Pages})`}
							</Typography>
						</NextLink>

						<Typography color='text.primary'>{`Transota,  ${data.titulo}`}</Typography>
					</Breadcrumbs>
					<br />
					<Box
						sx={{ position: "relative", mt: 40, overflow: "hidden" }}
						display='flex'
						justifyContent='center'
						alignItems='center'>
						{data.img ? (
							<Image
								src={data.img}
								alt={`Transotas ${data.titulo}`}
								height={250}
								width={250}
								style={{ objectFit: "cover" }}
								priority={true}
							/>
						) : (
							<Image
								src='/transotas.jpg'
								alt='Transotas'
								height={250}
								width={250}
								style={{ objectFit: "cover" }}
							/>
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
								{`Transota, ${data.titulo}`}
							</Typography>
						</Box>
					</Box>

					<Stack spacing={40}>
						<Typography variant='body1' color='secondary'>
							{`Denunciado el ${moment(data.fechaix).format("DD/MM/YY")} en 
								${data.estado}, ${data.ciudad}, 
								${data.pais}
								`}
						</Typography>

						<Typography
							variant='body1'
							color='text'
							style={{ whiteSpace: "pre-line" }}>
							{caso.descripcion.replaceAll("\n", "\n\n")}
						</Typography>
					</Stack>
					{/* Partir aqui */}
					<DenunciaDynamicFooter data={data} />
				</Paper>
			</Box>
		</React.Fragment>
	);
};

export default React.memo(Denuncia);

export async function getStaticProps(context) {
	const { params } = context;
	const Denuncia = params.Denuncia;
	const resp = await fetch(
		`${process.env.NEXT_PUBLIC_SPRING}/api/reportes/${Denuncia}`
	);
	const data = await resp.json();

	const res2 = await fetch(
		`${process.env.NEXT_PUBLIC_SPRING}/api/caso-texts/${data.casoText.id}`
	);
	const caso = await res2.json();

	if (!data || !caso) {
		return {
			notFound: true,
		};
	}
	return {
		props: { data: data, caso: caso },
		// revalidate: 86400,
		// notFound: true, //regresa el 404
		// redirect: { //redirecciona a la pagina
		// 	destination: '/no-data'
		// }
	};
}

export async function getStaticPaths() {
	const resp = await fetch(
		`${process.env.NEXT_PUBLIC_SPRING}/api/reportes?&page=0&size=100&sort=id,desc`
	);
	const data = await resp.json();

	const ids = data.map((item) => item.id + "");
	const pathsWithParams = ids.map((id) => ({ params: { Denuncia: id + "" } }));

	return {
		paths: pathsWithParams,
		fallback: "blocking",
	};
}

// export async function getStaticProps() {
// 	return {props:{

// 	}}
// }

// export async function getStaticProps(context) { //no cambia con frecuencia pero no funciona con paginas dinamicas
// debemos crear getStaticPaths() {...}
// export async function getServerSideProps(context) { //cambia con frecuencia

// const {params} = setContext
// const denuncia = params.Denuncia

// 	const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING}/api/reportes`);
// 	const data = await res.json();
// 	if (!data) {
// 		return {
// 			notFound: true,
// 		};
// 	}
// 	// console.log("data", data);
// 	return {
// 		props: { data: data },

// 		// revalidate: 10,
// 		// notFound: true, //regresa el 404
// 		// redirect: { //redirecciona a la pagina
// 		// 	destination: '/no-data'
// 		// }
// 	};
// }

// export async function getSaticPaths() {
// 	return {
// 		paths: [
// 			{params: { Denuncia: 'denuncia1' }}
// {params: { Denuncia: 'denuncia2 }}
// {params: { Denuncia: 'denuncia3' }}
// 		],
// fallback: false|true|'blocking' //ojo ver notas abajo es un key word o el otro
// si se pone fallback: 'blocking' no necesitamo hacer lo de abajo
// 	}
// }

// Ver capitulo 104 nextjs
// se debe agregar if(!props) {
// 	return <p>loading ...</p>
// }
