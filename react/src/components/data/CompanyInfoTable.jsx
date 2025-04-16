import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {resetErrorData, setErrorData} from "../../helpers/ErrorData.js";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditableField from "../forms/EditableField.jsx";
import CenteredLoading from "../visuals/CenteredLoading.jsx";

export default function CompanyInfoTable(props) {
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const initialFormState = {
        id: props.company,
        name: '',
        address: '',
        postal_code: '',
        city: '',
        province: '',
        phone: '',
        email: '',
        ubn: '',
        brs: '',
        bank_account: '',
        bank_account_name: '',
    };

    const fieldLabels = {
        name: 'Bedrijfsnaam',
        address: 'Adres',
        postal_code: 'Postcode',
        city: 'Stad',
        province: 'Provincie',
        phone: 'Telefoon',
        email: 'Email',
        ubn: 'UBN',
        brs: 'BRS',
        bank_account: 'Bankrekening',
        bank_account_name: 'Rekeninghouder',
    };

    const initialErrorState = Object.keys(initialFormState).reduce((acc, key) => {
        acc[key] = {errorstatus: false, helperText: ''};
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormState);
    const [tempformData, setTempFormData] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState(initialErrorState);

    useEffect(() => {
        getCompany();
    }, [props.company])

    const getCompany = () => {
        if (props.company !== '') {
            setLoading(true);
            axiosClient.get(`/companies/getcompany/${props.company}`)
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
        axiosClient.put(`/companies/update/${tempformData.id}`, tempformData)
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
                    <InfoOutlinedIcon/>
                    <Typography component="h6" variant="h6">
                        Algemene Bedrijfsinformatie
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
                {(loading || submitting) && <CenteredLoading/>}
                {!loading && !submitting && company.id != null &&
                    <Table sx={{maxWidth: 1000, mt: 2}} size="small" aria-label="simple table">
                        <TableBody>
                            {Object.keys(initialFormState).map((key, index) => (
                                fieldLabels[key] && (
                                    <TableRow key={"companyinfo-" + index}>
                                        <TableCell sx={{width: 50}}>{fieldLabels[key]}:</TableCell>
                                        <TableCell sx={{width: 150, fontWeight: 'bold'}}>
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
                            <TableRow key={"companyinfo-" + 101}>
                                <TableCell sx={{width: 50}}>&nbsp;</TableCell>
                                <TableCell sx={{width: 150, fontWeight: 'bold'}}>&nbsp;</TableCell>
                            </TableRow>
                            <TableRow key={"companyinfo-" + 102}>
                                <TableCell sx={{width: 50}}>KVK-nummers:</TableCell>
                                <TableCell sx={{width: 150, fontWeight: 'bold'}}>{company.kvks}</TableCell>
                            </TableRow>
                            <TableRow key={"companyinfo-" + 103}>
                                <TableCell sx={{width: 50}}>Onderdeel van collectief:</TableCell>
                                <TableCell sx={{width: 150, fontWeight: 'bold'}}>
                                    {company.collectieven.map((c, index) => {
                                        return (
                                            <Link key={"link-" + index}
                                                  href={"/overzicht/collectief/" + c.id}>{c.name}</Link>
                                        )
                                    })}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"companyinfo-" + 104}>
                                <TableCell sx={{width: 50}}>Biologisch bedrijf?:</TableCell>
                                <TableCell
                                    sx={{width: 150, fontWeight: 'bold'}}>{company.bio === 1 ? 'Ja' : 'Nee'}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>}
            </TableContainer>
        </Card>

    )
        ;
}
