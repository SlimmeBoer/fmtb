// src/components/GisRecordsDialog.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import axiosClient from '../../axios_client';
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import Card from "@mui/material/Card";
import {showFullName} from "../../helpers/FullName.js";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
import {formatDateNL} from "../../helpers/formatDateNL.js";

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

    const handleDownload = async (file) => {
        const fileUrl = import.meta.env.VITE_API_BASE_URL + `/uploads/${file.type}/${file.filename}`;

        const response = await fetch(fileUrl);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <Card>
            {loading && <CenteredLoading />}
            {!loading &&
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{width: '5%'}}>{t("raw_files.id")}</TableCell>
                                <TableCell sx={{width: '10%'}}>{t("raw_files.user_id")}</TableCell>
                                <TableCell sx={{width: '5%'}}>{t("raw_files.type")}</TableCell>
                                <TableCell sx={{width: '50%'}}>{t("raw_files.filename")}</TableCell>
                                <TableCell sx={{width: '20%'}}>{t("raw_files.created_at")}</TableCell>
                                <TableCell sx={{width: '10%'}}>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {files.map((file) => (
                                <TableRow key={file.id}>
                                    <TableCell>{file.id}</TableCell>
                                    <TableCell>{showFullName(file.user.first_name, file.user.middle_name, file.user.last_name)}</TableCell>
                                    <TableCell>{file.type}</TableCell>
                                    <TableCell>{file.filename}</TableCell>
                                    <TableCell>{formatDateNL(file.created_at)}</TableCell>
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
