
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import CompanyDataGrid from "../../../components/data/CompanyDataGrid.jsx";
import {useTranslation} from "react-i18next";

export default function ManagementData() {

    const {t} = useTranslation();

    const fields = [
        { fieldname: 'opp_totaal', headerName: 'Opper-vlakte' },
        { fieldname: 'nkoe', headerName: 'Aantal Koeien' },
        { fieldname: 'jvper10mk', headerName: 'Jongvee /10 mk' },
        { fieldname: 'melkperha', headerName: 'kg melk / ha' },
        { fieldname: 'melk_bedr', headerName: 'kg melk totaal' },
        { fieldname: 'weidmk_dgn', headerName: 'beweiding uren / jaar' },
        { fieldname: 'dzhm_nbodem_over', headerName: 'stikstof (kg/ha)' },
        { fieldname: 'verl_bodbal2_ha', headerName: 'fosfaat (kg/ha)' },
        { fieldname: 'dzhm_nh3_landha', headerName: 'NH3 (kg/ha)' },
    ];

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                {t("pages_admin.management_data")}
            </Typography>
            <CompanyDataGrid fields={fields} />
        </Box>
    )

}
