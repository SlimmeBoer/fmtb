import Typography from "@mui/material/Typography";
import * as React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Box from "@mui/material/Box";


export default function ActionOverview() {

    const actions = [
        {company: 'A. Janssen', action: 'Bankgegevens zijn nog niet ingevuld'},
        {company: 'B. Hendriksen', action: 'Kringloopwijzer voor 2023 nog invullen'},
        {company: 'G. de Groot', action: 'Bankgegevens zijn nog niet ingevuld'},
        {company: 'Melkveehouderij Henk de Vries', action: 'Bankgegevens zijn nog niet ingevuld'},
    ];

    return (
        <Card variant="outlined">
            <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                <PendingActionsIcon/>
                <Typography sx={{mb: 2}}  variant="h6">
                    Openstaande Acties
                </Typography>
            </Stack>
            {actions.map((a, index) => (
            <Box sx={{mb: 2, width: "100%", padding: 1, color: "#c00", border: "1px solid #c00", bgcolor: "#fff6f6", borderRadius: 4 }}>
                <Stack direction="row" gap={2}>
                    <ErrorOutlineIcon/>
                    <Typography sx={{mt: 0.2}} variant="body2">
                        <strong>{a.company}:</strong> {a.action}
                    </Typography>
                </Stack>
            </Box>
            ))}
        </Card>
    )

}
