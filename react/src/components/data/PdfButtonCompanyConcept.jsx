import React, { useState } from 'react';
import axiosClient from "../../axios_client.js";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function PdfButtonCompanyConcept() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const downloadPdf = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/pdf/currentcompanyconcept`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Conceptrapport UMDL.pdf');
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
        <Button
            type="submit"
            variant={loading ? "outlined" : "contained"}
            startIcon={
                loading ? <CircularProgress size={20} sx={{ color: '#424242' }} /> : <PictureAsPdfIcon />
            }
            onClick={downloadPdf}
            sx={{
                mb: 2,
                width: '600px',
                mt: 4,
                bgcolor: loading ? '#e0e0e0 !important' : 'primary.main',
                color: loading ? '#424242' : 'white',
                pointerEvents: loading ? 'none' : 'auto',
                opacity: loading ? 1 : 1, // Force full opacity even when simulating disabled
                '&:hover': {
                    bgcolor: loading ? '#d5d5d5 !important' : 'primary.dark',
                },
            }}
        >
            {loading ? t("company_dashboard.pdf_concept_being_generated") : t("company_dashboard.download_pdf_concept")}
        </Button>
    );
}
