import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "moment";
import _ from "lodash";
import * as yup from "yup";
import { Formik, Form, Field, FormikProvider } from "formik";
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
import gql from "graphql-tag";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";

export const POST_INFORMACION = gql`
	mutation PostInformacion($input: InformacionRequest!) {
		postInformacion(input: $input)
			@rest(
				type: "Informacion"
				path: "/informacions/"
				method: "POST"
				bodyKey: "input"
			) {
			id
			comentarios
			vistas
			rating
		}
	}
`;

export const POST_CASO = gql`
	mutation PostCaso($input: CasoRequest!) {
		postCaso(input: $input)
			@rest(
				type: "Caso"
				path: "/caso-texts/"
				method: "POST"
				bodyKey: "input"
			) {
			id
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
			id
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
			informacion {
				id
				comentarios
				vistas
				rating
			}
			casoText {
				id
			}
		}
	}
`;

const Denuncia = () => {
	const router = useRouter();

	const [selectedFile, setSelectedFile] = useState(null);

	const [postReporte] = useMutation(POST_REPORTE, {
		update(cache, { data: { postReporte } }) {
			// const cacheId = cache.identify(item);

			// console.log("postReporte", postReporte);
			cache.writeQuery({
				query: gql`
					query WriteTodo($id: Int!) {
						Reporte(id: $id) {
							id
							autor
							autorix
							titulo
							tituloix
							caso
							ciudad
							estado
							pais
							img
							imgix
							informacion {
								id
								comentarios
								vistas
								rating
							}
							casoText {
								id
							}
						}
					}
				`,
				data: {
					Reporte: {
						__typename: "Reporte",
						id: postReporte.id,
						autor: postReporte.autor,
						autorix: postReporte.autor,
						titulo: postReporte.titulo,
						tituloix: postReporte.titulo,
						caso: postReporte.caso,
						ciudad: postReporte.ciudad,
						estado: postReporte.estado,
						pais: postReporte.pais,
						img: postReporte.img,
						imgix: postReporte.img,
						fechaix: postReporte.fechaix,
						informacion: {
							id: postReporte.informacion.id,
							comentarios: 0,
							vistas: 0,
							rating: 0,
						},
						casoText: {
							id: postReporte.casoText.id,
						},
					},
				},
				variables: {
					id: postReporte.id,
				},
			});
		},
	});

	const [postInformacion] = useMutation(POST_INFORMACION);

	const [postCaso] = useMutation(POST_CASO);

	const post1 = async (values) => {
		let formData = new FormData();
		formData.append("files", selectedFile);
		const responseFile = await axios({
			method: "post",
			url: `${process.env.NEXT_PUBLIC_API_IMAGES}api/upload`,
			data: formData,
		});
		// console.log("Upload Response", responseFile.data);

		let reqLet = values;
		let regresoInfoLet = {};
		let regresoCasoLet = {};
		// console.log("values", values);
		// setValuesForm(values);
		const informacion = {
			comentarios: 0,
			vistas: 0,
			rating: 0,
		};

		const caso = {
			descripcion: values.caso,
		};

		postInformacion({
			variables: {
				input: informacion,
			},
		}).then((regresoInfo) => {
			regresoInfoLet = regresoInfo;
			// console.log("regresoInfoLet", regresoInfoLet);
			postCaso({
				variables: {
					input: caso,
				},
			}).then((regresoCaso) => {
				regresoCasoLet = regresoCaso;
				reqLet.caso = values.caso.substring(0, 250);
				reqLet.tituloix = reqLet.titulo;
				reqLet.fechaix = moment().format("YYYY-MM-DD[T00:00:00.000Z]");
				reqLet.autor = "autor";
				reqLet.autorix = "autor";
				reqLet.img = `${process.env.NEXT_PUBLIC_API_IMAGES}${responseFile.data[0].url}?format=webp&height=250&q=80`;
				reqLet.imgix = `${process.env.NEXT_PUBLIC_API_IMAGES}${responseFile.data[0].url}?format=webp&height=250&q=80`;
				reqLet.informacion = {
					id: regresoInfoLet.data.postInformacion.id,
				};
				reqLet.casoText = {
					id: regresoCasoLet.data.postCaso.id,
				};
				// console.log("regresoCasoLet", regresoCasoLet);
				console.log("reqLet", reqLet);
				postReporte({
					variables: {
						input: reqLet,
					},
				});
				router.push(`/`);
			});
		});
	};

	return (
		<Box sx={{ p: 3, border: "1px dashed grey" }}>
			<Formik
				enableReinitialize
				initialValues={{
					titulo: "",

					ciudad: "",
					estado: "",
					pais: "",
					img: "",
				}}
				validationSchema={yup.object({
					titulo: yup
						.string("Ingresar el título de su denuncia")
						.required("Es requerido"),
					// caso: yup.string("Describa su denuncia").required("Es requerido"),
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
					post1(values);
				}}>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<Stack spacing={4} alignItems='left' justifyContent='left'>
							<Field
								component={TextField}
								type='text'
								label='Título'
								name='titulo'
							/>

							<Field
								component={TextField}
								type='text'
								label='Denuncia'
								name='caso'
								multiline
								rows={8}
								// maxRows={50}
								placeholder='Descripción de la Denuncia'
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

							<Typography variant='body1'>
								{selectedFile ? "Nombre del archivo: " + selectedFile.name : ""}
							</Typography>
							<Box>
								<Button variant='contained' component='label'>
									Agregar Imagen
									<input
										hidden
										accept='image/*'
										multiple
										type='file'
										// value={selectedFile}
										onChange={(e) => setSelectedFile(e.target.files[0])}
									/>
								</Button>
								<br />
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

// export const getStaticProps = async (context) => {
//     const res = await fetch('https://openmensa.org/api/v2/canteens?near[lat]=' + lat+ '&near[lng]=' + long + '&near[dist]=50000');
//     const data = await res.json();

//     return {
//       props: { mensen: data }
//     }
// }
