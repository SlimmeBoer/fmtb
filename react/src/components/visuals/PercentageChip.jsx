import * as React from "react";
import {
    GaugeContainer,
    GaugeValueArc,
    GaugeReferenceArc,
    useGaugeState,
    gaugeClasses,
} from "@mui/x-charts/Gauge";
import {Gauge} from "@mui/x-charts";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useEffect} from "react";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import StatCard from "./StatCard.jsx";

function PercentageChip({ownvalue, refvalue, lowerBetter}) {

    let displayColor = 'success';
    let prefixString = '+';
    const calcValue = Math.round((((ownvalue / refvalue) * 100) - 100) * 10) / 10;

    if (ownvalue > refvalue) {
        prefixString = '+';
    } else {
        prefixString = '';
    }

    if (lowerBetter) {
        if (ownvalue > refvalue) {
            displayColor = 'error';
        } else {
            displayColor = 'success';
        }
    }
    else {
        if (ownvalue > refvalue) {
            displayColor = 'success';
        } else {
            displayColor = 'error';
        }
    }

    return (
        <Chip size="small" color={displayColor} label={prefixString + calcValue + "%"} />
    );
}

PercentageChip.propTypes = {
    ownvalue: PropTypes.number.isRequired,
    refvalue: PropTypes.number.isRequired,
    lowerBetter: PropTypes.bool.isRequired,
};
export default PercentageChip;
