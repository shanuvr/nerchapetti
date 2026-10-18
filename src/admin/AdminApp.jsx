import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ParishProfile = lazy(() => import('./pages/ParishProfile'));
const Slogans = lazy(() => import('./pages/Slogans'));
const Branding = lazy(() => import('./pages/Branding'));
const Payments = lazy(() => import('./pages/Payments'));

function PageFallback() {
  return (
    <div className="flex flex-col items-center gap-3 py-24">
      <span className="w-6 h-6 rounded-full border-2 border-blue-400/25 border-t-blue-600 animate-spin" />
      <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500 font-semibold">Loading</p>
    </div>
  );
}

export default function AdminApp() {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <Suspense fallback={<PageFallback />}>
            <Login />
          </Suspense>
        }
      />
      <Route element={<AdminLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<PageFallback />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="parish"
          element={
            <Suspense fallback={<PageFallback />}>
              <ParishProfile />
            </Suspense>
          }
        />
        <Route
          path="slogans"
          element={
            <Suspense fallback={<PageFallback />}>
              <Slogans />
            </Suspense>
          }
        />
        <Route
          path="branding"
          element={
            <Suspense fallback={<PageFallback />}>
              <Branding />
            </Suspense>
          }
        />
        <Route
          path="payments"
          element={
            <Suspense fallback={<PageFallback />}>
              <Payments />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}
