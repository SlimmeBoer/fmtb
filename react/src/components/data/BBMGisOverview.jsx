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

const BBMGisOverview = () => {
    const [gisrecords, setGisrecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation();

    useEffect(() => {
        getGisrecords();
    }, []);

    const getGisrecords = (kpi) => {
        setLoading(true);
        axiosClient.get(`/bbmgispackages/overview`)
            .then(({data}) => {
                setGisrecords(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <Card sx={{width: '700px'}}>
            {loading && <CenteredLoading/>}
            {!loading && gisrecords.length !== 0 &&
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID:</TableCell>
                                <TableCell>Pakket:</TableCell>
                                <TableCell>BBM-code:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gisrecords.map((gr, index) => (
                                <TableRow key={index}>
                                    <TableCell>{gr.id}</TableCell>
                                    <TableCell>{gr.package}</TableCell>
                                    <TableCell>{gr.code}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
        </Card>
    );
};

export default BBMGisOverview;
