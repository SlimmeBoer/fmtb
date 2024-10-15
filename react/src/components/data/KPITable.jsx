import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress} from "@mui/material";
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

export default function KPITable(props) {
    const [kpi, setKPI] = useState({});
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getKPI();
    }, [props.company])

    const getKPI = () => {
        if (props.company !== '') {
            setLoading(true);
            axiosClient.get(`/umdlkpi/getscores/${props.company}/`)
                .then(({data}) => {
                    setLoading(false);
                    setKPI(data);
                    setTableData(makeTable(data));
                })
                .catch(() => {
                    setLoading(false);
                })
        }
    }
    const makeTable = (data) => [
        {
            text_1: "KPI 1a: Stikstofbalans bodemoverschot (kg N-totaal per ha)",
            text_2: "KPI 1b: Stikstofbalans bodemoverschot (kg N-totaal per ha) incl. correctie veen",
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
            avg_2: data.avg.kpi1b,
            score: data.score.kpi1b,
        },
        {
            text: "KPI 2: Fosfaatbalansbodemoverschot (kg P2O5 per ha)",
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi2,
            year2: data.year2.kpi2,
            year3: data.year3.kpi2,
            avg: data.avg.kpi2,
            score: data.score.kpi2,
        },
        {
            text: "KPI 3: Ammoniakuitstoot (in kg NH3/ha)",
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi3,
            year2: data.year2.kpi3,
            year3: data.year3.kpi3,
            avg: data.avg.kpi3,
            score: data.score.kpi3,
        },
        {
            text: "KPI 4: Weidegang (uur/jaar)",
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi4,
            year2: data.year2.kpi4,
            year3: data.year3.kpi4,
            avg: data.avg.kpi4,
            score: data.score.kpi4,
        },
        {
            text: "KPI 5: Tankmelkureum  (mg/100g)",
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi5,
            year2: data.year2.kpi5,
            year3: data.year3.kpi5,
            avg: data.avg.kpi5,
            score: data.score.kpi5,
        },
        {
            text_1: "KPI 1a: Stikstofbalans bodemoverschot (kg N-totaal per ha)",
            text_2: "KPI 1b: Stikstofbalans bodemoverschot (kg N-totaal per ha) incl. correctie veen",
            text_3: "KPI 1b: Stikstofbalans bodemoverschot (kg N-totaal per ha) incl. correctie veen",
            text_4: "KPI 1b: Stikstofbalans bodemoverschot (kg N-totaal per ha) incl. correctie veen",
            color_1: 'grey',
            color_2: 'black',
            color_3: 'grey',
            color_4: 'grey',
            type: 'quad',
            year1_1: data.year1.kpi6a,
            year2_1: data.year2.kpi6a,
            year3_1: data.year3.kpi6a,
            year1_2: data.year1.kpi6b,
            year2_2: data.year2.kpi6b,
            year3_2: data.year3.kpi6b,
            year1_3: data.year1.kpi6c,
            year2_3: data.year2.kpi6c,
            year3_3: data.year3.kpi6c,
            year1_4: data.year1.kpi6d,
            year2_4: data.year2.kpi6d,
            year3_4: data.year3.kpi6d,
            avg_1: data.avg.kpi6a,
            avg_2: data.avg.kpi6b,
            avg_3: data.avg.kpi6c,
            avg_4: data.avg.kpi6d,
            score: data.score.kpi6b,
        },
        {
            text: "KPI 7: Eiwit van eigen land",
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi7,
            year2: data.year2.kpi7,
            year3: data.year3.kpi7,
            avg: data.avg.kpi7,
            score: data.score.kpi7,
        },
        {
            text: "KPI 8: Gewasbeschermingsmiddelen",
            color: 'black',
            type: '4-wide',
            year1: data.year1.kpi8,
            year2: data.year2.kpi8,
            year3: data.year3.kpi8,
            avg: data.avg.kpi8,
            score: data.score.kpi8,
        },
        {
            text: "KPI 9: Blijvend grasland",
            color: 'black',
            type: 'normal',
            year1: data.year1.kpi9,
            year2: data.year2.kpi9,
            year3: data.year3.kpi9,
            avg: data.avg.kpi9,
            score: data.score.kpi9,
        },
        {
            text: "KPI 10: Extensief kruidenrijk grasland",
            color: 'black',
            type: "4-wide",
            year1: parseFloat(data.year1.kpi10 * 100).toFixed(1) + "%",
            year2: parseFloat(data.year2.kpi10 * 100).toFixed(1) + "%",
            year3: parseFloat(data.year3.kpi10 * 100).toFixed(1) + "%",
            avg: parseFloat(data.avg.kpi10 * 100).toFixed(1) + "%",
            score: data.score.kpi10,
        },
        {
            text: "KPI 11: Natuur en Landschap",
            color: 'black',
            type: "4-wide",
            year1: parseFloat(data.year1.kpi11 * 100).toFixed(1) + "%",
            year2: parseFloat(data.year2.kpi11 * 100).toFixed(1) + "%",
            year3: parseFloat(data.year3.kpi11 * 100).toFixed(1) + "%",
            avg: parseFloat(data.avg.kpi11 * 100).toFixed(1) + "%",
            score: data.score.kpi11,
        },
        {
            text: "KPI 12: Groenblauwe dooradering",
            color: 'black',
            type: "4-wide",
            year1: parseFloat(data.year1.kpi12 * 100).toFixed(1) + "%",
            year2: parseFloat(data.year2.kpi12 * 100).toFixed(1) + "%",
            year3: parseFloat(data.year3.kpi12 * 100).toFixed(1) + "%",
            avg: parseFloat(data.avg.kpi12 * 100).toFixed(1) + "%",
            score: data.score.kpi12,
        },
        {
            text_1: "KPI 13a: Energiebalans (opgewekt/verbruikt)*",
            text_2: "KPI 13b: Energiebalans (KWH per koe per jaar)*",
            type: 'double',
            color_1: 'black',
            color_2: 'black',
            year1_1: parseFloat(data.year1.kpi13a * 100).toFixed(1) + "%",
            year2_1: parseFloat(data.year2.kpi13a * 100).toFixed(1) + "%",
            year3_1: parseFloat(data.year3.kpi13a * 100).toFixed(1) + "%",
            year1_2: data.year1.kpi13b,
            year2_2: data.year2.kpi13b,
            year3_2: data.year3.kpi13b,
            avg_1: parseFloat(data.avg.kpi13a * 100).toFixed(1) + "%",
            avg_2: data.avg.kpi13b,
            score: Math.max(data.score.kpi13a, data.score.kpi13b)
        },
        {
            text: "KPI 14: Levensduur (maanden)",
            color: 'black',
            type: 'normal',
            year1: showYearMonths(data.year1.kpi14),
            year2: showYearMonths(data.year2.kpi14),
            year3: showYearMonths(data.year3.kpi14),
            avg: showYearMonths(data.avg.kpi14),
            score: data.score.kpi14,
        },
        {
            text: "KPI 15: Sociaal-maatschappelijk",
            color: 'black',
            type: '4-wide',
            year1: data.year1.kpi15,
            year2: data.year2.kpi15,
            year3: data.year3.kpi15,
            avg: data.avg.kpi15,
            score: data.score.kpi15,
        },
    ];

    return (
        <Grid container spacing={2} size={{xs: 12, lg: 12}}>
            <Grid size={{xs: 12, lg: 6}} key="kpi-grid-1">
                <Card key="card-1">
                    <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                        <ScoreboardIcon/>
                        <Typography component="h6" variant="h6">
                            Totaalscore Punten
                        </Typography>
                    </Stack>
                    {loading && <CircularProgress/>}
                    {!loading && !isObjectEmpty(kpi)  &&
                        <ScoreGauge score={kpi.total.score} text={kpi.total.score} maxScore={2900} cat3={2399}
                                    cat2={1899} cat1={1399}/>}
                </Card>
            </Grid>
            <Grid size={{xs: 12, lg: 6}} key="kpi-grid-2">
                <Card key="card-2">
                    <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                        <EuroOutlinedIcon/>
                        <Typography component="h6" variant="h6">
                            Totaalscore Geldbedrag
                        </Typography>
                    </Stack>
                    {loading && <CircularProgress/>}
                    {!loading && !isObjectEmpty(kpi) &&
                        <ScoreGauge score={kpi.total.money} text={"€" + kpi.total.money + ",-"} maxScore={5000}
                                    cat3={3899} cat2={2399} cat1={1399}/>}
                </Card>
            </Grid>
            <Grid size={{xs: 12, lg: 12}} key="kpi-grid-3">
                <Card key="card-3">
                    <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                        <TimelineOutlinedIcon/>
                        <Typography component="h6" variant="h6">
                            KPI's
                        </Typography>
                    </Stack>
                    <TableContainer sx={{minHeight: 100,}}>
                        {loading && <CircularProgress/>}
                        {!loading && !isObjectEmpty(kpi) &&
                            <Table sx={{maxWidth: 1000, mt: 2}} size="small" aria-label="simple table">
                                <TableHead>
                                    <TableRow key={997}>
                                        <TableCell sx={{width: 300}}> </TableCell>
                                        <TableCell sx={{width: 75, border: 1}}
                                                   align="center">{kpi.year1.year}</TableCell>

                                        <TableCell sx={{width: 75, border: 1}}
                                                   align="center">{kpi.year2.year}</TableCell>
                                        <TableCell sx={{width: 75, border: 1}}
                                                   align="center">{kpi.year3.year}</TableCell>
                                        <TableCell sx={{width: 75, border: 1}} align="center">Gem.</TableCell>
                                        <TableCell sx={{width: 75, border: 1}} align="center">Punten</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((t, index) => {
                                            if (t.type === "normal") {
                                                return (
                                                    <TableRow key={index} sx={{margin: 0}}>
                                                        <TableCell component="th" scope="row">
                                                            {t.text}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1}} align="center">
                                                            {t.year1}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1}} align="center">
                                                            {t.year2}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1}} align="center">
                                                            {t.year3}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                            {t.avg}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                            {t.score}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                            if (t.type === "double") {
                                                return (<>
                                                        <TableRow key={index + "01"}  sx={{margin: 0}}>
                                                            <TableCell component="th" scope="row">
                                                                {t.text_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: t.color}} align="center">
                                                                {t.year1_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t.year2_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t.year3_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {t.avg_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} rowSpan={2}
                                                                       align="center">
                                                                {t.score}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow sx={{margin: 0}} key={index + "02"}>
                                                            <TableCell component="th" scope="row">
                                                                {t.text_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: t.color}} align="center">
                                                                {t.year1_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t.year2_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t.year3_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {t.avg_2}
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                )
                                            }
                                            if (t.type === "quad") {
                                                return (<>
                                                        <TableRow key={(index * 100) + 1}  sx={{margin: 0}}>
                                                            <TableCell component="th" scope="row">
                                                                {t.text_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: t.color}} align="center">
                                                                {t.year1_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t.year2_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t.year3_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {t.avg_1}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} rowSpan={4}
                                                                       align="center">
                                                                {t.score}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow key={(index * 100) + 2}  sx={{margin: 0}}>
                                                            <TableCell component="th" scope="row">
                                                                {t.text_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: t.color}} align="center">
                                                                {t.year1_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t.year2_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t.year3_2}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {t.avg_2}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow key={(index * 100) + 3}  sx={{margin: 0}} >
                                                            <TableCell component="th" scope="row">
                                                                {t.text_3}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: t.color}} align="center">
                                                                {t.year1_3}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t.year2_3}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t.year3_3}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {t.avg_3}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow key={(index * 100) + 4}  sx={{margin: 0}} >
                                                            <TableCell component="th" scope="row">
                                                                {t.text_4}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, color: t.color}} align="center">
                                                                {t.year1_4}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t.year2_4}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1}} align="center">
                                                                {t.year3_4}
                                                            </TableCell>
                                                            <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                                {t.avg_4}
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                )
                                            }
                                            if (t.type === "4-wide") {
                                                return (
                                                    <TableRow key={index}  sx={{margin: 0}} >
                                                        <TableCell component="th" scope="row">
                                                            {t.text}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1}} colSpan={4} align="center">
                                                            {t.avg}
                                                        </TableCell>
                                                        <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                                            {t.score}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        }
                                    )
                                    }
                                    <TableRow sx={{margin: 0}} key={998}>
                                        <TableCell colSpan={5} align="right">
                                            Totaalscore:
                                        </TableCell>
                                        <TableCell sx={{border: 1, fontWeight: 'bold'}} align="center">
                                            {kpi.total.score}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{margin: 0}} key={999}>
                                        <TableCell colSpan={5} align="right">
                                            Uit te keren bedrag:
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
    )
        ;
}
