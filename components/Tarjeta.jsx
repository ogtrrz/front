import React, { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import _ from "lodash";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import moment from "moment";
import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
import PestControlIcon from "@mui/icons-material/PestControl";
import ReviewsIcon from "@mui/icons-material/Reviews";
//import VisibilityIcon from '@mui/icons-material/Visibility';
import AdsClickIcon from "@mui/icons-material/AdsClick";
// import { graphql } from "@apollo/client/react/hoc";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import useLocalStorageState from "use-local-storage-state";
import { FacebookShareButton } from "react-share";
// import { setContext } from "@apollo/client/link/context";

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

export default function Tarjeta({ item, Page }) {
	//TODO actualizar cache con respuesta
	// https://thinkster.io/tutorials/boost-your-react-apps-with-apollo-beyond-the-basics/updating-the-cache-after-adding-a-habit

	// console.log("item", item);

	const [pestesStorage, setPestesStorage] = useLocalStorageState(
		"transas_pestes",
		{
			defaultValue: [],
		}
	);

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
							id: item.id,
							informacion: {
								comentarios: patchInformacion.comentarios,
								vistas: patchInformacion.vistas,
								rating: patchInformacion.rating,
							},
						},
					},
					variables: {
						idReporte: item.id,
					},
				});
			},
		}
	);

	const [pestesBadge, setPestesBadge] = useState(item?.informacion?.rating);

	//TODO actualizar cache con respuesta
	// https://infinum.com/handbook/frontend/react/recipes/caching-nextjs-public-folder
	const handlePestes = () => {
		console.log("Pestes");
		const findView = _.findIndex(pestesStorage, (it) => it === item.id + "");

		let info = _.cloneDeep(item?.informacion);
		if (findView === -1) {
			// console.log("entro agregar");
			setPestesStorage([...pestesStorage, item.id + ""]);
			info.rating = item?.informacion?.rating + 1;
			// console.log("info", info);
		} else {
			// console.log("entro remove");
			let pestesArray = _.cloneDeep(pestesStorage);
			// console.log("entro remove1", pestesArray);
			_.remove(pestesArray, (it) => it === item.id + "");
			// console.log("entro remove2", pestesArray);
			setPestesStorage(pestesArray);
			info.rating = item?.informacion?.rating;
		}

		setPestesBadge(info.rating);

		patchInformacion({
			variables: {
				id: info.id,
				input: info,
			},
		});
	};

	// const handleAddVista = (e, item) => {
	// 	console.log("click en id", item.informacion.id);
	// 	console.log("click en vistas", item.informacion.vistas);
	// 	let infoVistas = _.cloneDeep(item.informacion);
	// 	infoVistas.vistas = item.informacion.vistas + 1;
	// 	patchInformacion({
	// 		variables: {
	// 			id: infoVistas.id,
	// 			input: infoVistas,
	// 		},
	// 	});
	// };

	// console.log("data", data);
	return (
		<Card
			sx={{ maxWidth: 340 }}
			style={{
				display: "flex",
				justifyContent: "space-between",
				flexDirection: "column",
			}}>
			<NextLink
				href={`/view/denuncia/${item?.id}?Pages=${Page}&slug=${_.kebabCase(
					item?.titulo.replace(/[\W_]+/g, "-")
				)}`}
				passHref>
				<CardMedia sx={{ height: 140 }}>
					<div style={{ position: "relative", overflow: "hidden" }}>
						<Image
							src={item?.img ? item.img : "/transotas.jpg"}
							alt={`Transotas.org ${item?.titulo}`}
							width={350}
							height={135}
							style={{ objectFit: "cover" }}
						/>
					</div>
				</CardMedia>
				<CardContent>
					<div align='left'>
						<Typography gutterBottom variant='h2' component='div'>
							{item?.titulo}
						</Typography>
						<Typography variant='body2' color='text'>
							{`${item?.caso}...`}
						</Typography>
						<br />
						<Typography variant='body2' color='secondary'>
							{`el ${moment(item?.fechaix).format("DD/MM/YY")}, en ${
								item?.estado
							}, ${item?.ciudad}, ${item?.pais}`}
						</Typography>
						<br />
						<Typography variant='body2' color='secondary'>
							{`Ayudenos a compartir, para ver a los Transotas poner ojos de chonito.`}
						</Typography>
					</div>
				</CardContent>
			</NextLink>
			<CardActions>
				&nbsp;&nbsp;
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
				&nbsp;&nbsp;
				<Tooltip title='Control de Pestes, ponganlo en primera plana.' arrow>
					<IconButton
						aria-label='vota Control de Pestes'
						onClick={handlePestes}>
						<Badge
							badgeContent={pestesBadge}
							color='primary'
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}>
							<PestControlIcon
								color={
									_.findIndex(pestesStorage, (it) => it === item.id + "") === -1
										? ""
										: "secondary"
								}
							/>
						</Badge>
					</IconButton>
				</Tooltip>
				&nbsp;&nbsp;
				<Tooltip title='Personas que lo han visto.' arrow>
					<span aria-label='Número de vistas'>
						<Badge
							badgeContent={
								item?.informacion?.vistas ? item?.informacion?.vistas : 0
							}
							color='primary'
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}>
							<AdsClickIcon />
						</Badge>
					</span>
				</Tooltip>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<Tooltip title='Total de comentarios.' arrow>
					<span aria-label='Total de comentarios'>
						<Badge
							badgeContent={
								item?.informacion?.comentarios
									? item?.informacion?.comentarios
									: 0
							}
							color='primary'
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}>
							<ReviewsIcon />
						</Badge>
					</span>
				</Tooltip>
			</CardActions>
			<br />
		</Card>
	);
}
