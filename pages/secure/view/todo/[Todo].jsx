import React, { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
import { patch, del, URL_EMPLOYEES, URL_TO_DOS } from "data/ApiData";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
} from "@mui/material";

const Todo = () => {
	const router = useRouter();
	const { Todo } = router.query;
	const [employeeIo, setEmployeeIo] = useLocalStorageState("employee", {
		defaultValue: [],
	});
	const [todoIo, setTodoIo] = useLocalStorageState("todo", {
		defaultValue: [],
	});
	const [todoState, setTodoState] = useState();
	useEffect(() => {
		if (Todo) {
			const dataio = employeeIo.todos.find((obj) => {
				return obj.id == Todo;
			});
			console.log("dataio", dataio);
			setTodoState(dataio);
			setTodoIo(dataio);
			// getTodo();
		}
	}, [Todo]);

	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};

	const handleEdit = () => {
		console.log("Handle Edit");
		router.push(`/secure/form/Todo?Todo=${Todo}`);
	};

	const handleDelete1 = () => {
		console.log("Handle Delete1");
		setOpen(true);
	};
	const handleDelete2 = async () => {
		setOpen(false);
		const clone = _.cloneDeep(employeeIo);
		const todos = clone.todos;
		const removed = _.remove(todos, (o) => o.id == Todo);
		console.log("removed", removed);
		const returnTodo = await patch(URL_EMPLOYEES, clone);
		console.log("response", returnTodo);
		await del(URL_TO_DOS, Todo);
		setEmployeeIo(clone);
		router.push(`/secure/view/employee/${clone.id}`);
	};

	return (
		<>
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
				{todoState?.description}
			</Typography>
			<Typography variant='body1' color='text'>
				{todoState?.state}
			</Typography>
			<Typography variant='body1' color='text'>
				{todoState?.date}
			</Typography>
			<Typography variant='body1' color='text'>
				{todoState?.link}
			</Typography>

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

export default Todo;
