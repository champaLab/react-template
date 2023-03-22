import { Grid } from '@mui/material'
import React from 'react'
import CardTable from '../../../components/CardTable'
import ModalAdd from './components/ModalAdd'

type Props = {}

const Table = (props: Props) => {
  return (
    <>
      <ModalAdd />
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <CardTable />

        </Grid>
      </Grid>
    </>
  )
}

export default Table