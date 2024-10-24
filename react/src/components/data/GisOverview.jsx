// src/components/GISOverview.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Typography, Link } from '@mui/material';
import axiosClient from "../../axios_client.js";
import GisRecordsDialog from "./GisRecordsDialog";

const GisOverview = () => {
    const [dumps, setDumps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDumpId, setSelectedDumpId] = useState(null);

    useEffect(() => {
        fetchDumps();
    }, []);

    const fetchDumps = async () => {
        try {
            const response = await axiosClient.get('/gisdump');
            setDumps(response.data);
        } catch (error) {
            console.error('Error fetching dumps:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Weet je het zeker?')) {
            try {
                await axiosClient.delete(`/gisdump/${id}`);
                setDumps(dumps.filter((dump) => dump.id !== id));
            } catch (error) {
                console.error('Error deleting dump:', error);
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

    if (!dumps.length) return <Typography variant="p">Er zijn nog geen ScanGis-dumpfiles geüpload.</Typography>;

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Dump ID</TableCell>
                        <TableCell>Dump filename</TableCell>
                        <TableCell>Dump year</TableCell>
                        <TableCell>Time created</TableCell>
                        <TableCell>Aantal GIS records</TableCell>
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
                                <Button onClick={() => handleDelete(dump.id)} color="secondary">Verwijderen</Button>
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
