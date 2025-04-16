import * as React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {Dialog, DialogContent} from "@mui/material";
import {useState} from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function AboutScreen() {

    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    };

    const {t} = useTranslation();

    return (
        <React.Fragment>
            <IconButton
                onClick={toggleOpen}
                size="small"
            >
                <InfoOutlinedIcon/>
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
                                    height: 215,
                                    width: 250,
                                }}
                                alt="TNDB Logo"
                                src="/images/logo_tndb.png"
                            />
                        </Grid>
                        <Grid size={{xs: 11, lg: 6}} key="about-grid-2">
                            <Typography component="h3" variant="h3" sx={{pt: 5}}>
                                {t("about.title")}
                            </Typography>
                            <Typography component="h2" variant="body2" sx={{pt: 2}}>
                                {t("about.version")}
                            </Typography>
                            <Typography component="h2" variant="body2" sx={{pt: 2}}>
                                {t("about.description")}
                            </Typography>
                            <Typography component="h2" variant="body2" sx={{pt: 2}}>
                                {t("about.copyright")}
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
