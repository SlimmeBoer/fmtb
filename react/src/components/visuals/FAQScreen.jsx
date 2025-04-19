import * as React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {Dialog, DialogContent, Tooltip} from "@mui/material";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import axiosClient from "../../axios_client.js";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export default function FAQScreen() {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
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
    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            {!loading && <React.Fragment>
                <Tooltip title={t("tooltips.faq")}>
                    <IconButton
                        onClick={toggleOpen}
                        size="small"
                    >
                        <ContactSupportIcon/>
                    </IconButton>
                </Tooltip>
                <Dialog open={open} maxWidth="md" fullWidth={true} >
                    <DialogContent>
                        <Grid
                            container
                            spacing={2}
                            columns={12}
                            sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                        >
                            <Grid size={{xs: 11, lg: 11}}>
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
                            </Grid>
                            <Grid size={{xs: 1, lg: 1}}>
                                <IconButton
                                    onClick={toggleOpen}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </React.Fragment>}
        </React.Fragment>
    );
}
