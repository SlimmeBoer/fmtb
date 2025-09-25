import * as React from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import NavigationIcon from "@mui/icons-material/Navigation";
import AreaDisplay from "../../components/visuals/AreaDisplay.jsx";
export default function Provincie_AreaWeights() {


    const { t } = useTranslation();

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Stack direction="row" gap={2}
                   sx={{
                       display: { xs: 'none', md: 'flex' },
                       width: '100%',
                       alignItems: { xs: 'flex-start', md: 'center' },
                       justifyContent: 'space-between',
                       maxWidth: { sm: '100%', md: '1700px' },
                       pt: 1.5, pb: 4,
                   }}>
                <Stack direction="row" gap={2}>
                    <NavigationIcon/>
                    <Typography component="h6" variant="h6">
                        {t("pages_provincie.area_weights")}
                    </Typography>
                </Stack>
            </Stack>
            <Typography variant="body2" sx={{mb: 3}}>
                {t("pages_provincie.area_weights_explained")}
            </Typography>
            <AreaDisplay/>
        </Box>
    )

}
