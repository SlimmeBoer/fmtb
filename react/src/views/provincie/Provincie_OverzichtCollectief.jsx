
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import CollectivePicker from "../../components/forms/CollectivePicker.jsx";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import TotaalKPIsCollectief from "../../components/data/TotaalKPIsCollectief.jsx";
import Stack from "@mui/material/Stack";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ScoresTableCollectiveAnon from "../../components/data/ScoresTableCollectiveAnon.jsx";

export default function Provincie_OverzichtCollectief() {

    const { id: paramId } = useParams();
    const [id, setId] = useState(paramId || '');

    const {t} = useTranslation();

    useEffect(() => {
        if (paramId !== id) {
            setId(paramId); // Sync state if URL param changes
        }

    }, [paramId]);
    const handleChange = (e) => {
        setId(e.target.value); // Change `id` state based on user input or actions
    };


    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Stack direction="row" gap={2} sx={{mb: 2}}>
                <AnalyticsIcon/>
                <Typography component="h6" variant="h6">
                    {t("pages_provincie.overview_collective")}
                </Typography>
            </Stack>
            <CollectivePicker collective={id} changeHandler={handleChange}/>
            {id !== '' && id !== undefined  && <Box>
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                >
                    <Grid size={{xs: 12, lg: 4}}>
                        <ScoresTableCollectiveAnon collective={id} link={"/provincie/scores/individueel/"}/>
                    </Grid>
                    <Grid  size={{xs: 12, lg: 8}}>
                        <TotaalKPIsCollectief collective={id} />
                    </Grid>
                </Grid>
            </Box>
            }
            {id === undefined && <Box>
                <Typography component="h2" variant="body2" sx={{mb: 2, mt: 2}}>
                    Kies een collectief met bovenstaande selectiebox.
                </Typography>
            </Box>
            }
        </Box>
    )

}
