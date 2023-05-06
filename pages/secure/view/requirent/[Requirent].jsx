import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";
import _ from "lodash";
import { patch, del, URL_COURSES, URL_REQUIRENTS } from "data/ApiData";
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
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
	ButtonGroup,
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
	Link,
	Pagination,
	Breadcrumbs,
	FormControl,
	InputLabel,
	Select,
} from "@mui/material";
import HeaderDeleteEdit from "models/HeaderDeleteEdit";
import DialogDelete from "models/DialogDelete";
import { updateArray } from "utils/arrays";

const Requirent = () => {
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const router = useRouter();
	const { Requirent, Course } = router.query;
	const [coursesIo, setCoursesIo] = useLocalStorageState("courses", {
		defaultValue: [],
	});
	const [courseIo, setCourseIo] = useLocalStorageState("course", {
		defaultValue: [],
	});
	const [requirentIo, setRequirentIo] = useLocalStorageState("requirent", {
		defaultValue: [],
	});

	const [requirentState, setRequirentState] = useState({});
	useEffect(() => {
		if (Requirent) {
			const dataio = courseIo.requirents.find((obj) => {
				return obj.id == Requirent;
			});
			setRequirentState(dataio);
			setRequirentIo(dataio);
			console.log("url query", router.query);
		}
	}, [Requirent]);

	const handleEdit = () => {
		console.log("Handle Edit", Course);
		router.push(
			`/secure/form/Requirents?Requirent=${Requirent}&Course=${Course}`
		);
	};

	const handleDelete1 = () => {
		console.log("Handle Delete1");
		setOpen(true);
	};

	//TODO sucios copia local cursos
	const handleDelete2 = async () => {
		setOpen(false);
		const newCourse = _.cloneDeep(courseIo);
		const req = newCourse.requirents;
		const removed = _.remove(req, (o) => o.id == Requirent);
		console.log("removed", removed);
		const returnRequirent = await patch(URL_COURSES, newCourse);
		console.log("response", returnRequirent);
		await del(URL_REQUIRENTS, Requirent);
		setCourseIo(newCourse);

		const newCourses = _.cloneDeep(coursesIo);

		updateArray(newCourses, newCourse);

		console.log("newCourses", newCourses);
		setCoursesIo(newCourses);

		router.push(`/secure/view/course/${newCourse.id}`);
	};

	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Stack direction='column' spacing={2}>
				<Breadcrumbs
					separator={<NavigateNextIcon fontSize='small' color='primary' />}
					aria-label='Link al Inicio'>
					<Link underline='hover' color='primary.main' href='/'>
						Inicio
					</Link>
					<Link
						underline='hover'
						color='primary.main'
						href='/secure/view/Courses'>
						Lista de Cursos
					</Link>
					<Link
						underline='hover'
						color='primary.main'
						href={`/secure/view/course/${courseIo?.id}`}>
						{`${courseIo?.name}`}
					</Link>
					<Typography color='text.primary'>{`Requermiento: ${requirentState?.code}`}</Typography>
				</Breadcrumbs>
				<br />
				<HeaderDeleteEdit
					title={`${requirentState?.code}`}
					onDelete={handleDelete1}
					onEdit={handleEdit}
				/>
			</Stack>
			<br />
			<Stack direction='column' spacing={2}>
				<Typography variant='body1' color='text'>
					{`Tipo: ${
						requirentState?.kind === "CERTIFICATE"
							? "Certificado"
							: requirentState?.kind === "ONTHEJOB"
							? "On the job"
							: requirentState?.kind === "COURSE"
							? "Curso"
							: requirentState?.kind
					}`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Descripción: ${requirentState?.description}`}
				</Typography>
				<Typography variant='body1' color='text'>
					{`Meses de expiración: ${requirentState?.expirationInMonth}`}
				</Typography>
			</Stack>

			<DialogDelete
				onOpen={open}
				on_Close={handleClose}
				onCancel={handleClose}
				onOk={handleDelete2}
			/>
		</Box>
	);
};

export default Requirent;
