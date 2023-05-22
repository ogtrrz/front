import React, { useState, useEffect } from "react";
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
	FormControl,
	Label,
	HelperText,
} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { graphql } from "@apollo/client/react/hoc";
import gql from "graphql-tag";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";

export const POST_INFORMACION = gql`
	mutation PostInformacion($input: InformacionRequest!) {
		patchInformacion(input: $input)
			@rest(
				type: "Informacion"
				path: "/informacions/"
				method: "POST"
				bodyKey: "input"
			) {
			comentarios
			vistas
			rating
		}
	}
`;

export const POST_CASO = gql`
	mutation PostCaso($input: CasoRequest!) {
		patchInformacion(input: $input)
			@rest(
				type: "Informacion"
				path: "/caso-texts/"
				method: "POST"
				bodyKey: "input"
			) {
			descripcion
		}
	}
`;

export const POST_REPORTE = gql`
	mutation PostReporte($input: ReporteRequest!) {
		postReporte(input: $input)
			@rest(
				type: "Reporte"
				path: "/reportes/"
				method: "POST"
				bodyKey: "input"
			) {
			titulo
			caso
			img
			autor
			tituloix
			autorix
			fechaix
			imgix
			ciudad
			estado
			pais
		}
	}
`;

const Denuncia = () => {
	const blue = {
		100: "#DAECFF",
		200: "#b6daff",
		400: "#3399FF",
		500: "#007FFF",
		600: "#0072E5",
		900: "#003A75",
	};

	const grey = {
		50: "#f6f8fa",
		100: "#eaeef2",
		200: "#d0d7de",
		300: "#afb8c1",
		400: "#8c959f",
		500: "#6e7781",
		600: "#57606a",
		700: "#424a53",
		800: "#32383f",
		900: "#24292f",
	};

	const StyledTextarea = styled(TextareaAutosize)(
		({ theme }) => `
        width: 320px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px 12px 0 12px;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${
					theme.palette.mode === "dark" ? grey[700] : grey[200]
				};
        box-shadow: 0px 2px 2px ${
					theme.palette.mode === "dark" ? grey[900] : grey[50]
				};
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${
						theme.palette.mode === "dark" ? blue[500] : blue[200]
					};
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
	);

	const [postReporte, { loading, error, data }] = useMutation(POST_REPORTE, {
		update(cache, { data: { postReporte } }) {
			// const cacheId = cache.identify(item);
			console.log("postReporte", postReporte);
			// cache.writeQuery({
			// 	query: gql`
			// 		query WriteTodo($id: Int!) {
			// 			Reporte(id: $id) {
			// 				id
			// 				informacion {
			// 					comentarios
			// 					vistas
			// 					rating
			// 				}
			// 			}
			// 		}
			// 	`,
			// 	data: {
			// 		Reporte: {
			// 			__typename: "Reporte",
			// 			id: item.id,
			// 			informacion: {
			// 				comentarios: patchInformacion.comentarios,
			// 				vistas: patchInformacion.vistas,
			// 				rating: patchInformacion.rating,
			// 			},
			// 		},
			// 	},
			// 	variables: {
			// 		idReporte: item.id,
			// 	},
			// });
		},
	});

	const postForm = (values) => {
		console.log("values", values);
		// const request = {

		//         "titulo": ,
		//         "caso": "string",
		//         "img": "string",
		//         "autor": "string",
		//         "tituloix": "string",
		//         "autorix": "string",
		//         "fechaix": "2023-05-22T15:49:37.423Z",
		//         "imgix": "string",
		//         "ciudad": "string",
		//         "estado": "string",
		//         "pais": "string",
		// };
		// // console.log("request", request);
		// patchInformacion({
		// 	variables: {
		// 		id: item.informacion.id,
		// 		input: request,
		// 	},
		// });
	};

	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Formik
				enableReinitialize
				initialValues={{
					titulo: "",
					caso: "",
					ciudad: "",
					estado: "",
					pais: "",
					img: "",
				}}
				validationSchema={yup.object({
					titulo: yup
						.string("Ingresar el título de su denuncia")
						.required("Es requerido"),
					caso: yup.string("Describa su denuncia").required("Es requerido"),
					ciudad: yup
						.string("En que ciudad se encuentra")
						.required("Es requerido"),
					estado: yup
						.string("En que estado se encuentra")
						.required("Es requerido"),
					pais: yup.string("En que pais se encuentra").required("Es requerido"),
				})}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(false);
					console.log("Values", values);
					// console.log("Type", type);
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
								label='Título'
								name='titulo'
							/>

							<StyledTextarea
								aria-label='minimum height'
								minRows={3}
								placeholder='Descripción de la Denuncia'
								// value={formik.values.caso}
								// onChange={formik.handleChange}
								// error={formik.touched.caso && Boolean(formik.errors.caso)}
								// helperText={formik.touched.caso && formik.errors.caso}
							/>
							<Field
								component={TextField}
								type='text'
								label='Ciudad'
								name='ciudad'
							/>
							<Field
								component={TextField}
								type='text'
								label='Estado'
								name='estado'
							/>
							<Field
								component={TextField}
								type='text'
								label='País'
								name='pais'
							/>
							<Box>
								<Button
									variant='contained'
									color='primary'
									disabled={isSubmitting}
									onClick={submitForm}>
									Enviar
								</Button>
							</Box>
						</Stack>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default Denuncia;
