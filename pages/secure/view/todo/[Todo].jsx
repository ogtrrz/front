import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
import moment from "moment";
import { patch, del, URL_EMPLOYEES, URL_TO_DOS } from "data/ApiData";
import HeaderDeleteEdit from "models/HeaderDeleteEdit";
import HeaderNew from "models/HeaderNew";
import DialogDelete from "models/DialogDelete";
import ReqTrainEvidence from "models/ReqTrainEvidence";
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
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Breadcrumbs,
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
		// console.log("Handle Edit");
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
		// router.push(`/secure/view/employee/${clone.id}`);
	};

	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Stack direction='column' spacing={2}>
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
					<NextLink href={`/secure/view/employee/${employeeIo.id}`} passHref>
						<Typography
							sx={{
								"&:hover": {
									textDecoration: "underline",
								},
							}}
							color='primary.main'>
							Mis Datos
						</Typography>
					</NextLink>
					<Typography color='text.primary'>{`Tarea: ${todoState?.description}`}</Typography>
				</Breadcrumbs>
				<HeaderDeleteEdit
					title={`${todoState?.description}`}
					onDelete={handleDelete1}
					onEdit={handleEdit}
				/>

				<Typography variant='body1' color='text'>
					{`Estatus: ${todoState?.state}`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Creado: ${moment(todoState?.date).format("DD/MM/YYYY")}`}
				</Typography>
				<NextLink
					href={`/files${todoState?.link}?format=webp&height=800&q=80`}
					passHref
					target='_'>
					<Typography
						color='secondary.main'
						sx={{
							"&:hover": {
								textDecoration: "underline",
							},
						}}>
						{`Ver archivo: ${todoState?.extra1}`}
					</Typography>
				</NextLink>

				<DialogDelete
					onOpen={open}
					on_Close={handleClose}
					onCancel={handleClose}
					onOk={handleDelete2}
				/>
			</Stack>
		</Box>
	);
};

export default Todo;
