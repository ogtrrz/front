import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import _ from "lodash";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SaveIcon from "@mui/icons-material/Save";
import {
	Autocomplete,
	TextField,
	Select,
	Switch,
	ToggleButtonGroup,
} from "formik-mui";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
	Button,
	LinearProgress,
	Stack,
	Box,
	Paper,
	Typography,
	FormControl,
	FormHelperText,
} from "@mui/material";

const EvidenceAddToDo = ({ course }) => {
	console.log(course);
	return (
		<>
			<Typography variant='body1'>{course.description}</Typography><br/>
		</>
	);
};

export default EvidenceAddToDo;
