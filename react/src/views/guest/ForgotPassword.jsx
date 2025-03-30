import {useState} from "react";
import axiosClient from "../../axios_client.js";
import Grid from "@mui/material/Grid2";
import {Box, Button, Paper, TextField} from "@mui/material";
import * as React from "react";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import MailIcon from '@mui/icons-material/Mail';
import {setErrorData} from "../../helpers/ErrorData.js";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const {t} = useTranslation();

    const [formErrors, setFormErrors] = useState({
        email: {errorstatus: false, helperText: ''},
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post("/forgot-password", {email});
            setMessage(response.data.message);
        } catch (error)
        {
            const response = error.response;
            if (response.data.errors) {
                setFormErrors(prevErrors => {
                    const newErrors = {...prevErrors};
                    setErrorData(response.data.errors, newErrors, setFormErrors);
                    return newErrors;
                });
            }
        }
    };

    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <Grid
                size={{xs: 0, sm: 4, md: 7}}
                sx={{
                    backgroundImage: 'url(images/backdrop.jpg)',
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

                        <form onSubmit={handleSubmit}>
                            <Box
                                component="img"
                                sx={{
                                    mx: 10,
                                    height: 300,
                                    width: 300,
                                    marginBottom: 10
                                }}
                                alt="UMDL Logo"
                                src="/images/logo.png"
                            />
                            <Typography component="h2" variant="h2" sx={{mb: 2}}>
                                {t("forgot_password.title")}
                            </Typography>
                            <Box sx={{width: 500}}>
                                <Typography variant="body2" sx={{width: '500px'}}>
                                    {t("forgot_password.explanation")}
                                </Typography>
                            </Box>
                            <TextField fullWidth
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       label={t('forgot_password.enter_mail')}
                                       required={true}
                                       variant="outlined" margin="dense"
                                       sx={{mt: 6}}
                                       error={formErrors.email.errorstatus}
                                       helperText={formErrors.email.helperText}
                            />
                            <br/>&nbsp;<br/>
                            <Button sx={{mb: 4}} type="submit" fullWidth variant="contained" color="secondary"
                                    size="large"
                                    startIcon={<MailIcon/>}>
                                {t('forgot_password.submit_button')}
                            </Button>
                            {message &&  <Box sx={{width: 500}}>
                                <Typography variant="body2" sx={{width: '250px'}}>
                                    {message}
                                </Typography>
                            </Box>}
                        </form>

                    </div>
                </Box>
            </Grid>
        </Grid>
    );
}
export default ForgotPassword;
