import React, {useEffect, useState} from 'react';
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
    Button, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from "../../axios_client.js";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import Box from "@mui/material/Box";

const KLWDataBedrijf = (props) => {
    const [klwDumps, setKlwDumps] = useState([]);
    const [dialogDumpOpen, setDialogDumpOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedDumpId, setSelectedDumpId] = useState(null);

    const {t} = useTranslation();

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/klwdump/currentcompany')
            .then(response => {
                setKlwDumps(response.data.klwDumps);
                setLoading(false);
                props.onKlwDumpsChange(response.data.klwDumps);
            })
            .catch(error => {
                console.error(t("klw_overview.error_fetch"), error);
                setLoading(false);
            });
    }, [props.renderTable]);

    const handleDeleteDumpClick = (dumpId) => {
        setSelectedDumpId(dumpId);
        setDialogDumpOpen(true);
    };

    const confirmDumpDelete = () => {
        axiosClient.delete(`/klwdump/${selectedDumpId}`)
            .then(() => {
                setKlwDumps(klwDumps.filter(dump => dump.id !== selectedDumpId));
                setDialogDumpOpen(false);
                props.onKlwDumpsChange(klwDumps.filter(dump => dump.id !== selectedDumpId));
            })
            .catch(error => {
                console.error(t("klw_overview.error_delete_dump"), error);


            });
    };

    return (
        <>
            {loading && <CenteredLoading/>}
            {!loading && klwDumps.length === 0 &&
                <Typography variant="body2" sx={{mb: 3}}>
                    {t("company_dashboard.no_dumps")}
                </Typography>}
            {!loading && klwDumps.length !== 0 &&
                <Box>
                    <Table size="small">
                        <TableBody>
                            {klwDumps.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell sx={{width: "10%"}}>
                                        <IconButton onClick={() => handleDeleteDumpClick(d.id)}
                                                    aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton></TableCell>
                                    <TableCell sx={{width: "90%"}}>{d.filename}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>}

            <Dialog open={dialogDumpOpen} onClose={() => setDialogDumpOpen(false)}>
                <DialogTitle>{t("general.are_you_sure")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{t("company_dashboard.delete_confirm_dump")}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogDumpOpen(false)} color="primary">{t("general.cancel")}</Button>
                    <Button onClick={confirmDumpDelete} color="primary">{t("general.delete")}</Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default KLWDataBedrijf;
