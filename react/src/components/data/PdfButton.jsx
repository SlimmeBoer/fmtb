import React, { useState } from 'react';
import axiosClient from "../../axios_client.js";
import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CircularProgress from "@mui/material/CircularProgress";

export default function PdfButton({ company }) {
    const [loading, setLoading] = useState(false);

    const downloadPdf = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/pdf/getcompany/${company}`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Eindrapport UMDL.pdf');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <IconButton onClick={downloadPdf} disabled={loading}>
            {loading ? (
                <CircularProgress size={24} />
            ) : (
                <PictureAsPdfIcon />
            )}
        </IconButton>
    );
}
