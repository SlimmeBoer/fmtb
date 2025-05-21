import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import Card from "@mui/material/Card";
import CenteredLoading from "../../components/visuals/CenteredLoading.jsx";
import { Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import Stack from "@mui/material/Stack";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export default function Collectief_FAQ() {

    const [loading, setLoading] = useState(false);
    const [faqs, setFaqs] = useState([]);
    const {t} = useTranslation();

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/faq`)
            .then(({data}) => {
                setLoading(false);
                setFaqs(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    }, [])

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Stack direction="row" gap={2} sx={{mb: 2}}>
                <ContactSupportIcon/>
                <Typography component="h6" variant="h6">
                    {t("pages_collectief.faq")}
                </Typography>
            </Stack>
            {loading && <CenteredLoading/>}
            {!loading && faqs.length !== 0 && <Box sx={{mt: 4}}>
                {faqs.map((faq, index) => (
                    <Box key={index} sx={{mb: 4}}>
                        <Typography variant="h6">
                            {faq.question}
                        </Typography>
                        <Typography
                            dangerouslySetInnerHTML={{__html: faq.answer}}
                        />
                    </Box>
                ))}
            </Box>
                }
        </Box>
    )

}
