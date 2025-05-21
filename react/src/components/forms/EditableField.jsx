import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const EditableField = ({ label, type, value, sublabel, isEditing, onChange, required, error}) => {

    const handleChange = (e) => {
        const value = e.target.value;
        onChange(value);
    };

    return (
        <div>
            {isEditing ? (
                <TextField
                    type={type}
                    value={value}
                    onChange={handleChange}
                    required={required}
                    error={error.errorstatus}
                    helperText={error.helperText}
                    variant="outlined"
                    align="center"
                />
            ) : (
                <p>{value} {sublabel}</p>
            )}
        </div>
    );
};

export default EditableField;
