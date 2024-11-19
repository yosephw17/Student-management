import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

// Lazy loading your pages
export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const StudentPage = lazy(() => import('src/pages/student'));
export const SProjects = lazy(() => import('src/pages/sprojects'));
function PrivateRoute({ element }) {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check if the user is authenticated
  return isAuthenticated ? element : <Navigate to="/" replace />;
}

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
      index: true,
    },
    {
      path: '/sprojects',
      element: <SProjects />,
      index: true,
    },
    {
      path: '/',
      element: <LoginPage />,
      index: true,
    },
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'index', element: <PrivateRoute element={<IndexPage />} />, index: true },
        { path: 'user', element: <PrivateRoute element={<UserPage />} /> },
        { path: 'projects', element: <PrivateRoute element={<ProductsPage />} /> },
        { path: 'home', element: <PrivateRoute element={<StudentPage />} /> },
        { path: 'notifications', element: <PrivateRoute element={<StudentPage />} /> },
        { path: 'blog', element: <PrivateRoute element={<BlogPage />} /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'students',
      element: <StudentPage />,
    },
    {
      title: 'Home',
      path: '/home',
    },

    {
      title: 'Notifications',
      path: '/notifications',
    },
  ]);

  return routes;
}
