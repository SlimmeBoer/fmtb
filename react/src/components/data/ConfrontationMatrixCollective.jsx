
import * as React from "react";
import Card from "@mui/material/Card";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import MatrixData from "./MatrixData.jsx";
import CenteredLoading from "../visuals/CenteredLoading.jsx";


export default function ConfrontationMatrixCollective(props) {

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
        <Card variant="outlined" sx={{mt: 2}}>
            {loading && <CenteredLoading/>}
            {!loading && companies.length !== 0 &&
                <MatrixData companies={companies} openId={props.opendump}/>
            }
        </Card>
    )

}
