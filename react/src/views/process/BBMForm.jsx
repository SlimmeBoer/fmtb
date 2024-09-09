import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import KringloopwijzerUpload from "../elements/KringloopwijzerUpload.jsx";
import {useTranslation} from "react-i18next";
import BBMUpload from "../elements/BBMUpload.jsx";

export default function BBMForm() {

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                {t('bbm.title')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {t('bbm.explanation')}
            </Typography>
            <Grid sx={{pt: 8}}>
                <BBMUpload year={"2020"} />
            </Grid>
        </React.Fragment>
    );
}
