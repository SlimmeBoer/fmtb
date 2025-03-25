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
import MatrixData from "./MatrixData.jsx";
import CenteredLoading from "../visuals/CenteredLoading.jsx";


export default function ConfrontationMatrix() {

    const {t} = useTranslation();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/companies/signalscollective`)
            .then(response => {
                setCompanies(response.data.collectives[0].companies);
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
            {!loading && companies.length !== 0 &&
                <MatrixData companies={companies} />
            }
        </Card>
    )

}
