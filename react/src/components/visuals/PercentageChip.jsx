import * as React from "react";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";

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
