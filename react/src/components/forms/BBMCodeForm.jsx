import React, {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {useTranslation} from 'react-i18next';
import {Autocomplete, Box, Button, CircularProgress, DialogContent, DialogTitle, TextField} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from '@mui/icons-material/Close';
import {setErrorData} from "../../helpers/ErrorData.js";

export default function BBMCodeForm(props) {
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    const [category, setCategory] = useState({
        id: null,
        parent: '',
        image: '',
        title: '',
    })
    const [parentName, setParentName] = useState('')
    const [icons, setIcons] = useState([]);
    const [ParentInvalid, setParentInvalid] = useState({});
    const [ImageInvalid, setImageInvalid] = useState({});
    const [TitleInvalid, setTitleInvalid] = useState({});

    const {t} = useTranslation();

    useEffect(() => {
        setLoading(true);
        getIcons();
        if (props.id !== 0) {
            getCategory(props.id)
        } else {
            if (props.parent !== null) {
                setCategory({...category, parent: props.parent})
                getParentCategory(props.parent)
            }
        }
        setLoading(false);
    }, [])

    const getCategory = (id) => {
        axiosClient.get(`/categories/${id}`)
            .then(({data}) => {
                setCategory(data)
                if (data.parent !== null) {
                    getParentCategory(data.parent)
                }
            })
    }

    const getParentCategory = (parent_id) => {
        axiosClient.get(`/categories/${parent_id}`)
            .then(({data}) => {
                setParentName(data.title)
            })
    }

    const getIcons = (id) => {
        axiosClient.get(`/icons`)
            .then(({data}) => {
                setIcons(data.data)
            })
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        setParentInvalid({state: false, message: ''})
        setImageInvalid({state: false, message: ''})
        setTitleInvalid({state: false, message: ''})

        if (category.id) {
            axiosClient.post(`/categories/${category.id}`, category)
                .then(() => {
                    setNotification(t('category_form.update_success'))
                    props.onClose()
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        if (response.data.errors) {

                            setErrorData(response.data.errors,
                                {
                                    parent: setParentInvalid,
                                    image: setImageInvalid,
                                    title: setTitleInvalid
                                })
                        }
                    }
                })
        } else {
            axiosClient.post(`/categories`, category)
                .then(() => {
                    setNotification(t('category_form.add_success'))
                    props.onClose()
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        if (response.data.errors) {
                            for (const error_prop in response.data.errors) {
                                setErrorData(response.data.errors,
                                    {
                                        parent: setParentInvalid,
                                        image: setImageInvalid,
                                        title: setTitleInvalid
                                    })
                            }
                        }
                    }
                })
        }
    }

    return (
        <>
            {loading && <span className="loading-circle"><CircularProgress/></span>}
            {!loading && category.id && <DialogTitle>{t('category_form.update_title')}</DialogTitle>}
            {!loading && !category.id && <DialogTitle>{t('category_form.new_title')}</DialogTitle>}
            {!loading &&
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <TextField value={parentName} disabled
                                   label={t('category_form.parent')} variant="outlined" margin="dense"
                                   style={{width: 400}}
                                   error={ParentInvalid.state}
                                   helperText={ParentInvalid.state && ParentInvalid.message}/>
                        &nbsp;&nbsp;&nbsp;
                        <Autocomplete
                            id="image_select"
                            margin="dense"
                            onInputChange={(event, newInputValue) => {
                                setCategory({...category, image: newInputValue})
                            }}
                            value={category.image}
                            sx={{width: 400}}
                            options={icons}
                            autoHighlight freeSolo
                            renderOption={(props, option) => (
                                <Box component="li" sx={{'& > span': {mr: 2, flexShrink: 0}}}{...props}>
                                    <span><FontAwesomeIcon
                                        icon={['fas', option.label]}/></span>
                                    <span className="autocomplete_icon">{option.label}</span>
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={t('category_form.choose_icon')}
                                    margin="dense"
                                    error={ImageInvalid.state}
                                    helperText={ImageInvalid.state && ImageInvalid.message}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                        <TextField value={category.title}
                                   onChange={ev => setCategory({...category, title: ev.target.value})}
                                   label={t('category_form.title')} variant="outlined" margin="dense"
                                   style={{width: 400}}
                                   error={TitleInvalid.state}
                                   helperText={TitleInvalid.state && TitleInvalid.message}/>
                        <br/>&nbsp;<br/>
                        {category.id && (
                            <Button onClick={() => setCategory({...category, _method: 'put'})}
                                    type="submit" color="secondary" variant="outlined" size="large"
                                    style={{width: 195}} margin="dense"
                                    startIcon={<EditIcon/>}>
                                {t('general.save')}
                            </Button>)}
                        {!category.id && (
                            <Button
                                type="submit" color="secondary" variant="outlined" size="large"
                                style={{width: 195}} margin="dense"
                                startIcon={<AddIcon/>}>
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
                    </form>
                </DialogContent>}
        </>
    )

}
