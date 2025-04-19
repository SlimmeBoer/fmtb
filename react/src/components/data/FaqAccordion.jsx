import React, {useEffect, useState} from 'react';
import axiosClient from "../../axios_client.js";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Snackbar,
    Alert,
    Box
} from '@mui/material';
import {
    ExpandMore,
    Edit,
    Delete,
    ArrowUpward,
    ArrowDownward,
    Add
} from '@mui/icons-material';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CenteredLoading from "../visuals/CenteredLoading.jsx";
import Stack from "@mui/material/Stack";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AddIcon from "@mui/icons-material/Add";
import {useTranslation} from "react-i18next";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const FaqAccordion = () => {
    const [faqs, setFaqs] = useState([]);
    const [editFaq, setEditFaq] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        loadFaqs();
    }, []);

    const loadFaqs = () => {
        setLoading(true);
        axiosClient
            .get(`/faq`)
            .then(({data}) => {
                setFaqs(data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handleEditOpen = (faq) => {
        setEditFaq({...faq});
        setDialogOpen(true); // Open the dialog
    };

    const handleNewOpen = () => {
        setEditFaq({id: null, question: '', answer: '', order: faqs.length + 1});
        setDialogOpen(true); // Open the dialog
    };

    const handleEditClose = () => setDialogOpen(false); // Close the dialog

    const handleEditSave = () => {
        const request = editFaq.id
            ? axiosClient.put(`/faq/${editFaq.id}`, {
                question: editFaq.question,
                answer: editFaq.answer
            })
            : axiosClient.post(`/faq`, {
                question: editFaq.question,
                answer: editFaq.answer,
                order: editFaq.order
            });

        request
            .then(() => {
                setDialogOpen(false); // Close dialog on success
                loadFaqs();
                setSnackbar({
                    open: true,
                    message: editFaq.id ? 'FAQ bijgewerkt!' : 'FAQ toegevoegd!',
                    severity: 'success'
                });
            })
            .catch(() => {
                setSnackbar({
                    open: true,
                    message: 'Opslaan mislukt.',
                    severity: 'error'
                });
            });
    };

    const handleDelete = (id) => {

        if (!window.confirm('Weet je het zeker?')) {
            return
        }

        axiosClient
            .delete(`/faq/${id}`)
            .then(() => {
                loadFaqs();
                setSnackbar({
                    open: true,
                    message: 'FAQ verwijderd!',
                    severity: 'info'
                });
            })
            .catch(() => {
                setSnackbar({
                    open: true,
                    message: 'Verwijderen mislukt.',
                    severity: 'error'
                });
            });
    };

    const moveFaq = (index, direction) => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= faqs.length) return;

        const reordered = [...faqs];
        [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];

        const updated = reordered.map((faq, i) => ({...faq, order: i + 1}));
        setFaqs(updated);

        axiosClient
            .post('/faq/reorder', {faqs: updated})
            .then(() => {
                setSnackbar({
                    open: true,
                    message: 'Volgorde bijgewerkt.',
                    severity: 'success'
                });
            })
            .catch(() => {
                setSnackbar({
                    open: true,
                    message: 'Kon volgorde niet opslaan.',
                    severity: 'error'
                });
            });
    };

    return (
        <React.Fragment>
            <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
                <Stack direction="row" gap={2}
                       sx={{
                           display: {xs: 'none', md: 'flex'},
                           width: '100%',
                           alignItems: {xs: 'flex-start', md: 'center'},
                           justifyContent: 'space-between',
                           maxWidth: {sm: '100%', md: '1700px'},
                           pt: 1.5, pb: 4,
                       }}>
                    <Stack direction="row" gap={2}>
                        <ContactSupportIcon/>
                        <Typography component="h6" variant="h6">
                            {t("pages_admin.faq")}
                        </Typography>
                    </Stack>
                    <Stack direction="row" gap={2}>
                        <Button variant="outlined" startIcon={<AddIcon/>} onClick={handleNewOpen}>
                            {t("general.add")}
                        </Button>
                    </Stack>
                </Stack>

                {loading ? (
                    <CenteredLoading/>
                ) : (
                    faqs.map((faq, index) => (
                        <Box key={faq.id} display="flex" alignItems="start" gap={1}>
                            <Box flexGrow={1}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMore/>}>
                                        <Typography><strong>{faq.question}</strong></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography
                                            dangerouslySetInnerHTML={{__html: faq.answer}}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                            <Box display="flex" flexDirection="row" gap={1} mt={1}>
                                <IconButton onClick={() => handleEditOpen(faq)} size="small">
                                    <Edit fontSize="small"/>
                                </IconButton>
                                <IconButton onClick={() => handleDelete(faq.id)} size="small">
                                    <Delete fontSize="small"/>
                                </IconButton>
                                <IconButton
                                    onClick={() => moveFaq(index, 'up')}
                                    disabled={index === 0}
                                    size="small"
                                >
                                    <ArrowUpward fontSize="small"/>
                                </IconButton>
                                <IconButton
                                    onClick={() => moveFaq(index, 'down')}
                                    disabled={index === faqs.length - 1}
                                    size="small"
                                >
                                    <ArrowDownward fontSize="small"/>
                                </IconButton>
                            </Box>
                        </Box>
                    ))
                )}

                {/* Edit/New Dialog */}
                <Dialog open={dialogOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
                    <DialogTitle>
                        {editFaq?.id ? t("faq.edit") : t("faq.new")}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label={t("faq.question")}
                            margin="dense"
                            value={editFaq?.question || ''}
                            onChange={(e) =>
                                setEditFaq((prev) => ({...prev, question: e.target.value}))
                            }
                        />
                        <Typography variant="subtitle2" sx={{mt: 2, mb: 1}}>
                            {t("faq.answer")}
                        </Typography>
                        <CKEditor
                            editor={ClassicEditor}
                            data={editFaq?.answer || ''}
                            onChange={(_, editor) =>
                                setEditFaq((prev) => ({...prev, answer: editor.getData()}))
                            }
                            config={{
                                height: 500, // Set the height to your desired value (in px)
                                minHeight: '400px', // Set a minimum height
                                toolbar: ['bold', 'italic', 'strikethrough', 'link','|','bulletedList', 'numberedList'],
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose}>{t("general.cancel")}</Button>
                        <Button onClick={handleEditSave} variant="contained">
                            {t("general.save")}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => setSnackbar({...snackbar, open: false})}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                >
                    <Alert
                        onClose={() => setSnackbar({...snackbar, open: false})}
                        severity={snackbar.severity}
                        sx={{width: '100%'}}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </React.Fragment>
    );
};

export default FaqAccordion;
