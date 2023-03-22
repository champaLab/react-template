import { Add, Close } from '@mui/icons-material';
import { Box, Button, Modal, Typography } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setModal } from '../store/features/modal';
import { customTheme } from '../utils/theme';

export const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
}


interface Props {
    title?: string
    component: ReactNode
    onSubmit: Function
}

const MyModal: React.FC<Props> = ({ title = "ເພີ່ມຂໍ້ມູນ", component, onSubmit }) => {
    const { modal } = useSelector((state: RootState) => ({ ...state }))
    const dispatch = useDispatch()

    function handleClick() {
        dispatch(setModal())
    }

    return (
        <>
            <Box
                sx={{
                    bgcolor: customTheme.palette.primary.main,
                    color: "inherit",
                    height: "3rem",
                    width: "3rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "100%",
                    boxShadow: 10,
                    position: "fixed",
                    bottom: "3rem",
                    right: "3rem",
                    "&:hover": {
                        cursor: "pointer",
                        boxShadow: 20,
                    }
                }} onClick={handleClick}>
                <Add />
            </Box>
            <Modal
                open={modal.open}
                // onClose={handleClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...styleModal, width: 550 }} component="form" onSubmit={(e) => onSubmit(e)}>
                    <Close
                        onClick={handleClick}
                        sx={{
                            position: "absolute",
                            right: "1rem",
                            top: "1rem",
                            "&:hover": {
                                cursor: "pointer",
                            }
                        }} />
                    <Typography mb={2} variant='h5'>{title}</Typography>
                    {component}
                    <Button sx={{ mt: 2 }} type='submit' variant='contained' fullWidth>ບັນທຶກ</Button>
                </Box>
            </Modal>
        </>
    )
}

export default MyModal
