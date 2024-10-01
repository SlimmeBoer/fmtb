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
        axiosClient.get(`/klwfield/getscores/${props.company}/`)
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
                TEXT
            </TableCell>
            <TableCell align="center">
                <Card variant="outlined" >
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight: 600}}>
                        A
                    </Typography>
                </CardContent>
            </Card>
            </TableCell>
            <TableCell align="center">
                <Card variant="outlined" >
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight: 600}}>
                        B
                    </Typography>
                </CardContent>
            </Card>
            </TableCell>
            <TableCell align="center">
                <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight: 600}}>
                        C
                    </Typography>
                </CardContent>
            </Card>
            </TableCell>
            <TableCell align="center">
                <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight: 600}}>
                        D
                    </Typography>
                </CardContent>
            </Card>
            </TableCell>
            <TableCell align="center">
                <Card variant="outlined"    >
                <CardContent>
                    <Typography gutterBottom sx={{fontWeight: 600}}>
                        E
                    </Typography>
                </CardContent>
            </Card>
            </TableCell>
        </TableRow>
    )
        ;
}
