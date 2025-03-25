import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import GisOverview from "../../components/data/GisOverview.jsx";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid2";
import CollectiefGauges from "../../components/data/CollectiefGauges.jsx";
import KLWOverviewCollectief from "../../components/data/KLWOverviewCollectief.jsx";
import ActionOverview from "../../components/visuals/ActionOverview.jsx";
import BBMKPICard from "../../components/data/BBMKPICard.jsx";

export default function Beheerder_BBMKPI() {

    const {t} = useTranslation();

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                {t("pages_collectief.bbmkpi_settings")}
            </Typography>
            <Typography component="body2" variant="body2" >
                {t("pages_collectief.bbmkpi_settings_explanation")}
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{mt: 4}}
            >
                {/* KPI 10 */}
                <Grid
                    item
                    xs={12} sm={12} lg={4}
                >
                    <BBMKPICard kpi={10} title={t('kpis.10')} bgcolor={'#e2efda'} />
                </Grid>

                {/* KPI 11 */}
                <Grid
                    item
                    xs={12} sm={12} lg={4}
                >
                    <BBMKPICard kpi={11} title={t('kpis.11')} bgcolor={'#fff2cc'} />
                </Grid>

                {/* KPI 12 */}
                <Grid
                    item
                    xs={12} sm={12} lg={4}
                >
                    <BBMKPICard kpi={12} title={t('kpis.12')} bgcolor={'#ddebf7'} />
                </Grid>
            </Grid>
        </Box>
    )

}
