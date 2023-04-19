import React, { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";
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
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	MenuItem,
	BootstrapInput
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
	const postForm = async (values) => {
		const data = {
			id2Course: courseIo.id,
			code: values.requirements_code,
			expirationInMonth: values.requirements_expiration,
			kind: kindState,
			description: values.requirements_description,
		};

		console.log("data", data);

		let url = `${process.env.NEXT_PUBLIC_API_REST}requirents`
		let method = 'post'
		if(router.query.Course && router.query.Requirent) {
			url = url+'/'+router.query.Requirent
			method = 'patch'
			data.id = router.query.Requirent
		}


		const config = {
			method: method,
			url: url, 
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		};
		await axios(config)
			.then(async function (response) {
				console.log(response.data);

				let course = _.cloneDeep(courseIo);
				console.log("course", course);
				let arrayRequirents = course.requirents;
				arrayRequirents = [...arrayRequirents, response.data];
				course.requirents = arrayRequirents;
				console.log("course2", course);
				const data = JSON.stringify(course);
				const config = {
					method: "patch",
					url: `${process.env.NEXT_PUBLIC_API_REST}/courses/${course.id}`,
					headers: {
						"Content-Type": "application/json",
					},
					data: data,
				};
				await axios(config)
					.then(function (response) {
						console.log(response.data);
						setCourseIo(response.data);
						router.push(`/secure/view/course/${course.id}`);
					})
					.catch(function (error) {
						console.log(error);
					});
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const [kindState, setKindState] = useState();
	const [courseIo, setCourseIo] = useLocalStorageState("course", {
		defaultValue: [],
	});
	const [requirentIo, setRequirentIo] = useLocalStorageState("requirent", {
		defaultValue: [],
	});
	const router = useRouter();

	useEffect(() => {
		console.log("courseIo", courseIo);
		console.log("query", router.query);
		if (router.query.Course && router.query.Requirent) {
			console.log("Contiene Query ", requirentIo);
			
		}
	}, []);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		console.log("Value", value);
		setKindState(value.key);
	};
	return (
		<Formik
			enableReinitialize
			initialValues={{
				requirements_code: requirentIo?.code ? requirentIo?.code : "",
				kind: requirentIo?.kind ? kind[requirentIo.kind] : "",
				requirements_expiration: requirentIo?.expirationInMonth ? requirentIo?.expirationInMonth : "",
				requirements_description: requirentIo?.description ? requirentIo?.description : "",
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
						<Stack justifyContent='center' alignItems='center'>
							<Paper elevation={3}>
								<Stack
									alignItems='left'
									justifyContent='left'
									paddingX={{ xs: 1, sm: 2, md: 4 }}
									paddingY={{ xs: 1, sm: 1, md: 2 }}>
									<Typography variant='h6' color='primary'>
										Requerimientos
									</Typography>
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
										onChange={handleChange}
										
										>
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
							</Paper>
						</Stack>
					</Form>
				</LocalizationProvider>
			)}
		</Formik>
	);
};

export default Requirents;
