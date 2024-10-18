
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import BBMKPIDragger from "../../components/data/BBMKPIDragger.jsx";
import Stack from "@mui/material/Stack";
import LayersIcon from "@mui/icons-material/Layers.js";

export default function BBMKPISettings() {

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Stack direction="row" gap={2}
                   sx={{
                       pt: 1.5, pb: 2,
                   }}>
                <LayersIcon/>
                <Typography component="h6" variant="h6">
                    BBM-codes aan natuur-KPI's koppelen
                </Typography>
            </Stack>
            <Typography variant="body2">
                Klik op de BBM-codes hieronder om ze aan respectievelijk uit de KPI weg te halen of aan de KPI toe te voegen.
            </Typography>
            <BBMKPIDragger kpi={10} title={"KPI 10: Natuur en landschap"}/>
            <BBMKPIDragger kpi={11} title={"KPI 11: Extensief Kruidenrijk Grasland"}/>
            <BBMKPIDragger kpi={12} title={"KPI 12: Groenblauwe Dooradering"}/>
        </Box>
    )

}
