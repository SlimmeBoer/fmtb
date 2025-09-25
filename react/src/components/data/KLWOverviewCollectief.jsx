import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import axiosClient from "../../axios_client.js";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import Stack from "@mui/material/Stack";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DataComplete from "../visuals/DataComplete.jsx";
import Link from "@mui/material/Link";
import {showFullName} from "../../helpers/FullName.js";

const KLWOverviewCollectief = (props) => {
    const [users, setUsers] = useState([]);
    const [klwDumps, setKlwDumps] = useState([]);
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/klwdump/dumpscollective`)
            .then(response => {
                setUsers(response.data.users);
                setKlwDumps(response.data.klwDumps);
                setLoading(false);
            })
            .catch(error => {
                console.error(t("klw_overview.error_fetch"), error);
                setLoading(false);
            });
    }, []);

    const renderTableCell = (userId, year) => {
        const dump = klwDumps.find(dump => dump.user_id === userId && dump.year === year);
        if (dump) {
            if (dump.signals_count > 0) {
                return (
                    <TableCell style={{backgroundColor: 'orange'}}>
                        <Stack direction="row" gap={2}>
                            <ErrorIcon/>
                            <Typography variant="body">
                                <Link href={props.matrixlink + dump.id}>{dump.signals_count}</Link>
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
                                0
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
            {!loading && users.length === 0 && <p>{t("klw_overview.no_companies_in_db")}</p>}
            {!loading && users.length !== 0 &&
                <TableContainer>
                    <Table size="small" >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '40%' }}>{t("klw_overview.company_name")} </TableCell>
                                <TableCell style={{ width: '10%' }}>{t("klw_overview.complete")}</TableCell>
                                <TableCell>2022</TableCell>
                                <TableCell>2023</TableCell>
                                <TableCell>2024</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => {
                                const company = user.company ?? null; // of user.firstCompany, afhankelijk van je backend

                                return (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            {company ? (
                                                <Link href={props.link + company.id}>
                                                    {showFullName(user.first_name, user.middle_name, user.last_name)}
                                                </Link>
                                            ) : (
                                                showFullName(user.first_name, user.middle_name, user.last_name)
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {company ? (
                                                <DataComplete complete={company.data_compleet} />
                                            ) : (
                                                <em>&nbsp;</em>
                                            )}
                                        </TableCell>
                                        {renderTableCell(user.id, '2022')}
                                        {renderTableCell(user.id, '2023')}
                                        {renderTableCell(user.id, '2024')}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>}
        </Card>
    );
};

export default KLWOverviewCollectief;
