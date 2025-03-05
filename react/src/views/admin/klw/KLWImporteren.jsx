
import KLWUploader from "../../../components/forms/KLWUploader.jsx";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";

export default function KLWImporteren() {

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                {t("pages_admin.klw_import")}
            </Typography>
            <KLWUploader />
        </Box>
    )

}
