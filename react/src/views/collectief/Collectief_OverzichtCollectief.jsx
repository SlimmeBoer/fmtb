
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import CollectivePicker from "../../components/forms/CollectivePicker.jsx";
import ScoresTableCollective from "../../components/data/ScoresTableCollective.jsx";
import TotaalKPIs from "../../components/data/TotaalKPIs.jsx";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import TotaalKPIsCollectief from "../../components/data/TotaalKPIsCollectief.jsx";

export default function Collectief_OverzichtCollectief() {


    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                {t("pages_collectief.overview_collective")}
            </Typography>
            <Box>
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                >
                    <Grid size={{xs: 12, lg: 4}}>
                        <ScoresTableCollective collective={0} link={"/collectief/scores/individueel/"}/>
                    </Grid>
                    <Grid  size={{xs: 12, lg: 8}}>
                        <TotaalKPIsCollectief collective={0} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )

}
