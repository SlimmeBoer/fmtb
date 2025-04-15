import React, {useEffect, useState} from "react";
import DumpGroupAccordion from "./DumpGroupAccordion.jsx";

const MatrixData = ({companies, openId}) => {

    const [openDumps, setOpenDumps] = useState({}); // { [groupId]: [dumpId1, dumpId2] }

    useEffect(() => {
        if (!openId) return;

        const targetId = Number(openId);

        const company = companies.find(c =>
            c.klw_dumps.some(d => d.id === targetId)
        );

        if (company) {
            setOpenDumps(prev => ({
                ...prev,
                [company.id]: [...(prev[company.id] || []), targetId],
            }));
        }
    }, [openId, companies]);

    const toggleDump = (groupId, dumpId, isOpen) => {
        setOpenDumps(prev => {
            const current = prev[groupId] || [];

            return {
                ...prev,
                [groupId]: isOpen
                    ? [...current, dumpId]
                    : current.filter(id => id !== dumpId),
            };
        });
    };


    return (
        <React.Fragment>
                {companies.map((company) => (
                    <DumpGroupAccordion
                        key={company.id}
                        company={company}
                        openDumps={openDumps[company.id] || []}
                        toggleDump={toggleDump}
                    />
                ))}
        </React.Fragment>
    );
};

export default MatrixData;
