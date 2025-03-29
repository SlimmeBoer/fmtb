
import React from 'react';
import {
    Typography,
    Box, Alert
} from '@mui/material';
import {useTranslation} from "react-i18next";

const BedrijfCompleet = () => {
    const {t} = useTranslation();

    return (
        <Box>
            <Typography variant="h4" sx={{mb: 3}}>
                {t("company_dashboard.complete_title")}
            </Typography>
            <Alert severity="success">{t("company_dashboard.complete_explanation")}</Alert>
        </Box>
    );
};

export default BedrijfCompleet;
