import React from "react";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import { Tooltip, Box } from "@mui/material";
import {useTranslation} from "react-i18next";

const CompanyOldDataIndicator = ({ oldData }) => {
    if (oldData) {
        return null;
    }

    const { t } = useTranslation();

    return (
        <Tooltip title={t("general.freshly_started")}>
            <Box
                component="span"
                sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    verticalAlign: "middle",
                    ml: 0.5, // kleine marge links
                }}
            >
                <NewReleasesOutlinedIcon
                    color="success"
                    sx={{ fontSize: 18 }} // kleiner dan standaard 24px
                />
            </Box>
        </Tooltip>
    );
};

export default CompanyOldDataIndicator;
