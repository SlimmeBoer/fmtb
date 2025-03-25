import React from 'react';
import axiosClient from "../../axios_client.js";
import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const PdfButton = () => {
    const downloadPdf = async () => {
        try {
            const response = await axiosClient.get('/generate-pdf', {
                responseType: 'blob', // Important: this tells Axios to handle the response as a binary blob
            });

            // Create a link element to download the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf'); // Set the file name for the download
            document.body.appendChild(link);
            link.click();

            // Clean up after download
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

    return (
        <IconButton variant="outlined" onClick={downloadPdf}>
            <PictureAsPdfIcon/>
        </IconButton>
    );
};

export default PdfButton;
