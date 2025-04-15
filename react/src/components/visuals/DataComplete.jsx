import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from "@mui/material/Box";
import {Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";

const DataComplete = (props) => {
    const {t} = useTranslation();

    return (
        <Box display="flex" justifyContent="center" width="100%">
            {props.complete == 1 &&
                <Tooltip title={t("klw_overview.complete_explanation")}>
                <CheckCircleIcon sx={{ color: 'green' }} />
                </Tooltip>}
        </Box>
    );
};

export default DataComplete;
