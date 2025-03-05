
import React, {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {useTranslation} from 'react-i18next';
import {Avatar, Box, Button, CircularProgress, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from "@mui/icons-material/Close";

import {resetErrorData, setErrorData} from "../../helpers/ErrorData.js";

export default function UserForm(props) {
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    const [user, setUser] = useState({
        id: null,
        first_name: '',
        middle_name: '',
        last_name: '',
        image: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [formErrors, setFormErrors] = useState({
        first_name: {errorstatus: false, helperText: ''},
        middle_name: {errorstatus: false, helperText: ''},
        last_name: {errorstatus: false, helperText: ''},
        image: {errorstatus: false, helperText: ''},
        email: {errorstatus: false, helperText: ''},
        password: {errorstatus: false, helperText: ''},
        password_confirmation: {errorstatus: false, helperText: ''},
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage))
            setUser({...user, image: selectedImage})
        }
    }, [selectedImage]);


    const {t} = useTranslation();

    if (props.id !== 0) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${props.id}`)
                .then(({data}) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        resetErrorData(formErrors, setFormErrors);

        if (user.id) {
            axiosClient.post(`/users/${user.id}`, user, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
                .then(() => {
                    setNotification(t('user_form.update_success'))
                    props.onClose()
                })
                .catch(error => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        if (response.data.errors) {
                            setErrorData(response.data.errors, formErrors, setFormErrors)
                        }
                    }
                })
        } else {
            axiosClient.post(`/users`, user, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
                .then(() => {
                    setNotification(t('user_form.add_success'))
                    props.onClose()
                })
                .catch(error => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        if (response.data.errors) {
                            setErrorData(response.data.errors, formErrors, setFormErrors)
                        }
                    }
                })
        }
    }

    return (
        <>
            {loading && <span className="loading-circle"><CircularProgress/></span>}
            {!loading && user.id && <DialogTitle>Gebruiker aanpassen</DialogTitle>}
            {!loading && !user.id && <DialogTitle>Gebruiker toevoegen</DialogTitle>}
            {!loading &&
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <TextField value={user.first_name}
                                           onChange={ev => setUser({...user, first_name: ev.target.value})}
                                           label={t('user_form.first_name')} variant="outlined" margin="dense"
                                           style={{width: 250}}
                                           error={formErrors.first_name.errorstatus}
                                           helperText={formErrors.first_name.helperText}/>
                                &nbsp;&nbsp;&nbsp;
                                <TextField value={user.middle_name}
                                           onChange={ev => setUser({...user, middle_name: ev.target.value})}
                                           label={t('user_form.middle_name')} variant="outlined" margin="dense"
                                           style={{width: 150}}
                                           error={formErrors.middle_name.errorstatus}
                                           helperText={formErrors.middle_name.helperText}/>
                                &nbsp;&nbsp;&nbsp;
                                <TextField value={user.last_name}
                                           onChange={ev => setUser({...user, last_name: ev.target.value})}
                                           label={t('user_form.last_name')} variant="outlined" margin="dense"
                                           style={{width: 250}}
                                           error={formErrors.last_name.errorstatus}
                                           helperText={formErrors.last_name.helperText}/>
                                <TextField value={user.email}
                                           onChange={ev => setUser({...user, email: ev.target.value})}
                                           label={t('user_form.email')} variant="outlined" margin="dense"
                                           style={{width: 668}}
                                           error={formErrors.email.errorstatus}
                                           helperText={formErrors.email.helperText}/>
                                <TextField onChange={ev => setUser({...user, password: ev.target.value})}
                                           type="password"
                                           label={t('user_form.password')} variant="outlined" margin="dense"
                                           style={{width: 668}}
                                           error={formErrors.password.errorstatus}
                                           helperText={formErrors.password.helperText}/>
                                <TextField onChange={ev => setUser({...user, password_confirmation: ev.target.value})}
                                           type="password"
                                           label={t('user_form.password_confirmation')} variant="outlined"
                                           margin="dense" style={{width: 668}}
                                           error={formErrors.password_confirmation.errorstatus}
                                           helperText={formErrors.password_confirmation.helperText}/>
                                <br/>&nbsp;<br/>
                                {user.id && (
                                <Button onClick={() => setUser({...user, _method: 'put'})}
                                        type="submit" color="secondary" variant="outlined" size="large"
                                        style={{width: 250}} margin="dense"
                                        startIcon={<PersonIcon/>}>
                                    {t('general.save')}
                                </Button>)}
                                {!user.id && (
                                    <Button
                                    type="submit" color="secondary" variant="outlined" size="large"
                                    style={{width: 250}} margin="dense"
                                    startIcon={<PersonAddIcon/>}>
                                {t('general.add')}
                                    </Button>)}
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    onClick={() =>
                                        props.onClose()}
                                    color="error" variant="outlined" size="large"
                                    style={{width: 195}} margin="dense"
                                    startIcon={<CloseIcon/>}>
                                    {t('general.cancel')}
                                </Button>

                            </Grid>

                            <Grid item xs={4}>
                                <input
                                    accept="image/*"
                                    type="file"
                                    value=''
                                    id="select-image"
                                    style={{display: "none"}}
                                    onChange={(e) => setSelectedImage(e.target.files[0])}
                                />

                                <Box mt={2} sx={{height: 230}}>
                                    {imageUrl && selectedImage && (
                                        <Avatar src={imageUrl} alt={selectedImage.name} sx={{ width: 230, height: 230 }}/>
                                    )}
                                    {!imageUrl && user.image && (
                                        <Avatar src={import.meta.env.VITE_API_BASE_URL + '/' + user.image} alt={user.image} sx={{ width: 230, height: 230 }}/>
                                    )}
                                </Box>
                                <label htmlFor="select-image">
                                    <br/>&nbsp;<br/>
                                    <Button variant="outlined" color="secondary" size="large" style={{width: 250}}
                                            margin="dense"
                                            component="span" startIcon={<AddPhotoAlternateIcon/>}>
                                        {t('user_form.upload_avatar')}
                                    </Button>
                                </label>

                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>}
        </>
    )

}
