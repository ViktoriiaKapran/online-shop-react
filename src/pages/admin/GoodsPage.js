import { DeleteOutlineOutlined, Edit } from '@mui/icons-material';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteGoodMutation, useGetGoodCountQuery, useGetGoodsQuery } from '../../store/api';
import LinkButton from '../../components/LinkButton';
import Loader from '../../components/Loader';
import { Image } from '../../components/Image/Image';
import SearchComponent from '../../components/SearchComponent';

function GoodsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: goodCount, refetch } = useGetGoodCountQuery();
  const { data, isFetching } = useGetGoodsQuery({ searchStr: search, skip: page * rowsPerPage, limit: rowsPerPage });
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [deleteGood, result] = useDeleteGoodMutation();


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const openModalWindow = (goodId) => {
    setSelectedId(goodId);
    setOpen(true);
  };

  const closeModalWindow = () => {
    setSelectedId('');
    setOpen(false);
  };

  const onDeletionSubmit = () => {
    deleteGood({ _id: selectedId }).then(response => {
      setOpen(false);
    });
  }

  return (
    <>
      {isFetching ? <Loader /> :
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <LinkButton to={'/admin/good'}>Create good</LinkButton>
            <SearchComponent onSearch={(str) => {setSearch(str); refetch()}} />
          </Box>
          <Paper sx={{ m: 1 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Good</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align='right'></TableCell>
                    <TableCell align='right'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.GoodFind?.map(good =>
                    <TableRow key={good?._id}>
                      <TableCell>
                        <Box sx={{ height: '80px', width: '80px' }}>
                          <Image url={good?.images && good?.images[0]?.url} />
                        </Box>
                      </TableCell>
                      <TableCell>{good?.name}</TableCell>
                      <TableCell>{good?.price}</TableCell>
                      <TableCell>{good?.categories?.map(category => category?.name || 'no category')}</TableCell>
                      <TableCell align='right'>
                        <IconButton component={Link} to={`/admin/good/${good._id}`}><Edit /></IconButton>
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton onClick={() => openModalWindow(good._id)}><DeleteOutlineOutlined /></IconButton>
                      </TableCell>
                    </TableRow>)}
                  <Dialog
                    open={open}
                    onClose={closeModalWindow}
                  >
                    <DialogContent>
                      <DialogContentText>Do you confirm good deletion?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => onDeletionSubmit()}>Yes</Button>
                      <Button onClick={closeModalWindow}>No</Button>
                    </DialogActions>
                  </Dialog>
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={goodCount?.GoodCount || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage} />
          </Paper>
        </>
      }
    </>
  )
}

export default GoodsPage;