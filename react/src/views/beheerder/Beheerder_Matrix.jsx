import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import ConfrontationMatrixCollective from "../../components/data/ConfrontationMatrixCollective.jsx";
import ConfrontationMatrix from "../../components/data/ConfrontationMatrix.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReportIcon from "@mui/icons-material/Report";
import Stack from "@mui/material/Stack";

export default function Beheerder_Matrix() {
    const {id: paramId} = useParams();
    const [id, setId] = useState(paramId || '');

    useEffect(() => {
        if (paramId !== id) {
            setId(paramId); // Sync state if URL param changes
        }
    }, [paramId]);

    const {t} = useTranslation();

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Stack direction="row" gap={2}>
                <ReportIcon/>
                <Typography component="h6" variant="h6">
                    {t("pages_collectief.matrix")}
                </Typography>
            </Stack>
            <ConfrontationMatrix opendump={id}/>
        </Box>
    )

}
