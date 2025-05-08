import {
    Drawer,
    List,
    ListItemIcon,
    ListItemText,
    Divider,
    Toolbar,
    IconButton,
    ListItemButton,
    Typography,
  } from "@mui/material";
  import {
    Home as HomeIcon,
    Book as BookIcon,
    Settings as SettingsIcon,
    Close as CloseIcon,
    AddCircle as AddCircleIcon,
  } from "@mui/icons-material";
  import { useRouter } from "next/router";
  import { useTheme } from "@mui/material/styles";
  
  const drawerWidth = 260;
  
  export default function Sidebar({
    isOpen,
    toggleSidebar,
  }: {
    isOpen: boolean;
    toggleSidebar: () => void;
  }) {
    const router = useRouter();
    const theme = useTheme();
  
    const menuItems = [
      { text: "Home", icon: <HomeIcon />, path: "/cms/home" },
      { text: "Books", icon: <BookIcon />, path: "/cms" },
      { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    ];
  
    const isActive = (path: string) => router.pathname === path;
  
    return (
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: theme.palette.mode === "dark" ? "#1e1e2f" : "#f7f9fc",
            color: theme.palette.text.primary,
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 2,
            background: theme.palette.mode === "dark" ? "#2b2b3d" : "#fff",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            📚 Dashboard
          </Typography>
          <IconButton onClick={toggleSidebar} color="inherit">
            <CloseIcon />
          </IconButton>
        </Toolbar>
  
        <Divider />
  
        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => {
                router.push(item.path);
                toggleSidebar();
              }}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                backgroundColor: isActive(item.path) ? theme.palette.primary.light : "transparent",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{ color: isActive(item.path) ? theme.palette.primary.main : "inherit" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontWeight: isActive(item.path) ? 600 : 500 }}
              />
            </ListItemButton>
          ))}
  
          <Divider sx={{ my: 1 }} />
  
        
          <ListItemButton
            onClick={() => {
              router.push("/cms/addbook");
              toggleSidebar();
            }}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 2,
              backgroundColor: "#e3f2fd",
              "&:hover": {
                backgroundColor: "#bbdefb",
              },
            }}
          >
            <ListItemIcon>
              <AddCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Add Book"
              primaryTypographyProps={{ fontWeight: 600, color: "primary.main" }}
            />
          </ListItemButton>
        </List>
      </Drawer>
    );
  }
  