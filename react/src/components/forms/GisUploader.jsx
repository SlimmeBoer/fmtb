import React, { useState } from "react";
import {Box, Button, Typography, CircularProgress, Alert, TextField} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axiosClient from "../../axios_client.js";
import {useTranslation} from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

const GisUploader = () => {
    const [files, setFiles] = useState([]);
    const [year, setYear] = useState(2021);
    const [feedback, setFeedback] = useState({});
    const {t} = useTranslation();

    const years = [
        { value: 2020, title: "2020", },
        { value: 2021, title: "2021",},
        { value: 2022, title: "2022",},
        { value: 2023, title: "2023",},
        { value: 2024, title: "2024",},
        { value: 2025, title: "2025",},
        { value: 2026, title: "2026",},
        { value: 2027, title: "2027",},
        { value: 2028, title: "2028",},
        { value: 2029, title: "2029",},
    ];

    const changeYear = (event) => {
        setYear(event.target.value)
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
            formData.append("year", year);
            formData.append("_method", "put");

            // Assuming the Laravel backend accepts file upload via /api/upload
            axiosClient
                .post("/gisdump/uploadexcel", formData, {
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
                            message: response.data
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
                            message: error.response.data,
                        },
                    }));
                });
        });
    };

    return (
        <Box sx={{ width: "80%", padding: 3, border: "1px solid #ccc", borderRadius: 4 }}>

            <TextField select
                       value={year}
                       onChange={(e) => changeYear(e)}
            >
                {years.map(y => {
                    return (
                        <MenuItem value={y.value} key={y.value}>
                            <ListItemText primary={y.title} />
                        </MenuItem>
                    )
                })}
            </TextField>

            <Button
                variant="contained"
                component="label"
                startIcon={<CloudUpload />}
                sx={{ marginBottom: 2 }}
            >
                Select Files
                <input
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excelhp "
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

export default GisUploader;
