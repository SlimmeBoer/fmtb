import React, { useState } from "react";
import {Box, Button, Typography, CircularProgress, Alert, FormGroup} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axiosClient from "../../axios_client.js";
import {useTranslation} from "react-i18next";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const KLWUploader = () => {
    const [files, setFiles] = useState([]);
    const [feedback, setFeedback] = useState({});
    const [saveFields, setSaveFields] = useState(false);
    const {t} = useTranslation();

    const changeSaveFields = () => {
        setSaveFields(!saveFields)
        console.log(saveFields)
    };

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
            formData.append("saveFields", saveFields);
            formData.append("_method", "put");

            // Assuming the Laravel backend accepts file upload via /api/upload
            axiosClient
                .post("/klwdump/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    // Handle success
                    setFeedback((prevFeedback) => ({
                        ...prevFeedback,
                        [file.name]: {
                            status: "Uploaded",
                            error: false,
                            message: "Upload successful!",
                        },
                    }));
                })
                .catch((error) => {
                    // Handle error
                    setFeedback((prevFeedback) => ({
                        ...prevFeedback,
                        [file.name]: {
                            status: "Failed",
                            error: true,
                            message: "Upload failed. Please try again.",
                        },
                    }));
                });
        });
    };

    return (
        <Box sx={{ width: "80%", padding: 3, border: "1px solid #ccc", borderRadius: 4 }}>
            <FormGroup>
                <FormControlLabel control={<Checkbox
                    checked={saveFields}
                    onChange={changeSaveFields}
                    inputProps={{ 'aria-label': 'controlled' }}
                />} label="Sla alle KLW-velden op in de database (volledige upload)" />
            </FormGroup><br /><br />
            <Button
                variant="contained"
                component="label"
                startIcon={<CloudUpload />}
                sx={{ marginBottom: 2 }}
            >
                Select Files
                <input
                    type="file"
                    accept="text/xml"
                    multiple
                    hidden
                    onChange={handleFileChange}
                />
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
                                    <Typography variant="body2">Uploading...</Typography>
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

export default KLWUploader;
