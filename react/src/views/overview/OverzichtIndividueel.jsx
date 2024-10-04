import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import CompanyPicker from "../../components/forms/CompanyPicker.jsx";
import {useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import KPITable from "../../components/data/KPITable.jsx";
import Card from "@mui/material/Card";
import HighlightedCard from "../../components/visuals/HighlightedCard.jsx";
import CompanyInfoTable from "../../components/data/CompanyInfoTable.jsx";
import CompanyPropertyTable from "../../components/data/CompanyPropertyTable.jsx";

export default function OverzichtIndividueel() {

    const [companyNr, setCompanyNr] = useState('');

    const changeCompany = (e) => {
        setCompanyNr(e.target.value);
    };

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                Overzicht - Individueel
            </Typography>
            <CompanyPicker company={companyNr} changeHandler={changeCompany}/>
            {companyNr !== '' && <Box>
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                >
                    <Grid size={{xs: 12, lg: 4}}>
                        <CompanyInfoTable company={companyNr}/>
                        <CompanyPropertyTable company={companyNr}/>
                    </Grid>
                    <Grid  size={{xs: 12, lg: 8}}>
                        <KPITable company={companyNr} />
                    </Grid>
                </Grid>
            </Box>
            }
            {companyNr === '' && <Box>
                <Typography component="h2" variant="body2" sx={{mb: 2, mt: 2}}>
                    Kies een bedrijf met bovenstaande selectiebox.
                </Typography>
            </Box>
            }
        </Box>
    )

}
