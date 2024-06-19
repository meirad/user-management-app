import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Checkbox, IconButton, useMediaQuery } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import axios from 'axios';

export default function SimpleTable({ searchInput }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const token = localStorage.getItem('token');
  const [allUsers, setAllUsers] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users',
      headers: { 
        'x-auth-token': token,
      }
    };

    axios(config)
      .then(response => {
        setAllUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCheckboxChange = (userId, checked) => {
    const updatedUsers = allUsers.map(user => 
      user._id === userId ? { ...user, isBusiness: checked } : user
    );
    setAllUsers(updatedUsers);
    patchUser(userId, checked);
  };

  const patchUser = async (userId, isBusiness) => {
    const config = {
      method: 'patch',
      url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      data: { isBusiness }
    };
    try {
      const response = await axios(config);
      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    const user = allUsers.find(user => user._id === userId);
    if (user.isAdmin) {
      console.log('Cannot delete admin user');
      return;
    }
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      const updatedUsers = allUsers.filter(user => user._id !== userId);
      setAllUsers(updatedUsers);
      await deleteUser(userId);
    }
  };

  const deleteUser = async (userId) => {
    const config = {
      method: 'delete',
      url: `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
      headers: {
        'x-auth-token': token
      }
    };
    try {
      await axios(config);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = allUsers.filter(user =>
    user.name.first.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.name.last.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.address.city.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.address.state.toLowerCase().includes(searchInput.toLowerCase())
  );

  const displayedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <div>
      <h1 style={{ fontSize: '4em', marginLeft: '70px', fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}>Users</h1>
      <h4 style={{ fontSize: '2em', marginLeft: '70px', fontFamily: 'Roboto, sans-serif', fontWeight: 100 }}>Here you can find all the users</h4>
   
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      <Paper sx={{ width: isMobile ? '100%' : '1100px', padding: '10px' }}>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                {!isMobile && <TableCell align="left">Phone</TableCell>}
                <TableCell align="left">Email</TableCell>
                {!isMobile && <TableCell align="left">City</TableCell>}
                {!isMobile && <TableCell align="left">State</TableCell>}
                <TableCell align="left">Is Business</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {displayedUsers.length > 0 ? (
    displayedUsers.map((user, index) => (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          {user.name.first} {user.name.last}
        </TableCell>
        {!isMobile && <TableCell align="left">{user.phone}</TableCell>}
        <TableCell align="left">{user.email}</TableCell>
        {!isMobile && <TableCell align="left">{user.address.city}</TableCell>}
        {!isMobile && <TableCell align="left">{user.address.state}</TableCell>}
        <TableCell align="left">
          <Checkbox 
            checked={user.isBusiness}
            onChange={(e) => handleCheckboxChange(user._id, e.target.checked)}
            name="isBusiness"
          />
        </TableCell>
        <TableCell align="center">
          {user.isAdmin ? (
            <DeleteForeverOutlinedIcon style={{ color: '#ff8b8b' }} />
          ) : (
            <IconButton onClick={() => handleDelete(user._id)}>
              <DeleteOutlinedIcon />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} align="center">No users found</TableCell>
    </TableRow>
  )}
</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
    </div>
  );
}

