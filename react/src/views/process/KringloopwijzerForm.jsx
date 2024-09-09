import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useTranslation} from "react-i18next";
import KringloopwijzerUpload from "../elements/KringloopwijzerUpload.jsx";

export default function KringloopwijzerForm() {

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                {t('kringloopwijzer.title')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {t('kringloopwijzer.explanation')}
            </Typography>
            <Grid sx={{pt: 8}}>
            <KringloopwijzerUpload year={"2020"} />
            <KringloopwijzerUpload year={"2021"} />
            <KringloopwijzerUpload year={"2022"} />
            <KringloopwijzerUpload year={"2023"} />
            </Grid>
        </React.Fragment>
    );
}
