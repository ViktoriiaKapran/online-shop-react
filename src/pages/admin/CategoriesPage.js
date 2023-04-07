import React, { useState } from 'react';
import { useDeleteCategoryMutation, useGetAllCategoriesQuery, useGetCategoryCountQuery } from '../../store/api';
import Loader from '../../components/Loader';
import {
  Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog,
  DialogActions, DialogContent, DialogContentText, TablePagination, Collapse, TextField
} from '@mui/material';
import { DeleteOutlineOutlined, Edit, KeyboardArrowDown, KeyboardArrowUp, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LinkButton from '../../components/LinkButton';
import { Box } from '@mui/system';
import { Image } from '../../components/Image/Image';
import SearchComponent from '../../components/SearchComponent';

function CategoriesPage() {
  const [search, setSearch] = useState('');
  const { data: categoryCount } = useGetCategoryCountQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [deleteCategory, result] = useDeleteCategoryMutation();
  const { data, error, isFetching } = useGetAllCategoriesQuery(search);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const openModalWindow = (categoryId) => {
    setSelectedId(categoryId);
    setOpen(true);
  };

  const closeModalWindow = () => {
    setSelectedId('');
    setOpen(false);
  };

  const onDeletionSubmit = () => {
    const category = data?.CategoryFind?.find(category => category._id === selectedId);
    deleteCategory({ _id: category._id, name: category.name }).then(response => {
      setOpen(false);
    });
  }

  const Row = ({ _id, name, goods, category, parent }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TableRow>
          <TableCell>
            <IconButton
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell>{_id}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>{goods?.length}</TableCell>
          <TableCell>{parent?.name ? 'Yes' : 'No'}</TableCell>
          <TableCell align='right'>
            <IconButton component={Link} to={`/admin/category/${category._id}`}><Edit /></IconButton>
          </TableCell>
          <TableCell align='right'>
            <IconButton onClick={() => openModalWindow(category._id)}><DeleteOutlineOutlined /></IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell >Good</TableCell>
                      <TableCell >Price</TableCell>
                      <TableCell align='right'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {goods?.map(good =>
                      <TableRow key={good?._id}>
                        <TableCell>
                          <Box sx={{ height: '50px', width: '50px' }}>
                            <Image url={good?.images && good?.images[0]?.url} />
                          </Box>
                        </TableCell>
                        <TableCell >{good?.name}</TableCell>
                        <TableCell >{good?.price}</TableCell>
                        <TableCell align='right'>
                          <IconButton component={Link} to={`/admin/good/${good._id}`}><Edit /></IconButton>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    )
  }

  console.log(data?.CategoryFind);
  return (
    <>
      {isFetching ? <Loader /> :
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <LinkButton to={'/admin/category'}>Create category</LinkButton>
            <SearchComponent onSearch={(str) => setSearch(str)}/>
          </Box>
          <Paper sx={{ m: 1 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Goods count</TableCell>
                    <TableCell>Subcategory</TableCell>
                    <TableCell align='right'></TableCell>
                    <TableCell align='right'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.CategoryFind?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map(category =>
                    <Row
                      key={category?._id}
                      name={category?.name}
                      goods={category?.goods}
                      category={category}
                      parent={category?.parent} />
                  )}
                  <Dialog
                    open={open}
                    onClose={closeModalWindow}
                  >
                    <DialogContent>
                      <DialogContentText>Do you confirm category deletion?</DialogContentText>
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
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={categoryCount?.CategoryCount || 0}
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

export default CategoriesPage;