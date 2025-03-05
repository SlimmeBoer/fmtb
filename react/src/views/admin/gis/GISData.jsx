
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import GisOverview from "../../../components/data/GisOverview.jsx";
import {useTranslation} from "react-i18next";

export default function GISData() {

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                {t("pages_admin.scangis_data")}
            </Typography>
            <GisOverview />
        </Box>
    )

}
