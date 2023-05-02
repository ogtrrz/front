import React, { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
import { post, patch, URL_REQUIRENTS, URL_COURSES } from "data/ApiData";
import _ from "lodash";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
	Autocomplete,
	TextField,
	Select,
	Switch,
	ToggleButtonGroup,
} from "formik-mui";
import {
	TimePicker,
	DatePicker,
	DateTimePicker,
} from "formik-mui-x-date-pickers";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
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
} from "@mui/material";

const kind = [
	{
		key: "CERTIFICATE",
		value: "Certificado",
	},
	{
		key: "ONTHEJOB",
		value: "En el Trabajo",
	},
	{
		key: "COURSE",
		value: "Curso",
	},
];

const Requirents = () => {
	const [kindState, setKindState] = useState();

	const [coursesIo, setCoursesIo] = useLocalStorageState("courses", {
		defaultValue: [],
	});
	const [courseIo, setCourseIo] = useLocalStorageState("course", {
		defaultValue: [],
	});
	const [requirentIo, setRequirentIo] = useLocalStorageState("requirent", {
		defaultValue: [],
	});
	const router = useRouter();

	// const newCourses = _.cloneDeep(coursesIo);
	// const newCourse = _.cloneDeep(courseIo)
	useEffect(() => {
		if ((router.query.Course && router.query.Requirent) === false) {
			setRequirentIo({});
		}
		console.log("courseIo0", courseIo);
	}, []);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		console.log("Value", value);
		setKindState(value.key);
	};

	const postForm = async (values) => {
		// console.log("newCourse0", newCourse);

		const data = {
			id2Course: courseIo.id,
			code: values.requirements_code,
			expirationInMonth: values.requirements_expiration,
			kind: kindState,
			description: values.requirements_description,
		};
		console.log("data", data);
		// console.log("requirentIo", requirentIo);
		let response = {};
		if (router.query.Course && router.query.Requirent) {
			data.id = router.query.Requirent;
			response = await patch(URL_REQUIRENTS, data);
			console.log("response1", response);
		} else {
			response = await post(URL_REQUIRENTS, data);
			const responseCourse = await patch(URL_COURSES, courseIo);
			console.log("responseCourse", responseCourse);
			// setCourseIo(responseCourse);////
		}

		console.log("response2", response);
		console.log("newCourse1", newCourse);
		let arrayRequirents = newCourse.requirents;
		console.log("arrayRequirents", arrayRequirents);
		const indexReq = _.indexOf(
			arrayRequirents,
			_.find(arrayRequirents, response)
		);
		console.log("indexReq", indexReq);
		arrayRequirents.splice(indexReq, 1, response);
		console.log("newCourse", newCourse);
		// console.log("newCourses", newCourses)
		// let arrayRequirents = newCourse.requirents;
		// arrayRequirents = [...arrayRequirents, response];
		// newCourse.requirents = arrayRequirents;
		// console.log("newCourse2", newCourse);

		const index = _.indexOf(newCourses, _.find(newCourses, newCourse));
		console.log("index", index);
		newCourses.splice(index, 1, newCourse);
		console.log("newCourse", newCourse);
		console.log("newCourses", newCourses);

		// setRequirentIo(data);
		// setCoursesIo(newCourses);
		// setRequirentIo("");

		// router.push(`/secure/view/course/${course.id}`);
	};
	//TODO validar tamano maximo de los campos
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
					<Typography color='text.primary'>{`Requermiento: ${requirentIo?.code}`}</Typography>
				</Breadcrumbs>
				<br />

				<Typography variant='h6' color='primary'>
					{`Editando Req.: ${requirentIo?.code}`}
				</Typography>
			</Stack>
			<br />

			<Formik
				enableReinitialize
				initialValues={{
					requirements_code: requirentIo?.code ? requirentIo?.code : "",
					kind: requirentIo?.kind ? kind[requirentIo.kind] : "",
					requirements_expiration: requirentIo?.expirationInMonth
						? requirentIo?.expirationInMonth
						: "",
					requirements_description: requirentIo?.description
						? requirentIo?.description
						: "",
				}}
				validationSchema={yup.object({
					requirements_code: yup
						.string("Ingresar el Código")
						.required("Es requerido"),
					kind: yup
						.string("Seleccionar el Tipo de requerimiento")
						.required("Es requerido"),
				})}
				onSubmit={(values, { setSubmitting }) => {
					//event.preventDefault();

					setSubmitting(false);
					console.log("Values", values);
					console.log("Rol", kindState);
					postForm(values);
				}}>
				{({ submitForm, isSubmitting }) => (
					<LocalizationProvider
						dateAdapter={AdapterDayjs}
						adapterLocale={"es-mx"}>
						<Form>
							<Stack spacing={2}>
								<Field
									component={TextField}
									type='text'
									label='Código'
									name='requirements_code'
								/>
								<Field
									component={Select}
									type='text'
									label='Tipo'
									name='kind'
									multiple={false}
									value={kindState}
									onChange={handleChange}>
									{kind.map((item) => (
										<MenuItem key={item} value={item}>
											{item.value}
										</MenuItem>
									))}
								</Field>
								<Field
									component={TextField}
									type='number'
									label='Expiración en meses'
									name='requirements_expiration'
								/>
								<Field
									component={TextField}
									type='text'
									label='Descripción'
									name='requirements_description'
								/>
								<Button
									variant='contained'
									color='primary'
									disabled={isSubmitting}
									onClick={submitForm}>
									Enviar
								</Button>
							</Stack>
						</Form>
					</LocalizationProvider>
				)}
			</Formik>
		</Box>
	);
};

export default Requirents;
