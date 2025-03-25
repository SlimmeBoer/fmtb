import React, {useEffect, useState} from 'react';
import {
    TableCell,
} from '@mui/material';
import axiosClient from "../../axios_client.js";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Grid from "@mui/material/Grid2";
import CompletionGauge from "../visuals/CompletionGauge.jsx";

const CollectiefGauges = () => {
    const {user} = useStateContext();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/collectives/completion`)
            .then(response => {
                setData(response.data.collective_data);
                setLoading(false);
            })
            .catch(error => {
                console.error(t("klw_overview.error_fetch"), error);
                setLoading(false);
            });
    }, []);

    return (

        <Grid container item spacing={2}>
            {loading && <CenteredLoading/>}
            {!loading && data.length !== 0 &&
                <>
                    <Grid item xs={12} sm={4} lg={4}>
                        <CompletionGauge main_label={'Kringloopwijzers'} total_label={'Totaal'} total={data.total_klw}
                                         complete_label={'Aangeleverd'} complete={data.total_klw_completed}/>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4}>
                        <CompletionGauge main_label={'Milieubelasting'} total_label={'Totaal'} total={data.total_mbp}
                                         complete_label={'Ingevuld'} complete={data.total_mpb_completed}/>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4}>
                        <CompletionGauge main_label={'Activiteiten'} total_label={'Totaal'} total={data.total_sma}
                                         complete_label={'Ingevuld'} complete={data.total_sma_completed}/>
                    </Grid></>}
        </Grid>
    );
};

export default CollectiefGauges;
