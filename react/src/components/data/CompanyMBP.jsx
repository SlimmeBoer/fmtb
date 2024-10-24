import * as React from 'react';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {
    CircularProgress,
    TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CompanyMBP(props) {
    const [properties, setProperties] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMbp();
    }, [props.company, props.renderTable])

    const getMbp = () => {
        if (props.company !== '') {
            setLoading(true);
            axiosClient.get(`/companies/getproperties/${props.company}`)
                .then(({data}) => {
                        setLoading(false);
                        setProperties(data);
                    })
                .catch(() => {
                    setLoading(false);
                })
        }
    }

    const handleChange = (event) => {
        const newValue = event.target.value;
        const updatedProperties = { ...properties, mbp: newValue };
        setProperties(updatedProperties);

        axiosClient.put(`/companyproperties/update/${properties.id}`, {
            company_id: properties.company_id,
            mbp: newValue
        })
            .then(response => {
                console.log('Value updated successfully:', response.data);
                props.notifyParent()
            })
            .catch(error => {
                console.error('Error updating value:', error);
            });
    };

    const menuItems = [
        {value: 0, title: "Onbekend",},
        {value: 1, title: "Volvelds gewasbeschermingsmiddelen",},
        {value: 2, title: "Ingevulde MBP",},
        {value: 3, title: "Ingevulde Milieumaatlat",},
        {value: 4, title: "Pleksgewijs grasland, volvelds maisland",},
        {value: 5, title: "Pleksgewijs hele bedrijf",},
        {value: 6, title: "On the way to Planet Proof / AH programma",},
        {value: 7, title: "Beterleven Keurmerk",},
        {value: 8, title: "Biologisch",},
        {value: 9, title: "Geen middelen",},
    ];

    return (
        <Card variant="outlined" sx={{mt: 2}}>
            <Stack direction="row" gap={2} sx={{mb: 1, mt: 1}}>
                <SpaOutlinedIcon/>
                <Typography component="h6" variant="h6">
                    Gewasbeschermingsmiddelen
                </Typography>
            </Stack>
            {loading && <CircularProgress/>}
            {!loading && properties.mbp != null &&
                <FormControl fullWidth>
                    <Select
                        value={properties.mbp}
                        onChange={handleChange}
                        label="Select Value"
                    >
                        {menuItems.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            }
        </Card>
    );
}
