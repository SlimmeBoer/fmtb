import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import {isObjectEmpty} from "../../helpers/EmptyObject.js";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const BBMKPICard = ({kpi, title, bgcolor}) => {

    const [codes, setCodes] = useState({});
    const [loading, setLoading] = useState(true);

    const {t} = useTranslation();

    useEffect(() => {
        if (kpi !== null) {
            getCodes(kpi);
        }
    }, []);

    const getCodes = (kpi) => {
        setLoading(true);
        axiosClient.get(`/bbm/getbykpi/${kpi}`)
            .then(({data}) => {
                setCodes(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <Card style={{backgroundColor: bgcolor}}>
            <Stack direction="row" gap={2}>
                <Typography variant="h6">
                    {title}
                </Typography>
            </Stack>
            {loading && <CenteredLoading />}
            {!loading && codes.length !== 0 && <TableContainer >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("bbm_kpi.code")}</TableCell>
                            <TableCell>{t("bbm_kpi.description")}</TableCell>
                            <TableCell>{t("bbm_kpi.weight")}</TableCell>
                            <TableCell>{t("bbm_kpi.unit")}</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {codes.map((c) => (
                            <TableRow key={c.id}>
                                <TableCell>{c.code}</TableCell>
                                <TableCell>{c.description}</TableCell>
                                <TableCell>{c.weight}</TableCell>
                                <TableCell>{c.unit}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </Card>
    );
}

export default BBMKPICard;
