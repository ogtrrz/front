import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
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

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

import ListItemText from "@mui/material/ListItemText";
import Head from "next/head";

import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Categorias } from "data/categorias";
import { useSession, getSession } from "next-auth/react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

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

export const POST_CATEGORIA = gql`
	mutation PostCategoria($input: CategoriaRequest!) {
		postCategoria(input: $input)
			@rest(
				type: "Informacion"
				path: "/categorys/"
				method: "POST"
				bodyKey: "input"
			) {
			id
			categoria
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
			categorys {
				id
				categoria
			}
		}
	}
`;
//TODO finalizar forma de denuncia
const Denuncia = () => {
	const router = useRouter();
	const { data: session } = useSession();
	console.log("session", session);

	const se = async () => {
		const sess = await getSession();
		console.log("sess", sess);
	};

	se();

	const [selectedFile, setSelectedFile] = useState(null);
	const [categoryState, setCategoryState] = useState([]);

	const handleChangeCategory = (event) => {
		const {
			target: { value },
		} = event;

		// console.log("value categoria", value);
		// console.log("value categoryState", categoryState);

		setCategoryState(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

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
							categorys {
								id
								categoria
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
						categorys: postReporte.categorys,
					},
				},
				variables: {
					id: postReporte.id,
				},
			});
		},
	});

	const post1 = async (values) => {
		let formData = new FormData();
		formData.append("files", selectedFile);
		const responseFile = await axios({
			method: "post",
			url: `${process.env.NEXT_PUBLIC_API_IMAGES}api/upload`,
			data: formData,
		});
		// console.log("Upload Response", responseFile.data);

		let reqLet = cloneDeep(values);

		reqLet.caso = reqLet.caso.substring(0, 250);
		reqLet.tituloix = reqLet.titulo;
		reqLet.fechaix = moment().format("YYYY-MM-DD[T00:00:00.000Z]");
		reqLet.autor =
			session === null || session === undefined ? "Anonimo" : session?.username;

		reqLet.autorix =
			session === null || session === undefined ? "Anonimo" : session?.username;
		reqLet.img = `${process.env.NEXT_PUBLIC_API_IMAGES}${responseFile.data[0].url}?format=webp&height=250&q=80`;
		reqLet.imgix = `${process.env.NEXT_PUBLIC_API_IMAGES}${responseFile.data[0].url}?format=webp&height=250&q=80`;

		reqLet.casoText = {
			descripcion: values.caso,
		};

		const categorias = categoryState.map((s) => ({ categoria: s }));

		reqLet.categorys = categorias;

		// console.log("reqLet", reqLet);
		postReporte({
			variables: {
				input: reqLet,
			},
		});
		router.push(`/`);
	};

	return (
		<React.Fragment>
			<Head>
				<title>{`Transotas nueva denuncia}.`}</title>
				<meta name='robots' content='index, follow' />
				<link
					rel='canonical'
					href={`${process.env.NEXT_PUBLIC_URL}/secure/form/Denuncia`}
				/>
				<meta name='description' content={`Transotas nueva denuncia}`} />
			</Head>
			<Box
				sx={{
					p: 3,
					border: "1px dashed grey",
					flexDirection: "column",
					mt: 40,
					mb: 40,
				}}>
				<Typography variant='subtitle1'>{`Agregar su denuncia.`}</Typography>
				<br />
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
						caso: yup.string("Describa su denuncia").required("Es requerido"),
						ciudad: yup
							.string("En que ciudad se encuentra")
							.required("Es requerido"),
						estado: yup
							.string("En que estado se encuentra")
							.required("Es requerido"),
						pais: yup
							.string("En que pais se encuentra")
							.required("Es requerido"),
					})}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(false);
						post1(values);
					}}>
					{({ submitForm, isSubmitting }) => (
						<Form>
							<Stack spacing={20} alignItems='left' justifyContent='left'>
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

								<FormControl sx={{ m: 1, width: 300 }}>
									<InputLabel id='demo-multiple-checkbox-label'>
										Categorias
									</InputLabel>
									<Select
										labelId='demo-multiple-checkbox-label'
										id='demo-multiple-checkbox'
										multiple
										value={categoryState}
										onChange={handleChangeCategory}
										input={<OutlinedInput label='Categorias' />}
										renderValue={(selected) => selected.join(", ")}
										MenuProps={MenuProps}>
										{Categorias.map((name) => (
											<MenuItem key={name} value={name}>
												<Checkbox checked={categoryState.indexOf(name) > -1} />
												<ListItemText primary={name} />
											</MenuItem>
										))}
									</Select>
								</FormControl>

								<Typography variant='body1'>
									{selectedFile
										? "Nombre del archivo: " + selectedFile.name
										: ""}
								</Typography>
								<Box sx={{ mt: 80, mb: 80 }}>
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
								</Box>
								<Box sx={{ mt: 80, mb: 80 }}>
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
		</React.Fragment>
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
