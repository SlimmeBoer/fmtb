import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import {useTranslation} from "react-i18next";
import KLWOverviewCollectief from "../../components/data/KLWOverviewCollectief.jsx";
import CollectiefGauges from "../../components/data/CollectiefGauges.jsx";
import ActionOverviewCollectief from "../../components/visuals/ActionOverviewCollectief.jsx";
import CollectiefLogo from "../../components/visuals/CollectefLogo.jsx";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export default function Collectief_Dashboard() {

    const {t} = useTranslation();

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px', lg: '1700px'}}}>
            <Stack direction="row" gap={2}>
                <HomeRoundedIcon/>
                <Typography component="h6" variant="h6">
                    {t("pages_collectief.dashboard")}
                </Typography>
            </Stack>
            <Grid
                container
                spacing={2}
                columns={12}
                alignItems="stretch" // Ensures both left and right sections match height
                sx={{ mb: (theme) => theme.spacing(2) }}
            >
                {/* Left Column */}
                <Grid
                    size={8}
                    sx={{ display: "flex", flexDirection: "column" }} // Keeps items stacked but aligaligned properly
                >
                    {/* Row of CompletionGauges */}
                    <CollectiefGauges />
                    <Box sx={{height: '20px;'}}/>
                    <KLWOverviewCollectief link={"/collectief/scores/individueel/"} matrixlink={"/collectief/matrix/"} />

                </Grid>

                {/* Right Column */}
                <Grid size={4} sx={{ display: "flex", flexDirection: "column" }}>
                    <CollectiefLogo />
                    <Box sx={{height: '20px;'}}/>
                    <ActionOverviewCollectief link={"/collectief/scores/individueel/"}/>
                </Grid>
            </Grid>
        </Box>
    )

}
