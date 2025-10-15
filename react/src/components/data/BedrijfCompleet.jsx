
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
            <Typography variant="body2" sx={{mb: 3}}>
                {t("company_dashboard.complete_explanation1")}
            </Typography>
            <PdfButtonCompanyConcept />
        </Box>
    );
};

export default BedrijfCompleet;
