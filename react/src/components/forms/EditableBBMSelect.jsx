import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select, {selectClasses} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AgricultureIcon from "@mui/icons-material/Agriculture.js";
import ListItemText from "@mui/material/ListItemText";
import GisPackageForm from "./AnlbPackageForm.jsx";
import {isObjectEmpty} from "../../helpers/EmptyObject.js";

const EditableBBMSelect = ({ label, type, value, isEditing, onChange, displayvalues}) => {

    console.log()

    const handleChange = (e) => {
        const value = e.target.value;
        onChange(value);
    };

    return (
        <div>
            {isEditing ? (
                <Select
                    labelId="bbm-code-select"
                    id="bbm-code-select"
                    type={type}
                    value={value}
                    onChange={handleChange}
                    inputProps={{'aria-label': 'Select company'}}
                    fullWidth
                    sx={{
                        maxHeight: 56,
                        width: 100,
                        '&.MuiList-root': {
                            p: '8px',
                        },
                        [`& .${selectClasses.select}`]: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                            pl: 1,
                        },
                    }}
                >
                    {value !== undefined  && !isObjectEmpty(displayvalues) &&  displayvalues.map(dv => (
                        <MenuItem value={dv.id} key={"bbmselect-"+ dv.id}>
                            <ListItemText primary={dv.code}/>
                        </MenuItem>))}
                </Select>
            ) : (
                <div>
                    {!isObjectEmpty(displayvalues) && displayvalues.map(dv => {
                        if (dv.id === value)
                            return (
                                <p>{dv.code}</p>
                            )
                        })
                    }
                </div>
            )}
        </div>
    );
};

export default EditableBBMSelect;
