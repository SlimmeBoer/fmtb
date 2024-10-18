
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

    <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
        <Stack direction="row" gap={2}
               sx={{
                   display: { xs: 'none', md: 'flex' },
                   width: '100%',
                   alignItems: { xs: 'flex-start', md: 'center' },
                   justifyContent: 'space-between',
                   maxWidth: { sm: '100%', md: '1700px' },
                   pt: 1.5, pb: 4,
               }}>
            <Stack direction="row" gap={2}>
                <LayersIcon/>
                <Typography component="h6" variant="h6">
                    ANLb-pakketten aan BBM-codes koppelen
                </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={toggleNewMode}>
                    Toevoegen
                </Button>
            </Stack>
        </Stack>
        {(loadingAnlb || loadingBBM)  && <CircularProgress/>}
        {!loadingAnlb && !loadingBBM  && !isObjectEmpty(bbmcodes) && !isObjectEmpty(anlbPackages) &&
            <Box>
                {addNew && <AnlbPackageForm key="new" bbmcodes={bbmcodes} onAddorDelete={updateParent}  onCancelNew={toggleNewMode} />}
                {anlbPackages.map((ap, index) => {
                    return (
                        <AnlbPackageForm key={index} bbmcodes={bbmcodes} anlbpackage={ap} index={index} onAddorDelete={updateParent} />
                    )
                })
                }
            </Box>
        }
    </Box>
    )

}
