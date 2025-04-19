import React, {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import axiosClient from "../../axios_client.js";
import {useTranslation} from "react-i18next";
import {Tooltip} from "@mui/material";

const DownloadManual = () => {

    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/user/getcurrentrole`)
            .then(({data}) => {
                setLoading(false);
                setRole(data);
            })
            .catch(() => {
                setLoading(false);
            })
    }, [])

    const handleDownload = () => {
        let fileName = "handleiding_" + role + ".pdf";
        const link = document.createElement("a");
        link.href = `/${fileName}`;
        link.download = fileName;
        link.click();
    };

    return (
        <React.Fragment>
            {!loading &&
                <Tooltip title={t("tooltips.download_manual")}>
                    <IconButton size="small" onClick={handleDownload} aria-label="Download handleiding">
                        <AutoStoriesIcon/>
                    </IconButton>
                </Tooltip>}

        </React.Fragment>
    );
};

export default DownloadManual;
