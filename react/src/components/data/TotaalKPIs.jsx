import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {CircularProgress} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import KPIStaafDiagram from "../visuals/KPIStaafDiagram.jsx";
import {isObjectEmpty} from "../../helpers/EmptyObject.js";
import Grid from "@mui/material/Grid2";
import HorizontalBoxPlot from "./HorizontalBoxplot.jsx";
import HorizontalBoxPlotSingle from "./HorizontalBoxplotSingle.jsx";
import {useTranslation} from "react-i18next";

export default function TotaalKPIs(props) {
    const [scores, setScores] = useState({});
    const [kpiData, setKpiData] = useState([]);
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        getScores();
    }, [props.collective])

    const getScores = () => {
        setLoading(true);
        axiosClient.get(`/umdlkpi/totalsperkpi/${props.collective}`)
            .then(({data}) => {
                setLoading(false);
                setScores(data);
                setKpiData(makeTable(data));
            })
            .catch(() => {
                setLoading(false);
            })
    }

    const makeTable = (data) => [
        {
            text: t("kpis.1b"),
            type: "normal",
            barchart_data: data.kpi1.scores,
            boxplot_data: data.kpi1.avgs,
            boxplot_data_year1: data.kpi1.year1,
            boxplot_data_year2: data.kpi1.year2,
            boxplot_data_year3: data.kpi1.year3,
        },
        {
            text: t("kpis.2"),
            type: "normal",
            barchart_data: data.kpi2.scores,
            boxplot_data: data.kpi2.avgs,
            boxplot_data_year1: data.kpi2.year1,
            boxplot_data_year2: data.kpi2.year2,
            boxplot_data_year3: data.kpi2.year3,
        },
        {
            text: t("kpis.3"),
            type: "normal",
            barchart_data: data.kpi3.scores,
            boxplot_data: data.kpi3.avgs,
            boxplot_data_year1: data.kpi3.year1,
            boxplot_data_year2: data.kpi3.year2,
            boxplot_data_year3: data.kpi3.year3,
        },
        {
            text: t("kpis.4"),
            type: "normal",
            barchart_data: data.kpi4.scores,
            boxplot_data: data.kpi4.avgs,
            boxplot_data_year1: data.kpi4.year1,
            boxplot_data_year2: data.kpi4.year2,
            boxplot_data_year3: data.kpi4.year3,
        },
        {
            text: t("kpis.5"),
            type: "normal",
            barchart_data: data.kpi5.scores,
            boxplot_data: data.kpi5.avgs,
            boxplot_data_year1: data.kpi5.year1,
            boxplot_data_year2: data.kpi5.year2,
            boxplot_data_year3: data.kpi5.year3,
        },
        {
            text: t("kpis.6b"),
            type: "normal",
            barchart_data: data.kpi6.scores,
            boxplot_data: data.kpi6.avgs,
            boxplot_data_year1: data.kpi6.year1,
            boxplot_data_year2: data.kpi6.year2,
            boxplot_data_year3: data.kpi6.year3,
        },
        {
            text: t("kpis.7"),
            type: "normal",
            barchart_data: data.kpi7.scores,
            boxplot_data: data.kpi7.avgs,
            boxplot_data_year1: data.kpi7.year1,
            boxplot_data_year2: data.kpi7.year2,
            boxplot_data_year3: data.kpi7.year3,
        },
        {
            text: t("kpis.9"),
            type: "normal",
            barchart_data: data.kpi9.scores,
            boxplot_data: data.kpi9.avgs,
            boxplot_data_year1: data.kpi9.year1,
            boxplot_data_year2: data.kpi9.year2,
            boxplot_data_year3: data.kpi9.year3,
        },
        {
            text: t("kpis.10"),
            type: "single",
            barchart_data: data.kpi10.scores,
            boxplot_data: data.kpi10.avgs,
            boxplot_data_year1: data.kpi10.year1,
            boxplot_data_year2: data.kpi10.year2,
            boxplot_data_year3: data.kpi10.year3,
        },
        {
            text: t("kpis.11"),
            type: "single",
            barchart_data: data.kpi11.scores,
            boxplot_data: data.kpi11.avgs,
            boxplot_data_year1: data.kpi11.year1,
            boxplot_data_year2: data.kpi11.year2,
            boxplot_data_year3: data.kpi11.year3,
        },
        {
            text: t("kpis.12"),
            type: "single",
            barchart_data: data.kpi12.scores,
            boxplot_data: data.kpi12.avgs,
            boxplot_data_year1: data.kpi12.year1,
            boxplot_data_year2: data.kpi12.year2,
            boxplot_data_year3: data.kpi12.year3,
        },
        {
            text: t("kpis.13a"),
            type: "normal",
            barchart_data: data.kpi13a.scores,
            boxplot_data: data.kpi13a.avgs,
            boxplot_data_year1: data.kpi13a.year1,
            boxplot_data_year2: data.kpi13a.year2,
            boxplot_data_year3: data.kpi13a.year3,
        },
        {
            text: t("kpis.13b"),
            type: "normal",
            barchart_data: data.kpi13b.scores,
            boxplot_data: data.kpi13b.avgs,
            boxplot_data_year1: data.kpi13b.year1,
            boxplot_data_year2: data.kpi13b.year2,
            boxplot_data_year3: data.kpi13b.year3,
        },
        {
            text: t("kpis.14"),
            type: "normal",
            barchart_data: data.kpi14.scores,
            boxplot_data: data.kpi14.avgs,
            boxplot_data_year1: data.kpi14.year1,
            boxplot_data_year2: data.kpi14.year2,
            boxplot_data_year3: data.kpi14.year3,
        },
    ];

    return (
        <Card variant="outlined" >
            {loading && <CircularProgress/>}
            {!loading && !isObjectEmpty(scores) &&
                <Grid container  size={{xs: 12, lg: 12}}>
                        {kpiData.map((k, index) => {
                            return (
                            <Grid container size={{xs: 12, lg: 12}} key={"kpi-grid-container-" + index}>
                                <Grid size={{xs: 12, lg: 12}} key={"kpi-grid-title-" + index}>
                                    <Stack direction="row" gap={2}>
                                        <TimelineOutlinedIcon/>
                                        <Typography component="h6" variant="h6">
                                            {k.text}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid size={{xs: 12, lg: 6}} key={"kpi-grid-boxplot-" + index}>
                                    <Typography variant="body2">
                                        {t("total_kpis.boxplot_averages")}:
                                    </Typography>
                                    {k.type === "normal" &&
                                    <HorizontalBoxPlot data1={k.boxplot_data_year1} data2={k.boxplot_data_year2} data3={k.boxplot_data_year3} key={"kpi-boxplot-" + index}/>}
                                    {k.type === "single" &&
                                        <HorizontalBoxPlotSingle data={k.boxplot_data} key={"kpi-boxplot-" + index}/>}
                                </Grid>
                                <Grid size={{xs: 12, lg: 6}} key={"kpi-grid-barchart-" + index}>
                                    <Typography variant="body2">
                                        {t("total_kpis.diagram_scores")}:
                                    </Typography>
                                    <KPIStaafDiagram data={k.barchart_data} key={"kpi-barchart-" + index}/>
                                </Grid>
                            </Grid>
                            )
                        })}
                </Grid>
            }
        </Card>
    )
        ;
}
