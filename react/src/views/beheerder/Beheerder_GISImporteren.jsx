
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import GisUploader from "../../components/forms/GisUploader.jsx";
import {useTranslation} from "react-i18next";

export default function Beheerder_GISImporteren() {

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                {t("pages_collectief.scangis_import")}
            </Typography>
            <Typography component="body2" variant="body2">
                {t("gis_upload.explanation")}
            </Typography>
           <GisUploader />
        </Box>
    )

}
