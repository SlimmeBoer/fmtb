import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';
import axiosClient from "../../axios_client.js";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import Stack from "@mui/material/Stack";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const KLWOverviewCollectief = () => {
    const {user} = useStateContext();
    const [companies, setCompanies] = useState([]);
    const [klwDumps, setKlwDumps] = useState([]);
    const [loading, setLoading] = useState(false)

    const {t} = useTranslation();

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/klwdump/dumpscollective`)
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

    const renderTableCell = (companyId, year) => {
        const dump = klwDumps.find(dump => dump.company_id === companyId && dump.year === year);
        if (dump) {
            if (dump.signals_count > 0) {
                return (
                    <TableCell style={{backgroundColor: 'orange'}}>
                        <Stack direction="row" gap={2}>
                            <ErrorIcon/>
                            <Typography variant="body">
                                {dump.signals_count}
                            </Typography>
                        </Stack>
                    </TableCell>
                );
            }
            else
            {
                return (
                    <TableCell style={{backgroundColor: 'green'}}>
                        <Stack direction="row" gap={2}>
                            <CheckCircleIcon/>
                            <Typography variant="body">
                            </Typography>
                        </Stack>
                    </TableCell>
                );
            }
        }
        else {
            return (
                <TableCell style={{backgroundColor:'lightgrey'}}></TableCell>
            );
        }
        return null;
    };

    return (
        <Card variant="outlined">
            <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                <PendingActionsIcon/>
                <Typography sx={{mb: 2}}  variant="h6">
                    {t("collective_dashboard.status_klw")}
                </Typography>
            </Stack>
            {loading && <CenteredLoading />}
            {!loading && companies.length === 0 && <p>{t("klw_overview.no_companies_in_db")}</p>}
            {!loading && companies.length !== 0 &&
            <TableContainer>
                <Table size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '50%' }}>{t("klw_overview.company_name")}</TableCell>
                            <TableCell>2022</TableCell>
                            <TableCell>2023</TableCell>
                            <TableCell>2024</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow key={company.id}>
                                <TableCell>{company.name}</TableCell>
                                {renderTableCell(company.id, '2022')}
                                {renderTableCell(company.id, '2023')}
                                {renderTableCell(company.id, '2024')}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}

        </Card>
    );
};

export default KLWOverviewCollectief;
