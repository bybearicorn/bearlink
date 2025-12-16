import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/layout/layout";
import { AppProviders } from "./contexts/app-providers";
import { BurnLinkReadPageProvider } from "./pages/burn-link-read/burn-link-read.context";
import { BurnLinkReadPage } from "./pages/burn-link-read/burn-link-read.page";
import { BurnLinkPageProvider } from "./pages/burn-link/burn-link.context";
import { BurnLinkPage } from "./pages/burn-link/burn-link.page";

const AppRoutes = () => (
  <Routes>
    <Route
      element={
        <BurnLinkPageProvider>
          <BurnLinkPage />
        </BurnLinkPageProvider>
      }
      index={true}
    />

    <Route
      element={
        <BurnLinkReadPageProvider>
          <BurnLinkReadPage />
        </BurnLinkReadPageProvider>
      }
      path="read"
    />
  </Routes>
);

export const App = () => (
  <BrowserRouter>
    <AppProviders>
      <Layout>
        <AppRoutes />
      </Layout>
    </AppProviders>
  </BrowserRouter>
);
