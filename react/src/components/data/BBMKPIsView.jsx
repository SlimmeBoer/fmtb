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
    Dialog
} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import {isObjectEmpty} from "../../helpers/EmptyObject.js";
import LayersIcon from '@mui/icons-material/Layers';
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import BBMCodeForm from "../forms/BBMCodeForm.jsx";

export default function BBMKPIsView(props) {
    const [bbmcodes, setBbmcodes] = useState({});
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    const [codeid, setCodeId] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getBbmcodes();
    }, [])

    const getBbmcodes = () => {
        setLoading(true);
        axiosClient.get(`/bbm/getcodes`)
            .then(({data}) => {
                setLoading(false);
                setBbmcodes(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    const handleClickOpen = (bbmcode_id) => {
        setCodeId(bbmcode_id);
        setOpen(true);
    };

    const closeHandler = () => {
        setOpen(false)
        getBbmcodes();
    };

    const onDelete = (c) => {
        if (!window.confirm("Weet je zeker dat je deze code wil verwijderen?")) {
            return
        }

        axiosClient.delete(`/bbmcodes/${c.id}`)
            .then(() => {
                setNotification("Verwijderen succesvol")
                getBbmcodes()
            })
    }

    return (
        <Box>
            <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                <LayersIcon/>
                <Typography component="h6" variant="h6">
                    BBM-codes (voor importeren ScanGIS-pakketten)
                </Typography>
            </Stack>
            <TableContainer sx={{minHeight: 100,}}>
                {loading && <CircularProgress/>}
                {!loading && !isObjectEmpty(bbmcodes) &&
                    <Table sx={{maxWidth: 1000, mt: 2}} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow key="bbmcode-header">
                                <TableCell sx={{width: 75}}>BBM-code: </TableCell>
                                <TableCell sx={{width: 300}}>Omschrijving: </TableCell>
                                <TableCell sx={{width: 75}}>Gewicht:</TableCell>
                                <TableCell sx={{width: 75}}>Eenheid:</TableCell>
                                <TableCell sx={{width: 75}}>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bbmcodes.map((b, index) => {
                                return (
                                    <TableRow key={"bbmcode-" + index} sx={{margin: 0}}>
                                        <TableCell component="th" scope="row">
                                            {b.code}
                                        </TableCell>
                                        <TableCell>
                                            {b.description}
                                        </TableCell>
                                        <TableCell>
                                            {b.weight}
                                        </TableCell>
                                        <TableCell>
                                            {b.unit}
                                        </TableCell>
                                        <TableCell>

                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                }
            </TableContainer>
            <Dialog open={open}
                    PaperProps={{
                        style: {
                            minHeight: '600px',
                            minWidth: '500px',
                        }
                    }}>
                <BBMCodeForm id={codeid} onClose={closeHandler}/>
            </Dialog>
        </Box>
    )
        ;
}
