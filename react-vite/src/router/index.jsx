import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Dashboard from '../components/Homepage/Dashboard';
import CreateGroup from '../components/CreateGroup/CreateGroup';
import GroupDetails from '../components/GroupDetails/GroupDetails';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Hello</h1>,
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/groups/new",
        element: <CreateGroup />
      },
      {
        path: "/groups/:groupId",
        element: <GroupDetails />
      }
    ],
  },
]);
