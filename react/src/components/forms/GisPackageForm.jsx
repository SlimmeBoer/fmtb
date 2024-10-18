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
import EditableBBMSelect from "./EditableBBMSelect.jsx";

const GisPackageForm = ({gispackage, bbmcodes, index, onAddorDelete, onCancelNew}) => {


    const [formData, setFormData] = useState({
        id: null,
        code_id: '',
        package: '',
    });

    const [tempformData, setTempFormData] = useState({
        id: null,
        code_id: '',
        package: '',
    });

    const [formErrors, setFormErrors] = useState({
        code_id: {errorstatus: false, helperText: ''},
        package: {errorstatus: false, helperText: ''},
    });

    useEffect(() => {
        if (gispackage) {
            setFormData(gispackage)
            setTempFormData(gispackage)
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
            axiosClient.put(`/bbmgispackages/${tempformData.id}`, tempformData)
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
            axiosClient.post(`/bbmgispackages`, tempformData)
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

        axiosClient.delete(`/bbmgispackages/${gispackage.id}`)
            .then(() => {
                onAddorDelete();
            })
    }

    return (
        <form >
            {submitting && <LinearProgress color="inherit"  sx={{height: 20 }} />}
            {!submitting &&
                <Stack key={"stack" + index} direction="row" gap={1} sx={{mb: 1, mt: 1}}>
                    <Box key={"item-bbmcode-" + index} sx={{width: '30%'}}><EditableBBMSelect key={"bbmcode-" + index}
                                                                                    onChange={(value) => handleFieldChange('code_id', value)}
                                                                                    value={tempformData.code_id}
                                                                                         displayvalues={bbmcodes}
                                                                                    error={formErrors.code_id}
                                                                                    isEditing={isEditing}/></Box>
                    <Box key={"item-package-" + index} sx={{width: '70%'}}><EditableField key={"package-" + index}
                                                                                           onChange={(value) => handleFieldChange('package', value)}
                                                                                           value={tempformData.package}
                                                                                           error={formErrors.package}
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

export default GisPackageForm;
