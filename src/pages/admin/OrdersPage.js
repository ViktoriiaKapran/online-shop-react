import { Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGetOrderCountQuery, useGetOrdersQuery } from '../../store/api';
import Loader from '../../components/Loader';
import { getDateString } from '../../functions/getDataString';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box } from '@mui/system';

function OrdersPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const { data: orderCount } = useGetOrderCountQuery();
  const { data, isFetching } = useGetOrdersQuery({ skip: page * rowsPerPage, limit: rowsPerPage, sort: {_id: -1}});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const Row = ({ id, login, total, createdAt, orderGoods }) => {
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
          <TableCell>{id}</TableCell>
          <TableCell>{login}</TableCell>
          <TableCell>{total}</TableCell>
          <TableCell>{getDateString(createdAt)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell >Good</TableCell>
                      <TableCell >Price</TableCell>
                      <TableCell >Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderGoods?.map(good =>
                      <TableRow key={good?.good?._id}>
                        <TableCell >{good.good?.name}</TableCell>
                        <TableCell >{good?.price}</TableCell>
                        <TableCell >{good?.count}</TableCell>
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


  return (
    <>
      {isFetching ? <Loader /> :
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>ID</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Created at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.OrderFind?.map(order =>
                  <Row
                    id={order?._id}
                    login={order?.owner?.login}
                    total={order?.total}
                    createdAt={order?.createdAt}
                    orderGoods={order?.orderGoods} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50, 100, 200]}
            component="div"
            count={orderCount?.OrderCount || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>
      }
    </>
  )
}

export default OrdersPage;