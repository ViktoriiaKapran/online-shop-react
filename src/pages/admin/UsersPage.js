import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { useGetUserCountQuery, useGetUsersQuery } from '../../store/api';
import Loader from '../../components/Loader';
import { getDateString } from '../../functions/getDataString';

function UsersPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const { data: userCount } = useGetUserCountQuery();
  const { data, isFetching } = useGetUsersQuery({ skip: page * rowsPerPage, limit: rowsPerPage, sort: {_id: -1} });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  return (
    <>
      {isFetching ? <Loader /> :
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Login</TableCell>
                  <TableCell>Created at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.UserFind?.map(user =>
                  <TableRow key={user._id}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.login}</TableCell>
                    <TableCell>{getDateString(user.createdAt)}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50, 100, 200]}
            component="div"
            count={userCount?.UserCount || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>
      }
    </>
  )
}

export default UsersPage;