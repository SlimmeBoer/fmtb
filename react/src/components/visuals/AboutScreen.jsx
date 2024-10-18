import * as React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import {Dialog, DialogContent, Stack} from "@mui/material";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AboutScreen() {

    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    };


    return (
        <React.Fragment>
            <IconButton
                onClick={toggleOpen}
                size="small"
            >
                <HelpOutlineIcon/>
            </IconButton>
            <Dialog open={open}
                    PaperProps={{
                        style: {
                            minWidth: '800px',
                            minHeight: '400px',
                        }
                    }}>
                <DialogContent>
                    <Grid
                        container
                        spacing={2}
                        columns={12}
                        sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                    >
                        <Grid size={{xs: 11, lg: 5}} key="about-grid-1">
                            <Box
                                component="img"
                                sx={{
                                    height: 250,
                                    width: 250,
                                }}
                                alt="Agriviewer Logo"
                                src="/images/logo.png"
                            />
                        </Grid>
                        <Grid size={{xs: 11, lg: 6}} key="about-grid-2">
                            <Box
                                component="img"
                                sx={{
                                    height: 125,
                                    width: 375,
                                }}
                                alt="Agriviewer Logo"
                                src="/images/logo2.png"
                            />
                            <Typography component="h2" variant="body2" sx={{pt: 5}}>
                                <strong>Versie 0.1.100</strong>
                            </Typography>
                            <Typography component="h2" variant="body2">
                                Deze versie is bedoeld voor demonstratie-doeleinden.<br/><br/> Alle getoonde data is
                                niet berust op werkelijk
                                bestaande bedrijven en personen. Eventuele gelijkenissen berusten op puur toeval. Alle
                                rechten voorbehouden.
                            </Typography>
                            <Typography component="h2" variant="body2" sx={{pt: 5}}>
                                &copy;2024 Terug naar de Basis Advies / Precondition
                            </Typography>
                        </Grid>
                        <Grid size={{xs: 1, lg: 1}} key="about-grid-4">
                            <IconButton
                                onClick={toggleOpen}

                            >
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
