import { Add } from '@mui/icons-material';
import { Box, Button, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import MyModal from '../../../../components/MyModal';

interface Props {
    items?: string
}

const ModalAdd: React.FC<Props> = () => {


    function handleSubmit(e: any) {
        e.preventDefault();
    }

    return (
        <>
            <MyModal
                onSubmit={handleSubmit}
                component={
                    <>
                        <TextField label="ຊື່ໂຕະ" fullWidth margin='dense' />
                    </>
                } />
        </>
    )
}

export default ModalAdd
