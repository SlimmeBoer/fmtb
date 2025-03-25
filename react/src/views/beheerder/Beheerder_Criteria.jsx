import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import GisOverview from "../../components/data/GisOverview.jsx";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import Card from "@mui/material/Card";
import CenteredLoading from "../../components/visuals/CenteredLoading.jsx";
import MatrixData from "../../components/data/MatrixData.jsx";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Stack from "@mui/material/Stack";

export default function Beheerder_Criteria() {

    const {t} = useTranslation();
    const [kpiscores, setKpiScores] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/kpiscores`)
            .then(response => {
                setKpiScores(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(t("klw_overview.error_fetch"), error);
                setLoading(false);
            });
    }, []);

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                {t("pages_collectief.criteria")}
            </Typography>
            {loading && <CenteredLoading/>}
            {!loading && kpiscores.length !== 0 &&
                <Stack direction="row" spacing={2}
                       useFlexGap
                       sx={{flexWrap: 'wrap'}}>
                    {kpiscores.map((k) => (
                        <Card sx={{width: '400px'}}>
                            <Box sx={{height: '50px'}}>
                                <Typography component="body2" variant="body2">
                                    <strong>{t("kpis." + k.kpi)}</strong>
                                </Typography>
                            </Box>
                            <TableContainer >
                                <Table size={'small'}>
                                    <TableBody>
                                        {k.data.map((data) => (
                                            <TableRow key={data.id}>
                                                <TableCell sx={{border: 1, width: '50%'}}>{data.range}</TableCell>
                                                <TableCell sx={{border: 1, width: '50%'}}>{data.score}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    ))}
                </Stack>}
        </Box>
    )

}
