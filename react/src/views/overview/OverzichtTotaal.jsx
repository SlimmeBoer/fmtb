import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ScoresTableTotaal from "../../components/data/ScoresTableTotaal.jsx";
import TotaalKPIs from "../../components/data/TotaalKPIs.jsx";

export default function OverzichtCollectief() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Overzicht - Totaal
            </Typography>
           <Box>
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                >
                    <Grid size={{xs: 12, lg: 4}}>
                        <ScoresTableTotaal />
                    </Grid>
                    <Grid  size={{xs: 12, lg: 8}}>
                        <TotaalKPIs collective={0} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )

}
