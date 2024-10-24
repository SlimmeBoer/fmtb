import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    CircularProgress,
} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import Stack from "@mui/material/Stack";
import {resetErrorData, setErrorData} from "../../helpers/ErrorData.js";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import EditableField from "../forms/EditableField.jsx";


export default function CompanyPropertyTable(props) {
    const [properties, setProperties] = useState({});
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const initialFormState = {
        id: props.company,
        melkkoeien: '',
        meetmelk_per_koe: '',
        meetmelk_per_ha: '',
        jongvee_per_10mk: '',
        gve_per_ha: '',
        kunstmest_per_ha: '',
        opbrengst_grasland_per_ha: '',
        re_kvem: '',
        krachtvoer_per_100kg_melk: '',
        veebenutting_n: '',
        bodembenutting_n: '',
        bedrijfsbenutting_n: '',
    };

    const fieldLabels = {
        melkkoeien: 'Melkkoeien',
        meetmelk_per_koe: 'Meetmelk per koe',
        meetmelk_per_ha: 'Meetmelk per hectare',
        jongvee_per_10mk: 'Jongvee per 10 melkkoeien',
        gve_per_ha: 'GVE per hectare',
        kunstmest_per_ha: 'Kunstmest per hectare',
        opbrengst_grasland_per_ha: 'Opbnrengst grasland per ha',
        re_kvem: 'RE / KVEM',
        krachtvoer_per_100kg_melk: 'Krachtvoer per 100kg melk',
        veebenutting_n: 'Veebenutting N',
        bodembenutting_n: 'Bodembenutting N',
        bedrijfsbenutting_n: 'Bedrijfsbenutting N',
    };

    const initialErrorState = Object.keys(initialFormState).reduce((acc, key) => {
        acc[key] = { errorstatus: false, helperText: '' };
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormState);
    const [tempformData, setTempFormData] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState(initialErrorState);

    useEffect(() => {
        getProperties();
    }, [props.company])

    const getProperties = () => {
        if (props.company !== '') {
            setLoading(true);
            axiosClient.get(`/companies/getproperties/${props.company}`)
                .then(({data}) => {
                    setLoading(false);
                    setCompany(data);
                    setFormData(data);
                    setTempFormData(data);
                })
                .catch(() => {
                    setLoading(false);
                })
        }
    }

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
        axiosClient.put(`/companyproperties/update/${tempformData.id}`, tempformData)
            .then(response => {
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
    };

    const cancelSubmit = (e) => {
        e.preventDefault();
        setTempFormData(formData);
        setIsEditing(false);
    };

    return (
        <Card variant="outlined">
            <Stack direction="row" gap={2}
                   sx={{
                       display: {xs: 'none', md: 'flex'},
                       width: '100%',
                       alignItems: {xs: 'flex-start', md: 'center'},
                       justifyContent: 'space-between',
                       maxWidth: {sm: '100%'},
                       pt: 1.5, pb: 4,
                   }}>
                <Stack direction="row" gap={2}>
                    <AssessmentOutlinedIcon/>
                    <Typography component="h6" variant="h6">
                        Managementinformatie
                    </Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                    {isEditing ? (
                        <>
                            <IconButton variant="outlined" onClick={handleSubmit}>
                                <SaveIcon/>
                            </IconButton>
                            <IconButton variant="outlined" onClick={cancelSubmit}>
                                <CancelIcon/>
                            </IconButton>
                        </>
                    ) : (
                        <IconButton variant="outlined" onClick={toggleEditMode}>
                            <EditIcon/>
                        </IconButton>)}
                </Stack>
            </Stack>
            <TableContainer sx={{minHeight: 100}}>
                {(loading || submitting) && <CircularProgress/>}
                {!loading && !submitting && company.id != null &&
                    <Table sx={{maxWidth: 1000, mt: 2}} size="small" aria-label="simple table">
                        <TableBody>
                            {Object.keys(initialFormState).map((key, index) => (
                                fieldLabels[key] && (
                                    <TableRow key={"property-" + index}>
                                        <TableCell sx={{ width: 50 }}>{fieldLabels[key]}:</TableCell>
                                        <TableCell sx={{ width: 150, fontWeight: 'bold' }}>
                                            <EditableField
                                                key={key}
                                                onChange={(value) => handleFieldChange(key, value)}
                                                value={tempformData[key]}
                                                error={formErrors[key]}
                                                isEditing={isEditing}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            ))
                            }
                        </TableBody>
                    </Table>}
            </TableContainer>
        </Card>
    );
}
