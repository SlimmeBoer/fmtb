import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {Alert, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import Grid from "@mui/material/Grid2";
import ScoreGauge from "../visuals/ScoreGauge.jsx";
import {showYearMonths} from "../../helpers/YearMonths.js";
import {isObjectEmpty} from "../../helpers/EmptyObject.js";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import PdfButton from "./PdfButton.jsx";
import PdfButtonCompany from "./PdfButtonCompany.jsx";

export default function BedrijfScores() {
    const [kpi, setKPI] = useState({});
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        getKPI();
    }, [])

    const getKPI = () => {
        setLoading(true);
        axiosClient.get(`/kpi/getscorescurrentcompany`)
            .then(({data}) => {
                setLoading(false);
                setKPI(data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <Box>
            <Typography variant="h4" sx={{mb: 3}}>
                {t("company_dashboard.scores_overview")}
            </Typography>
            <Typography variant="body2" sx={{mb: 3}}>
                {t("company_dashboard.scores_overview_exlanation")}
            </Typography>
            {loading && <CenteredLoading/>}
            {!loading && !isObjectEmpty(kpi) && kpi.total.score !== 0 &&
                <Grid container spacing={2} size={{xs: 12, lg: 12}}>
                    <Grid size={{xs: 12, lg: 6}} key="kpi-grid-1">
                        <Card variant="outlined" key="card-1">
                            <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                                <ScoreboardIcon/>
                                <Typography component="h6" variant="h6">
                                    {t("kpi_table.total_score_points")}
                                </Typography>
                            </Stack>
                            <ScoreGauge score={kpi.total.score} text={kpi.total.score} maxScore={100} cat3={75}
                                        cat2={50} cat1={25}
                                        score_col={kpi.total_col.score}
                                        score_tot={kpi.total_tot.score}/>
                        </Card>
                    </Grid>
                    <Grid size={{xs: 12, lg: 6}} key="kpi-grid-2">
                        <Card variant="outlined" key="card-2">
                            <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                                <EuroOutlinedIcon/>
                                <Typography component="h6" variant="h6">
                                    {t("kpi_table.total_score_money")}
                                </Typography>
                            </Stack>
                            <ScoreGauge score={kpi.total.money} text={kpi.total.money} maxScore={100}
                                        cat3={75} cat2={50} cat1={25}
                                        score_col={kpi.total_col.money}
                                        score_tot={kpi.total_tot.money}/>

                        </Card>
                    </Grid>
                    <PdfButtonCompany/>
                    <Typography variant="body2" sx={{mt: 3}}>
                        {t("company_dashboard.questions")}
                    </Typography>
                </Grid>}
            {!loading && (isObjectEmpty(kpi) || kpi.total.score == 0) &&
                <Alert severity="error">{t("company_dashboard.no_scores")}</Alert>
            }
        </Box>
    );
}
