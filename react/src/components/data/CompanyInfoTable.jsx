import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function CompanyInfoTable(props) {
    const [company, setCompany] = useState({});
    const [properties, setProperties] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCompany();
    }, [props.company])

    const getCompany = () => {
        if (props.company !== '') {
            setLoading(true);
            axiosClient.get(`/companies/getcompany/${props.company}/`)
                .then(({data}) => {
                    setLoading(false);
                    setCompany(data);
                    setProperties(makeProperties(data));
                })
                .catch(() => {
                    setLoading(false);
                })
        }
    }

    const makeProperties = (data) => [
        { title: "Bedrijfsnaam:", value: data.name, },
        { title: "Adres:", value: data.address, },
        { title: "Postcode / Woonplaats:", value: data.postal_code + ', ' +data.city + ' (' + data.province + ')', },
        { title: "Telefoon:", value: data.phone, },
        { title: "E-mailadres:", value: data.email, },
        { title: "KVK-nummer(s):", value: data.kvks, },
        { title: "UBN-nummer:", value: data.ubn, },
        { title: "BRS-nummer:", value: data.brs, },
        { title: "Bankrekeningnr.:", value: data.bank_account, },
        { title: "Bankrekening naam.:", value: data.bank_account_name, },
    ];
    return (
        <Card>
            <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}} >
                <InfoOutlinedIcon/>
                <Typography component="h6" variant="h6" >
                    Algemene Bedrijfsinformatie
                </Typography>
            </Stack>
            <TableContainer sx={{minHeight: 100}}>
                {loading && <CircularProgress/>}
                {!loading && company.id != null &&
                    <Table sx={{maxWidth: 1000, mt: 2}} size="small" aria-label="simple table">
                        <TableBody>
                            {properties.map((p,index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell sx={{width: 100}}>{p.title}</TableCell>
                                        <TableCell sx={{width: 100, fontWeight: 'bold'}}>{p.value}</TableCell>
                                    </TableRow>
                                )
                            })}
                            <TableRow key={101}>
                                <TableCell sx={{width: 100}}>&nbsp;</TableCell>
                                <TableCell sx={{width: 100, fontWeight: 'bold'}}>&nbsp;</TableCell>
                            </TableRow>
                            <TableRow key={102}>
                                <TableCell sx={{width: 100}}>Onderdeel van collectief:</TableCell>
                                <TableCell sx={{width: 100, fontWeight: 'bold'}}>{company.collectieven}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>}
            </TableContainer>
        </Card>

    )
        ;
}
