import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useTranslation} from "react-i18next";
import {FormGroup, Radio, RadioGroup} from "@mui/material";

export default function AanvullendeVragenForm() {

    const {t} = useTranslation();

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                {t('aanvullendevragen.title')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {t('aanvullendevragen.explanation')}
            </Typography>
            <Grid sx={{pt:5}} container spacing={2} alignItems="left">
                <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                        {t('aanvullendevragen.vraag1')}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="1"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="1" control={<Radio/>} label={t('aanvullendevragen.v1_a1')}/>
                        <FormControlLabel value="2" control={<Radio/>} label={t('aanvullendevragen.v1_a2')}/>
                        <FormControlLabel value="3" control={<Radio/>} label={t('aanvullendevragen.v1_a3')}/>
                    </RadioGroup>
                </Grid>
            </Grid>
            <Grid sx={{pt:5}} container spacing={2} alignItems="left">
                <Grid item xs={6}>
                    <Typography variant="subtitle1" gutterBottom>
                        {t('aanvullendevragen.vraag2')}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox/>} label={t('aanvullendevragen.v2_a1')}/>
                        <FormControlLabel control={<Checkbox/>} label={t('aanvullendevragen.v2_a2')}/>
                        <FormControlLabel control={<Checkbox/>} label={t('aanvullendevragen.v2_a3')}/>
                        <FormControlLabel control={<Checkbox/>} label={t('aanvullendevragen.v2_a4')}/>
                        <FormControlLabel control={<Checkbox/>} label={t('aanvullendevragen.v2_a5')}/>
                    </FormGroup>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}
