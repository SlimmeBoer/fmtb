import * as React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, {selectClasses} from '@mui/material/Select';
import {styled} from '@mui/material/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {showFullNameReverse} from "../../helpers/FullNameReverse.js";
import CenteredLoading from "../visuals/CenteredLoading.jsx";

export default function UserPicker(props) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/user/getdropdown')
            .then(({data}) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }, [])

    return (
        <React.Fragment>
            {loading && <CenteredLoading />}
            {!loading &&
            <Select
                labelId="user-select"
                id="user-simple-select"
                value={props.user || 0}
                onChange={(e) => props.changeHandler(e)}
                inputProps={{'aria-label': 'Select user'}}
                sx={{
                    maxHeight: 56,
                    mb: 6,
                    width: 400,
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
            >  {!loading && users.map((u, index) => (
                <MenuItem value={u.id} key={index}>
                    <ListItemText primary={showFullNameReverse(u.first_name, u.middle_name, u.last_name)}/>
                </MenuItem>))}
            </Select>}
        </React.Fragment>
    );
}
