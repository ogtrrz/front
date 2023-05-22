import * as React from "react";
import NextLink from "next/link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import moment from "moment";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PestControlIcon from "@mui/icons-material/PestControl";
import ReviewsIcon from "@mui/icons-material/Reviews";
//import VisibilityIcon from '@mui/icons-material/Visibility';
import AdsClickIcon from "@mui/icons-material/AdsClick";
import { graphql } from "@apollo/client/react/hoc";
import gql from "graphql-tag";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";

export const PATCH_INFORMACION = gql`
	mutation PatchInformacion($id: Int!, $input: InformacionRequest!) {
		patchInformacion(id: $id, input: $input)
			@rest(
				type: "Informacion"
				path: "/informacions/:id"
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

export default function Tarjeta({ item }) {
	//TODO actualizar cache con respuesta
	// https://thinkster.io/tutorials/boost-your-react-apps-with-apollo-beyond-the-basics/updating-the-cache-after-adding-a-habit

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
	//TODO actualizar cache con respuesta
	const handlePestes = () => {
		// console.log("Pestes");
		const request = {
			id: item.informacion.id,
			comentarios: 3,
			vistas: 1000,
			rating: 100,
		};
		// console.log("request", request);
		patchInformacion({
			variables: {
				id: item.informacion.id,
				input: request,
			},
		});
	};

	console.log("data", data);

	return (
		<Card sx={{ maxWidth: 340 }}>
			<NextLink href={`/view/denuncia/${item?.id}`} passHref>
				<CardMedia sx={{ height: 140 }} image={item?.img} title='Transotas' />
				<CardContent>
					<Typography gutterBottom variant='subtitle2' component='div'>
						{item?.titulo}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{`${item?.caso}...`}
					</Typography>
					<br />
					<Typography variant='body2' color='text.secondary'>
						{`el ${moment(item?.fechaix).format("DD/MM/YY")}, en ${
							item?.estado
						}, ${item?.ciudad}, ${item?.pais}`}
					</Typography>
					<br />
					<Typography variant='body2' color='text.secondary'>
						{`Ayudenos a compartir, para ver a los Transotas poner ojos de chonito.`}
					</Typography>
				</CardContent>
			</NextLink>
			<CardActions>
				<Tooltip title='Facebookea al Transota' arrow>
					<IconButton aria-label='denunciar por Facebook'>
						<Badge
							badgeContent={4}
							color='primary'
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}>
							<FacebookIcon />
						</Badge>
					</IconButton>
				</Tooltip>
				<Tooltip title='Twittazzzo al Transota' arrow>
					<IconButton aria-label='denunciar por Twitter'>
						<Badge
							badgeContent={3}
							color='primary'
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}>
							<TwitterIcon />
						</Badge>
					</IconButton>
				</Tooltip>
				<Tooltip title='Comentar la denuncia.' arrow>
					<IconButton aria-label='Comentar la denuncia'>
						<Badge
							badgeContent={item.informacion.comentarios}
							color='primary'
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}>
							<ReviewsIcon />
						</Badge>
					</IconButton>
				</Tooltip>
				<Tooltip title='Control de Pestes, ponganlo en primera plana.' arrow>
					<IconButton
						aria-label='vota Control de Pestes'
						onClick={handlePestes}>
						<Badge
							badgeContent={1}
							color='primary'
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}>
							<PestControlIcon />
						</Badge>
					</IconButton>
				</Tooltip>
				<Tooltip title='Clicks realizados por la comunidad.' arrow>
					<IconButton aria-label='Número de clicks'>
						<Badge
							badgeContent={1}
							color='primary'
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}>
							<AdsClickIcon />
						</Badge>
					</IconButton>
				</Tooltip>
			</CardActions>
			<br />
		</Card>
	);
}
