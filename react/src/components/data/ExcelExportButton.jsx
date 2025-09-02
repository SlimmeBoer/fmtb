// src/components/ExcelExportButton.jsx
import { useState } from "react";
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Stack,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useTranslation } from "react-i18next";
import axiosClient from "../../axios_client.js";

export default function ExcelExportButton() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [exporting, setExporting] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if (exporting) return;
        setOpen(false);
    };

    const extractFilename = (headers) => {
        const cd = headers?.["content-disposition"] || headers?.get?.("content-disposition") || "";
        if (!cd) return null;
        const m = cd.match(/filename\*=UTF-8''([^;]+)|filename="([^"]+)"|filename=([^;]+)/i);
        if (!m) return null;
        const raw = m[1] || m[2] || m[3];
        try { return decodeURIComponent(raw); } catch { return raw; }
    };

    const isSpreadsheet = (headers) => {
        const ct = headers?.["content-type"] || headers?.get?.("content-type") || "";
        return /spreadsheetml|officedocument\.spreadsheetml/i.test(ct);
    };

    const handleDownload = async () => {
        if (exporting) return;
        setExporting(true);
        try {
            const resp = await axiosClient.get("/export/download", {
                responseType: "arraybuffer",           // ← belangrijk
            });

            const headers = resp.headers;
            console.log(headers);
            if (!isSpreadsheet(headers)) {
                // Lees de fouttekst (indien aanwezig) voor diagnose
                const decoder = new TextDecoder();
                const text = decoder.decode(resp.data);
                console.error("Geen XLSX-content:", text);
                alert(text || "Download mislukte (geen XLSX-response).");
                return;
            }

            const filename = extractFilename(headers) || "export.xlsx";
            const contentType =
                headers?.["content-type"] || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            const blob = new Blob([resp.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            setOpen(false);
        } catch (e) {
            console.error("Export/download error", e);
            alert("Export mislukt.");
        } finally {
            setExporting(false);
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleOpen}
            >
                {t("general.excel_export")}
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Typography component="h6" variant="h6">
                        {t("excel_export.title")}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Typography variant="body1">
                            {t("excel_export.subtitle")}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.75 }}>
                            {exporting
                                ? t("excel_export.generating") || "Bezig met genereren…"
                                : t("excel_export.ready_to_download") || "Klaar om te downloaden."}
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                        disabled={exporting}
                    >
                        {t("general.excel_export")}
                    </Button>
                    <Button onClick={handleClose} disabled={exporting}>
                        {t("general.cancel")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
