
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import ConfrontationMatrixCollective from "../../components/data/ConfrontationMatrixCollective.jsx";

export default function Collectief_Matrix() {

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                {t("pages_collectief.matrix")}
            </Typography>
            <ConfrontationMatrixCollective />
        </Box>
    )

}
