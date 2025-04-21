import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ScoresTableTotaal from "../../components/data/ScoresTableTotaal.jsx";
import TotaalKPIs from "../../components/data/TotaalKPIs.jsx";
import {useTranslation} from "react-i18next";
import ScoresTableTotaalAnon from "../../components/data/ScoresTableTotaalAnon.jsx";
import Stack from "@mui/material/Stack";
import AnalyticsIcon from "@mui/icons-material/Analytics";

export default function Provincie_OverzichtTotaal() {

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Stack direction="row" gap={2} sx={{mb: 2}}>
                <AnalyticsIcon/>
                <Typography component="h6" variant="h6">
                    {t("pages_provincie.overview_total")}
                </Typography>
            </Stack>
           <Box>
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                >
                    <Grid size={{xs: 12, lg: 4}}>
                        <ScoresTableTotaalAnon limit={1000} link={"/provincie/scores/individueel/"} />
                    </Grid>
                    <Grid  size={{xs: 12, lg: 8}}>
                        <TotaalKPIs collective={0} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )

}
