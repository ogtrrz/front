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
import { Paper, Box, Typography, Chip, Stack, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
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

const ReporteQuery = gql`
	query ($idReporte: String!) {
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
	query ($idCaso: String!) {
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

	if (!loadingReporte && !loadingCaso) {
		return (
			<Box sx={{ p: 3, border: "1px dashed grey" }}>
				<Paper
					elevation={6}
					style={{
						padding: 24,
					}}>
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
								{`Transota de ${dataReporte?.show?.titulo}`}
							</Typography>
						</Box>
					</Box>

					{/* <Typography variant='h6' color='text'>
						{`Transota de ${dataReporte?.show?.titulo}`}
					</Typography> */}
					<Typography variant='body1' color='secondary'>
						{`Denunciado el, ${moment(dataReporte?.show?.fechaix).format(
							"D [del] M [del] YY"
						)} en 
						${dataReporte?.show?.estado}, ${dataReporte?.show?.ciudad}, ${
							dataReporte?.show?.pais
						}`}
					</Typography>
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
						<Tooltip title='Comentar la denuncia.' arrow>
							<IconButton aria-label='Comentar la denuncia'>
								<Badge
									badgeContent={dataReporte?.show?.informacion.comentarios}
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
					<Divider light />
					<p />
					<Typography
						variant='body1'
						color='text'
						style={{ whiteSpace: "pre-line" }}>
						{dataCaso?.show?.descripcion}
					</Typography>
					<p />
					<Divider light />
					<p />
					<Typography
						variant='subtitle2'
						color='text'
						style={{ whiteSpace: "pre-line" }}>
						Comentarios
					</Typography>
					<br />
					{dataReporte?.show?.comentarios.map((item) => {
						return (
							<React.Fragment key={item.id}>
								<Typography variant='body1' color='text'>
									{item.comentario}
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
