import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { FormControl, Grid, MenuItem, Pagination, Select, TableContainer } from '@mui/material';

const List = props => {
  const {
    data,
    columns,
    page,
    pageCount,
    rowsPerPage,
    rowsPerPageOptions,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  return (
    <>
      <Grid container spacing={0} sx={{ padding: '20px' }}>
        <Grid item xs={12}>
          <FormControl variant='outlined' size='small'>
            <Select
              value={rowsPerPage}
              defaultValue={rowsPerPage}
              onChange={handleChangeRowsPerPage}>
              {Array.isArray(rowsPerPageOptions) &&
                rowsPerPageOptions.length > 0 &&
                rowsPerPageOptions.map(option => (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ margin: '10px 0px' }}>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.key}>{column.title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map(column =>
                      column.render ? (
                        <TableCell key={column.key}>{column.render(row)}</TableCell>
                      ) : (
                        <TableCell key={column.key}>{row[column.key]}</TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Pagination
            count={pageCount}
            page={page}
            showFirstButton
            showLastButton
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default List;