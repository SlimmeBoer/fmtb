import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useTranslation} from "react-i18next";
import KringloopwijzerUpload from "../elements/KringloopwijzerUpload.jsx";
import Container from "@mui/material/Container";
import {Paper} from "@mui/material";

export default function KringloopwijzerForm() {
    const {t} = useTranslation();

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                {t('aanvullendbbm.title')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {t('aanvullendbbm.explanation')}
            </Typography>

            <Grid container spacing={3} sx={{pt:5}}>
                {/* Group A */}
                <Grid item xs={12} >
                    <Typography variant="h6" gutterBottom>
                        {t('aanvullendbbm.an')}
                    </Typography>
                    <Grid container spacing={2} sx={{pt:2}}>
                        <Grid item xs={3}>
                            <Typography variant="subtitle">
                                {t('aanvullendbbm.package1')}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.bbmcode')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.size')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.weight')} fullWidth variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{pt:2}}>
                        <Grid item xs={3}>
                            <Typography variant="subtitle">
                                {t('aanvullendbbm.package2')}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.bbmcode')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.size')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.weight')} fullWidth variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{pt:2}}>
                        <Grid item xs={3}>
                            <Typography variant="subtitle">
                                {t('aanvullendbbm.package3')}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.bbmcode')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.size')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.weight')} fullWidth variant="outlined"/>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Group B */}
                <Grid item xs={12} >
                    <Typography variant="h6" gutterBottom>
                        {t('aanvullendbbm.kg')}
                    </Typography>
                    <Grid container spacing={2} sx={{pt:2}}>
                        <Grid item xs={3}>
                            <Typography variant="subtitle">
                                {t('aanvullendbbm.package1')}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.bbmcode')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.size')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.weight')} fullWidth variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{pt:2}}>
                        <Grid item xs={3}>
                            <Typography variant="subtitle">
                                {t('aanvullendbbm.package2')}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.bbmcode')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.size')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.weight')} fullWidth variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{pt:2}}>
                        <Grid item xs={3}>
                            <Typography variant="subtitle">
                                {t('aanvullendbbm.package3')}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.bbmcode')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.size')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.weight')} fullWidth variant="outlined"/>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Group C */}
                <Grid item xs={12} >
                    <Typography variant="h6" gutterBottom>
                        {t('aanvullendbbm.gbd')}
                    </Typography>
                    <Grid container spacing={2} sx={{pt:2}}>
                        <Grid item xs={3}>
                            <Typography variant="subtitle">
                                {t('aanvullendbbm.package1')}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.bbmcode')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.size')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.weight')} fullWidth variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{pt:2}}>
                        <Grid item xs={3}>
                            <Typography variant="subtitle">
                                {t('aanvullendbbm.package2')}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.bbmcode')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.size')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.weight')} fullWidth variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{pt:2}}>
                        <Grid item xs={3}>
                            <Typography variant="subtitle">
                                {t('aanvullendbbm.package3')}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.bbmcode')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.size')} fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label={t('aanvullendbbm.weight')} fullWidth variant="outlined"/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
