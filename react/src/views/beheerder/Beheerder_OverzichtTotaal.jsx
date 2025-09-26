import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ScoresTableTotaal from "../../components/data/ScoresTableTotaal.jsx";
import TotaalKPIs from "../../components/data/TotaalKPIs.jsx";
import {useTranslation} from "react-i18next";
import Stack from "@mui/material/Stack";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ExcelExportButton from "../../components/data/ExcelExportButton.jsx";

export default function Beheerder_OverzichtTotaal() {

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Stack direction="row" gap={2}
                   sx={{
                       display: {xs: 'none', md: 'flex'},
                       width: '100%',
                       alignItems: {xs: 'flex-start', md: 'center'},
                       justifyContent: 'space-between',
                       maxWidth: {sm: '100%', md: '1700px'},
                       pt: 1.5, pb: 4,
                   }}>
                <Stack direction="row" gap={2}>
                    <AnalyticsIcon/>
                    <Typography component="h6" variant="h6">
                        {t("pages_beheerder.overview_total")}
                    </Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                    &nbsp;
                </Stack>
            </Stack>
            <Box>
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                >
                    <Grid size={{xs: 12, lg: 4}}>
                        <ScoresTableTotaal limit={1000} link={"/beheerder/scores/individueel/"}/>
                    </Grid>
                    <Grid  size={{xs: 12, lg: 8}}>
                        <TotaalKPIs collective={0} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )

}
