import {useState} from "react";
import axiosClient from "../../axios_client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {Box, Button, Grid, Paper, TextField} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import {useTranslation} from 'react-i18next';
import {setErrorData} from "../../helpers/ErrorData.js";
import Copyright from "../elements/Copyright.jsx";

export default function Login() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    const [EmailInvalid, setEmailInvalid] = useState({});
    const [PasswordInvalid, setPasswordInvalid] = useState({});
    const {t} = useTranslation();

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault()
        setEmailInvalid({state: false, message: ''});
        setPasswordInvalid({state: false, message: ''});

        axiosClient.post('/login', credentials)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        if (response.data.errors) {
                            setErrorData(response.data.errors,
                                {
                                    email: setEmailInvalid,
                                    password: setPasswordInvalid,
                                })
                        } else {
                            setEmailInvalid({state: true, message: response.data.message})
                        }
                    }
                }
            )
    }

    return (

        <Grid container component="main" sx={{height: '100vh'}}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(images/backdrop.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{justifyContent: 'center'}}>
                <Box
                    sx={{
                        pt: 10,
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
                            <div>
                                <img src="images/utrecht.png" width={300} />
                                <h1>{t('login.title')}</h1>
                                <br/>
                            </div>
                            <TextField fullWidth
                                       value={credentials.email}
                                       onChange={ev => setCredentials({...credentials, email: ev.target.value})}
                                       label={t('login.email_field')} variant="outlined" margin="dense"
                                       error={EmailInvalid.state}
                                       helperText={EmailInvalid.state && EmailInvalid.message}/>
                            <TextField fullWidth
                                       value={credentials.password}
                                       onChange={ev => setCredentials({...credentials, password: ev.target.value})}
                                       label={t('login.password_field')} type="password"
                                       variant="outlined" margin="dense"
                                       error={PasswordInvalid.state}
                                       helperText={PasswordInvalid.state && PasswordInvalid.message}/>
                            <br/>&nbsp;<br/>
                            <Button type="submit" fullWidth variant="outlined" size="large"
                                    startIcon={<LoginIcon/>}>
                                {t('login.submit_button')}
                            </Button>
                            <Copyright />

                        </form>
                    </div>

                </Box>
            </Grid>
        </Grid>
    )

}
