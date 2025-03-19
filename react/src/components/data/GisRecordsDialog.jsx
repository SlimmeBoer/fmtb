// src/components/GisRecordsDialog.jsx
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableRow, TableCell, TableBody, DialogActions, Button, TablePagination } from '@mui/material';
import axiosClient from '../../axios_client';
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";

const GisRecordsDialog = ({ open, onClose, dumpId }) => {
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(50); // Fixed rows per page to 50
    const [totalRecords, setTotalRecords] = useState(0);

    const {t} = useTranslation();

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
            console.error(t("gis_records.error_fetch"), error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>{t("gis_records.title")}</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CenteredLoading />
                ) : (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t("gis_records.kvk")}</TableCell>
                                <TableCell>{t("gis_records.code")}</TableCell>
                                <TableCell>{t("gis_records.length")}</TableCell>
                                <TableCell>{t("gis_records.width")}</TableCell>
                                <TableCell>{t("gis_records.surface")}</TableCell>
                                <TableCell>{t("gis_records.units")}</TableCell>
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
