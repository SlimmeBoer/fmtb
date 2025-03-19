import React, {useState} from "react";
import {Box, Paper, Container, useMediaQuery, Button} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import UserBar from "../../components/structure/bedrijf/UserBar.jsx";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import KLWUploader from "../../components/forms/KLWUploader.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {CloudUpload} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import SaveIcon from "@mui/icons-material/Save";

const CenteredPaper = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [checked, setChecked] = useState(false);
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
                    backgroundImage: "url(images/backdrop.jpg)",
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
                        <Grid
                            size={{xs: 3, sm: 3, md: 3}}
                        >
                            <Box
                                component="img"
                                sx={{
                                    ml: 6,
                                    height: 180,
                                    width: 180,
                                }}
                                alt="UMDL Logo"
                                src="/images/logo.png"
                            />
                        </Grid>
                        <Grid size={{xs: 7, sm: 7, md: 7}}>
                            <Typography variant="h4" sx={{mb: 3}}>
                                Aanleveren bedrijfsdata
                            </Typography>
                            <Typography variant="body2" sx={{mb: 3}}>
                                Welkom bij de bedrijfs-module van het UMDL-programma! Via deze pagina kunt u uw
                                Kringloopwijzer-bestanden aanleveren waarmee een deel van de KPI's berekend wordt.
                                <br/>De overige KPI's (MBP, social-maatschappelijke activiteiten en de natuur-KPI's)
                                zullen door uw collectief worden ingevuld. <br/> <br/>
                                In het onderstaande overzicht kunt u zien welke bestanden er al voor u zijn aangeleverd.
                                Vul deze aan met de gevraagde gegevens.<br />

                            </Typography>
                            <Box sx={{backgroundColor: '#eeeeee', p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
                                <Typography variant="body2" sx={{mb: 6}}>
                                    Er zijn voor uw bedrijf nog geen bestanden aangeleverd. Lever minimaal de bestanden
                                    aan voor 2022, 2023 en 2024.
                                </Typography>
                                <KLWUploader/>

                            </Box>
                            <FormControlLabel
                                sx={{pt: 4, pb: 4}}
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Ik verklaar hierbij naar eer en geweten dat de door mij aangeleverde gegevens correct en volledig zijn verstrekt, en dat deze niet zijn gewijzigd of gemanipuleerd na ontvangst."
                            />
                            <Button
                                variant="contained"
                                component="label"
                                color="success"
                                startIcon={<SaveIcon />}
                                sx={{ marginBottom: 2 }}
                            >
                                {t("company_dashboard.finish_data")}
                                <input
                                    type="file"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excelhp "
                                    multiple
                                    hidden
                                />
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default CenteredPaper;
