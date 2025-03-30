// src/components/GisRecordsDialog.jsx
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableRow, TableCell, TableBody, DialogActions, Button, TablePagination } from '@mui/material';
import axiosClient from '../../axios_client';
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import Card from "@mui/material/Card";
import {showFullName} from "../../helpers/FullName.js";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';

const RawFilesOverview = ({}) => {
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(100); // Fixed rows per page to 50
    const [totalFiles, setTotalFiles] = useState(0);

    const {t} = useTranslation();

    useEffect(() => {
        fetchFiles();
    }, [page]);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/rawfiles`, {
                params: {
                    page: page + 1, // Laravel pagination starts at 1, React starts at 0
                    perPage: rowsPerPage
                }
            });
            setFiles(response.data.data); // The 'data' field contains the paginated records
            setTotalFiles(response.data.total); // The 'total' field contains total number of records
        } catch (error) {
            console.error(t("system_logs.error_fetch"), error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleDownload = (file) => {
        const fileUrl = import.meta.env.VITE_API_BASE_URL + `/uploads/${file.type}/${file.filename}`;
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = file.filename; // Ensures it downloads instead of opening
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Card>
            {loading && <CenteredLoading />}
            {!loading &&
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t("raw_files.id")}</TableCell>
                                <TableCell>{t("raw_files.user_id")}</TableCell>
                                <TableCell>{t("raw_files.type")}</TableCell>
                                <TableCell>{t("raw_files.filename")}</TableCell>
                                <TableCell>{t("raw_files.created_at")}</TableCell>
                                <TableCell>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {files.map((file) => (
                                <TableRow key={file.id}>
                                    <TableCell>{file.id}</TableCell>
                                    <TableCell>{showFullName(file.user.first_name, file.user.middle_name, file.user.last_name)}</TableCell>
                                    <TableCell>{file.type}</TableCell>
                                    <TableCell>{file.filename}</TableCell>
                                    <TableCell>{file.created_at}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDownload(file)}>
                                            <DownloadIcon />
                                        </IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            {!loading &&
                <TablePagination
                    component="div"
                    count={totalFiles} // Total number of records returned from the backend
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[rowsPerPage]} // Disable changing rows per page, fixed at 50
                />}
        </Card>
    );
};

export default RawFilesOverview;
