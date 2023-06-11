import * as React from "react";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from "@mui/icons-material/Notifications";
// import Link from '@mui/material/Link';
// import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import { blueGrey } from '@mui/material/colors';
import theme from "styles/theme";
import { useSession, signIn, signOut } from "next-auth/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import InsightsIcon from '@mui/icons-material/Insights';
// import PedalBikeIcon from '@mui/icons-material/PedalBike';
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import StoreIcon from "@mui/icons-material/Store";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MopedIcon from "@mui/icons-material/Moped";
import PestControlOutlinedIcon from "@mui/icons-material/PestControlOutlined";
import PestControlRodentIcon from "@mui/icons-material/PestControlRodent";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HowToRegIcon from "@mui/icons-material/HowToReg";

// import { wishlist2 } from '../../store/ecommerce/action';

// import { useCart } from 'react-use-cart';

const pages = ["Inicio", "Denunciar"];
// const settings = [
//     ['Mi Cuenta', AccountCircleIcon],
//     ['Mis Pedidos', PedalBikeIcon],
//     ['Mi Tienda', StoreIcon],
//     ['Mi Dinero', QueryStatsIcon],
//     ['Cerrar', LogoutIcon]
// ];

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

const TooltipWrapper = styled("div")(() => ({
	paddingLeft: "1rem",
}));

function ElevationScroll(props) {
	const { children } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

const ResponsiveAppBar = (props) => {
	const router = useRouter();
	const { data: session } = useSession();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const [searchText, setSearchText] = React.useState("");

	// const status = "authenticated";

	// const favorites = async () => {
	// 	const getsession = await getSession();
	// 	console.log("session get session", getsession);
	// 	// if (status === "authenticated") {
	// 	// const payload = { session: session, id: -1 }; //-1 justo to bring back from the post service the current value
	// 	//dispatch(wishlist(payload));
	// 	//dispatch(wishlist2(payload));
	// 	// }
	// };

	// React.useEffect(() => {
	// 	favorites();
	// }, [status]);
	// React.useEffect(() => {
	// 	favorites();
	// }, []);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = (event) => {
		setAnchorElNav(null);
		// console.log("NavBar", event.target.innerText);
		if (
			event.target.innerText == "Inicio" ||
			event.target.innerText == "INICIO"
		) {
			router.push(`/view/wrapper/1`);
		} else {
			router.push("/secure/form/Denuncia");
		}
		// target.innerText
	};

	const handleCloseUserMenu = (event) => {
		// http://localhost:3000/api/auth/signout
		// console.log("handle close value", event.currentTarget.dataset);
		setAnchorElUser(null);
		const { opcionMenu } = event.currentTarget.dataset;
		// console.log('opcionMenu', opcionMenu);
		if (opcionMenu === "Mis Denuncias") {
			router.push(
				`/categorys?Query=autor.equals=${session?.username}&Category=Usuario:%20${session?.username}&Page=0`
			);
		}
		//http://localhost:8080/api/reportes?autor.equals=user&page=0&size=20
		if (opcionMenu === "Mis Comentarios") {
			router.push(`/secure/Comentarios?Autor=${session?.username}&Page=0`);
		}
		//http://localhost:8080/api/comentarios?autor.equals=user&page=0&size=20
		if (opcionMenu === "Cerrar") return signOut();
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			if ([...searchText].length > 0) {
				// console.log("busqueda", searchText);
				router.push(`/search?SearchCode=${searchText}`);
			}
			setSearchText("");
		}
	};

	// console.log("session", session);

	return (
		<React.Fragment>
			<ElevationScroll {...props}>
				<AppBar component='nav' color='primary'>
					<Container maxWidth='xl'>
						<Toolbar disableGutters>
							{/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}

							<PestControlOutlinedIcon
								fontSize='large'
								sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
							/>
							<PestControlRodentIcon
								fontSize='large'
								sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
							/>
							<PestControlRodentIcon
								fontSize='large'
								sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
							/>
							<PestControlRodentIcon
								fontSize='large'
								sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
							/>

							<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
								<IconButton
									size='large'
									aria-label='account of current user'
									aria-haspopup='true'
									onClick={handleOpenNavMenu}
									color='inherit'>
									<MenuIcon />
								</IconButton>
								<Menu
									id='menu-appbar'
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "left",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{
										display: { xs: "block", md: "none" },
									}}>
									{pages.map((page) => (
										<MenuItem key={page} onClick={handleCloseNavMenu}>
											<Typography textAlign='center'>{page}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
							<PestControlOutlinedIcon
								fontSize='large'
								sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
							/>

							<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
								{pages.map((page) => (
									<Button
										key={page}
										onClick={handleCloseNavMenu}
										sx={{ my: 2, color: "white", display: "block" }}>
										{page}
									</Button>
								))}
							</Box>

							{session === null || session === undefined ? (
								""
							) : (
								<Typography
									variant='h1'
									sx={{
										mr: 2,
										display: { xs: "none", md: "flex" },
										flexGrow: 1,
										fontWeight: 700,
										letterSpacing: ".3rem",
										color: "#fff",
										textDecoration: "none",
									}}>
									Transotas.org
									{/* {`Hola, ${session?.username}`} */}
								</Typography>
							)}

							<Search>
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase
									placeholder='    Buscar...'
									inputProps={{ "aria-label": "search" }}
									onChange={(e) => setSearchText(e.target.value)}
									value={searchText}
									onKeyUp={handleKeyUp}
								/>
							</Search>
							{!(session === null || session === undefined) ? (
								<React.Fragment>
									<Box sx={{ flexGrow: 0 }}>
										<TooltipWrapper>
											<Tooltip title='Administar mi cuenta' arrow>
												<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
													<AccountCircleIcon
														sx={{ color: "#ffffff" }}
														fontSize='large'
													/>
												</IconButton>
											</Tooltip>
										</TooltipWrapper>
										<Menu
											sx={{ mt: "45px" }}
											id='menu-appbar1'
											anchorEl={anchorElUser}
											anchorOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											keepMounted
											transformOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											open={Boolean(anchorElUser)}
											onClose={handleCloseUserMenu}>
											<MenuItem
												key='Mi Cuenta'
												data-opcion-menu='Mi Cuenta'
												onClick={handleCloseUserMenu}>
												<ManageAccountsIcon />
												&nbsp;&nbsp;
												<Typography textAlign='center'>{`Hola, ${session?.username}`}</Typography>
											</MenuItem>
											<MenuItem
												key='Mis Denuncias'
												data-opcion-menu='Mis Denuncias'
												onClick={handleCloseUserMenu}>
												<PestControlOutlinedIcon />
												&nbsp;&nbsp;
												<Typography textAlign='center'>
													Mis denuncias
												</Typography>
											</MenuItem>
											<MenuItem
												key='Mis Comentarios'
												data-opcion-menu='Mis Comentarios'
												onClick={handleCloseUserMenu}>
												<ReviewsIcon />
												&nbsp;&nbsp;
												<Typography textAlign='center'>
													Mis comentarios
												</Typography>
											</MenuItem>

											<MenuItem
												key='Cerrar'
												data-opcion-menu='Cerrar'
												onClick={handleCloseUserMenu}>
												<LogoutIcon />
												&nbsp;&nbsp;
												<Typography textAlign='center'>
													Cerrar sesión
												</Typography>
											</MenuItem>
										</Menu>
									</Box>
								</React.Fragment>
							) : (
								<React.Fragment>
									<Button
										onClick={() => signIn()}
										sx={{ color: "white" }}
										startIcon={<HowToRegIcon />}>
										Registro
									</Button>
									<Button
										onClick={() => signIn()}
										sx={{ color: "white" }}
										startIcon={<LoginIcon />}>
										Acceder
									</Button>
								</React.Fragment>
							)}
						</Toolbar>
					</Container>
				</AppBar>
			</ElevationScroll>
			<Box
				sx={{
					height: 70,
				}}
			/>
		</React.Fragment>
	);
};
export default React.memo(ResponsiveAppBar);
