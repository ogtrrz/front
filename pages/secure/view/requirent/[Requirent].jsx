import React, { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import _ from "lodash";
import { patchCourse } from "../../../../data/patchCourse";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
	ButtonGroup,
} from "@mui/material";

// const Alert = React.forwardRef(function Alert(props, ref) {
// 	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
// });

const Requirent = () => {
	// const [openSnack, setOpenSnack] = useState(false);

	// const handleClickSnack = () => {
	// 	setOpenSnack(true);
	// };

	// const handleCloseSnack = (event, reason) => {
	// 	if (reason === "clickaway") {
	// 		return;
	// 	}

	// 	setOpenSnack(false);
	// };

	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const router = useRouter();
	const { Requirent, Course } = router.query;

	// async function getRequirent() {
	// 	const config = {
	// 		method: "get",
	// 		url: `${process.env.NEXT_PUBLIC_API_REST}requirents/${Requirent}`,
	// 		headers: {},
	// 	};

	// 	await axios(config)
	// 		.then(function (response) {
	// 			console.log(response.data);
	// 			setRequirentState(response.data);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// }
	const handleDelete2 = async () => {
		setOpen(false);
		const clone = _.cloneDeep(courseIo);
		const req = clone.requirents;
		const removed = _.remove(req, (o) => o.id == Requirent);
		console.log("removed", removed);
		const config = {
			method: "patch",
			url: `${process.env.NEXT_PUBLIC_API_REST}courses/${clone.id}`,
			headers: {
				"Content-Type": "application/json",
			},
			data: clone,
		};

		await axios(config)
			.then(function (response) {
				console.log("response", JSON.stringify(response.data));
				setCourseIo(clone);
				router.push(`/secure/view/course/${clone.id}`);

				var config = {
					method: "delete",
					url: `${process.env.NEXT_PUBLIC_API_REST}requirents/${removed[0].id}`, //"http://localhost:8080/api/requirents/1017",
					headers: {},
				};

				axios(config)
					.then(function (response) {
						console.log("Borrado exitosamente");
						// return (
						// 	<Snackbar
						// 		open={openSnack}
						// 		autoHideDuration={6000}
						// 		onClose={handleCloseSnack}>
						// 		<Alert
						// 			onClose={handleCloseSnack}
						// 			severity='success'
						// 			sx={{ width: "100%" }}>
						// 			Mensaje Borrado!
						// 		</Alert>
						// 	</Snackbar>
						// );
					})
					.catch(function (error) {
						console.log(error);
					});
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	const [courseIo, setCourseIo] = useLocalStorageState(
		"course",
		{
			defaultValue: [],
		}
	);
	const [requirentIo, setRequirentIo] = useLocalStorageState(
		"requirent",
		{
			defaultValue: [],
		}
	);
	
	const [requirentState, setRequirentState] = useState();
	useEffect(() => {
		if (Requirent) {
			const dataio = courseIo.requirents.find((obj) => {
				return obj.id == Requirent;
			});
			setRequirentState(dataio);
			setRequirentIo(dataio);
			console.log('url query',router.query);
			// getRequirent();
		}
	}, [Requirent]);

	const handleEdit = () => {
		console.log("Handle Edit", Course);
		router.push(`/secure/form/Requirents?Requirent=${Requirent}&Course=${Course}`)

	};

	const handleDelete1 = () => {
		console.log("Handle Delete1");
		setOpen(true);
	};

	return (
		<>
			<Paper>
				<Stack direction='column' spacing={2}>
					<Stack direction='row' spacing={2}>
						<Button
							variant='outlined'
							endIcon={<DeleteIcon />}
							onClick={handleDelete1}>
							Borrar
						</Button>
						<Button
							variant='contained'
							endIcon={<ModeEditIcon />}
							onClick={handleEdit}>
							Editar
						</Button>
					</Stack>

					<Typography variant='h6' color='primary'>
						{requirentState?.code}
					</Typography>
					<Typography variant='body1' color='text'>
						{requirentState?.kind === "CERTIFICATE"
							? "Certificado"
							: requirentState?.kind === "ONTHEJOB"
							? "On the job"
							: requirentState?.kind === "COURSE"
							? "Curso"
							: requirentState?.kind}
					</Typography>
					<Typography variant='body1' color='text'>
						{requirentState?.description}
					</Typography>
					<Typography variant='body1' color='text'>
						{requirentState?.expirationInMonth}
					</Typography>
				</Stack>
			</Paper>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title' color='primary'>
					Borrar
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Esta seguro que quiere borrar los datos, no podrán ser recuperados.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant='outlined'
						onClick={handleClose}
						endIcon={<CancelIcon />}>
						Cancelar
					</Button>
					<Button
						variant='contained'
						onClick={handleDelete2}
						autoFocus
						endIcon={<CheckCircleIcon />}>
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Requirent;
