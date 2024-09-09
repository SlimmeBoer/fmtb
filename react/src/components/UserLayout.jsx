import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import KringloopwijzerForm from '../views/process/KringloopwijzerForm.jsx';
import BBMForm from '../views/process/BBMForm.jsx';
import AanvullendBBM from '../views/process/AanvullendBBM.jsx';
import Overzicht from '../views/process/Overzicht.jsx';
import StartForm from '../views/process/StartForm.jsx';
import {Avatar, Grid} from "@mui/material";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import axiosClient from "../axios_client.js";
import {Navigate} from "react-router-dom";
import {showFullName} from "../helpers/FullName.js";
import LogoutIcon from "@mui/icons-material/Logout";
import AanvullendeVragenForm from "../views/process/AanvullendeVragenForm.jsx";
import Copyright from "../views/elements/Copyright.jsx";


function getStepContent(step) {
    switch (step) {
        case 0:
            return <StartForm/>;
        case 1:
            return <KringloopwijzerForm/>;
        case 2:
            return <BBMForm/>;
        case 3:
            return <AanvullendBBM/>;
        case 4:
            return <AanvullendeVragenForm/>;
        case 5:
            return <Overzicht/>;
        default:
            throw new Error('Unknown step');
    }
}

export default function UserLayout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const {user, token, setUser, setToken, notification} = useStateContext();
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    const steps = [t('general.step1'), t('general.step2'), t('general.step3'), t('general.step4'),t('general.step5'),t('general.step6')];

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/user')
            .then(({data}) => {
                setLoading(false)
                setUser(data)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    if (!token) {
        return <Navigate to="/login"/>
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <Grid
                item

                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(images/backdrop.jpg)',
                    height: 2000,
                    backgroundRepeat: 'no-repeat',

                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Grid item>
                    <AppBar
                        position="static"
                        color="default"
                        elevation={0}
                        sx={{
                            position: 'relative',
                            borderBottom: (t) => `1px solid ${t.palette.divider}`,
                        }}
                    >
                        <Box sx={{width: '100%'}}>
                            <Stack direction="row" justifyContent="space-between">

                                <Typography variant="h6" color="inherit" sx={{pt: 5}}>

                                    {t('general.company_name')}
                                </Typography>
                                {!loading && <Typography>

                                    <div className="header_user_info">
                                        {showFullName(user.first_name, user.middle_name, user.last_name)}
                                    </div>
                                    <div className="header_logout">
                                        <Button onClick={onLogout} variant="outlined"
                                                startIcon={<LogoutIcon/>}>
                                            {t('general.logout')}
                                        </Button>
                                    </div>
                                </Typography>}
                            </Stack>
                        </Box>
                    </AppBar>
                </Grid>
                <Grid item>
                    <Container component="main" maxWidth="xl" sx={{mb: 0}}>
                        <Paper variant="outlined" sx={{my: {xs: 12, md: 12}, p: {xs: 2, md: 3}}}>
                            <Typography component="h1" variant="h4" align="center">
                                {t('general.process')}
                            </Typography>
                            <Stepper activeStep={activeStep} sx={{pt: 10, pb: 5}}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        {t('finished.title')}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {t('finished.explanation')}
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                                {t('general.back')}
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{mt: 3, ml: 1}}
                                        >
                                            {activeStep === steps.length - 1 ? t('general.finish') : t('general.next')}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            )}
                            <Copyright/>
                        </Paper>
                    </Container>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
