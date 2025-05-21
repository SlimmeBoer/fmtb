import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import Stack from "@mui/material/Stack";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axiosClient from "../../axios_client.js";
import {useEffect, useState} from "react";
import CenteredLoading from "../../components/visuals/CenteredLoading.jsx";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import OldDataUploader from "../../components/forms/OldDataUploader.jsx";
import AvTimerIcon from '@mui/icons-material/AvTimer';

export default function Admin_OldResults() {

    const {t} = useTranslation();
    const [oldresults, setOldResults] = useState([]);
    const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
    const [dialogUploadOpen, setDialogUploadOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getOldResults();
    }, [])

    const getOldResults = () => {
        setLoading(true);
        axiosClient.get(`/oldresults`)
            .then(({data}) => {
                setLoading(false);
                setOldResults(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    const handleDeleteClick = (or_id) => {
        setDialogDeleteOpen(true);
        setSelectedId(or_id);
    };

    const closeUploader = () => {
        setDialogUploadOpen(false);
        getOldResults();
    };

    const confirmDelete = () => {
        axiosClient.delete(`/oldresults/${selectedId}`)
            .then(() => {
                setDialogDeleteOpen(false);
                setSelectedId(null);
                getOldResults();
            })
            .catch(error => {
            });
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
                       pt: 1.5, pb: 4,
                   }}>
                <Stack direction="row" gap={2}>
                    <AvTimerIcon/>
                    <Typography component="h6" variant="h6">
                        {t("old_results.title")}
                    </Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                    <Button variant="outlined" startIcon={<AddIcon/>} onClick={() => setDialogUploadOpen(true)}>
                        {t("general.add")}
                    </Button>
                </Stack>
            </Stack>
            <Typography variant="body2">
                {t("old_results.explanation")}
            </Typography>
            {loading && <CenteredLoading/>}
            {!loading &&
                <TableContainer sx={{mt: 4}}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t("old_results.header_filename")}</TableCell>
                                <TableCell>{t("old_results.header_brs")}</TableCell>
                                <TableCell>{t("old_results.header_final_year")}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {oldresults.map((or, index) => (
                                <TableRow key={index}>
                                    <TableCell>{or.filename}</TableCell>
                                    <TableCell>{or.brs}</TableCell>
                                    <TableCell>{or.final_year}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleDeleteClick(or.id)}
                                                color="secondary">{t("general.delete")}</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}

            <Dialog open={dialogDeleteOpen} onClose={() => setDialogDeleteOpen(false)}>
                <DialogTitle>{t("general.are_you_sure")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{t("old_results.delete_confirm")}</DialogContentText>
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
                                <AvTimerIcon/>
                                <Typography component="h6" variant="h6">
                                    {t("old_results.upload_form_title")}
                                </Typography>

                            </Stack>
                            <Typography variant="body2">
                                {t("old_results.upload_form_explanation")}
                            </Typography>
                            <OldDataUploader/>
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
