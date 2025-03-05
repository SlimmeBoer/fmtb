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
    CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosClient from "../../axios_client.js";
import {useTranslation} from "react-i18next";

const KLWOverview = () => {
    const [companies, setCompanies] = useState([]);
    const [klwDumps, setKlwDumps] = useState([]);
    const [dialogDumpOpen, setDialogDumpOpen] = useState(false);
    const [dialogCompanyOpen, setDialogCompanyOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedDumpId, setSelectedDumpId] = useState(null);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);

    const {t} = useTranslation();

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/klwdump')
            .then(response => {
                setCompanies(response.data.companies);
                setKlwDumps(response.data.klwDumps);
                setLoading(false);
            })
            .catch(error => {
                console.error(t("klw_overview.error_fetch"), error);
                setLoading(false);
            });
    }, []);

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

    const handleDeleteCompanyClick = (companyId) => {
        setSelectedCompanyId(companyId);
        setDialogCompanyOpen(true);
    };

    const confirmCompanyDelete = () => {
        axiosClient.delete(`/companies/${selectedCompanyId}`)
            .then(() => {
                setCompanies(companies.filter(company => company.id !== selectedCompanyId));
                setDialogCompanyOpen(false);
            })
            .catch(error => {
                console.error(t("klw_overview.error_delete_company"), error);
            });
    };

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
        <>
            {loading && <CircularProgress/>}
            {!loading && companies.length === 0 && <p>{t("klw_overview.no_companies_in_db")}</p>}
            {!loading && companies.length !== 0 &&
            <TableContainer>
                <Table size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '5%' }}></TableCell>
                            <TableCell style={{ width: '60%' }}>{t("klw_overview.company_name")}</TableCell>
                            <TableCell>2021</TableCell>
                            <TableCell>2022</TableCell>
                            <TableCell>2023</TableCell>
                            <TableCell>2024</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow key={company.id}>
                                <TableCell><IconButton  onClick={() => handleDeleteCompanyClick(company.id)} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton></TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{renderYearChip(company.id, '2021')}</TableCell>
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

            <Dialog open={dialogCompanyOpen} onClose={() => setDialogCompanyOpen(false)}>
                <DialogTitle>{t("general.are_you_sure")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{t("klw_overview.delete_confirm_company")}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogCompanyOpen(false)} color="primary">{t("general.cancel")}</Button>
                    <Button onClick={confirmCompanyDelete} color="primary">{t("general.delete")}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default KLWOverview;
