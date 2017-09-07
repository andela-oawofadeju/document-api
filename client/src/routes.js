import React from 'react';
import { Route, IndexRoute } from 'react-router';
import DashboardPage from './js/components/dashboard/DashboardPage';
import Homepage from './js/components/Home/HomePage';
import App from './js/app';
import Auth from './js/components/Auth/index';
import ViewDocument from './js/components/dashboard/documents/viewDocument';
import viewUser from './js/components/dashboard/users/viewUser';
//import EditDocument from './js/components/dashboard/documents/EditDocument';
import Documents from './js/components/dashboard/documents/Documents';
import CreateDocument from './js/components/dashboard/documents/CreateDocument';
import ProfilePage from './js/components/dashboard/ProfilePage';
import userList from './js/components/dashboard/users/userList';
import Users from './js/components/dashboard/users/User';
import Roles from './js/components/dashboard/roles/Roles';
import viewRole from './js/components/dashboard/roles/viewRole';


export default (
  <Route path="/"  component={App} >
      <IndexRoute component={Homepage} />
      <Route path="login" component={Auth} />
      <Route path="/dashboard" component={DashboardPage} >
        <IndexRoute component={Documents} />
        <Route path="documents/:id" component={ViewDocument}></Route>
        {/** <Route path="documents/:id/edit" component={EditDocument}></Route> **/}
        <Route path="documents" component={CreateDocument}></Route>
        <Route path="profile" component={ProfilePage}></Route>
        <Route path="users" component={userList}></Route>
        <Route path="users/:id" component={viewUser}></Route>
        <Route path="roles" component={Roles}></Route>
        <Route path="roles/:id" component={viewRole}></Route>
      </Route>
      <Route path="*" component={ViewDocument} />
  </Route>
);
