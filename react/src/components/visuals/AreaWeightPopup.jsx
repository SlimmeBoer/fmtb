import * as React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {Dialog, DialogContent, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import axiosClient from "../../axios_client.js";
import CenteredLoading from "./CenteredLoading.jsx";

export default function AreaWeightPopup(props) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [area, setArea] = useState({});

    useEffect(() => {
        getArea();
    }, [props.company])

    const getArea = () => {
        if (props.company !== '') {
            setLoading(true);
            axiosClient.get(`/areas/getbycompany/${props.company}`)
                .then(({data}) => {
                    setLoading(false);
                    setArea(data);
                })
                .catch(() => {
                    setArea({});
                    setLoading(false);
                })
        }
    }
    const toggleOpen = () => {
        setOpen(!open);
    };

    const {t} = useTranslation();

    return (
        <React.Fragment>
            <Tooltip title={t("tooltips.area_weights")}>
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
                            minHeight: '800px',
                        }
                    }}>
                <DialogContent>
                    <Grid
                        container
                        spacing={2}
                        columns={12}
                        sx={{mb: (theme) => theme.spacing(2), mt: 2}}
                    >
                        <Grid size={{xs: 11, lg: 11}}>
                            {loading && <CenteredLoading/>}
                            {!loading && <Box>
                                <Typography component="h3" variant="h3" sx={{pt: 1}}>
                                    {t("area_weights.title")}{area.name}
                                </Typography>
                                <Typography component="h2" variant="body2" sx={{pt: 2}}>
                                    {t("area_weights.explanation")}
                                </Typography>
                                <Table sx={{mt: 2}} size="small" aria-label="simple table">
                                    <TableHead>
                                        <TableRow key={1}>
                                            <TableCell sx={{width: 200}}>{t("area_weights.header_kpi")}</TableCell>
                                            <TableCell sx={{width: 100}}>{t("area_weights.header_weight")}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={2}><TableCell sx={{width: 200}}>{t("kpis.1")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi1}</TableCell></TableRow>
                                        <TableRow key={3}><TableCell sx={{width: 200}}>{t("kpis.2a")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi2a}</TableCell></TableRow>
                                        <TableRow key={4}><TableCell sx={{width: 200}}>{t("kpis.2b")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi2b}</TableCell></TableRow>
                                        <TableRow key={5}><TableCell sx={{width: 200}}>{t("kpis.2c")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi2c}</TableCell></TableRow>
                                        <TableRow key={6}><TableCell sx={{width: 200}}>{t("kpis.2d")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi2d}</TableCell></TableRow>
                                        <TableRow key={7}><TableCell sx={{width: 200}}>{t("kpis.3")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi3}</TableCell></TableRow>
                                        <TableRow key={8}><TableCell sx={{width: 200}}>{t("kpis.4")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi4}</TableCell></TableRow>
                                        <TableRow key={9}><TableCell sx={{width: 200}}>{t("kpis.5")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi5}</TableCell></TableRow>
                                        <TableRow key={10}><TableCell sx={{width: 200}}>{t("kpis.6")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi6}</TableCell></TableRow>
                                        <TableRow key={11}><TableCell sx={{width: 200}}>{t("kpis.7")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi7}</TableCell></TableRow>
                                        <TableRow key={12}><TableCell sx={{width: 200}}>{t("kpis.8")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi8}</TableCell></TableRow>
                                        <TableRow key={13}><TableCell sx={{width: 200}}>{t("kpis.9")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi9}</TableCell></TableRow>
                                        <TableRow key={14}><TableCell sx={{width: 200}}>{t("kpis.11")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi11}</TableCell></TableRow>
                                        <TableRow key={15}><TableCell sx={{width: 200}}>{t("kpis.12a")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi12a}</TableCell></TableRow>
                                        <TableRow key={16}><TableCell sx={{width: 200}}>{t("kpis.12b")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi12b}</TableCell></TableRow>
                                        <TableRow key={17}><TableCell sx={{width: 200}}>{t("kpis.13")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi13}</TableCell></TableRow>
                                        <TableRow key={18}><TableCell sx={{width: 200}}>{t("kpis.14")}</TableCell>
                                            <TableCell sx={{width: 100}}>{area.weight_kpi14}</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                            </Box>}
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
