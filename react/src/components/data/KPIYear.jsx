import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import CardContent from "@mui/material/CardContent";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded.js";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import {TableCell, TableRow} from "@mui/material";

export default function KPIYear(props) {
    const [kpi, setKPI] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getKPI();
    }, [props.company])

    const getKPI = () => {
        setLoading(true);
        axiosClient.get(`/klwfield/getkpi/kpi/${props.kpi}/company/${props.company}/`)
            .then(({data}) => {
                setLoading(false);
                setKPI(data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <TableRow
            key={1}
        >
            <TableCell component="th" scope="row">
                {kpi.text}
            </TableCell>
            <TableCell align="center">
                <Card variant="outlined" >
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight: 600}}>
                        {kpi.value2021}
                    </Typography>
                </CardContent>
            </Card>
            </TableCell>
            <TableCell align="center">
                <Card variant="outlined" >
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight: 600}}>
                        {kpi.value2022}
                    </Typography>
                </CardContent>
            </Card>
            </TableCell>
            <TableCell align="center">
                <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight: 600}}>
                        {kpi.value2023}
                    </Typography>
                </CardContent>
            </Card>
            </TableCell>
            <TableCell align="center">
                <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight: 600}}>
                        {kpi.avg}
                    </Typography>
                </CardContent>
            </Card>
            </TableCell>
            <TableCell align="center">
                <Card variant="outlined"    >
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight: 600}}>
                        {kpi.score}
                    </Typography>
                </CardContent>
            </Card>
            </TableCell>
        </TableRow>
    )
        ;
}
