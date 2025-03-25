
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import KLWOverviewCollectief from "../../components/data/KLWOverviewCollectief.jsx";
import KLWDataCollectief from "../../components/data/KLWDataCollectief.jsx";
import KLWDataAdmin from "../../components/data/KLWDataAdmin.jsx";

export default function Beheerder_KLWData() {


    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                {t("pages_beheerder.klw_data")}
            </Typography>
            <KLWDataAdmin />
        </Box>
    )

}
