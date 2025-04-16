import React, {useMemo, useState} from "react";
import { Box, Button, Typography, CircularProgress, Alert } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axiosClient from "../../axios_client.js";
import {useTranslation} from "react-i18next";

const ExcelUploader = () => {
    const [files, setFiles] = useState([]);
    const [feedback, setFeedback] = useState({});
    const {t} = useTranslation();

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        const newFeedback = {};
        selectedFiles.forEach((file) => {
            newFeedback[file.name] = {
                status: "Uploading", // Initial status
                error: false,
                message: "",
            };
        });
        setFeedback(newFeedback);

        // Send files to the backend
        uploadFilesToBackend(selectedFiles);
    };

    const uploadFilesToBackend = async (filesToUpload) => {
        filesToUpload.forEach((file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("_method", "put");

            // Assuming the Laravel backend accepts file upload via /api/upload
            axiosClient
                .post("/klwdump/uploadexcel", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    // Handle success
                    setFeedback((prevFeedback) => ({
                        ...prevFeedback,
                        [file.name]: {
                            status: t("general.uploaded"),
                            error: false,
                            message: response.data
                        },
                    }));
                })
                .catch((error) => {
                    // Handle error
                    setFeedback((prevFeedback) => ({
                        ...prevFeedback,
                        [file.name]: {
                            status: t("general.failed"),
                            error: true,
                            message: error.response.data,
                        },
                    }));
                });
        });
    };

    const uploading = useMemo(() => {
        return Object.values(feedback).some((f) => f.status === "Uploading");
    }, [feedback]);

    return (
        <Box sx={{ width: "100%", padding: 3 }}>

            <Button
                variant={uploading ? "outlined" : "contained"}
                component="label"
                disabled={uploading}
                startIcon={
                    uploading ? <CircularProgress size={20} sx={{ color: "white" }} /> : <CloudUpload />
                }
                sx={{ marginBottom: 2 }}
            >
                {uploading ? t("general.uploading") : t("general.select_excel_files")}
                {!uploading && (
                <input
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excelhp "
                    multiple
                    hidden
                    onChange={handleFileChange}
                />
                )}
            </Button>

            {files.length > 0 && (
                <Box>
                    {files.map((file) => (
                        <Box key={file.name} sx={{ marginBottom: 2 }}>
                            <Typography variant="subtitle1">
                                {file.name} ({(file.size / 1024).toFixed(2)} KB)
                            </Typography>
                            {feedback[file.name]?.status === "Uploading" && (
                                <Box display="flex" alignItems="center">
                                    <CircularProgress size={20} sx={{ marginRight: 1 }} />
                                    <Typography variant="body2">{t("general.uploading")}</Typography>
                                </Box>
                            )}
                            {feedback[file.name]?.status === "Uploaded" && (
                                <Alert severity="success">{feedback[file.name]?.message}</Alert>
                            )}
                            {feedback[file.name]?.status === "Failed" && (
                                <Alert severity="error">{feedback[file.name]?.message}</Alert>
                            )}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ExcelUploader;
