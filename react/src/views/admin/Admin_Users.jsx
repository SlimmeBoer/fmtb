import React, {useEffect, useState} from "react";
import axiosClient from "../../axios_client.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {useTranslation} from 'react-i18next';
import {Avatar, Button, CircularProgress, Dialog, IconButton} from "@mui/material";
import {showFullName} from "../../helpers/FullName.js";
import UserForm from "../../components/forms/UserForm.jsx";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GroupIcon from '@mui/icons-material/Group';
import Box from "@mui/material/Box";
import CenteredLoading from "../../components/visuals/CenteredLoading.jsx";

export default function Admin_Users() {

    const [users, setUsers] = useState([]);
    const [user_id, setUserId] = useState(0);
    const [loading, setLoading] = useState(false);
    const {setNotification, user} = useStateContext();
    const [open, setOpen] = useState(false);

    const handleClickOpen = (user_id) => {
        setUserId(user_id);
        setOpen(true);
    };

    const closeHandler = () => {
        setOpen(false)
        getUsers();
    };

    const {t} = useTranslation();

    useEffect(() => {
        getUsers();
    }, [])

    const onDelete = (u) => {
        if (!window.confirm(t('users.delete_confirm'))) {
            return
        }

        axiosClient.delete(`/users/${u.id}`)
            .then(() => {
                setNotification(t('users.delete_success'))
                getUsers()
            })
    }

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users')
            .then(({data}) => {
                setLoading(false);
                setUsers(data.data)
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Stack direction="row" gap={2}
                   sx={{
                       display: { xs: 'none', md: 'flex' },
                       width: '100%',
                       alignItems: { xs: 'flex-start', md: 'center' },
                       justifyContent: 'space-between',
                       maxWidth: { sm: '100%', md: '1700px' },
                       pt: 1.5, pb: 4,
                   }}>
                <Stack direction="row" gap={2}>
                    <GroupIcon sx={{mt: 0.7}}/>
                    <Typography component="h6" variant="h6">
                        {t("pages_admin.users")}
                    </Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                    <Button variant="outlined" onClick={() => handleClickOpen(0)} startIcon={<AddIcon />}>
                        {t("general.add")}
                    </Button>
                </Stack>
            </Stack>
                {loading && <CenteredLoading />}
                {!loading &&
                <TableContainer >
                    <Table aria-label="simple table" size="small" >
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('users.header_id')}</TableCell>
                                <TableCell>{t('users.header_full_name')}</TableCell>
                                <TableCell>{t('users.header_email')}</TableCell>
                                <TableCell>{t('users.header_brs')}</TableCell>
                                <TableCell>{t('users.header_role')}</TableCell>
                                <TableCell>{t('users.header_actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(u => (
                                <TableRow
                                    key={u.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell width="10%" component="th" scope="row">
                                        {u.id}
                                    </TableCell>
                                    <TableCell width="25%">{showFullName(u.first_name,u.middle_name,u.last_name)}</TableCell>
                                    <TableCell width="15%">{u.email}</TableCell>
                                    <TableCell width="15%">{u.brs}</TableCell>
                                    <TableCell width="15%">{u.role}</TableCell>
                                    <TableCell width="20%">
                                        <IconButton onClick={() => handleClickOpen(u.id)} color="secondary" variant="outlined">
                                            <EditIcon/>
                                        </IconButton>
                                        &nbsp;
                                        {u.id !== user.id &&
                                        <IconButton onClick={() => onDelete(u)} color="error" variant="outlined">
                                                <DeleteIcon/>
                                        </IconButton>}
                                        </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
                <Dialog open={open}
                        PaperProps={{ style: {
                                minHeight: '420px',
                                minWidth: '580px',
                            }}}>
                    <UserForm id={user_id} onClose={closeHandler}/>
                </Dialog>
        </Box>
    )
}
