
import KLWUploader from "../../components/forms/KLWUploader.jsx";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import ExcelUploader from "../../components/forms/ExcelUploader.jsx";

export default function ImporteerMBPSMA() {

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                UMDL-Bedrijfsgegevens - Importeren
            </Typography>
            <ExcelUploader />
        </Box>
    )

}
