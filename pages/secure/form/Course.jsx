import React, { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
import { post, patch, URL_COURSES } from "data/ApiData";
import _ from "lodash";
import { updateArray } from "utils/arrays";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
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
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
	Breadcrumbs,
	Link,
} from "@mui/material";

const typeCourse = [
	{
		key: "PRESENT",
		value: "Presente",
	},
	{
		key: "REMOTE",
		value: "Remoto",
	},
	{
		key: "ONLINE",
		value: "Online",
	},
	{
		key: "WBT",
		value: "WBT",
	},
];

const Course = () => {
	const [coursesIo, setCoursesIo] = useLocalStorageState("courses", {
		defaultValue: [],
	});

	const [courseIo, setCourseIo] = useLocalStorageState("course", {
		defaultValue: [],
	});

	const router = useRouter();

	const { Course } = router.query;

	const [type, setType] = useState();

	useEffect(() => {
		console.log("Course", Course);
		if (Course === false) {
			console.log("Es nuevo");
			setCourseIo({});
		}
		console.log("courseIo0", courseIo);
	}, [router]);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		console.log("Value Type", value);
		setType(value.key);
	};

	const postForm = async (values) => {
		console.log("values", values);
		const newCourse = _.cloneDeep(courseIo);
		newCourse.id2Job = 1;
		newCourse.code = values.course_code;
		newCourse.name = values.course_name;
		newCourse.expirationInMonth = values.expiration_in_months;
		newCourse.typeCourse = type;
		newCourse.autorizationBy = values.authorization_email;
		newCourse.durationAuthorizationInMonth =
			values.duration_autorization_months;
		newCourse.description = values.description;
		newCourse.link = values.course_link;

		let newCourses = _.cloneDeep(coursesIo);
		console.log("newCourses", newCourses);
		// let newCourse = _.cloneDeep(courseIo)

		if (Course) {
			newCourse.id = Course;
			const response = await patch(URL_COURSES, newCourse);
			console.log("response1a", response);
			updateArray(newCourses, response);
			console.log("response3a", newCourses);
		} else {
			const response = await post(URL_COURSES, newCourse);
			console.log("response1b", response);
			newCourses = [response, ...newCourses];
			console.log("response3b", newCourses);
		}

		setCoursesIo(newCourses);
		setCourseIo({});

		router.push(`/secure/view/Courses`);
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
					<Typography color='text.primary'>
						{Course ? `Editar curso: ${courseIo.code}` : `Nuevo Curso`}
					</Typography>
				</Breadcrumbs>
				<br />

				<Typography variant='h6' color='primary'>
					{Course ? `Editar curso: ${courseIo.code}` : `Nuevo Curso`}
				</Typography>
			</Stack>
			<br />
			<Formik
				enableReinitialize
				initialValues={{
					course_code: Course ? courseIo.code : "",
					course_name: Course ? courseIo.name : "",
					expiration_in_months: Course ? courseIo.expirationInMonth : "",
					course_type: "",
					authorization_email: Course ? courseIo.autorizationBy : "",
					duration_autorization_months: Course
						? courseIo.durationAuthorizationInMonth
						: "",
					description: Course ? courseIo.description : "",
					course_link: Course ? courseIo.link : "",
				}}
				validationSchema={yup.object({
					course_code: yup
						.string("Ingresar código del curso")
						.required("Es requerido"),
					course_name: yup
						.string("Ingresat nombre del curso")
						.required("Es requerido"),
					expiration_in_months: yup
						.string("Ingresar los meses de vigencia")
						.required("Es requerido"),
					course_type: yup
						.string("Ingresar el Tipo de Curso")
						.required("Es requerido"),
					authorization_email: yup.string(
						"Ingresar el correo de quien debe autorizarlo"
					),
					duration_autorization_months: yup.string(
						"Vigencia de la autorización"
					),
					description: yup
						.string("Ingresar la descripción")
						.required("Es requerido"),
					course_link: yup.string("Ingresar el link del curso"),
				})}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(false);
					console.log("Values", values);
					console.log("Type", type);
					postForm(values);
				}}>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<Stack
							spacing={{ xs: 1, sm: 2, md: 4 }}
							alignItems='left'
							justifyContent='left'
							paddingX={{ xs: 1, sm: 2, md: 4 }}
							paddingY={{ xs: 1, sm: 1, md: 2 }}>
							<Field
								component={TextField}
								type='text'
								label='Código'
								name='course_code'
							/>
							<Field
								component={TextField}
								type='text'
								label='Nombre'
								name='course_name'
							/>
							<Field
								component={TextField}
								type='number'
								label='Duración (en meses)'
								name='expiration_in_months'
							/>
							<Field
								component={Select}
								type='text'
								label='Tipo de Curso'
								name='course_type'
								multiple={false}
								value={type}
								onChange={handleChange}>
								{typeCourse.map((item) => (
									<MenuItem key={item.value} value={item}>
										{item.value}
									</MenuItem>
								))}
							</Field>
							<Field
								component={TextField}
								type='text'
								label='Correo Autorizador'
								name='authorization_email'
							/>
							<Field
								component={TextField}
								type='number'
								label='Duración de la Autorización'
								name='duration_autorization_months'
							/>
							<Field
								component={TextField}
								type='text'
								label='Descripción'
								name='description'
							/>
							<Field
								component={TextField}
								type='text'
								label='Link'
								name='course_link'
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
				)}
			</Formik>
		</Box>
	);
};

export default Course;
