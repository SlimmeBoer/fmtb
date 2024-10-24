// src/components/GisRecordsDialog.jsx
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableRow, TableCell, TableBody, DialogActions, Button, CircularProgress, TablePagination } from '@mui/material';
import axiosClient from '../../axios_client';

const GisRecordsDialog = ({ open, onClose, dumpId }) => {
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50); // Fixed rows per page to 50
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        if (open) {
            fetchRecords();
        }
    }, [open, page]);

    const fetchRecords = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/gisdump/${dumpId}`, {
                params: {
                    page: page + 1, // Laravel pagination starts at 1, React starts at 0
                    perPage: rowsPerPage
                }
            });

            setRecords(response.data.data); // The 'data' field contains the paginated records
            setTotalRecords(response.data.total); // The 'total' field contains total number of records
        } catch (error) {
            console.error('Error fetching GIS records:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>GIS regels</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>KVK</TableCell>
                                <TableCell>Eenheid code</TableCell>
                                <TableCell>Lengte</TableCell>
                                <TableCell>Breedte</TableCell>
                                <TableCell>Oppervlakte</TableCell>
                                <TableCell>Eenheden</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>{record.kvk}</TableCell>
                                    <TableCell>{record.eenheid_code}</TableCell>
                                    <TableCell>{record.lengte}</TableCell>
                                    <TableCell>{record.breedte}</TableCell>
                                    <TableCell>{record.oppervlakte}</TableCell>
                                    <TableCell>{record.eenheden}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </DialogContent>
            {!loading && (
                <TablePagination
                    component="div"
                    count={totalRecords} // Total number of records returned from the backend
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[rowsPerPage]} // Disable changing rows per page, fixed at 50
                />
            )}
            <DialogActions>
                <Button onClick={onClose}>Sluiten</Button>
            </DialogActions>
        </Dialog>
    );
};

export default GisRecordsDialog;
