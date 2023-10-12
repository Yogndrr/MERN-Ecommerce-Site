import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';

import { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import CountUp from 'react-countup';

const SalesCard = ({ title, total, color, icon }) => {
    return (
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: (theme) => theme.palette[color].darker,
                backgroundImage: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                        theme.palette[color].dark,
                        0.24
                    )} 100%)`,
            }}
        >
            <StyledIcon
                sx={{
                    color: (theme) => theme.palette[color].dark,
                    backgroundImage: (theme) =>
                        `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
                            theme.palette[color].dark,
                            0.24
                        )} 100%)`,
                }}
            >
                <Iconify icon={icon} width={24} height={24} />
            </StyledIcon>

            <Data start={0} end={total} duration={5} />

            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                {title}
            </Typography>
        </Card>
    );
}

export default SalesCard

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }, ref) => (
    <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
));

const Data = styled(CountUp)`
    margin: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 400;
    font-size: 3rem;
    line-height: 1.167;
    letter-spacing: 0em;
`;

const StyledIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
}));