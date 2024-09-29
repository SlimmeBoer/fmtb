import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import CompanyPicker from "../../components/forms/CompanyPicker.jsx";
import {useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import KPIYear from "../../components/data/KPIYear.jsx";

export default function OverzichtIndividueel() {

    const [companyNr, setCompanyNr] = useState('');

    const changeCompany = (e) => {
        setCompanyNr(e.target.value);
    };

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            {/* cards */}
            <Typography component="h2" variant="h4" sx={{mb: 2}}>
                Overzicht - Individueel
            </Typography>
            <CompanyPicker company={companyNr} changeHandler={changeCompany}/>
            <Typography sx={{mt: 5}} variant="h5">Bla - {companyNr}</Typography>
            <TableContainer >
                <Table sx={{minWidth: 650, mt: 5}} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell>KPI</TableCell>
                            <TableCell sx={{width: 125}} align="center">2021</TableCell>
                            <TableCell sx={{width: 125}} align="center">2022</TableCell>
                            <TableCell sx={{width: 125}} align="center">2023</TableCell>
                            <TableCell sx={{width: 125}} align="center">Gemiddelde</TableCell>
                            <TableCell sx={{width: 125}} align="center">Punten</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <KPIYear kpi="UMDL1a" company={companyNr} />
                        <KPIYear kpi="UMDL1b" company={companyNr} />
                        <KPIYear kpi="UMDL2" company={companyNr} />
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}
