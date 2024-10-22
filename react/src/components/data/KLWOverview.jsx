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

const KLWOverview = () => {
    const [companies, setCompanies] = useState([]);
    const [klwDumps, setKlwDumps] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedDumpId, setSelectedDumpId] = useState(null);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/klwdump')
            .then(response => {
                setCompanies(response.data.companies);
                setKlwDumps(response.data.klwDumps);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the companies!", error);
                setLoading(false);
            });
    }, []);

    const handleDeleteClick = (dumpId) => {
        setSelectedDumpId(dumpId);
        setDialogOpen(true);
    };

    const confirmDelete = () => {
        axiosClient.delete(`/klwdump/${selectedDumpId}`)
            .then(() => {
                setKlwDumps(klwDumps.filter(dump => dump.id !== selectedDumpId));
                setDialogOpen(false);
            })
            .catch(error => {
                console.error("There was an error deleting the dump!", error);
            });
    };

    const renderYearChip = (companyId, year) => {
        const dump = klwDumps.find(dump => dump.company_id === companyId && dump.year === year);
        if (dump) {
            return (
                <Chip
                    label={year}
                    onDelete={() => handleDeleteClick(dump.id)}
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
            {!loading && companies.length === 0 && <p>Geen bedrijven in de database</p>}
            {!loading && companies.length !== 0 &&
            <TableContainer>
                <Table size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '60%' }}>Bedrijfsnaam</TableCell>
                            <TableCell>2021</TableCell>
                            <TableCell>2022</TableCell>
                            <TableCell>2023</TableCell>
                            <TableCell>2024</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow key={company.id}>
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

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Weet je het zeker?</DialogTitle>
                <DialogContent>
                    <DialogContentText>Weet je zeker dat je dit wilt verwijderen?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">Annuleren</Button>
                    <Button onClick={confirmDelete} color="primary">Verwijderen</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default KLWOverview;
