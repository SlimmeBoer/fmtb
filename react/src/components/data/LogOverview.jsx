// src/components/GisRecordsDialog.jsx
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableRow, TableCell, TableBody, DialogActions, Button, TablePagination } from '@mui/material';
import axiosClient from '../../axios_client';
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import Card from "@mui/material/Card";
import {showFullName} from "../../helpers/FullName.js";
import {formatDateNL} from "../../helpers/formatDateNL.js";

const LogOverview = ({}) => {
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(100); // Fixed rows per page to 50
    const [totalLogs, setTotalLogs] = useState(0);

    const {t} = useTranslation();

    useEffect(() => {
        fetchLogs();
    }, [page]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/systemlogs`, {
                params: {
                    page: page + 1, // Laravel pagination starts at 1, React starts at 0
                    perPage: rowsPerPage
                }
            });
            setLogs(response.data.data); // The 'data' field contains the paginated records
            setTotalLogs(response.data.total); // The 'total' field contains total number of records
        } catch (error) {
            console.error(t("systen_logs.error_fetch"), error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card>
            {loading && <CenteredLoading />}
            {!loading &&
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t("system_logs.id")}</TableCell>
                                <TableCell>{t("system_logs.user_id")}</TableCell>
                                <TableCell>{t("system_logs.type")}</TableCell>
                                <TableCell>{t("system_logs.message")}</TableCell>
                                <TableCell>{t("system_logs.created_at")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell>{log.id}</TableCell>
                                    <TableCell>{showFullName(log.user.first_name, log.user.middle_name, log.user.last_name)}</TableCell>
                                    <TableCell>{log.type}</TableCell>
                                    <TableCell>{log.message}</TableCell>
                                    <TableCell>{formatDateNL(log.created_at)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            {!loading &&
                <TablePagination
                    component="div"
                    count={totalLogs} // Total number of records returned from the backend
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[rowsPerPage]} // Disable changing rows per page, fixed at 50
                />}
        </Card>
    );
};

export default LogOverview;
