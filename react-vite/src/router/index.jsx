import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Dashboard from '../components/Homepage/Dashboard';
import CreateGroup from '../components/CreateGroup/CreateGroup';
import GroupDetails from '../components/GroupDetails/GroupDetails';
import CreateExpense from '../components/CreateExpense/CreateExpense';
import ExpenseDetails from '../components/ExpenseDetails/ExpenseDetails'
import LandingPage from '../components/LandingPage/LandingPage'
import CreatePayment from '../components/CreatePayment/CreatePayment';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
      },
      {
        path: "/expenses/new",
        element: <CreateExpense />
      },
      {
        path: '/expenses/:expenseId',
        element: <ExpenseDetails />
      },
      {
        path: '/payments/new',
        element: <CreatePayment />
      }
    ],
  },
]);
