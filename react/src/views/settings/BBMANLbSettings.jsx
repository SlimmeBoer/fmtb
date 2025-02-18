import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import Stack from "@mui/material/Stack";
import LayersIcon from "@mui/icons-material/Layers";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {CircularProgress} from "@mui/material";
import {isObjectEmpty} from "../../helpers/EmptyObject.js";
import AnlbPackageForm from "../../components/forms/AnlbPackageForm.jsx";
import Card from "@mui/material/Card";
import InfoIcon from "@mui/icons-material/Info";
import Grid from "@mui/material/Grid2";

export default function BBMANLbSettings() {

    const [bbmcodes, setBbmcodes] = useState({});
    const [anlbPackages, setAnlbPackages] = useState({});
    const [loadingBBM, setLoadingBBM] = useState(false);
    const [loadingAnlb, setLoadingAnlb] = useState(false);
    const [addNew, setAddNew] = useState(false);

    useEffect(() => {
        getBbmcodes();
        getAnlbPackages();
    }, [])

    const getBbmcodes = () => {
        setLoadingBBM(true);
        axiosClient.get(`/bbm/getcodes`)
            .then(({data}) => {
                setLoadingBBM(false);
                setBbmcodes(data.data);
            })
            .catch(() => {
                setLoadingBBM(false);
            })
    }

    const getAnlbPackages = () => {
        setLoadingAnlb(true);
        axiosClient.get(`/bbmanlbpackages`)
            .then(({data}) => {
                setLoadingAnlb(false);
                setAnlbPackages(data.data);
            })
            .catch(() => {
                setLoadingAnlb(false);
            })
    }

    const toggleNewMode = () => {
        setAddNew(!addNew);
    };

    const updateParent = () => {
        getBbmcodes();
        getAnlbPackages();
    };

    return (
        <Grid
            container
            spacing={2}
            columns={12}
            sx={{mb: (theme) => theme.spacing(2)}}
        >
            <Grid container={"settings-anlb-left"} size={{xs: 12, sm: 8, lg: 8}}>
                <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
                    <Stack direction="row" gap={2}
                           sx={{
                               display: {xs: 'none', md: 'flex'},
                               width: '100%',
                               alignItems: {xs: 'flex-start', md: 'center'},
                               justifyContent: 'space-between',
                               maxWidth: {sm: '100%', md: '1700px'},
                               pt: 1.5, pb: 4,
                           }}>
                        <Stack direction="row" gap={2}>
                            <LayersIcon/>
                            <Typography component="h6" variant="h6">
                                ANLb-pakketten aan BBM-codes koppelen
                            </Typography>
                        </Stack>
                        <Stack direction="row" gap={2}>
                            <Button variant="outlined" startIcon={<AddIcon/>} onClick={toggleNewMode}>
                                Toevoegen
                            </Button>
                        </Stack>
                    </Stack>
                    {(loadingAnlb || loadingBBM) && <CircularProgress/>}
                    {!loadingAnlb && !loadingBBM && !isObjectEmpty(bbmcodes) && !isObjectEmpty(anlbPackages) &&
                        <Box>
                            {addNew && <AnlbPackageForm key="new" bbmcodes={bbmcodes} onAddorDelete={updateParent}
                                                        onCancelNew={toggleNewMode}/>}
                            {anlbPackages.map((ap, index) => {
                                return (
                                    <AnlbPackageForm key={index} bbmcodes={bbmcodes} anlbpackage={ap} index={index}
                                                     onAddorDelete={updateParent}/>
                                )
                            })
                            }
                        </Box>
                    }
                </Box>
            </Grid>
            <Grid container={"settings-anlb-right"} size={{xs: 12, sm: 4, lg: 4}}>
                <Card variant="outlined">
                    <Box sx={{minWidth: '100%'}}>
                        <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                            <InfoIcon/>
                            <Typography variant="h6">
                                Instructies
                            </Typography>
                        </Stack>
                        <Typography sx={{mt: 2}} variant="body1">
                            Via deze pagina is het mogelijk om ANLB-pakket in te stellen die bij het importeren van
                            ScanGIS-gegevens automatisch gekoppeld worden aan een BBM-code. Door het koppelen wordt de
                            waarde van het pakket (in ofwel oppervlakte, lengte, breedte of stuks) opgeteld aan de totale
                            waarde van het BBM-pakket voor een bedrijf. Op de pagina "BBM aan KPI's" wordt ingesteld
                            aan welke KPI's een BBM-code worden toegekend.<br /><br />

                            Een ANLb-pakket bestaat uit een combinatie van 4 karakters, beginnend met een
                            hoofdletter, gevolgd door twee cijfers en eindigend met een kleine letter. De combinatie van
                            de cijfers plus het laatste karakter bepaalt aan welke BBM-code het pakket wordt toegekend,
                            zie ook de regels in het overzicht. Als het overzicht een regel bevat met "01" en "abc" en BBM-code "BBM101",
                            dan betekent dat dat bijv. een pakket met codering "R01a" aan code BBM101 wordt toegekend.
                            Hetzelfde geldt voor pakketten met codering "X01b", "A01c" etc.<br /><br />

                            Gebruik de "Toevoegen"-knop om extra regels aan het pakket toe te voegen en of kies de pen-knop
                            om een bestaande toekenning aan te passen, of de prullenbak-knop om een regel weg te gooien.<br/><br/>

                            LET OP: Aanpassen van deze lijst heeft gevolgen voor de bestaande scores op KPI's 10, 11 en 12
                            van alle bedrijven die al eerder in het systeem ingevoerd zijn. Kies na het wijzigen van
                            data in dit scherm voor "Opnieuw doorrekenen" om bestaande bedrijven te updaten met de nieuwe
                            scores.
                        </Typography>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    )

}
