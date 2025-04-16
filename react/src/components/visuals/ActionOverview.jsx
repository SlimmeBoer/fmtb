import Typography from "@mui/material/Typography";
import * as React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CenteredLoading from "./CenteredLoading.jsx";
import Link from "@mui/material/Link";


export default function ActionOverview(props) {

    const {t} = useTranslation();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/companies/actions`)
            .then(response => {
                setCompanies(response.data.companies);
                setLoading(false);
            })
            .catch(error => {
                console.error(t("klw_overview.error_fetch"), error);
                setLoading(false);
            });
    }, []);

    return (
        <Card variant="outlined">
            {loading && <CenteredLoading/>}
            {!loading && <Box>
                <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                    <PendingActionsIcon/>
                    <Typography sx={{mb: 2}} variant="h6">
                        {t("collective_dashboard.open_actions")}
                    </Typography>
                </Stack>
                {companies.map((c, index) => (
                    <React.Fragment key={index}>
                        {c.actions.length > 0 &&
                            <Box  sx={{
                                mb: 2,
                                width: "100%",
                                padding: 1,
                                color: "#c00",
                                border: "1px solid #c00",
                                bgcolor: "#fff6f6",
                                borderRadius: 4
                            }}>
                                <Stack direction="column">
                                    <Stack direction="row" gap={2}>
                                        <ErrorOutlineIcon/>
                                        <Typography sx={{mt: 0.2}} variant="body2">
                                            <strong><Link sx={{color: '#c00'}} href={props.link + c.id}>{c.name}</Link>:</strong>
                                        </Typography>
                                    </Stack>
                                    <List sx={{ml: 2, listStyleType: 'disc', padding: 0}}>
                                        {c.actions.map((a, actionindex) => (
                                            <ListItem key={index + "-" + actionindex} sx={{display: 'list-item', padding: 0, margin: 0}}>
                                                {a}
                                            </ListItem>
                                        ))}
                                    </List>

                                </Stack>
                            </Box>}
                        {c.actions.length === 0 &&
                            <Box sx={{
                                mb: 2,
                                width: "100%",
                                padding: 1,
                                color: "#090",
                                border: "1px solid #090",
                                bgcolor: "#eeffee",
                                borderRadius: 4
                            }}>
                                <Stack direction="column">
                                    <Stack direction="row" gap={2}>
                                        <CheckCircleOutlineIcon/>
                                        <Typography sx={{mt: 0.2}} variant="body2">
                                            <strong><Link href={props.link + c.id}>{c.name}</Link></strong>
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Box>}

                    </React.Fragment>
                ))}
            </Box>}
        </Card>
    )

}
