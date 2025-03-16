import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import PageLayout from '../components/layout/PageLayout';
import styled from 'styled-components';

const UsersTable = styled(Table)`
  margin-top: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
  
  thead {
    background-color: #f8f9fa;
    
    th {
      font-weight: 600;
      color: #333;
      padding: 1rem;
      border-bottom: none;
    }
  }
  
  tbody {
    tr {
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #f8f9fa;
      }
      
      td {
        padding: 1rem;
        vertical-align: middle;
      }
    }
  }
  
  .user-id {
    font-family: monospace;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .user-name {
    font-weight: 600;
    color: #333;
  }
  
  .user-email {
    color: #6c5ce7;
  }
  
  .btn-edit {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
  
  .btn-delete {
    background-color: #e74c3c;
    border-color: #e74c3c;
    
    &:hover {
      background-color: #c0392b;
      border-color: #c0392b;
    }
  }
  
  .badge-admin {
    background-color: #6c5ce7;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 600;
  }
  
  .badge-user {
    background-color: #00b894;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 600;
  }
`;

const ActionButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-weight: 600;
  margin-right: 0.5rem;
  
  &:last-child {
    margin-right: 0;
  }
  
  i {
    margin-right: 0.5rem;
  }
`;

const UserListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <PageLayout 
      title="Users" 
      breadcrumbItems={[
        { name: 'Admin', link: '/admin' },
        { name: 'Users', link: '' }
      ]}
    >
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <UsersTable striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="user-id">{user._id}</td>
                <td className="user-name">{user.name}</td>
                <td className="user-email">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <span className="badge badge-admin">Admin</span>
                  ) : (
                    <span className="badge badge-user">User</span>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <ActionButton variant="primary" className="btn-sm btn-edit">
                      <i className="fas fa-edit"></i> Edit
                    </ActionButton>
                  </LinkContainer>
                  <ActionButton
                    variant="danger"
                    className="btn-sm btn-delete"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </UsersTable>
      )}
    </PageLayout>
  );
};

export default UserListScreen;
