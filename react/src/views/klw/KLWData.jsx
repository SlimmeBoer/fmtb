
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import KLWOverview from "../../components/data/KLWOverview.jsx";

export default function KLWData() {

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Kringloopwijzer - Data
            </Typography>
            <KLWOverview />
        </Box>
    )

}
