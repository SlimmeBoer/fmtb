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

const SettingForm = ({setting, index, onAddorDelete}) => {

    const [formData, setFormData] = useState({
        id: null,
        key: '',
        value: '',
    });

    const [tempformData, setTempFormData] = useState({
        id: null,
        key: '',
        value: '',
    });

    const [formErrors, setFormErrors] = useState({
        key: {errorstatus: false, helperText: ''},
        value: {errorstatus: false, helperText: ''},
    });

    useEffect(() => {
        if (setting) {
            setFormData(setting)
            setTempFormData(setting)
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
            axiosClient.put(`/settings/${tempformData.id}`, tempformData)
                .then(response => {
                    setNotification('Setting updated successfully');
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
        }
    };


    const cancelSubmit = (e) => {
        e.preventDefault();
        setTempFormData(formData);
        setIsEditing(false);
    };

    return (
        <form >
            {submitting && <LinearProgress color="inherit"  sx={{height: 20 }} />}
            {!submitting &&
                <Stack key={"stack" + index} direction="row" gap={1} sx={{mb: 1, mt: 1}}>
                    <Box key={"item-key" + index} sx={{width: '15%'}}><EditableField key={"key" + index}
                                                                                    onChange={(value) => handleFieldChange('key', value)}
                                                                                    value={tempformData.key}
                                                                                    error={formErrors.key}
                                                                                    isEditing={isEditing}/></Box>
                    <Box key={"item-value" + index} sx={{width: '55%'}}><EditableField key={"value" + index}
                                                                                           onChange={(value) => handleFieldChange('value', value)}
                                                                                           value={tempformData.value}
                                                                                           error={formErrors.value}
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
                        </Box>)}
                </Stack>
            }
        </form>
    );
};

export default SettingForm;
