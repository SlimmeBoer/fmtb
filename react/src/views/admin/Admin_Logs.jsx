
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import GisOverview from "../../components/data/GisOverview.jsx";
import {useTranslation} from "react-i18next";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Stack from "@mui/material/Stack";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogOverview from "../../components/data/LogOverview.jsx";

export default function Admin_Logs() {

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Stack direction="row" gap={2}>
                <AssignmentIcon/>
                <Typography component="h6" variant="h6">
                    {t("pages_admin.logs")}
                </Typography>
            </Stack>
            <LogOverview />
        </Box>
    )

}
