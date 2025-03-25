import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ScoresTableTotaal from "../../components/data/ScoresTableTotaal.jsx";
import TotaalKPIs from "../../components/data/TotaalKPIs.jsx";
import {useTranslation} from "react-i18next";

export default function Admin_OverzichtTotaal() {

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                {t("pages_admin.overview_total")}
            </Typography>
           <Box>
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                >
                    <Grid size={{xs: 12, lg: 4}}>
                        <ScoresTableTotaal limit={1000}/>
                    </Grid>
                    <Grid  size={{xs: 12, lg: 8}}>
                        <TotaalKPIs collective={0} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )

}
