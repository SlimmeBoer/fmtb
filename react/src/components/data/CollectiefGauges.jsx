import React, {useEffect, useState} from 'react';
import axiosClient from "../../axios_client.js";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import Grid from "@mui/material/Grid2";
import CompletionGauge from "../visuals/CompletionGauge.jsx";

const CollectiefGauges = () => {
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

        <Grid container spacing={2}>
            {loading && <CenteredLoading/>}
            {!loading && data.length !== 0 &&
                <React.Fragment>
                    <Grid size={{xs: 6, sm: 3, lg: 3}}>
                        <CompletionGauge main_label={'Kringloopwijzers'} total_label={'Totaal'} total={data.total_klw}
                                         complete_label={'Aangeleverd'} complete={data.total_klw_completed}/>
                    </Grid>
                    <Grid size={{xs: 6, sm: 3, lg: 3}}>
                        <CompletionGauge main_label={'Gewasbescherming'} total_label={'Totaal'} total={data.total_mbp}
                                         complete_label={'Ingevuld'} complete={data.total_mpb_completed}/>
                    </Grid>
                    <Grid size={{xs: 6, sm: 3, lg: 3}}>
                        <CompletionGauge main_label={'Activiteiten'} total_label={'Totaal'} total={data.total_sma}
                                         complete_label={'Ingevuld'} complete={data.total_sma_completed}/>
                    </Grid>
                    <Grid size={{xs: 6, sm: 3, lg: 3}}>
                        <CompletionGauge main_label={'Natuur-KPI\'s'} total_label={'Totaal'} total={data.total_kpi}
                                         complete_label={'Ingevuld'} complete={data.total_kpi_completed}/>
                    </Grid>
                </React.Fragment>}
        </Grid>
    );
};

export default CollectiefGauges;
