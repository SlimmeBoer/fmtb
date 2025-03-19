import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import {isObjectEmpty} from "../../helpers/EmptyObject.js";
import Link from "@mui/material/Link";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";

export default function ScoresTableTotaal(props) {
    const [scores, setScores] = useState({});
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();


    useEffect(() => {
        getScores();
    }, [])

    const getScores = () => {
        setLoading(true);
        axiosClient.get(`/umdlkpi/getallscores`)
            .then(({data}) => {
                setLoading(false);
                setScores(data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <Card variant="outlined" >
            <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                <TimelineOutlinedIcon/>
                <Typography component="h6" variant="h6">
                    {t("scores_table.title_total")}
                </Typography>
            </Stack>
            <TableContainer sx={{minHeight: 100,}}>
                {loading && <CenteredLoading />}
                {!loading && !isObjectEmpty(scores) &&
                    <Table sx={{maxWidth: 1000, mt: 2}} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{width: 300}}>
                                    {t("scores_table.company_name")}: </TableCell>
                                <TableCell sx={{width: 75}}
                                           align="center">{t("scores_table.score")}:</TableCell>
                                <TableCell sx={{width: 75}}
                                           align="center">{t("scores_table.money")}:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scores.map((s, index) => {
                                if (index <= props.limit)
                                return (
                                    <TableRow key={index} sx={{margin: 0}}>
                                        <TableCell component="th" scope="row">
                                            {index+1}. <Link href={"/overzicht/individueel/" + s.company_id}>{s.company_name}</Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            {s.points}
                                        </TableCell>
                                        <TableCell align="center">
                                            &euro;{s.money},-
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                }
            </TableContainer>
        </Card>
    )
        ;
}
