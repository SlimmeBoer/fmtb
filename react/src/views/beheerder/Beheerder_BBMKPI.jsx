import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid2";
import BBMKPICard from "../../components/data/BBMKPICard.jsx";
import Stack from "@mui/material/Stack";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export default function Beheerder_BBMKPI() {

    const {t} = useTranslation();

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Stack direction="row" gap={2} sx={{mb: 2}}>
                <SettingsRoundedIcon/>
                <Typography component="h6" variant="h6">
                    {t("pages_collectief.bbmkpi_settings")}
                </Typography>
            </Stack>
            <Typography variant="body2" >
                {t("pages_collectief.bbmkpi_settings_explanation")}
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
