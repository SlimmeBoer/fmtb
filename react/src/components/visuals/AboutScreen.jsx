import * as React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {Dialog, DialogContent, Tooltip} from "@mui/material";
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
            <Tooltip title={t("tooltips.about")}>
            <IconButton
                onClick={toggleOpen}
                size="small"
            >
                <InfoOutlinedIcon/>
            </IconButton>
            </Tooltip>
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
                        <Grid size={{xs: 11, lg: 5}} >
                            <Box
                                component="img"
                                sx={{
                                    width: 300,
                                    pt: 7,
                                }}
                                alt="SB Logo"
                                src="/images/logo_sb.png"
                            />
                        </Grid>
                        <Grid size={{xs: 11, lg: 6}}>
                            <Typography component="h3" variant="h3" sx={{pt: 5}}>
                                {t("about.title")}
                            </Typography>
                            <Typography component="h2" variant="body2" sx={{pt: 2}}>
                                {t("about.version")}
                            </Typography>
                            <Typography component="h2" variant="body2" sx={{pt: 2}}>
                                {t("about.description")}
                            </Typography>
                            <Typography component="h2" variant="body2" sx={{pt: 4}}>
                                {t("about.disclaimer_1")}
                            </Typography>
                            <Typography component="h2" variant="body2" >
                                {t("about.disclaimer_2")}
                            </Typography>
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
        </React.Fragment>
    );
}
