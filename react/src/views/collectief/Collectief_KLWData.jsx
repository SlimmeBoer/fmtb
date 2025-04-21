import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from "../../axios_client.js";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../../components/visuals/CenteredLoading.jsx";
import Stack from "@mui/material/Stack";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import KLWUploader from "../../components/forms/KLWUploader.jsx";
import CloseIcon from "@mui/icons-material/Close";

export default function Collectief_KLWData() {
    const [companies, setCompanies] = useState([]);
    const [klwDumps, setKlwDumps] = useState([]);
    const [dialogDumpOpen, setDialogDumpOpen] = useState(false);
    const [dialogUploadOpen, setDialogUploadOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedDumpId, setSelectedDumpId] = useState(null);
    const {t} = useTranslation();


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get('/klwdump/currentcollective');
            setCompanies(response.data.companies);
            setKlwDumps(response.data.klwDumps);
        } catch (error) {
            console.error(t("gis_dumps_overview.error_fetch"), error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteDumpClick = (dumpId) => {
        setSelectedDumpId(dumpId);
        setDialogDumpOpen(true);
    };

    const confirmDumpDelete = () => {
        axiosClient.delete(`/klwdump/${selectedDumpId}`)
            .then(() => {
                setKlwDumps(klwDumps.filter(dump => dump.id !== selectedDumpId));
                setDialogDumpOpen(false);
            })
            .catch(error => {
                console.error(t("klw_overview.error_delete_dump"), error);
            });
    };

    const closeUploader = () => {
        setDialogUploadOpen(false);
        fetchData();
    }

    const renderYearChip = (companyId, year) => {
        const dump = klwDumps.find(dump => dump.company_id === companyId && dump.year === year);
        if (dump) {
            return (
                <Chip
                    label={year}
                    onDelete={() => handleDeleteDumpClick(dump.id)}
                    deleteIcon={<DeleteIcon />}
                    variant="outlined"
                />
            );
        }
        return null;
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
                    <CropRotateIcon/>
                    <Typography component="h6" variant="h6">
                        {t("pages_collectief.klw_data")}
                    </Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                    <Button variant="outlined" startIcon={<AddIcon/>} onClick={() => setDialogUploadOpen(true)}
                            aria-label="run">
                        {t("klw.upload")}
                    </Button>
                </Stack>
            </Stack>
            {loading && <CenteredLoading />}
            {!loading && companies.length === 0 && <Typography variant="body2">{t("klw_overview.no_companies_in_db")}</Typography>}
            {!loading && companies.length !== 0 &&
            <TableContainer>
                <Table size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '60%' }}>{t("klw_overview.company_name")}</TableCell>
                            <TableCell>2022</TableCell>
                            <TableCell>2023</TableCell>
                            <TableCell>2024</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow key={company.id}>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{renderYearChip(company.id, '2022')}</TableCell>
                                <TableCell>{renderYearChip(company.id, '2023')}</TableCell>
                                <TableCell>{renderYearChip(company.id, '2024')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}

            <Dialog open={dialogDumpOpen} onClose={() => setDialogDumpOpen(false)}>
                <DialogTitle>{t("general.are_you_sure")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{t("klw_overview.delete_confirm_dump")}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogDumpOpen(false)} color="primary">{t("general.cancel")}</Button>
                    <Button onClick={confirmDumpDelete} color="primary">{t("general.delete")}</Button>
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
                                    {t("klw_upload.title")}
                                </Typography>

                            </Stack>
                            <Typography variant="body2">
                                {t("klw_upload.explanation")}
                            </Typography>
                            <KLWUploader/>
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
    );
};

