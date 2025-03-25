
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import BBMKPIDragger from "../../components/data/BBMKPIDragger.jsx";
import Stack from "@mui/material/Stack";
import LayersIcon from "@mui/icons-material/Layers";
import {useTranslation} from "react-i18next";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export default function Admin_BBMKPISettings() {

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Stack direction="row" gap={2}
                   sx={{
                       pt: 1.5, pb: 2,
                   }}>
                <SettingsRoundedIcon/>
                <Typography component="h6" variant="h6">
                    {t("pages_admin.kpi_settings")}
                </Typography>
            </Stack>
            <Typography variant="body2">
                {t("pages_admin.kpi_settings_explain")}
            </Typography>
            <BBMKPIDragger kpi={10} title={t("kpis.10")}/>
            <BBMKPIDragger kpi={11} title={t("kpis.11")}/>
            <BBMKPIDragger kpi={12} title={t("kpis.12")}/>
        </Box>
    )

}
