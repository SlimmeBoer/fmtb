import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useTranslation} from "react-i18next";

export default function Copyright() {

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Typography sx={{pt: 10}} variant="body2" color="text.secondary" align="center">
                {'© '}
                {new Date().getFullYear()}
                {t('copyright.message')}
            </Typography>
        </React.Fragment>
    );
}
