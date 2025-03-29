import React from 'react';
import axiosClient from "../../axios_client.js";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function PdfButtonCompany() {
    const {t} = useTranslation();
    const downloadPdf = async () => {
        try {
            const response = await axiosClient.get(`/pdf/currentcompany`, {
                responseType: 'blob', // Important: this tells Axios to handle the response as a binary blob
            });

            // Create a link element to download the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Eindrapport UMDL.pdf'); // Set the file name for the download
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
        <Button type="submit" variant="contained" startIcon={<PictureAsPdfIcon/>} sx={{mb: 2, mt: 4}} onClick={downloadPdf}>
            {t("company_dashboard.download_pdf")}
        </Button>
    );
};

