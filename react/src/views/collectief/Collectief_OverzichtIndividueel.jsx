import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid2';
import CompanyPicker from "../../components/forms/CompanyPicker.jsx";
import {useEffect, useState} from "react";
import KPITable from "../../components/data/KPITable.jsx";
import CompanyInfoTable from "../../components/data/CompanyInfoTable.jsx";
import CompanyPropertyTable from "../../components/data/CompanyPropertyTable.jsx";
import {useParams} from "react-router-dom";
import CompanyMBP from "../../components/data/CompanyMBP.jsx";
import CompanySMA from "../../components/data/CompanySMA.jsx";
import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Stack from "@mui/material/Stack";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {useTranslation} from "react-i18next";
import CompanyPickerCollective from "../../components/forms/CompanyPickerCollective.jsx";

export default function Collectief_OverzichtIndividueel() {

    const {id: paramId} = useParams();
    const [id, setId] = useState(paramId || '');
    const [renderTable, setRenderTable] = useState(false);

    useEffect(() => {
        if (paramId !== id) {
            setId(paramId); // Sync state if URL param changes
        }

    }, [paramId]);
    const handleChange = (e) => {
        setId(e.target.value); // Change `id` state based on user input or actions
    };

    const rerenderTable = () => {
        // Toggle the state to trigger a re-render
        setRenderTable((prev) => !prev);
    };

    const exportPDF = () => {
        const input = document.getElementById("pdf-content");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();

            pdf.addImage(imgData, "PNG", 5, 5, 200, 200, '','FAST', 0);
            pdf.save("download.pdf");
        });
    };

    const {t} = useTranslation();

    return (

        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                {t("pages_collectief.overview_individual")}
            </Typography>
            <Stack direction="row" gap={2}
                   sx={{
                       display: {xs: 'none', md: 'flex'},
                       width: '100%',
                       alignItems: {xs: 'flex-start', md: 'center'},
                       justifyContent: 'space-between',
                       maxWidth: {sm: '100%'},
                       pt: 1.5, pb: 4,
                   }}>
                <CompanyPickerCollective company={id} changeHandler={handleChange}/>
                <IconButton variant="outlined" onClick={exportPDF}>
                    <PictureAsPdfIcon/>
                </IconButton>
            </Stack>
            {id !== '' && id !== undefined && <Box>
                <div id="pdf-content">
                    <Grid
                        container
                        spacing={2}
                        columns={12}
                        sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                    >
                        <Grid size={{xs: 12, lg: 4}} key="indiv-grid-1">
                            <CompanyInfoTable company={id}/>
                            <CompanyPropertyTable company={id}/>
                            <CompanyMBP company={id} notifyParent={rerenderTable}/>
                            <CompanySMA company={id} notifyParent={rerenderTable}/>
                        </Grid>
                        <Grid size={{xs: 12, lg: 8}} key="indiv-grid-2">
                            <KPITable company={id} key="kpitable" renderTable={renderTable}/>
                        </Grid>
                    </Grid>
                </div>
            </Box>
            }
            {id === undefined && <Box>
                <Typography component="h2" variant="body2" sx={{mb: 2, mt: 2}}>
                    Kies een bedrijf met bovenstaande selectiebox.
                </Typography>
            </Box>
            }
        </Box>
    )

}
