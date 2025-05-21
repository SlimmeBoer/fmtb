import React from "react";
import {Box, Paper, Container, useMediaQuery, Button} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import UserBar from "../../components/structure/bedrijf/UserBar.jsx";
import Grid from "@mui/material/Grid2";
import {useTranslation} from "react-i18next";
import ErrorIcon from "@mui/icons-material/Error";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Bedrijf_Unauthorized = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const {t} = useTranslation();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                pt: "3pt",
                overflow: "hidden",
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
                          sx={{borderTop: 1, borderTopColor: '#aaa', height: '100vh', pt: 3}}>
                        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                            <Stack direction="row" gap={2}>
                                <ErrorIcon/>
                                <Typography component="h6" variant="h6">
                                    {t("company_dashboard.unauthorized")}
                                </Typography>
                            </Stack>
                            <Typography variant="body2" sx={{mt: 4}}>
                                {t("company_dashboard.unauthorized_explanation")}
                            </Typography>
                        </Box>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default Bedrijf_Unauthorized;
