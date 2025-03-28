
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import GisOverview from "../../components/data/GisOverview.jsx";
import {useTranslation} from "react-i18next";
import Stack from "@mui/material/Stack";
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from "@mui/material/Button";
import DatasetIcon from "@mui/icons-material/Dataset";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useState} from "react";
import axiosClient from "../../axios_client.js";

export default function Admin_GISData() {

    const [dialogRunOpen, setDialogRunOpen] = useState(false);

    const handleRunClick = () => {
        setDialogRunOpen(true);
    };

    const confirmRun = () => {
        axiosClient.get(`/gisdump/runall`)
            .then(() => {
                setDialogRunOpen(false);
            })
            .catch(error => {
            });
    };

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Stack direction="row" gap={2}
                   sx={{
                       display: { xs: 'none', md: 'flex' },
                       width: '100%',
                       alignItems: { xs: 'flex-start', md: 'center' },
                       justifyContent: 'space-between',
                       maxWidth: { sm: '100%', md: '1700px' },
                       pt: 1.5, pb: 4,
                   }}>
                <Stack direction="row" gap={2}>
                    <DatasetIcon/>
                    <Typography component="h6" variant="h6">
                        {t("pages_admin.scangis_data")}
                    </Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                    <Button variant="outlined" startIcon={<RefreshIcon />}  onClick={() => handleRunClick()} aria-label="run">
                        {t("gis.run")}
                    </Button>
                </Stack>
            </Stack>
            <GisOverview />

            <Dialog open={dialogRunOpen} onClose={() => setDialogRunOpen(false)}>
                <DialogTitle>{t("general.are_you_sure")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{t("gis.warning")}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogRunOpen(false)} color="primary">{t("general.cancel")}</Button>
                    <Button onClick={confirmRun} color="primary">{t("general.calculate")}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )

}
