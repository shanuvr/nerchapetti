import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// Parish Console is lazy-loaded so church kiosk displays never download admin chunks
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Kiosk — the parishioner-facing touchscreen screens */}
        <Route path="/" element={<App />} />

        {/* Admin — the parish control panel */}
        <Route
          path="/admin/*"
          element={
            <Suspense
              fallback={
                <div className="min-h-dvh w-full flex items-center justify-center bg-slate-950">
                  <span className="w-6 h-6 rounded-full border-2 border-blue-400/25 border-t-blue-500 animate-spin" />
                </div>
              }
            >
              <AdminApp />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
