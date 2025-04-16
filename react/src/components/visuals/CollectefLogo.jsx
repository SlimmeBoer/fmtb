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
import Link from "@mui/material/Link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";


export default function CollectiefLogo() {

    const [collectief, setCollectief] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/collectives/getcurrent`)
            .then(response => {
                setCollectief(response.data);
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
            {!loading && collectief.length !== 0 && <Box
                component="img"
                sx={{
                    m: 2,
                    width: '80%',
                }}
                alt={collectief.name}
                src={collectief.logo}
            />}
        </Card>
    )

}
