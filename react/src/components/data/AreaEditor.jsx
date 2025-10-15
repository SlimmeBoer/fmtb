import React, { useEffect, useMemo, useState } from "react";
import axiosClient from "../../axios_client.js";
import {
    Box,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import SaveIcon from "@mui/icons-material/Save";

function normalizeAreasPayload(payload) {
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.data)) return payload.data;
    if (payload && Array.isArray(payload.results)) return payload.results;
    if (payload && typeof payload === "object") return Object.values(payload);
    return [];
}

export default function AreaEditor() {
    const { t } = useTranslation();

    const kpis = useMemo(
        () => [
            { key: "weight_kpi1", label: t("kpis.1") },
            { key: "weight_kpi2a", label: t("kpis.2a") },
            { key: "weight_kpi2b", label: t("kpis.2b") },
            { key: "weight_kpi2c", label: t("kpis.2c") },
            { key: "weight_kpi2d", label: t("kpis.2d") },
            { key: "weight_kpi2e", label: t("kpis.2e") },
            { key: "weight_kpi3", label: t("kpis.3") },
            { key: "weight_kpi4", label: t("kpis.4") },
            { key: "weight_kpi5", label: t("kpis.5") },
            { key: "weight_kpi6", label: t("kpis.6") },
            { key: "weight_kpi7", label: t("kpis.7") },
            { key: "weight_kpi8", label: t("kpis.8") },
            { key: "weight_kpi9", label: t("kpis.9") },
            { key: "weight_kpi11", label: t("kpis.11") },
            { key: "weight_kpi12a", label: t("kpis.12a") },
            { key: "weight_kpi12b", label: t("kpis.12b") },
            { key: "weight_kpi13", label: t("kpis.13") },
            { key: "weight_kpi14", label: t("kpis.14") },
        ],
        [t]
    );

    const [areas, setAreas] = useState([]);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [globalError, setGlobalError] = useState("");

    const isNumeric = (val) => {
        if (val === "" || val === null || val === undefined) return true;
        const normalized = String(val).trim().replace(",", ".");
        return normalized !== "" && !isNaN(Number(normalized));
    };

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await axiosClient.get("areas"); // <-- zonder /api
                if (!mounted) return;
                const list = normalizeAreasPayload(res.data);
                setAreas(list);

                const initial = {};
                list.forEach((area) => {
                    initial[area.id] = {};
                    kpis.forEach((k) => {
                        initial[area.id][k.key] =
                            area?.[k.key] === null || area?.[k.key] === undefined
                                ? ""
                                : String(area[k.key]);
                    });
                });
                setValues(initial);
            } catch (e) {
                setGlobalError(t("errors.loadFailed") || "Laden mislukt.");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [kpis, t]);

    const handleChange = (areaId, kpiKey, nextVal) => {
        setValues((prev) => ({
            ...prev,
            [areaId]: { ...prev[areaId], [kpiKey]: nextVal },
        }));
        setErrors((prev) => ({
            ...prev,
            [`${areaId}-${kpiKey}`]: !isNumeric(nextVal),
        }));
    };

    const validateAll = () => {
        const nextErrors = {};
        areas.forEach((a) => {
            kpis.forEach((k) => {
                const v = values?.[a.id]?.[k.key] ?? "";
                if (!isNumeric(v)) nextErrors[`${a.id}-${k.key}`] = true;
            });
        });
        setErrors(nextErrors);
        return Object.values(nextErrors).every((v) => v !== true);
    };

    const handleSave = async () => {
        setGlobalError("");
        if (!validateAll()) {
            setGlobalError(
                t("areas.fix_highlighted")
            );
            return;
        }

        setSaving(true);
        try {
            const normalized = {};
            Object.entries(values).forEach(([areaId, kpiObj]) => {
                normalized[areaId] = {};
                Object.entries(kpiObj).forEach(([kpiKey, val]) => {
                    const v = String(val).trim().replace(",", ".");
                    normalized[areaId][kpiKey] = v === "" ? null : Number(v);
                });
            });

            await axiosClient.post("areas/update-weights", { values: normalized }); // <-- zonder /api
            alert(t("areas.saved") || "Opgeslagen!");
        } catch (e) {
            setGlobalError(t("areas.load_failed"));
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <CenteredLoading />
        );
    }

    if (!areas.length) {
        return <Alert severity="info">{t("areas.no_data")}</Alert>;
    }

    return (
        <Box>
            {globalError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {globalError}
                </Alert>
            )}


                <Table size="small" aria-label="Area KPI table" sx={{ tableLayout: "fixed" }}>
                    <TableHead>
                        <TableRow
                            sx={{
                                height: 160, // genoeg ruimte zodat header niet in de eerste rij valt
                            }}
                        >
                            <TableCell sx={{ width: 200 }} />
                            {areas.map((area) => (
                                <TableCell
                                    key={area.id}
                                    align="center"
                                    sx={{
                                        width: 30,
                                        p: 0,
                                        verticalAlign: "bottom",
                                        position: "relative",
                                    }}
                                >
                                    {/* Verticale titel zonder overlap met body */}
                                    <Box
                                        sx={{
                                            writingMode: "vertical-rl",
                                            transform: "rotate(180deg)", // leest van onder naar boven
                                            fontWeight: 700,
                                            display: "inline-block",
                                            whiteSpace: "nowrap",
                                            mb: 1,
                                            // Zorg dat de tekst binnen de headercel blijft:
                                            maxHeight: 140,
                                            overflow: "hidden",
                                        }}
                                    >
                                        {area.name}
                                    </Box>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {kpis.map((kpi) => (
                            <TableRow key={kpi.key}>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 500, pr: 3 }}>
                                    {kpi.label}
                                </TableCell>

                                {areas.map((area) => {
                                    const cellKey = `${area.id}-${kpi.key}`;
                                    const val = values?.[area.id]?.[kpi.key] ?? "";
                                    const hasError = !!errors[cellKey];

                                    return (
                                        <TableCell key={cellKey} align="center">
                                            <TextField
                                                value={val}
                                                onChange={(e) => handleChange(area.id, kpi.key, e.target.value)}
                                                type="text"
                                                variant="outlined"
                                                size="small"

                                                // SMALLER INPUT
                                                sx={{ width: 70, p: 0, textAlign: 'center'}} // ~smal veld
                                                error={hasError}
                                            />
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Box mt={3}>
                    <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving}>
                        {saving ? (t("general.saving") || "Bezig met opslaan...") : (t("general.save") || "Opslaan")}
                    </Button>
                </Box>

        </Box>
    );
}
