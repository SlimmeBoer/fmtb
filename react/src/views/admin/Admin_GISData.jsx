import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import Stack from "@mui/material/Stack";
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from "@mui/material/Button";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Link,
    Table, TableBody, TableCell, TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import AddIcon from "@mui/icons-material/Add";
import GisRecordsDialog from "../../components/data/GisRecordsDialog.jsx";
import CenteredLoading from "../../components/visuals/CenteredLoading.jsx";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import GisUploader from "../../components/forms/GisUploader.jsx";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import DashboardIcon from "@mui/icons-material/Dashboard";

export default function Admin_GISData() {

    const [dumps, setDumps] = useState([]);
    const [dialogRunOpen, setDialogRunOpen] = useState(false);
    const [dialogUploadOpen, setDialogUploadOpen] = useState(false);
    const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
    const [dialogRecordsOpen, setDialogRecordsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        fetchDumps();
    }, []);

    const fetchDumps = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/gisdump');
            setDumps(response.data);
        } catch (error) {
            console.error(t("gis_dumps_overview.error_fetch"), error);
        } finally {
            setLoading(false);
        }
    };

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

    const handleDeleteClick = (dump_id) => {
        setDialogDeleteOpen(true);
        setSelectedId(dump_id);
    };

    const closeUploader = () => {
        setDialogUploadOpen(false);
        fetchDumps();
    };

    const confirmDelete = () => {
        axiosClient.delete(`/gisdump/${selectedId}`)
            .then(() => {
                setDialogDeleteOpen(false);
                setSelectedId(null);
                fetchDumps();
            })
            .catch(error => {
            });
    };

    const openRecordsDialog = (id) => {
        setSelectedId(id);
        setDialogRecordsOpen(true);
    };

    const closeRecordsDialog = () => {
        setDialogRecordsOpen(false);
    };

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Stack direction="row" gap={2}
                   sx={{
                       display: {xs: 'none', md: 'flex'},
                       width: '100%',
                       alignItems: {xs: 'flex-start', md: 'center'},
                       justifyContent: 'space-between',
                       maxWidth: {sm: '100%', md: '1700px'},
                       pb: 4,
                   }}>
                <Stack direction="row" gap={2}>
                    <DashboardIcon/>
                    <Typography component="h6" variant="h6">
                        {t("pages_admin.scangis_data")}
                    </Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                    <Button variant="outlined" startIcon={<RefreshIcon/>} onClick={() => handleRunClick()}
                            aria-label="run">
                        {t("gis.run")}
                    </Button>
                    <Button variant="outlined" startIcon={<AddIcon/>} onClick={() => setDialogUploadOpen(true)}
                            aria-label="run">
                        {t("gis.upload")}
                    </Button>
                </Stack>
            </Stack>

            {loading && <CenteredLoading/>}
            {!loading && dumps.length === 0 && <Typography variant="body2">{t("gis_dumps_overview.none_uploaded")}</Typography>}
            {!loading && dumps.length !== 0 && <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("gis_dumps_overview.dump_id")}</TableCell>
                            <TableCell>{t("gis_dumps_overview.dump_filename")}</TableCell>
                            <TableCell>{t("gis_dumps_overview.dump_year")}</TableCell>
                            <TableCell>{t("gis_dumps_overview.dump_time_created")}</TableCell>
                            <TableCell>{t("gis_dumps_overview.dump_records")}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dumps.map((dump) => (
                            <TableRow key={dump.id}>
                                <TableCell>{dump.id}</TableCell>
                                <TableCell>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => openRecordsDialog(dump.id)}
                                        style={{cursor: 'pointer', textDecoration: 'underline'}}
                                    >
                                        {dump.filename}
                                    </Link>
                                </TableCell>
                                <TableCell>{dump.year}</TableCell>
                                <TableCell>{new Date(dump.created_at).toLocaleString()}</TableCell>
                                <TableCell>{dump.gis_records_count}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDeleteClick(dump.id)}
                                            color="secondary">{t("general.delete")}</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <GisRecordsDialog open={dialogRecordsOpen} onClose={closeRecordsDialog} dumpId={selectedId}/>
            </TableContainer>}

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

            <Dialog open={dialogDeleteOpen} onClose={() => setDialogDeleteOpen(false)}>
                <DialogTitle>{t("general.are_you_sure")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{t("gis.warning_delete")}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogDeleteOpen(false)} color="primary">{t("general.cancel")}</Button>
                    <Button onClick={confirmDelete} color="primary">{t("general.delete")}</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={dialogUploadOpen} maxWidth="md" fullWidth={true} onClose={closeUploader}>
                <DialogContent>
                    <Grid
                        container
                        spacing={2}
                        columns={12}
                        sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                    >
                        <Grid size={{xs: 11, lg: 11}}>
                            <Stack direction="row" gap={2}>
                                <ImportExportIcon/>
                                <Typography component="h6" variant="h6">
                                    {t("pages_admin.scangis_import")}
                                </Typography>

                            </Stack>
                            <GisUploader/>
                        </Grid>
                        <Grid size={{xs: 1, lg: 1}}>
                            <IconButton
                                onClick={closeUploader}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Box>
    )

}
