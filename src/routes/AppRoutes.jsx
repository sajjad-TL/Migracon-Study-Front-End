import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import VerifyCode from '../pages/VerifyCode';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';
import Application from '../pages/Application-section';
import Layout from '../layouts/Layout';
import ProfileDetail from '../pages/Profile-detail'
import StudentDashboard from '../pages/Student';
import EditProfileModal from '../Model/EditProfileModal'
import MyTasks from '../pages/MyTasks';
import ProgramSchool from '../pages/ProgramSchool';
import Notification from '../pages/Notifications';
import UserSetting from '../pages/UserSettings'
import Payments from '../pages/Payments';
import ResetCodeProtectedRoute from '../components/ResetCodeProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}

        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/verify-code" element={<PublicRoute><VerifyCode /></PublicRoute>} />
        <Route
          path="/reset-password"
          element={
            <PublicRoute> 
              <ResetCodeProtectedRoute>
            <ResetPassword />
          </ResetCodeProtectedRoute>
          </PublicRoute>
           
          }
        />


        {/* Protected Routes with Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="application" element={<Application />} />
          <Route path="ProfileDetail" element={<ProfileDetail />} />
          <Route path="students" element={<StudentDashboard />} />
          <Route path="EditProfileModal" element={<EditProfileModal />} />
          <Route path="mytasks" element={<MyTasks />} />
          <Route path="programs" element={<ProgramSchool />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="UserSetting" element={<UserSetting />} />
          <Route path="payments" element={<Payments />} />
          {/* Add more nested routes here if needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
