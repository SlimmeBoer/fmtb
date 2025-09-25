import React, {useEffect, useState} from "react";
import {Box, Paper, Container, useMediaQuery, Button} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import UserBar from "../../components/structure/bedrijf/UserBar.jsx";
import Grid from "@mui/material/Grid2";
import {useTranslation} from "react-i18next";
import axiosClient from "../../axios_client.js";
import CenteredLoading from "../../components/visuals/CenteredLoading.jsx";
import KPITable from "../../components/data/KPITable.jsx";
import BedrijfAanleveren from "../../components/data/BedrijfAanleveren.jsx";
import BedrijfCompleet from "../../components/data/BedrijfCompleet.jsx";
import BedrijfScores from "../../components/data/BedrijfScores.jsx";

const Bedrijf_Dashboard = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [datacomplete, setDataComplete] = useState(false);
    const [scorespublished, setScoresPublished] = useState(false);
    const [company, setCompany] = useState(0);

    const {t} = useTranslation();

    useEffect(() => {
        getCompletePublished();
    }, []);

    const getCompletePublished = (kpi) => {
        setLoading(true);
        axiosClient.get(`/companies/publishedcompleted`)
            .then(({data}) => {
                setDataComplete(data.data_completed);
                setScoresPublished(data.scores_published);
                setCompany(data.company);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                pt: "3pt",
            }}
        >
            {/* Background Image with Blur Effect */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url(/images/backdrop.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    filter: "blur(8px)", // Blurs the background image
                    transform: "scale(1.0)", // Prevents edge artifacts from the blur
                }}
            />

            {/* Content Box */}
            <Container maxWidth={isSmallScreen ? false : "lg"} sx={{position: "relative", zIndex: 1}}>
                <Paper
                    elevation={16}
                    sx={{
                        p: 3,
                        mt: 3,
                        width: "100%",
                        minHeight: "calc(100vh - 30pt)", // Fill full height
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <UserBar/>
                    <Grid container component="main"
                          sx={{borderTop: 1, borderTopColor: '#aaa', minHeight: '100vh', pt: 3}}>
                        <Grid
                            size={{xs: 3, sm: 3, md: 3}}
                        >
                            <Box
                                component="img"
                                sx={{
                                    ml: 6,
                                    mt: 6,
                                    width: 180,
                                }}
                                alt="FMTB Logo"
                                src="/images/logo.png"
                            />
                        </Grid>
                        <Grid size={{xs: 8, sm: 8, md: 8}}>
                            {loading ? <CenteredLoading /> : null}
                            {!loading && scorespublished ? <BedrijfScores /> : null}
                            {!loading && !scorespublished && !datacomplete ? <BedrijfAanleveren /> : null}
                            {!loading && !scorespublished && datacomplete ? <BedrijfCompleet /> : null}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default Bedrijf_Dashboard;
