import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {isObjectEmpty} from "../../helpers/EmptyObject.js";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BBMCodeForm from "../../components/forms/BBMCodeForm.jsx";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../../components/visuals/CenteredLoading.jsx";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SettingForm from "../../components/forms/SettingForm.jsx";
export default function Admin_GeneralSettings() {

    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        getSettings();
    }, [])

    const getSettings = () => {
        setLoading(true);
        axiosClient.get(`/settings`)
            .then(({data}) => {
                setLoading(false);
                setSettings(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    const updateParent = () => {
        getBbmcodes();
    };

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
                    <SettingsRoundedIcon/>
                    <Typography component="h6" variant="h6">
                        {t("pages_admin.general_settings")}
                    </Typography>
                </Stack>
            </Stack>
            <Typography component="body2" variant="body2">
                {t("pages_admin.general_settings_explained")}
            </Typography>
            {loading && <CenteredLoading />}
            {!loading && !isObjectEmpty(settings) &&
                <Box sx={{mt: 4}}>
                    {settings.map((s, index) => {
                        return (
                            <SettingForm key={index} setting={s} index={index} onAddorDelete={updateParent} />
                        )
                    })
                    }
                </Box>
            }
        </Box>
    )

}
