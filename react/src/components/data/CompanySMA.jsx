import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {
    FormGroup
} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";

export default function CompanySMA(props) {
    const [checklistItems, setChecklistItems] = useState([]);
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    const makeSma = (data) => [
        { label: t("sma.website"), key: "website", value: !!data.website },
        { label: t("sma.ontvangstruimte"), key: "ontvangstruimte", value: !!data.ontvangstruimte },
        { label: t("sma.winkel"), key: "winkel", value: !!data.winkel },
        { label: t("sma.educatie"), key: "educatie", value: !!data.educatie },
        { label: t("sma.meerjarige_monitoring"), key: "meerjarige_monitoring", value: !!data.meerjarige_monitoring },
        { label: t("sma.open_dagen"), key: "open_dagen", value: !!data.open_dagen },
        { label: t("sma.wandelpad"), key: "wandelpad", value: !!data.wandelpad },
        { label: t("sma.erkend_demobedrijf"), key: "erkend_demobedrijf", value: !!data.erkend_demobedrijf },
        { label: t("sma.bed_and_breakfast"), key: "bed_and_breakfast", value: !!data.bed_and_breakfast },
    ];


    useEffect(() => {
        getProperties();
    }, [props.company])

    const getProperties = () => {
        if (props.company !== '') {
            setLoading(true);
            axiosClient.get(`/companies/getproperties/${props.company}`)
                .then(({data}) => {
                    setLoading(false);
                    setCompany(data);
                    setChecklistItems(makeSma(data))
                    console.log(makeSma(data));
                })
                .catch(() => {
                    setLoading(false);
                })
        }
    }

    const handleChange = async (item) => {


        // Toggle the checkbox value
        const updatedItems = checklistItems.map((checkItem) =>
            checkItem.key === item.key ? { ...checkItem, value: !checkItem.value } : checkItem
        );
        setChecklistItems(updatedItems);

        axiosClient.put(`/companyproperties/update/${company.id}`, {
                company_id: company.id,
                [item.key]: !item.value
            })
            .then(response => {
                console.log('Value updated successfully:');
                props.notifyParent();
            })
            .catch(error => {
                console.error('Error updating value:', error);
            });
    };



    return (
            <Card variant="outlined"  sx={{mt: 2}}>
                <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}} >
                    <Diversity3OutlinedIcon/>
                    <Typography component="h6" variant="h6" >
                        {t("sma.title")}
                    </Typography>
                </Stack>
                {loading && <CenteredLoading />}
                {!loading && company.id != null &&
                    <FormGroup>
                        {checklistItems.map((item) => (
                            <FormControlLabel
                                key={item.key}
                                control={
                                    <Checkbox
                                        checked={item.value}
                                        onChange={() => handleChange(item)}
                                        color="primary"
                                    />
                                }
                                label={item.label}
                            />
                        ))}
                    </FormGroup>}
            </Card>
    );
}
