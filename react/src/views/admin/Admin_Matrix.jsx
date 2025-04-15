
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import GisOverview from "../../components/data/GisOverview.jsx";
import {useTranslation} from "react-i18next";
import ConfrontationMatrix from "../../components/data/ConfrontationMatrix.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Admin_Matrix() {
    const {id: paramId} = useParams();
    const [id, setId] = useState(paramId || '');

    useEffect(() => {
        if (paramId !== id) {
            setId(paramId); // Sync state if URL param changes
        }
    }, [paramId]);

    const {t} = useTranslation();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                {t("pages_admin.matrix")}
            </Typography>
            <ConfrontationMatrix opendump={id} />
        </Box>
    )

}
