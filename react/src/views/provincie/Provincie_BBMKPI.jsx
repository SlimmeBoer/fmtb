import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid2";
import BBMKPICard from "../../components/data/BBMKPICard.jsx";

export default function Provincie_BBMKPI() {

    const {t} = useTranslation();

    return (
        <Box>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                {t("pages_provincie.bbmkpi_settings")}
            </Typography>
            <Typography variant="body2" >
                {t("pages_provincie.bbmkpi_settings_explanation")}
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{mt: 4}}
            >
                {/* KPI 10 */}
                <Grid size={{xs: 12, md: 6, lg: 4}}>
                    <BBMKPICard kpi={10} title={t('kpis.10')} bgcolor={'#fff2cc'} />
                </Grid>

                {/* KPI 11 */}
                <Grid size={{xs: 12, md: 6, lg: 4}}>
                    <BBMKPICard kpi={11} title={t('kpis.11')} bgcolor={'#e2efda'} />
                </Grid>

                {/* KPI 12 */}
                <Grid size={{xs: 12, md: 6, lg: 4}}>
                    <BBMKPICard kpi={12} title={t('kpis.12')} bgcolor={'#ddebf7'} />
                </Grid>
            </Grid>
        </Box>
    )

}
