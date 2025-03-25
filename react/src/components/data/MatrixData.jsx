import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MatrixData = ({ companies }) => {
    return (
        <div>
            {companies.map((company) => (
                <Accordion key={company.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <strong>{company.name}</strong>
                    </AccordionSummary>
                    <AccordionDetails>
                        {company.klw_dumps.map((dump) => (
                            <Accordion key={dump.id}>
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
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default MatrixData;
