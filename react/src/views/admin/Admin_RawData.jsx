
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import GisOverview from "../../components/data/GisOverview.jsx";
import {useTranslation} from "react-i18next";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Stack from "@mui/material/Stack";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogOverview from "../../components/data/LogOverview.jsx";
import DatasetIcon from "@mui/icons-material/Dataset";
import RawFilesOverview from "../../components/data/RawFilesOverview.jsx";

export default function Admin_RawData() {

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Stack direction="row" gap={2}>
                <DatasetIcon/>
                <Typography component="h6" variant="h6">
                    {t("pages_admin.raw_data")}
                </Typography>
            </Stack>
            <RawFilesOverview />
        </Box>
    )

}
