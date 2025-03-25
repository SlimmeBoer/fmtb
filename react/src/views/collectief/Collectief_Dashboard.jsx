import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ActionOverview from "../../components/visuals/ActionOverview.jsx";
import {useTranslation} from "react-i18next";
import KLWOverviewCollectief from "../../components/data/KLWOverviewCollectief.jsx";
import CollectiefGauges from "../../components/data/CollectiefGauges.jsx";

export default function Collectief_Dashboard() {

    const {t} = useTranslation();

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px', lg: '1700px'}}}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                {t("pages_collectief.dashboard")}
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                alignItems="stretch" // Ensures both left and right sections match height
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                {/* Left Column */}
                <Grid
                    container
                    item
                    xs={12} sm={12} lg={12}
                    sx={{ display: "flex", flexDirection: "column" }} // Keeps items stacked but aligned properly
                >
                    {/* Row of CompletionGauges */}
                    <CollectiefGauges />

                    {/* KLWOverviewCollectief should stay at the top */}
                    <Grid
                        item
                        xs={12}
                        sx={{ alignSelf: "stretch", mt: 2 }} // Stretches to full width, stays at the top
                    >
                        <KLWOverviewCollectief />
                    </Grid>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} sm={4} lg={4} sx={{ display: "flex", flexDirection: "column" }}>
                    <ActionOverview />
                </Grid>
            </Grid>
        </Box>
    )

}
