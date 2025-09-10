import {useState} from "react";
import axiosClient from "../../axios_client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {Box, Button, Paper, TextField} from "@mui/material";
import Grid from '@mui/material/Grid2';
import LoginIcon from '@mui/icons-material/Login';
import {useTranslation} from 'react-i18next';
import {resetErrorData, setErrorData} from "../../helpers/ErrorData.js";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Login() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const [formErrors, setFormErrors] = useState({
        email: {errorstatus: false, helperText: ''},
        password: {errorstatus: false, helperText: ''},
    });

    const {t} = useTranslation();

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault()
        resetErrorData(formErrors, setFormErrors);

        axiosClient.post('/login', credentials)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(error => {
                const response = error.response;
                if (response.data.errors) {
                    setFormErrors(prevErrors => {
                        const newErrors = {...prevErrors};
                        setErrorData(response.data.errors, newErrors, setFormErrors);
                        return newErrors;
                    });
                }
            })
    }

    return (

        <Grid container component="main" sx={{height: '100vh'}}>
            <Grid
                size={{xs: 0, sm: 4, md: 7}}
                sx={{
                    backgroundImage: 'url(/images/backdrop.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid size={{xs: 12, sm: 8, md: 5}} component={Paper} elevation={8} square sx={{justifyContent: 'center'}}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div className="login-center">
                        <form onSubmit={onSubmit}>
                            <Box
                                component="img"
                                sx={{
                                    mx: 10,
                                    width: 300,
                                    mb: 10,
                                    mt: 10,
                                }}
                                alt="FMTB Logo"
                                src="/images/logo.png"
                            />
                            <Typography component="h2" variant="h2" sx={{mb: 2}}>
                                {t("login.title")}
                            </Typography>

                            <TextField fullWidth
                                       value={credentials.email}
                                       onChange={ev => setCredentials({...credentials, email: ev.target.value})}
                                       label={t('login.email_field')} variant="outlined" margin="dense"
                                       required={true}
                                       error={formErrors.email.errorstatus}
                                       helperText={formErrors.email.helperText}/>
                            <TextField fullWidth
                                       value={credentials.password}
                                       autoComplete="on"
                                       onChange={ev => setCredentials({...credentials, password: ev.target.value})}
                                       label={t('login.password_field')} type="password"
                                       required={true}
                                       variant="outlined" margin="dense"
                                       error={formErrors.password.errorstatus}
                                       helperText={formErrors.password.helperText}/>
                            <br/>&nbsp;<br/>
                            <Button sx={{mb: 4}} type="submit" fullWidth variant="contained" color="secondary" size="large"
                                    startIcon={<LoginIcon/>}>
                                {t('login.submit_button')}
                            </Button>
                            <Typography variant="body2" sx={{pt: 6}}>
                                <Link href={'/wachtwoord-vergeten'}>{t('login.forgot_password')}</Link>
                            </Typography>
                        </form>
                    </div>

                </Box>
            </Grid>
        </Grid>
    )

}
