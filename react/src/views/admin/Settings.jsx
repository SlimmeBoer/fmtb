
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import BBMCodesView from "../../components/data/BBMCodesView.jsx";
import Grid from "@mui/material/Grid2";

export default function Settings() {

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Instellingen
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{mb: (theme) => theme.spacing(2), mt: 2}}
            >
                <Grid size={{xs: 12, lg: 6}} key="settings-grid-1">
                    <BBMCodesView />
                </Grid>
            </Grid>
        </Box>
    )

}
