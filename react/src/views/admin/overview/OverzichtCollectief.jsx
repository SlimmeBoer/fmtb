
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import CollectivePicker from "../../../components/forms/CollectivePicker.jsx";
import ScoresTableCollective from "../../../components/data/ScoresTableCollective.jsx";
import TotaalKPIs from "../../../components/data/TotaalKPIs.jsx";
import {useParams} from "react-router-dom";

export default function OverzichtCollectief() {

    const { id: paramId } = useParams();
    const [id, setId] = useState(paramId || '');

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
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                {t("pages_admin.overview_collective")}
            </Typography>
            <CollectivePicker collective={id} changeHandler={handleChange}/>
            {id !== '' && id !== undefined  && <Box>
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                >
                    <Grid size={{xs: 12, lg: 4}}>
                        <ScoresTableCollective collective={id}/>
                    </Grid>
                    <Grid  size={{xs: 12, lg: 8}}>
                        <TotaalKPIs collective={id} />
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
