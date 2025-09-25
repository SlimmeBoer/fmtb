import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";

export default function CompanyMBP(props) {
    const [properties, setProperties] = useState({});
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        getMbp();
    }, [props.company, props.renderTable])

    const getMbp = () => {
        if (props.company !== '') {
            setLoading(true);
            axiosClient.get(`/companies/getproperties/${props.company}`)
                .then(({data}) => {
                        setLoading(false);
                        setProperties(data);
                    })
                .catch(() => {
                    setLoading(false);
                })
        }
    }


    const menuItems = [
        {value: 0, title: t("mbp.0")},
        {value: 1, title: t("mbp.1"),},
        {value: 2, title: t("mbp.2"),},
        {value: 3, title: t("mbp.3"),},
        {value: 4, title: t("mbp.4"),},
        {value: 5, title: t("mbp.5"),},
        {value: 6, title: t("mbp.6"),},
        {value: 7, title: t("mbp.7"),},
    ];

    return (
        <Card variant="outlined" sx={{mt: 2}}>
            <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                <SpaOutlinedIcon/>
                <Typography component="h6" variant="h6">
                    {t("mbp.title")}
                </Typography>
            </Stack>
            {loading && <CenteredLoading />}
            {!loading && properties.mbp != null &&
                <Typography component="h6" variant="h6">
                    {properties.mbp}
                </Typography>
            }
        </Card>
    );
}
