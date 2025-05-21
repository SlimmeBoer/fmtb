
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import Stack from "@mui/material/Stack";
import ErrorIcon from '@mui/icons-material/Error';

export default function Collectief_Unauthorized() {

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Stack direction="row" gap={2}>
                <ErrorIcon/>
                <Typography component="h6" variant="h6">
                    {t("pages_collectief.unauthorized")}
                </Typography>
            </Stack>
            <Typography variant="body2" sx={{mt: 4}}>
                {t("pages_collectief.unauthorized_explanation")}
            </Typography>
        </Box>
    )

}
