/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import { useRouter } from "next/router";
import { graphql } from "@apollo/client/react/hoc";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import {
	Paper,
	Box,
	Typography,
	Chip,
	Stack,
	Divider,
	Breadcrumbs,
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

// import IconButton from "material-ui/IconButton";
// import ActionHome from "material-ui/svg-icons/action/home";

// import Image from "../img/main.jpg"; // Import using relative path
// <Paper sx={{ backgroundImage: `url(${Image})` }}></Paper>;

//TODO read from cache if exist o el manejo es automatico???
const ReporteQuery = gql`
	query REPORTE_QUERY($idReporte: String!) {
		show(id: $idReporte) @rest(type: "Reporte", path: "reportes/:id") {
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
		show(id: $idCaso) @rest(type: "Caso", path: "caso-texts/:id") {
			id @export(as: "showId")
			descripcion
		}
	}
`;

const Denuncia = () => {
	const router = useRouter();
	const { Denuncia } = router.query;
	const [ReporteId, setReporteId] = useState(0);
	const [CasoId, setCasoId] = useState(0);
	// const ReporteId = "104261";
	const [
		getReporte,
		{ loading: loadingReporte, error: errorReporte, data: dataReporte },
	] = useLazyQuery(ReporteQuery, {
		variables: { idReporte: ReporteId },
		// fetchPolicy: "cache-and-network",
		// nextFetchPolicy: "cache-first",
	});

	// const CasoId = "104222";

	const [getCaso, { loading: loadingCaso, error: errorCaso, data: dataCaso }] =
		useLazyQuery(CasoQuery, {
			variables: { idCaso: CasoId },
		});

	useEffect(() => {
		if (Denuncia) {
			getReporte({ variables: { idReporte: Denuncia } });
		}
	}, [Denuncia]);

	useEffect(() => {
		console.log(
			`loadingReport ============================ ${!loadingReporte}`
		);

		if (!loadingReporte && dataReporte) {
			console.log("idCaso", dataReporte?.show?.casoText?.id);
			getCaso({ variables: { idCaso: dataReporte?.show?.casoText?.id } });
		}
	}, [loadingReporte]);

	// console.log("caso", dataCaso?.show?.descripcion);
	//TODO el Breadcrumbs debe traer la pagina de la que llega y el page debe estar en url por si gurdan en favoritos
	if (!loadingReporte && !loadingCaso && dataCaso && dataReporte) {
		return (
			<Box sx={{ p: 3, border: "1px dashed grey" }}>
				<Paper
					elevation={6}
					style={{
						padding: 24,
					}}>
					<Breadcrumbs
						separator={<NavigateNextIcon fontSize='small' color='primary' />}
						aria-label='Link al Inicio'>
						<NextLink href={`/`} passHref>
							<Typography
								sx={{
									"&:hover": {
										textDecoration: "underline",
									},
								}}
								color='primary.main'>
								Inicio
							</Typography>
						</NextLink>

						<Typography color='text.primary'>{`Transota:  ${dataReporte?.show?.titulo}`}</Typography>
					</Breadcrumbs>
					<br />
					<Box
						sx={{ position: "relative" }}
						display='flex'
						justifyContent='center'
						alignItems='center'>
						{dataReporte?.show?.img ? (
							<img
								src={dataReporte?.show?.img}
								alt={dataReporte?.show?.titulo}
								height='250'
							/>
						) : (
							<img
								src='/transotas.jpg'
								alt={dataReporte?.show?.titulo}
								height='250'
							/>
						)}

						<Box
							display='flex'
							sx={{
								position: "absolute",
								bottom: 0,
								left: 0,
								width: "100%",
								bgcolor: "rgba(0, 0, 0, 0.54)",
								color: "white",
								padding: "10px",
							}}>
							<Typography variant='h6' color='white'>
								{`Transota; ${dataReporte?.show?.titulo}`}
							</Typography>
						</Box>
					</Box>
					<Divider light />
					<Typography variant='body1' color='secondary'>
						{`Denunciado el, ${moment(dataReporte?.show?.fechaix).format(
							"DD/MM/YY"
						)} en 
							${dataReporte?.show?.estado}, ${dataReporte?.show?.ciudad}, 
							${dataReporte?.show?.pais}
						`}
						<p />
					</Typography>
					<p />
					<Typography
						variant='body1'
						color='text'
						style={{ whiteSpace: "pre-line" }}>
						{dataCaso?.show?.descripcion.replaceAll("\n", "\n\n")}
					</Typography>

					{/* <Typography variant='h6' color='text'>
						{`Transota de ${dataReporte?.show?.titulo}`}
					</Typography> */}
					<p>.</p>

					<Stack direction='row' spacing={2}>
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
						<Tooltip title='Comentar la Transota.' arrow>
							<IconButton aria-label='Comentar la denuncia'>
								<Badge
									badgeContent={dataReporte?.show?.comentarios?.length}
									color='primary'
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}>
									<ReviewsIcon />
								</Badge>
							</IconButton>
						</Tooltip>
						<Tooltip
							title='Control de Pestes, ponganlo en primera plana.'
							arrow>
							<IconButton aria-label='vota Control de Pestes'>
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
					</Stack>
					<p />
					<Stack direction='row' spacing={2}>
						{dataReporte?.show?.categorys?.map((item) => {
							return (
								<Chip
									key={item.id}
									label={`${item.categoria}`}
									variant='outlined'
								/>
							);
						})}
					</Stack>
					<p />
					<Divider light />
					<p />
					<Typography
						variant='subtitle2'
						color='text'
						style={{ whiteSpace: "pre-line" }}>
						{dataReporte?.show?.comentarios?.length === 0
							? `Sea el primero en Comentar`
							: `Comentarios`}
					</Typography>
					<br />
					{dataReporte?.show?.comentarios.map((item) => {
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
		);
	}
};

export default Denuncia;
