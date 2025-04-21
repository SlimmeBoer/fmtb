import * as React from "react";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";

function PercentageChip({ownvalue, refvalue, lowerBetter}) {

    let displayColor;
    let prefixString;
    let calcValue;

    // Value
    if (ownvalue === 0 && refvalue === 0) {
        calcValue = 0.0;
    } else if (ownvalue !== 0 && refvalue === 0) {
        calcValue = 100.0;
    }
    else {
        calcValue = Math.round((((ownvalue / refvalue) * 100) - 100) * 10) / 10;
    }

    // Plus or minus prefix
    if (ownvalue > refvalue) {
        prefixString = '+';
    } else {
        prefixString = '';
    }

    // Color of the chip
    if (lowerBetter) {
        if (ownvalue > refvalue) {
            displayColor = 'error';
        } else if (ownvalue === refvalue) {
            displayColor = 'lightgrey';
        } else {
            displayColor = 'success';
        }
    }
    else {
        if (ownvalue > refvalue) {
            displayColor = 'success';
        } else if (ownvalue === refvalue) {
            displayColor = 'lightgrey';
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
