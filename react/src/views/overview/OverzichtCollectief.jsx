
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";

export default function OverzichtCollectief() {

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Overzicht - Collectief
            </Typography>
        </Box>
    )

}
