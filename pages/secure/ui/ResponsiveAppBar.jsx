import * as React from 'react';
import { useRouter } from "next/router";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
// import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import { blueGrey } from '@mui/material/colors';
import theme from 'styles/theme';
// import { useSession, signIn, signOut } from 'next-auth/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import InsightsIcon from '@mui/icons-material/Insights';
// import PedalBikeIcon from '@mui/icons-material/PedalBike';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import StoreIcon from '@mui/icons-material/Store';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MopedIcon from '@mui/icons-material/Moped';

import { useDispatch, useSelector } from 'react-redux';
// import { wishlist2 } from '../../store/ecommerce/action';

// import { useCart } from 'react-use-cart';

const pages = ['Cursos', 'Mis Datos'];
// const settings = [
//     ['Mi Cuenta', AccountCircleIcon],
//     ['Mis Pedidos', PedalBikeIcon],
//     ['Mi Tienda', StoreIcon],
//     ['Mi Dinero', QueryStatsIcon],
//     ['Cerrar', LogoutIcon]
// ];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto'
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch'
        }
    }
}));

const TooltipWrapper = styled('div')(() => ({
    paddingLeft: '1rem'
}));

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}

const ResponsiveAppBar = (props) => {
    const router = useRouter();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const status = 'authenticated'
    //const { data: session, status } = useSession();
    // const wishlistItems = useSelector((state) => state.ecommerce.wishlistItems);
    // const dispatch = useDispatch();

    // const { totalUniqueItems } = useCart();

    const favorites = () => {
        if (status === 'authenticated') {
            // const payload = { session: session, id: -1 }; //-1 justo to bring back from the post service the current value
            //dispatch(wishlist(payload));
            //dispatch(wishlist2(payload));
        }
    };

    React.useEffect(() => {
        favorites();
    }, [status]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event) => {
        setAnchorElNav(null);
        console.log("NavBar", event.target.innerText);
        if(event.target.innerText == 'CURSOS') {
            router.push(`/secure/view/Courses`);
        }
        else {
            router.push("/secure/view/Employees");
        }
        // target.innerText
    };

    const handleCloseUserMenu = (event) => {
        setAnchorElUser(null);
        const { opcionMenu } = event.currentTarget.dataset;
        // console.log('opcionMenu', opcionMenu);
        if (opcionMenu === 'Cerrar') return signOut();
    };

    const [value, setValue] = React.useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar component="nav" color="primary">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' }
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href=""
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none'
                                }}
                            >
                                LOGO
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page) => (
                                    <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                        {page}
                                    </Button>
                                ))}
                            </Box>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder="Buscar..." inputProps={{ 'aria-label': 'search' }} />
                            </Search>
                            {status === 'authenticated' ? (
                                <>
                                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                        <TooltipWrapper>
                                            <Tooltip title="Notificaciones">
                                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                                    <Badge badgeContent={4} color="secondary">
                                                        <NotificationsIcon />
                                                    </Badge>
                                                </IconButton>
                                            </Tooltip>
                                        </TooltipWrapper>
                                        <TooltipWrapper>
                                            <Tooltip title="Favoritos">
                                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                                    <Badge
                                                        badgeContent={5}
                                                        color="secondary"
                                                        max={99}
                                                        invisible={5 > 0 ? false : true}
                                                    >
                                                        <FavoriteIcon />
                                                    </Badge>
                                                </IconButton>
                                            </Tooltip>
                                        </TooltipWrapper>
                                        <TooltipWrapper>
                                            <Tooltip title="Carrito de Compras">
                                                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                                                    <Badge badgeContent={10} color="secondary">
                                                        <ShoppingCartIcon />
                                                    </Badge>
                                                </IconButton>
                                            </Tooltip>
                                        </TooltipWrapper>
                                        <TooltipWrapper>
                                            <Tooltip title="Mis Pedidos">
                                                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                                                    <Badge badgeContent={17} color="secondary">
                                                        <MopedIcon />
                                                    </Badge>
                                                </IconButton>
                                            </Tooltip>
                                        </TooltipWrapper>
                                    </Box>
                                    <Box sx={{ flexGrow: 0 }}>
                                        <TooltipWrapper>
                                            <Tooltip title="Ver Cuenta">
                                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                    <Avatar alt="Remy Sharp" src="/favicon.ico" />
                                                </IconButton>
                                            </Tooltip>
                                        </TooltipWrapper>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            <MenuItem key="Mi Cuenta" data-opcion-menu="Mi Cuenta" onClick={handleCloseUserMenu}>
                                                <ManageAccountsIcon />
                                                &nbsp;&nbsp;
                                                <Typography textAlign="center">Mi Cuenta</Typography>
                                            </MenuItem>
                                            <MenuItem key="Mis Pedidos" data-opcion-menu="Mis Pedidos" onClick={handleCloseUserMenu}>
                                                <MopedIcon />
                                                &nbsp;&nbsp;
                                                <Typography textAlign="center">Mis Pedidos</Typography>
                                            </MenuItem>
                                            <MenuItem key="Mi Tienda" data-opcion-menu="Mi Tienda" onClick={handleCloseUserMenu}>
                                                <StoreIcon />
                                                &nbsp;&nbsp;
                                                <Typography textAlign="center">Mi Tienda</Typography>
                                            </MenuItem>
                                            <MenuItem key="Mi Dinero" data-opcion-menu="Mi Dinero" onClick={handleCloseUserMenu}>
                                                <QueryStatsIcon />
                                                &nbsp;&nbsp;
                                                <Typography textAlign="center">Mi Dinero</Typography>
                                            </MenuItem>
                                            <MenuItem key="Cerrar" data-opcion-menu="Cerrar" onClick={handleCloseUserMenu}>
                                                <LogoutIcon />
                                                &nbsp;&nbsp;
                                                <Typography textAlign="center">Cerrar</Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => signIn()} sx={{ color: 'white' }} startIcon={<LoginIcon />}>
                                        Acceder
                                    </Button>
                                </>
                            )}
                        </Toolbar>
                        
                    </Container>
                </AppBar>
            </ElevationScroll>
            <Box
                sx={{
                    height: 70
                }}
            />
        </React.Fragment>
    );
};
export default React.memo(ResponsiveAppBar);
