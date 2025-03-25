// src/components/GISOverview.jsx
import React, {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Typography,
    Link
} from '@mui/material';
import axiosClient from "../../axios_client.js";
import GisRecordsDialog from "./GisRecordsDialog";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import Card from "@mui/material/Card";

const BBMAnlbOverview = () => {
    const [anlbrecords, setAnlbRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation();

    useEffect(() => {
        getAnlbRecords();
    }, []);

    const getAnlbRecords = (kpi) => {
        setLoading(true);
        axiosClient.get(`/bbmanlbpackages/overview`)
            .then(({data}) => {
                setAnlbRecords(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <Card sx={{width: '700px'}}>
            {loading && <CenteredLoading/>}
            {!loading && anlbrecords.length !== 0 &&
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID:</TableCell>
                                <TableCell>Nummer:</TableCell>
                                <TableCell>Letters:</TableCell>
                                <TableCell>BBM-code:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {anlbrecords.map((a, index) => (
                                <TableRow key={index}>
                                    <TableCell>{a.id}</TableCell>
                                    <TableCell>{a.anlb_number}</TableCell>
                                    <TableCell>{a.anlb_letters}</TableCell>
                                    <TableCell>{a.code}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
        </Card>
    );
};

export default BBMAnlbOverview;
