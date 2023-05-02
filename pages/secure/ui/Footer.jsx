import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';
import theme from '../../lib/theme';

const FooterStyl = styled('footer')(({ theme }) => ({
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.main,
    bottom: '0',
    left: '0',
    // position: 'sticky',
    with: '100%',
    padding: '1rem',
    paddingLeft: '2rem'
}));

const Footer = () => {
    return (
        <FooterStyl>
            <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, md: 12 }}>
                <Grid2 xs={6}>
                    <Typography  variant="h6">
                        Compañía
                    </Typography>
                    <Typography color={alpha(theme.palette.common.white, 0.90)} variant="subtitle">
                        Contáctenos
                    </Typography>
                </Grid2>
                <Grid2 xs={6}>
                    <Typography  variant="h6">
                        Legal
                    </Typography>
                    <Typography color={alpha(theme.palette.common.white, 0.90)} variant="subtitle">
                        Políticas de privacidad
                    </Typography>
                    <br />
                    <Typography color={alpha(theme.palette.common.white, 0.90)} variant="subtitle">
                        Términos de uso
                    </Typography>
                </Grid2>
            </Grid2>
        </FooterStyl>
    );
};

export default React.memo(Footer);
