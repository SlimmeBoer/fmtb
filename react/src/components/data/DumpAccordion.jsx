import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";

const DumpAccordion = ({ dump, isOpen, toggleDump }) => {

    const handleChange = (_, expanded) => {
        toggleDump(expanded);
    };

    return (
        <Accordion expanded={isOpen} onChange={handleChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <strong>Dump: {dump.filename}</strong>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Itemnr.</TableCell>
                                <TableCell>Signaalnr.</TableCell>
                                <TableCell>Signaalcode</TableCell>
                                <TableCell>Categorie</TableCell>
                                <TableCell>Onderwerp</TableCell>
                                <TableCell>Soort</TableCell>
                                <TableCell>Kengetal</TableCell>
                                <TableCell>Waarde</TableCell>
                                <TableCell>Kenmerk</TableCell>
                                <TableCell>Actie</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dump.signals.map((signal) => (
                                <TableRow key={signal.id}>
                                    <TableCell>{signal.id}</TableCell>
                                    <TableCell>{signal.item_nummer}</TableCell>
                                    <TableCell>{signal.signaal_nummer}</TableCell>
                                    <TableCell>{signal.signaal_code}</TableCell>
                                    <TableCell>{signal.categorie}</TableCell>
                                    <TableCell>{signal.onderwerp}</TableCell>
                                    <TableCell>{signal.soort}</TableCell>
                                    <TableCell>{signal.kengetal}</TableCell>
                                    <TableCell>{signal.waarde}</TableCell>
                                    <TableCell>{signal.kenmerk}</TableCell>
                                    <TableCell>{signal.actie}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};

export default DumpAccordion;
