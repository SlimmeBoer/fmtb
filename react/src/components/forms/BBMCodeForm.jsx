import React, {useEffect, useState} from 'react';
import EditableField from './EditableField';
import IconButton from "@mui/material/IconButton";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import axiosClient from "../../axios_client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {resetErrorData, setErrorData} from "../../helpers/ErrorData.js";
import LinearProgress from "@mui/material/LinearProgress";
import {useTranslation} from "react-i18next";

const BBMCodeForm = ({bbmcode, index, onAddorDelete, onCancelNew}) => {

    const {t} = useTranslation();

    const [formData, setFormData] = useState({
        id: null,
        code: '',
        description: '',
        weight: '',
        unit: '',
    });

    const [tempformData, setTempFormData] = useState({
        id: null,
        code: '',
        description: '',
        weight: '',
        unit: '',
    });

    const [formErrors, setFormErrors] = useState({
        code: {errorstatus: false, helperText: ''},
        description: {errorstatus: false, helperText: ''},
        weight: {errorstatus: false, helperText: ''},
        unit: {errorstatus: false, helperText: ''},
    });

    useEffect(() => {
        if (bbmcode) {
            setFormData(bbmcode)
            setTempFormData(bbmcode)
        }
        else {
            setIsEditing(true)
        }
    },[]);

    const [isEditing, setIsEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const {setNotification} = useStateContext();

    // Handler to update form data
    const handleFieldChange = (name, value) => {
        setTempFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        resetErrorData(formErrors, setFormErrors)
        setSubmitting(true);
        setFormData(tempformData);
        if (tempformData.id !== null) {
            axiosClient.put(`/bbmcodes/${tempformData.id}`, tempformData)
                .then(response => {
                    setNotification('Record updated successfully');
                    setIsEditing(false);
                    setSubmitting(false);
                })
                .catch(error => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        if (response.data.errors) {
                            setErrorData(response.data.errors, formErrors, setFormErrors)
                        }
                    }
                    setSubmitting(false);
                })
        } else {
            axiosClient.post(`/bbmcodes`, tempformData)
                .then(response => {
                    setNotification('Record added successfully');
                    setIsEditing(false);
                    setSubmitting(false);
                    onAddorDelete();
                    onCancelNew();
                })
                .catch(error => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        if (response.data.errors) {
                            setErrorData(response.data.errors, formErrors, setFormErrors)
                        }
                    }
                    setSubmitting(false);
                })
        }
    };


    const cancelSubmit = (e) => {
        e.preventDefault();
        setTempFormData(formData);
        setIsEditing(false);
        onCancelNew();
    };

    const handleDelete = () => {
        if (!window.confirm('Weet je het zeker?')) {
            return
        }

        axiosClient.delete(`/bbmcodes/${bbmcode.id}`)
            .then(() => {
                onAddorDelete();
            })
    }

    return (
        <form >
            {submitting && <LinearProgress color="inherit"  sx={{height: 20 }} />}
            {!submitting &&
                <Stack key={"stack" + index} direction="row" gap={1} sx={{mb: 1, mt: 1}}>
                    <Box key={"item-code" + index} sx={{width: '15%'}}><EditableField key={"code" + index}
                                                                                    onChange={(value) => handleFieldChange('code', value)}
                                                                                    value={tempformData.code}
                                                                                    error={formErrors.code}
                                                                                    isEditing={isEditing}/></Box>
                    <Box key={"item-description" + index} sx={{width: '55%'}}><EditableField key={"description" + index}
                                                                                           onChange={(value) => handleFieldChange('description', value)}
                                                                                           value={tempformData.description}
                                                                                           error={formErrors.description}
                                                                                           isEditing={isEditing}/></Box>
                    <Box key={"item-weight" + index} sx={{width: '15%'}}><EditableField key={"weight" + index}
                                                                                      onChange={(value) => handleFieldChange('weight', value)}
                                                                                      value={tempformData.weight}
                                                                                      error={formErrors.weight}
                                                                                      isEditing={isEditing}/></Box>
                    <Box key={"item-unit" + index} sx={{width: '15%'}}><EditableField key={"unit" + index}
                                                                                    onChange={(value) => handleFieldChange('unit', value)}
                                                                                    value={tempformData.unit}
                                                                                    error={formErrors.unit}
                                                                                    isEditing={isEditing}/></Box>
                    {isEditing ? (
                        <Box key={"buttons" + index} sx={{width: 100}}>
                            <IconButton sx={{p: 0}} onClick={handleSubmit} size="small">
                                <SaveIcon sx={{fontSize: 16}}/>
                            </IconButton>
                            <IconButton sx={{p: 0}} onClick={cancelSubmit} size="small">
                                <CancelIcon sx={{fontSize: 16}}/>
                            </IconButton>
                        </Box>
                    ) : (
                        <Box key={"buttons" + index} sx={{width: 100}}>
                            <IconButton sx={{p: 0}} onClick={toggleEditMode} size="small">
                                <EditIcon sx={{fontSize: 16}}/>
                            </IconButton>
                            <IconButton sx={{p: 0}} onClick={handleDelete} size="small">
                                <DeleteIcon sx={{fontSize: 16}}/>
                            </IconButton>
                        </Box>)}
                </Stack>
            }
        </form>
    );
};

export default BBMCodeForm;
