import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import Image from "next/image";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import {
	Paper,
	Box,
	Typography,
	Chip,
	Stack,
	Breadcrumbs,
	TextField,
	Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Badge from "@mui/material/Badge";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PestControlIcon from "@mui/icons-material/PestControl";
import ReviewsIcon from "@mui/icons-material/Reviews";
//import VisibilityIcon from '@mui/icons-material/Visibility';
import AdsClickIcon from "@mui/icons-material/AdsClick";
import gql from "graphql-tag";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import useLocalStorageState from "use-local-storage-state";
import { FacebookShareButton } from "react-share";
import { useSession } from "next-auth/react";
import DenunciaDynamicFooter from "components/DenunciaDynamicFooter";

const E500 = () => {
	return (
		<React.Fragment>
			<Box sx={{ p: 165, border: "1px dashed grey" }} />
			<Typography variant='h4' style={{ textAlign: "center" }}>
				<strong>Error: 500</strong>
			</Typography>
			<Typography variant='h4' style={{ textAlign: "center" }}>
				<strong>Transotas.org esta fuera de servicio temporalmente</strong>
			</Typography>
			<Typography variant='h4' style={{ textAlign: "center" }}>
				<strong>Estamos trabajando duro para restablecerlo</strong>
			</Typography>
			
			<Box sx={{ p: 165, border: "1px dashed grey" }} />
		</React.Fragment>
	);
};

export default E500;
