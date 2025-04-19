import React, {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useTranslation} from 'react-i18next';
import {showFullName} from "../../helpers/FullName.js";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CenteredLoading from "../../components/visuals/CenteredLoading.jsx";
import Grid from "@mui/material/Grid2";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import {TextareaAutosize} from "@mui/material";

export default function Collectief_Deelnemerslijst() {

    const [deelnemers, setDeelnemers] = useState([]);
    const [emails, setEmails] = useState('');
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        getDeelnemers();
    }, [])

    const getDeelnemers = () => {
        setLoading(true);
        axiosClient.get('/user/getusersincurrentcollective')
            .then(({data}) => {
                setLoading(false);
                setDeelnemers(data)
                const users = data;
                const emailString = users.map(user => user.email).join('; ');
                setEmails(emailString);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
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
                    <ContactMailIcon sx={{mt: 0.7}}/>
                    <Typography component="h6" variant="h6">
                        {t("pages_collectief.deelnemerslijst")}
                    </Typography>
                </Stack>
            </Stack>
            {loading && <CenteredLoading/>}
            {!loading &&
                <Grid
                    container
                    spacing={2}
                    columns={12}
                    sx={{mt: 4}}
                >
                    {/* Gebruikers + mail */}
                    <Grid size={{xs: 12, md: 6, lg: 6}}>
                        <Box sx={{width: '700px', height: '80px'}}>
                            <Typography variant="body2">
                                {t("deelnemerslijst.explanation_1")}
                            </Typography>
                        </Box>
                        <TableContainer >
                            <Table aria-label="simple table" size="small" >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t('deelnemerslijst.header_full_name')}</TableCell>
                                        <TableCell>{t('deelnemerslijst.header_email')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {deelnemers.map((d,index) => (
                                        <TableRow
                                            key={index}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell width="50%">{showFullName(d.first_name,d.middle_name,d.last_name)}</TableCell>
                                            <TableCell width="50%">{d.email}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    {/* Alle mailadressen */}
                    <Grid size={{xs: 12, md: 6, lg: 6}}>
                        <Box sx={{width: '700px', height: '80px'}}>
                            <Typography variant="body2">
                                {t("deelnemerslijst.explanation_2")}
                            </Typography>
                        </Box>
                        <TextareaAutosize
                            minRows={20}
                            value={emails}
                            style={{
                                width: '100%',
                                fontSize: '1rem',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </Grid>
                </Grid>
            }
        </Box>
    )
}
