import DumpAccordion from "./DumpAccordion.jsx";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, {useEffect, useState} from "react";

const DumpGroupAccordion = ({ company, openDumps, toggleDump }) => {

    const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
    const isChildOpen = openDumps.length > 0;
    const isExpanded = isManuallyExpanded || isChildOpen;

    const handleGroupChange = (_, expanded) => {
        setIsManuallyExpanded(expanded);
    };

    // 🔒 Lock expansion if child was opened by param and user hasn’t collapsed manually yet
    useEffect(() => {
        if (isChildOpen && !isManuallyExpanded) {
            setIsManuallyExpanded(true);
        }
    }, [isChildOpen]);

    return (
        <Accordion expanded={isExpanded} onChange={handleGroupChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <strong>{company.name}</strong>
            </AccordionSummary>
            <AccordionDetails>
                {company.klw_dumps.map((dump) => (
                    <DumpAccordion
                        key={dump.id}
                        dump={dump}
                        isOpen={openDumps.includes(dump.id)}
                        toggleDump={(isOpen) => toggleDump(company.id, dump.id, isOpen)}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    );
};
export default DumpGroupAccordion;
