import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import YearCard from "../../../components/visuals/YearCard.jsx";
import ScoresTableTotaal from "../../../components/data/ScoresTableTotaal.jsx";
import ActionOverview from "../../../components/visuals/ActionOverview.jsx";
import Card from "@mui/material/Card";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import InfoIcon from '@mui/icons-material/Info';
import Stack from "@mui/material/Stack";
import {useTranslation} from "react-i18next";

export default function Dashboard() {

    const {t} = useTranslation();

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                {t("pages_admin.dashboard")}
            </Typography>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{mb: (theme) => theme.spacing(2)}}
            >
                <Grid container={"dashboard-left"} size={{xs: 12, sm: 8, lg: 8}}>
                    <Grid key={"data-card-2021"} size={{xs: 12, sm: 4, lg: 3}}>
                        <YearCard year={2021} total={109} complete={85}/>
                    </Grid>
                    <Grid key={"data-card-2022"} size={{xs: 12, sm: 4, lg: 3}}>
                        <YearCard year={2022} total={109} complete={75}/>
                    </Grid>
                    <Grid key={"data-card-2023"} size={{xs: 12, sm: 4, lg: 3}}>
                        <YearCard year={2023} total={109} complete={73}/>
                    </Grid>
                    <Grid key={"data-card-2024"} size={{xs: 12, sm: 4, lg: 3}}>
                        <YearCard year={2024} total={133} complete={22}/>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, lg: 6}}>
                        <ScoresTableTotaal limit={20}/>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6, lg: 6}}>
                        <ActionOverview/>
                    </Grid>
                </Grid>
                <Grid container={"dashboard-right"} size={{xs: 12, sm: 4, lg: 4}}>
                    <Card variant="outlined">
                        <Box sx={{ minWidth: '100%'}}>
                            <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                                <InfoIcon/>
                                <Typography variant="h6">
                                    Welkom
                                </Typography>
                            </Stack>
                            <Typography sx={{mt: 2}}  variant="body2">
                                Welkom bij je persoonlijke dashboard. Op deze pagina zie je in één oogopslag wat de stand
                                van zaken is betreffende de data van het UMDL-programma.<br /><br />
                                De indicatoren in de taartdiagrammen geven aan in hoeverre de data van het programma al is
                                ingelezen voor de respectievelijke jaargangen. <br /><br />Daaronder is in het overzicht "Scores
                                Bedrijven Totaal" een overzicht te zien van de twintig best presterende melkveebedrijven
                                in het hele programma. <br /><br />In het overzicht "Openstaande Acties" zie je welke handelingen er
                                nog uitgevoerd dienen te worden om het programma compleet te krijgen.
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )

}
