import React, {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axiosClient from "../../axios_client.js";

const DownloadManual = () => {

    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/user/getcurrentrole`)
            .then(({data}) => {
                setLoading(false);
                setRole(data);
                consolge
            })
            .catch(() => {
                setLoading(false);
            })
    }, [])

    const handleDownload = () => {
        let fileName = "handleiding_" + role +".pdf";
        const link = document.createElement("a");
        link.href = `/${fileName}`;
        link.download = fileName;
        link.click();
    };

    return (
        <React.Fragment>
            {!loading &&
                <IconButton size="small" onClick={handleDownload} aria-label="Download handleiding">
                    <HelpOutlineIcon/>
                </IconButton>}
        </React.Fragment>
    );
};

export default DownloadManual;
