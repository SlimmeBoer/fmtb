import Typography from "@mui/material/Typography";
import * as React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CenteredLoading from "./CenteredLoading.jsx";


export default function ActionOverview() {

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
                    <Box key={index} sx={{
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
                                    <strong>{c.name}:</strong>
                                </Typography>
                            </Stack>
                            <List sx={{ml: 2, listStyleType: 'disc', padding: 0}}>
                                {c.actions.map((a, index) => (
                                    <ListItem key={index} sx={{display: 'list-item', padding: 0, margin: 0}}>
                                        {a}
                                    </ListItem>
                                ))}
                            </List>

                        </Stack>
                    </Box>
                ))}
            </Box>}
        </Card>
    )

}
