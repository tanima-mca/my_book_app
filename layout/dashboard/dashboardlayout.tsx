import { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center",
          textAlign: "center", 
          minHeight: "calc(100vh - 64px)" // Adjust for Header height
        }}
      >
        <Toolbar /> 
        {children}
      </Box>
    </Box>
    </>
  );
}
