import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useTranslation} from "react-i18next";
import Overzichtstabel from "../elements/Overzichtstabel.jsx";

export default function StartForm() {

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                {t('start.title')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {t('start.explanation')}
            </Typography>
        </React.Fragment>
    );
}
