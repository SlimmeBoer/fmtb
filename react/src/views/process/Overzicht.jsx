import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Overzichtstabel from "../elements/Overzichtstabel.jsx";
import {useTranslation} from "react-i18next";

export default function Overzicht() {

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                {t('overzicht.title')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {t('overzicht.explanation')}
            </Typography>
            <Overzichtstabel />
        </React.Fragment>
    );
}
