// src/components/GISOverview.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Typography, Link } from '@mui/material';
import axiosClient from "../../axios_client.js";
import GisRecordsDialog from "./GisRecordsDialog";
import {useTranslation} from "react-i18next";

const GisOverview = () => {
    const [dumps, setDumps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDumpId, setSelectedDumpId] = useState(null);

    const {t} = useTranslation();

    useEffect(() => {
        fetchDumps();
    }, []);

    const fetchDumps = async () => {
        try {
            const response = await axiosClient.get('/gisdump');
            setDumps(response.data);
        } catch (error) {
            console.error(t("gis_dumps_overview.error_fetch"), error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(t("general.are_you_sure"))) {
            try {
                await axiosClient.delete(`/gisdump/${id}`);
                setDumps(dumps.filter((dump) => dump.id !== id));
            } catch (error) {
                console.error(t("gis_dumps_overview.error_delete"), error);
            }
        }
    };

    const openRecordsDialog = (id) => {
        setSelectedDumpId(id);
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };

    if (loading) return <CircularProgress />;

    if (!dumps.length) return <Typography variant="p">{t("gis_dumps_overview.none_uploaded")}</Typography>;

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>{t("gis_dumps_overview.dump_id")}</TableCell>
                        <TableCell>{t("gis_dumps_overview.dump_filename")}</TableCell>
                        <TableCell>{t("gis_dumps_overview.dump_year")}</TableCell>
                        <TableCell>{t("gis_dumps_overview.dump_time_created")}</TableCell>
                        <TableCell>{t("gis_dumps_overview.dump_records")}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dumps.map((dump) => (
                        <TableRow key={dump.id}>
                            <TableCell>{dump.id}</TableCell>
                            <TableCell>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => openRecordsDialog(dump.id)}
                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    {dump.filename}
                                </Link>
                            </TableCell>
                            <TableCell>{dump.year}</TableCell>
                            <TableCell>{new Date(dump.created_at).toLocaleString()}</TableCell>
                            <TableCell>{dump.gis_records_count}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleDelete(dump.id)} color="secondary">{t("general.delete")}</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <GisRecordsDialog open={openDialog} onClose={closeDialog} dumpId={selectedDumpId} />
        </TableContainer>
    );
};

export default GisOverview;
