import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import GisOverview from "../../components/data/GisOverview.jsx";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid2";
import BBMKPICard from "../../components/data/BBMKPICard.jsx";
import BBMGisOverview from "../../components/data/BBMGisOverview.jsx";
import BBMAnlbOverview from "../../components/data/BBMAnlbOverview.jsx";

export default function Beheerder_ScanGISANLb() {

    const {t} = useTranslation();

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                {t("pages_collectief.scangis_anlb_settings")}
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{mt: 4}}
            >
                {/* Z-pakketten */}
                <Grid size={{xs: 12, md: 6, lg: 6}}>
                    <Box sx={{width: '700px', height: '60px'}}>
                        <Typography variant="body2">
                            {t("pages_collectief.scangis_anlb_settings_explanation1")}
                        </Typography>
                    </Box>

                    <BBMGisOverview/>
                </Grid>

                {/* ANlb */}
                <Grid size={{xs: 12, md: 6, lg: 6}}>
                    <Box sx={{width: '700px', height: '60px'}}>
                        <Typography variant="body2">
                            {t("pages_collectief.scangis_anlb_settings_explanation2")}
                        </Typography>
                    </Box>
                    <BBMAnlbOverview/>
                </Grid>
            </Grid>
        </Box>
    )

}
