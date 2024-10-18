import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    TextField, FormGroup
} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Select, {selectClasses} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import AgricultureIcon from "@mui/icons-material/Agriculture.js";
import {IndiaFlag} from "../../internals/components/CustomIcons.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CompanyPropertyTable(props) {
    const [properties, setProperties] = useState({});
    const [company, setCompany] = useState({});
    const [mbp, setMbp] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProperties();
    }, [props.company])

    const getProperties = () => {
        if (props.company !== '') {
            setLoading(true);
            axiosClient.get(`/companies/getproperties/${props.company}`)
                .then(({data}) => {
                    setLoading(false);
                    setCompany(data);
                    setProperties(makeProperties(data));
                    setMbp(makeMbp(data));
                })
                .catch(() => {
                    setLoading(false);
                })
        }
    }

    const makeProperties = (data) => [
        { title: "Hectares totaal:", value: parseFloat(data.opp_totaal).toFixed(1), },
        { title: "Melkkoeien:", value: data.melkkoeien, },
        { title: "Meetmelk per koe:", value: data.meetmelk_per_koe, },
        { title: "Meetmelk per hectare:", value: parseFloat(data.meetmelk_per_ha).toFixed(0), },
        { title: "Jongvee per 10 mk:", value: data.jongvee_per_10mk, },
        { title: "GVE bezetting per hectare:", value: parseFloat(data.gve_per_ha).toFixed(2), },
        { title: "Kg N kunstmest per hectare:", value: data.kunstmest_per_ha, },
        { title: "Opbrengst grasland per hectare:", value: data.opbrengst_grasland_per_ha, },
        { title: "Re/KVEM:", value: data.re_kvem, },
        { title: "Kg krachtvoer per 100 kg melk:", value: data.krachtvoer_per_100kg_melk, },
        { title: "Veebenutting N:", value: data.veebenutting_n + "%", },
        { title: "Bodembenutting N:", value: data.bodembenutting_n + "%", },
        { title: "Bedrijfsbenutting N:", value: data.bedrijfsbenutting_n + "%", },
    ];
    const makeMbp = (data) => [
        { title: "Website", value: data.website, },
        { title: "Ontvangstruimte", value: data.ontvangstruimte, },
        { title: "Winkel", value: data.winkel, },
        { title: "Educatie", value: data.educatie, },
        { title: "Meerjarige monitoring", value: data.meerjarige_monitoring, },
        { title: "Open dagen", value: data.open_dagen, },
        { title: "Wandelpad", value: data.wandelpad, },
        { title: "Erkend demobedrijf", value: data.erkend_demobedrijf, },
        { title: "Bed & Breakfast", value: data.bed_and_breakfast, },
    ];

    const menuItems = [
        { value: 0, title: "Onbekend", },
        { value: 1, title: "Volvelds gewasbeschermingsmiddelen",},
        { value: 2, title: "Ingevulde MBP",},
        { value: 3, title: "Ingevulde Milieumaatlat",},
        { value: 4, title: "Pleksgewijs grasland, volvelds maisland",},
        { value: 5, title: "Pleksgewijs hele bedrijf",},
        { value: 6, title: "On the way to Planet Proof / AH programma",},
        { value: 7, title: "Beterlevnen Keurmerk",},
        { value: 8, title: "Biologisch",},
        { value: 9, title: "Geen middelen",},
    ];

    return (
        <Box>
            <Card variant="outlined"  sx={{mt: 2}}>
                <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}} >
                    <AssessmentOutlinedIcon/>
                    <Typography component="h6" variant="h6" >
                        Managementinformatie
                    </Typography>
                </Stack>
                <TableContainer sx={{minHeight: 100}}>
                    {loading && <CircularProgress/>}
                    {!loading && company.id != null &&
                        <Table sx={{maxWidth: 1000, mt: 2}} size="small" aria-label="simple table">
                            <TableBody>
                                {properties.map((p, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell sx={{width: 100}}>{p.title}</TableCell>
                                            <TableCell sx={{width: 100, fontWeight: 'bold'}}>{p.value}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>}
                </TableContainer>
            </Card>
            <Card  variant="outlined" sx={{mt: 2}}>
                <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}} >
                    <SpaOutlinedIcon/>
                    <Typography component="h6" variant="h6" >
                        Gewasbeschermingsmiddelen
                    </Typography>
                </Stack>
                {loading && <CircularProgress/>}
                {!loading && company.id != null &&
                    <TextField select
                        value={company.mbp}
                        onChange={(e) => props.changeHandler(e)}
                        fullWidth
                    >
                        {menuItems.map(mi => {
                            return (
                                <MenuItem value={mi.value} key={mi.value}>
                                    <ListItemText primary={mi.title} />
                                </MenuItem>
                            )
                        })}
                    </TextField>}
            </Card>
            <Card variant="outlined"  sx={{mt: 2}}>
                <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}} >
                    <Diversity3OutlinedIcon/>
                    <Typography component="h6" variant="h6" >
                        Sociaal-maatschappelijke activiteiten
                    </Typography>
                </Stack>
                {loading && <CircularProgress/>}
                {!loading && company.id != null &&
                <FormGroup>
                    {mbp.map((m, index) => {
                        return (
                            <FormControlLabel key={index} control={<Checkbox checked={!!m.value} />} label={m.title} />
                        )
                    })}
                </FormGroup>}
            </Card>
        </Box>
    );
}
