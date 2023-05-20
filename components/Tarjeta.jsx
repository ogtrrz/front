import * as React from "react";
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


export default function Tarjeta({ item }) {
	return (
		<Card sx={{ maxWidth: 340 }}>
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
			</CardActions>
			<br />
		</Card>
	);
}
