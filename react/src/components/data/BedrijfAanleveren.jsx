// src/components/GISOverview.jsx
import React, {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Typography,
    Link, Box, TextField, InputLabel
} from '@mui/material';
import axiosClient from "../../axios_client.js";
import GisRecordsDialog from "./GisRecordsDialog";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import Card from "@mui/material/Card";
import KLWUploader from "../forms/KLWUploader.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SaveIcon from "@mui/icons-material/Save";
import KLWDataBedrijf from "./KLWDataBedrijf.jsx";
import KLWUploaderBedrijf from "../forms/KLWUploaderBedrijf.jsx";
import {useNavigate} from "react-router-dom";

const BedrijfAanleveren = () => {
    const [loading, setLoading] = useState(true);
    const [bankNumber, setBankNumber] = useState("");
    const [accountHolder, setAccountHolder] = useState("");
    const [checked, setChecked] = useState(false);
    const [klwDumps, setKlwDumps] = useState([]);
    const [renderTable, setRenderTable] = useState(false);
    const navigate = useNavigate();

    const isFormValid =
        /^NL[0-9]{2}[A-Z0-9]{4}[0-9]{10}$/.test(bankNumber) &&
        accountHolder &&
        checked &&
        klwDumps.length > 0;

    const {t} = useTranslation();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("bankNumber", bankNumber);
        formData.append("accountHolder", accountHolder);
        axiosClient.post(`/companies/savedata`, formData)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                }
            })
            .catch(error => {

            })
    };

    const rerenderTable = () => {
        // Toggle the state to trigger a re-render
        setRenderTable((prev) => !prev);
    };


    return (
        <Box>
            <Typography variant="h4" sx={{mb: 3}}>
                Aanleveren bedrijfsdata
            </Typography>
            <Typography variant="body2" sx={{mb: 3}}>
                Welkom bij de bedrijfs-module van het UMDL-programma! Via deze pagina kunt u uw
                Kringloopwijzer-bestanden aanleveren waarmee een deel van de KPI's berekend wordt.
                <br/>De overige KPI's (MBP, social-maatschappelijke activiteiten en de natuur-KPI's)
                zullen door uw collectief worden ingevuld. <br/> <br/>
                In het onderstaande overzicht kunt u zien welke bestanden er al voor u zijn aangeleverd.
                Vul deze aan met de gevraagde gegevens.<br/>

            </Typography>
            <Box sx={{backgroundColor: '#eeeeee', p: 2, border: "1px solid #ccc", borderRadius: 2}}>
                <KLWDataBedrijf renderTable={renderTable} onKlwDumpsChange={setKlwDumps} />
                <KLWUploaderBedrijf notifyParent={rerenderTable}/>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4}}>
                <InputLabel>Bankrekeningnummer (geef een geldig IBAN-nummer op, zonder spaties)</InputLabel>
                <TextField
                    variant="outlined"

                    value={bankNumber}
                    onChange={(e) => setBankNumber(e.target.value)}
                />
                <InputLabel>Bankrekeninghouder</InputLabel>
                <TextField
                    variant="outlined"

                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                />
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
                    label={t("company_dashboard.checkbox_label")}
                />
                <Button type="submit" variant="contained" color="success" disabled={!isFormValid} startIcon={<SaveIcon/>} sx={{marginBottom: 2}}>
                    {t("company_dashboard.finish_data")}
                </Button>
            </Box>
        </Box>
    );
};

export default BedrijfAanleveren;
