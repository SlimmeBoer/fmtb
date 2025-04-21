import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import Grid from "@mui/material/Grid2";
import BBMGisOverview from "../../components/data/BBMGisOverview.jsx";
import BBMAnlbOverview from "../../components/data/BBMAnlbOverview.jsx";
import Stack from "@mui/material/Stack";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export default function Collectief_ScanGISANLb() {

    const {t} = useTranslation();

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Stack direction="row" gap={2} sx={{mb: 2}}>
                <SettingsRoundedIcon/>
                <Typography component="h6" variant="h6">
                    {t('pages_collectief.scangis_anlb_settings')}
                </Typography>
            </Stack>

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
