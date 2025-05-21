
import React from 'react';
import {
    Typography,
    Box, Alert
} from '@mui/material';
import {useTranslation} from "react-i18next";
import PdfButtonCompanyConcept from "./PdfButtonCompanyConcept.jsx";
import Link from "@mui/material/Link";

const BedrijfCompleet = () => {
    const {t} = useTranslation();

    return (
        <Box>
            <Typography variant="h4" sx={{mb: 3}}>
                {t("company_dashboard.complete_title")}
            </Typography>
            <Alert severity="success">{t("company_dashboard.complete_explanation1")}<br />< br/>
            {t("company_dashboard.complete_explanation2")}<br /><br />
            <Link href={"https://www.provincie-utrecht.nl/sites/default/files/2024-11/Uitleg 15 KPI%27s en draaiknoppen UMDL voor melkveehouders.pdf"} target={"_blank"}>Klik hier voor de brochure met de uitleg van de KPI-systematiek</Link></Alert>
            <PdfButtonCompanyConcept />
        </Box>
    );
};

export default BedrijfCompleet;
