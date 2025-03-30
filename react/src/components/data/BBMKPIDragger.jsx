import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import {isObjectEmpty} from "../../helpers/EmptyObject.js";
import {useTranslation} from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";

const BBMKPIDragger = ({kpi, title}) => {

    const [selected, setSelected] = useState({});
    const [notselected, setNotSelected] = useState({});
    const [loadingSelected, setLoadingSelected] = useState(true);
    const [LoadingNotSelected, setLoadingNotSelected] = useState(true);

    const {t} = useTranslation();

    useEffect(() => {
        if (kpi !== null) {
            getSelected(kpi);
            getNotSelected(kpi);
        }
    }, []);

    const getSelected = (kpi) => {
        setLoadingSelected(true);
        axiosClient.get(`/bbmkpi/getselected/${kpi}`)
            .then(({data}) => {
                setSelected(data);
                setLoadingSelected(false);
            })
            .catch(() => {
                setLoadingSelected(false);
            })
    }
    const getNotSelected = (kpi) => {
        setLoadingNotSelected(true);
        axiosClient.get(`/bbmkpi/getnotselected/${kpi}`)
            .then(({data}) => {
                setNotSelected(data);
                setLoadingNotSelected(false);
            })
            .catch(() => {
                setLoadingNotSelected(false);
            })
    }

    const unSelect = (s) => {
        axiosClient.delete(`/bbmkpi/${s.id}`)
            .then(() => {
                getSelected(kpi);
                getNotSelected(kpi);
            })
    };

    const Select = (s) => {
        axiosClient.post(`/bbmkpi/${s.kpi}/${s.bbm_code}`)
            .then(response => {
                getSelected(kpi);
                getNotSelected(kpi);
            })
    };

    return (
        <Box>
            <Stack direction="row" gap={2}
                   sx={{
                       pt: 1.5, pb: 2,
                   }}>
                <Typography variant="body2">
                    {title}
                </Typography>
            </Stack>
            <Stack direction="row" gap={2}
                   sx={{
                       pt: 1.5, pb: 2,
                   }}>
                <Card variant="outlined"  sx={{width: '50%' }}>
                    <Typography variant="body2">
                        {t("bbm_kpi_dragger.in_kpi")}
                    </Typography>
                    {loadingSelected && <CenteredLoading />}
                    {!loadingSelected && !isObjectEmpty(selected) && <Box>
                        {selected.map((s, index) => {
                            return (
                                <Chip
                                    key={"selected-"+kpi+"-"+index}
                                    label={s.bbm_code}
                                    onClick={() => unSelect(s)}
                                    deleteIcon={<DeleteIcon/>}
                                />
                            )
                        })}
                    </Box>}
                </Card>
                <Card variant="outlined" sx={{width: '50%' }}>
                    <Typography variant="body2">
                        {t("bbm_kpi_dragger.not_in_kpi")}
                    </Typography>

                    {LoadingNotSelected && <CenteredLoading />}
                    {!LoadingNotSelected && !isObjectEmpty(notselected) && <Box>
                        {notselected.map((ns, index) => {
                            return (
                                <Chip
                                    key={"notselected-"+kpi+"-"+index}
                                    label={ns.bbm_code}
                                    onClick={() => Select(ns)}
                                    deleteIcon={<AddIcon/>}
                                />
                            )
                        })}
                    </Box>}
                </Card>
            </Stack>

        </Box>
    )
        ;
}

export default BBMKPIDragger;
