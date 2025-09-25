import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {
    Alert,
    Button,
    Dialog,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
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
import AddIcon from "@mui/icons-material/Add";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import OldDataUploader from "../forms/OldDataUploader.jsx";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TrendDisplay from "./TrendDisplay.jsx";
import AreaWeightPopup from "../visuals/AreaWeightPopup.jsx";

export default function KPITable(props) {
    const [kpi, setKPI] = useState({});
    const [oldResult, setOldResult] = useState({});
    const [trendOpen, setTrendOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        getKPI();
        getOldResult();
    }, [props.company, props.renderTable])

    const getKPI = () => {
        if (props.company !== '') {
            setLoading(true);
            axiosClient.get(`/kpi/getscores/${props.company}`)
                .then(({data}) => {
                    setLoading(false);
                    setKPI(data);
                    setTableData(makeTable(data));
                })
                .catch(() => {
                    setKPI({});
                    setTableData([]);
                    setLoading(false);
                })
        }
    }
    const getOldResult = () => {
        if (props.company !== '') {
            setLoading(true);
            axiosClient.get(`/oldresults/getbycompany/${props.company}`)
                .then(({data}) => {
                    setLoading(false);
                    if (data.oldresult) {
                        setOldResult(data.oldresult);
                    }
                    else{
                        setOldResult({});
                    }
                })
                .catch(() => {
                    setLoading(false);
                })
        }
    }

    const closeTrend = () => {
        setTrendOpen(false);
    };
    const makeTable = (data) => [
        {
            text_1: t("kpis.1a"),
            text_2: t("kpis.1b"),
            color_1: 'grey',
            color_2: 'black',
            type: 'double',
            year1_1: data.year1.kpi1a,
            year2_1: data.year2.kpi1a,
            year3_1: data.year3.kpi1a,
            year1_2: data.year1.kpi1b,
            year2_2: data.year2.kpi1b,
            year3_2: data.year3.kpi1b,
            avg_1: data.avg.kpi1a,
            avg_col_1: data.avg_col.kpi1a,
            avg_tot_1: data.avg_tot.kpi1a,
            avg_2: data.avg.kpi1b,
            avg_col_2: data.avg_col.kpi1b,
            avg_tot_2: data.avg_tot.kpi1b,
            score: data.score.kpi1b,
            score_weighted: data.weighted_score.kpi1b,
            score_col: data.score_col.kpi1b,
            score_tot: data.score_tot.kpi1b,
        },
        {
            text: t("kpis.2a"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi2a,
            year2: data.year2.kpi2a,
            year3: data.year3.kpi2a,
            avg: data.avg.kpi2a,
            avg_col: data.avg_col.kpi2a,
            avg_tot: data.avg_tot.kpi2a,
            score: data.score.kpi2a,
            score_weighted: data.weighted_score.kpi2a,
            score_col: data.score_col.kpi2a,
            score_tot: data.score_tot.kpi2a,
        },
        {
            text: t("kpis.2b"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi2b,
            year2: data.year2.kpi2b,
            year3: data.year3.kpi2b,
            avg: data.avg.kpi2b,
            avg_col: data.avg_col.kpi2b,
            avg_tot: data.avg_tot.kpi2b,
            score: data.score.kpi2b,
            score_weighted: data.weighted_score.kpi2b,
            score_col: data.score_col.kpi2b,
            score_tot: data.score_tot.kpi2b,
        },
        {
            text: t("kpis.2c"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi2c,
            year2: data.year2.kpi2c,
            year3: data.year3.kpi2c,
            avg: data.avg.kpi2c,
            avg_col: data.avg_col.kpi2c,
            avg_tot: data.avg_tot.kpi2c,
            score: data.score.kpi2c,
            score_weighted: data.weighted_score.kpi2c,
            score_col: data.score_col.kpi2c,
            score_tot: data.score_tot.kpi2c,
        },
        {
            text: t("kpis.2d"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi2d,
            year2: data.year2.kpi2d,
            year3: data.year3.kpi2d,
            avg: data.avg.kpi2d,
            avg_col: data.avg_col.kpi2d,
            avg_tot: data.avg_tot.kpi2d,
            score: data.score.kpi2d,
            score_weighted: data.weighted_score.kpi2d,
            score_col: data.score_col.kpi2d,
            score_tot: data.score_tot.kpi2a,
        },
        {
            text: t("kpis.3"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi3,
            year2: data.year2.kpi3,
            year3: data.year3.kpi3,
            avg: data.avg.kpi3,
            avg_col: data.avg_col.kpi3,
            avg_tot: data.avg_tot.kpi3,
            score: data.score.kpi3,
            score_weighted: data.weighted_score.kpi3,
            score_col: data.score_col.kpi3,
            score_tot: data.score_tot.kpi3,
        },
        {
            text: t("kpis.4"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi4,
            year2: data.year2.kpi4,
            year3: data.year3.kpi4,
            avg: data.avg.kpi4,
            avg_col: data.avg_col.kpi4,
            avg_tot: data.avg_tot.kpi4,
            score: data.score.kpi4,
            score_weighted: data.weighted_score.kpi4,
            score_col: data.score_col.kpi4,
            score_tot: data.score_tot.kpi4,
        },
        {
            text_1: t("kpis.5a"),
            text_2: t("kpis.5b"),
            text_3: t("kpis.5c"),
            text_4: t("kpis.5d"),
            color_1: 'grey',
            color_2: 'black',
            color_3: 'grey',
            color_4: 'grey',
            type: 'quad',
            year1_1: data.year1.kpi5a,
            year2_1: data.year2.kpi5a,
            year3_1: data.year3.kpi5a,
            year1_2: data.year1.kpi5b,
            year2_2: data.year2.kpi5b,
            year3_2: data.year3.kpi5b,
            year1_3: data.year1.kpi5c,
            year2_3: data.year2.kpi5c,
            year3_3: data.year3.kpi5c,
            year1_4: data.year1.kpi5d,
            year2_4: data.year2.kpi5d,
            year3_4: data.year3.kpi5d,
            avg_1: data.avg.kpi5a,
            avg_col_1: data.avg_col.kpi5a,
            avg_tot_1: data.avg_tot.kpi5a,
            avg_2: data.avg.kpi5b,
            avg_col_2: data.avg_col.kpi5b,
            avg_tot_2: data.avg_tot.kpi5b,
            avg_3: data.avg.kpi5c,
            avg_col_3: data.avg_col.kpi5c,
            avg_tot_3: data.avg_tot.kpi5c,
            avg_4: data.avg.kpi5d,
            avg_col_4: data.avg_col.kpi5d,
            avg_tot_4: data.avg_tot.kpi5d,
            score: data.score.kpi5b,
            score_weighted: data.weighted_score.kpi5b,
            score_col: data.score_col.kpi5b,
            score_tot: data.score_tot.kpi5b,
        },
        {
            text: t("kpis.6a"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi6a,
            year2: data.year2.kpi6a,
            year3: data.year3.kpi6a,
            avg: data.avg.kpi6a,
            avg_col: data.avg_col.kpi6a,
            avg_tot: data.avg_tot.kpi6a,
            score: data.score.kpi6a,
            score_weighted: data.weighted_score.kpi6a,
            score_col: data.score_col.kpi6a,
            score_tot: data.score_tot.kpi6a,
        },
        {
            text: t("kpis.6b"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi6b,
            year2: data.year2.kpi6b,
            year3: data.year3.kpi6b,
            avg: data.avg.kpi6b,
            avg_col: data.avg_col.kpi6b,
            avg_tot: data.avg_tot.kpi6b,
            score: data.score.kpi6b,
            score_weighted: data.weighted_score.kpi6b,
            score_col: data.score_col.kpi6b,
            score_tot: data.score_tot.kpi6b,
        },
        {
            text: t("kpis.6c"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi6c,
            year2: data.year2.kpi6c,
            year3: data.year3.kpi6c,
            avg: data.avg.kpi6c,
            avg_col: data.avg_col.kpi6c,
            avg_tot: data.avg_tot.kpi6c,
            score: data.score.kpi6c,
            score_weighted: data.weighted_score.kpi6c,
            score_col: data.score_col.kpi6c,
            score_tot: data.score_tot.kpi6c,
        },
        {
            text: t("kpis.7"),
            color: 'black',
            type: '4-wide',
            year1: data.year1.kpi7,
            year2: data.year2.kpi7,
            year3: data.year3.kpi7,
            avg: data.avg.kpi7,
            avg_col: data.avg_col.kpi7,
            avg_tot: data.avg_tot.kpi7,
            score: data.score.kpi7,
            score_weighted: data.weighted_score.kpi7,
            score_col: data.score_col.kpi7,
            score_tot: data.score_tot.kpi7,
        },
        {
            text: t("kpis.8"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi8,
            year2: data.year2.kpi8,
            year3: data.year3.kpi8,
            avg: data.avg.kpi8,
            avg_col: data.avg_col.kpi8,
            avg_tot: data.avg_tot.kpi8,
            score: data.score.kpi8,
            score_weighted: data.weighted_score.kpi8,
            score_col: data.score_col.kpi8,
            score_tot: data.score_tot.kpi8,
        },
        {
            text: t("kpis.9"),
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi9 + "%",
            year2: data.year2.kpi9 + "%",
            year3: data.year3.kpi9 + "%",
            avg: data.avg.kpi9 + "%",
            avg_col: data.avg_col.kpi9 + "%",
            avg_tot: data.avg_tot.kpi9 + "%",
            score: data.score.kpi9,
            score_weighted: data.weighted_score.kpi9,
            score_col: data.score_col.kpi9,
            score_tot: data.score_tot.kpi9,
        },
        {
            text: t("kpis.11"),
            color: 'black',
            type: "4-wide",
            year1: parseFloat(data.year1.kpi11 * 100).toFixed(1) + "%",
            year2: parseFloat(data.year2.kpi11 * 100).toFixed(1) + "%",
            year3: parseFloat(data.year3.kpi11 * 100).toFixed(1) + "%",
            avg: parseFloat(data.avg.kpi11 * 100).toFixed(1) + "%",
            avg_col: parseFloat(data.avg_col.kpi11 * 100).toFixed(1) + "%",
            avg_tot: parseFloat(data.avg_tot.kpi11 * 100).toFixed(1) + "%",
            score: data.score.kpi11,
            score_weighted: data.weighted_score.kpi11,
            score_col: data.score_col.kpi11,
            score_tot: data.score_tot.kpi11,
        },
        {
            text: t("kpis.12a"),
            color: 'black',
            type: "4-wide",
            year1: parseFloat(data.year1.kpi12a * 100).toFixed(1) + "%",
            year2: parseFloat(data.year2.kpi12a * 100).toFixed(1) + "%",
            year3: parseFloat(data.year3.kpi12a * 100).toFixed(1) + "%",
            avg: parseFloat(data.avg.kpi12a * 100).toFixed(1) + "%",
            avg_col: parseFloat(data.avg_col.kpi12a * 100).toFixed(1) + "%",
            avg_tot: parseFloat(data.avg_tot.kpi12a * 100).toFixed(1) + "%",
            score: data.score.kpi12a,
            score_weighted: data.weighted_score.kpi12a,
            score_col: data.score_col.kpi12a,
            score_tot: data.score_tot.kpi12a,
        },
        {
            text: t("kpis.12b"),
            color: 'black',
            type: "4-wide",
            year1: parseFloat(data.year1.kpi12b * 100).toFixed(1) + "%",
            year2: parseFloat(data.year2.kpi12b * 100).toFixed(1) + "%",
            year3: parseFloat(data.year3.kpi12b * 100).toFixed(1) + "%",
            avg: parseFloat(data.avg.kpi12b * 100).toFixed(1) + "%",
            avg_col: parseFloat(data.avg_col.kpi12b * 100).toFixed(1) + "%",
            avg_tot: parseFloat(data.avg_tot.kpi12b * 100).toFixed(1) + "%",
            score: data.score.kpi12b,
            score_weighted: data.weighted_score.kpi12b,
            score_col: data.score_col.kpi12b,
            score_tot: data.score_tot.kpi12b,
        },
        {
            text: t("kpis.13"),
            color: 'black',
            type: 'normal',
            year1: showYearMonths(data.year1.kpi13),
            year2: showYearMonths(data.year2.kpi13),
            year3: showYearMonths(data.year3.kpi13),
            avg: showYearMonths(data.avg.kpi13),
            avg_col: showYearMonths(data.avg_col.kpi13),
            avg_tot: showYearMonths(data.avg_tot.kpi13),
            score: data.score.kpi13,
            score_weighted: data.weighted_score.kpi13,
            score_col: data.score_col.kpi13,
            score_tot: data.score_tot.kpi13,
        },
        {
            text: t("kpis.14"),
            color: 'black',
            type: '4-wide',
            year1: data.year1.kpi14,
            year2: data.year2.kpi14,
            year3: data.year3.kpi14,
            avg: data.avg.kpi14,
            avg_col: "-",
            avg_tot: "-",
            score: data.score.kpi14,
            score_weighted: data.weighted_score.kpi14,
            score_col: data.score_col.kpi14,
            score_tot: data.score_tot.kpi14,
        },
    ];

    return (
        <React.Fragment>
            <Grid container spacing={2} size={{xs: 12, lg: 12}}>
                <Grid size={{xs: 12, lg: 6}}>
                    <Card variant="outlined">
                        <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                            <ScoreboardIcon/>
                            <Typography component="h6" variant="h6">
                                {t("kpi_table.total_score_points")}
                            </Typography>
                        </Stack>
                        {loading && <CenteredLoading/>}
                        {!loading && !isObjectEmpty(kpi) &&
                            <ScoreGauge score={kpi.total.score} text={kpi.total.score} maxScore={1000} cat3={750}
                                        cat2={500} cat1={250}
                                        score_col={kpi.total_col.score}
                                        score_tot={kpi.total_tot.score}/>}
                    </Card>
                </Grid>
                <Grid size={{xs: 12, lg: 6}}>
                    <Card variant="outlined">
                        <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                            <EuroOutlinedIcon/>
                            <Typography component="h6" variant="h6">
                                {t("kpi_table.total_score_money")}
                            </Typography>
                        </Stack>
                        {loading && <CenteredLoading/>}
                        {!loading && !isObjectEmpty(kpi) &&
                            <ScoreGauge score={kpi.total.money} text={kpi.total.money} maxScore={1000}
                                        cat3={750} cat2={500} cat1={250}
                                        score_col={kpi.total_col.money}
                                        score_tot={kpi.total_tot.money}/>}

                    </Card>
                </Grid>
                <Grid size={{xs: 12, lg: 12}}>
                    <Card variant="outlined">
                        <Stack direction="row" gap={2}
                               sx={{
                                   display: {xs: 'none', md: 'flex'},
                                   width: '100%',
                                   alignItems: {xs: 'flex-start', md: 'center'},
                                   justifyContent: 'space-between',
                                   maxWidth: {sm: '100%', md: '1700px'},
                                   pt: 1.5, pb: 4,
                               }}>
                            <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                                <TimelineOutlinedIcon/>
                                <Typography component="h6" variant="h6">
                                    {t("kpi_table.kpis")}
                                </Typography>
                            </Stack>
                            {!loading && !isObjectEmpty(oldResult) &&
                                <Stack direction="row" gap={2}>
                                    <Button variant="outlined" startIcon={<AvTimerIcon/>} onClick={() => setTrendOpen(true)}>
                                        {t("kpi_table.view_trend")}
                                    </Button>
                            </Stack>}
                        </Stack>
                        <TableContainer sx={{minHeight: 100,}}>
                            {loading && <CenteredLoading/>}
                            {!loading && isObjectEmpty(kpi) &&
                                <Alert severity="error">{t("kpi_table.error_loading_data")}</Alert>
                            }
                            {!loading && !isObjectEmpty(kpi) &&
                                <Table sx={{maxWidth: 1000, mt: 2}} size="small" aria-label="simple table">
                                    <TableHead>
                                        <TableRow key={"headrow"}>
                                            <TableCell sx={{width: 250}}> </TableCell>
                                            <TableCell sx={{width: 50, border: 1}}
                                                       align="center">{kpi.year1.year}</TableCell>

                                            <TableCell sx={{width: 50, border: 1}}
                                                       align="center">{kpi.year2.year}</TableCell>
                                            <TableCell sx={{width: 50, border: 1}}
                                                       align="center">{kpi.year3.year}</TableCell>
                                            <TableCell sx={{width: 50, border: 1}}
                                                       align="center">{t("kpi_table.average")}</TableCell>
                                            <TableCell sx={{width: 50, border: 1}}
                                                       align="center">{t("kpi_table.comparison")}</TableCell>
                                            <TableCell sx={{width: 50, border: 1}}
                                                       align="center">{t("kpi_table.points")}</TableCell>
                                            <TableCell sx={{width: 50, border: 1}}
                                                       align="center">{t("kpi_table.points_weighted")}<AreaWeightPopup company={props.company}/></TableCell>
                                            <TableCell sx={{width: 50, border: 1}}
                                                       align="center">{t("kpi_table.comparison")}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tableData.map((tab, index) => {
                                                if (tab.type === "normal") {
                                                    return (
                                                        <TableRow key={`normal-${index}`} sx={{margin: 0, color: tab.color}}>
                                                            <TableCell component="th" scope="row">
                                                                {tab.text}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {tab.year1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {tab.year2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {tab.year3}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {tab.avg}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t("kpi_table.collective_letter")}: {tab.avg_col}<br/>
                                                                {t("kpi_table.total_letter")}: {tab.avg_tot}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {tab.score}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {tab.score_weighted}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t("kpi_table.collective_letter")}: {tab.score_col}<br/>
                                                                {t("kpi_table.total_letter")}: {tab.score_tot}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                                if (tab.type === "double") {
                                                    return (<React.Fragment key={`double-${index}`}>
                                                            <TableRow key={`double-${index}-01`}
                                                                      sx={{margin: 0, color: tab.color_1}}>
                                                                <TableCell component="th" scope="row" sx={{color: tab.color_1}}>
                                                                    {tab.text_1}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                    {tab.year1_1}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                    {tab.year2_1}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                    {tab.year3_1}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{border: 1, fontWeight: 'bold', color: tab.color_1}}
                                                                    align="center">
                                                                    {tab.avg_1}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                    {t("kpi_table.collective_letter")}: {tab.avg_col_1}<br/>
                                                                    {t("kpi_table.total_letter")}: {tab.avg_tot_1}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, fontWeight: 'bold'}} rowSpan={2}
                                                                           align="center">
                                                                    {tab.score}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, fontWeight: 'bold'}} rowSpan={2}
                                                                           align="center">
                                                                    {tab.score_weighted}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1}} rowSpan={2}
                                                                           align="center">
                                                                    {t("kpi_table.collective_letter")}: {tab.score_col}<br/>
                                                                    {t("kpi_table.total_letter")}: {tab.score_tot}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow sx={{margin: 0, color: tab.color_2}}
                                                                      key={`double-${index}-02`}>
                                                                <TableCell component="th" scope="row">
                                                                    {tab.text_2}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color}} align="center">
                                                                    {tab.year1_2}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1}} align="center">
                                                                    {tab.year2_2}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1}} align="center">
                                                                    {tab.year3_2}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                    {tab.avg_2}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1}} align="center">
                                                                    {t("kpi_table.collective_letter")}: {tab.avg_col_2}<br/>
                                                                    {t("kpi_table.total_letter")}: {tab.avg_tot_2}
                                                                </TableCell>
                                                            </TableRow>
                                                        </React.Fragment>
                                                    )
                                                }
                                                if (tab.type === "quad") {
                                                    return (<React.Fragment key={`quad-${index}`}>
                                                            <TableRow key={`quad-${index}-1`} sx={{margin: 0}}>
                                                                <TableCell sx={{color: tab.color_1}} component="th" scope="row">
                                                                    {tab.text_1}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                    {tab.year1_1}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                    {tab.year2_1}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                    {tab.year3_1}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{border: 1, color: tab.color_1, fontWeight: 'bold'}}
                                                                    align="center">
                                                                    {tab.avg_1}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_1}} align="center">
                                                                    {t("kpi_table.collective_letter")}: {tab.avg_col_1}<br/>
                                                                    {t("kpi_table.total_letter")}: {tab.avg_tot_1}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, fontWeight: 'bold'}} rowSpan={4}
                                                                           align="center">
                                                                    {tab.score}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, fontWeight: 'bold'}} rowSpan={4}
                                                                           align="center">
                                                                    {tab.score_weighted}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1}} rowSpan={4}
                                                                           align="center">
                                                                    {t("kpi_table.collective_letter")}: {tab.score_col}<br/>
                                                                    {t("kpi_table.total_letter")}: {tab.score_tot}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow key={`quad-${index}-2`} sx={{margin: 0}}>
                                                                <TableCell component="th" scope="row">
                                                                    {tab.text_2}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1}} align="center">
                                                                    {tab.year1_2}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1}} align="center">
                                                                    {tab.year2_2}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1}} align="center">
                                                                    {tab.year3_2}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                    {tab.avg_2}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1}} align="center">
                                                                    {t("kpi_table.collective_letter")}: {tab.avg_col_2}<br/>
                                                                    {t("kpi_table.total_letter")}: {tab.avg_tot_2}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow key={`quad-${index}-3`} sx={{margin: 0}}>
                                                                <TableCell component="th" scope="row" sx={{color: tab.color_3}}>
                                                                    {tab.text_3}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_3}} align="center">
                                                                    {tab.year1_3}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_3}} align="center">
                                                                    {tab.year2_3}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_3}} align="center">
                                                                    {tab.year3_3}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{border: 1, color: tab.color_3, fontWeight: 'bold'}}
                                                                    align="center">
                                                                    {tab.avg_3}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_3}} align="center">
                                                                    {t("kpi_table.collective_letter")}: {tab.avg_col_3}<br/>
                                                                    {t("kpi_table.total_letter")}: {tab.avg_tot_3}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow key={`quad-${index}-4`} sx={{margin: 0}}>
                                                                <TableCell component="th" scope="row" sx={{color: tab.color_4}}>
                                                                    {tab.text_4}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_4}} align="center">
                                                                    {tab.year1_4}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_4}} align="center">
                                                                    {tab.year2_4}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_4}} align="center">
                                                                    {tab.year3_4}
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{border: 1, color: tab.color_4, fontWeight: 'bold'}}
                                                                    align="center">
                                                                    {tab.avg_4}
                                                                </TableCell>
                                                                <TableCell sx={{border: 1, color: tab.color_4}} align="center">
                                                                    {t("kpi_table.collective_letter")}: {tab.avg_col_4}<br/>
                                                                    {t("kpi_table.total_letter")}: {tab.avg_tot_4}
                                                                </TableCell>
                                                            </TableRow>
                                                        </React.Fragment>
                                                    )
                                                }
                                                if (tab.type === "4-wide") {
                                                    return (
                                                        <TableRow key={`4wide-${index}`} sx={{margin: 0}}>
                                                            <TableCell component="th" scope="row">
                                                                {tab.text}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} colSpan={4} align="center">
                                                                {tab.avg}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t("kpi_table.collective_letter")}: {tab.avg_col}<br/>
                                                                {t("kpi_table.total_letter")}: {tab.avg_tot}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {tab.score}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {tab.score_weighted}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t("kpi_table.collective_letter")}: {tab.score_col}<br/>
                                                                {t("kpi_table.total_letter")}: {tab.score_tot}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                            }
                                        )
                                        }
                                        <TableRow sx={{margin: 0}} key={"total_score"}>
                                            <TableCell colSpan={5} align="right">
                                                {t("kpi_table.total_score")}:
                                            </TableCell>
                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                {kpi.total.score}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{margin: 0}} key={"total_money"}>
                                            <TableCell colSpan={5} align="right">
                                                {t("kpi_table.payout_money")}:
                                            </TableCell>
                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                &euro;{kpi.total.money},-
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            }
                        </TableContainer>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={trendOpen} maxWidth="xl" fullWidth={true} onClose={closeTrend}>
                <DialogContent>
                    <Grid
                        container
                        spacing={2}
                        columns={12}
                        sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                    >
                        <Grid size={{xs: 11, lg: 11}}>
                            <Stack direction="row" gap={2}>
                                <AvTimerIcon/>
                                <Typography component="h6" variant="h6">
                                    {t("kpi_table.trend_title")}
                                </Typography>
                            </Stack>
                            <Typography variant="body2">
                                {t("kpi_table.trend_explanation")}
                            </Typography>
                            <TrendDisplay oldresult={oldResult} newresult={kpi} />
                        </Grid>
                        <Grid size={{xs: 1, lg: 1}}>
                            <IconButton
                                onClick={closeTrend}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
        ;
}
