// import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useState } from "react";
// import LoginModal from "@/pages/auth/login";

// export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
//   const [isLoginOpen, setLoginOpen] = useState(false);

//   return (
//     <>
//       <AppBar position="fixed" sx={{ width: "100%" }}>
//         <Toolbar>
//           {/ Menu Icon for opening Sidebar /}
//           <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
//             <MenuIcon />
//           </IconButton>

//           {/ Title /}
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             📚 My Book Store
//           </Typography>

//           {/ Login Button /}
//           <Button color="inherit" onClick={() => setLoginOpen(true)}>
//             🔑 Login
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/ Login Modal /}
//       <LoginModal open={isLoginOpen} onClose={() => setLoginOpen(false)} />
//     </>
//   );
// }

// import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useState } from "react";
// import LoginModal from "@/pages/auth/login";
// import { useAuthStore } from "@/toolkit/store/store";

// export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
//   const [isLoginModalOpen, setLoginModalOpen] = useState(false);

//   const { isLoggedIn, login, logout } = useAuthStore();

//   const handleLogin = () => {
//     login();              // Zustand login
//     setLoginModalOpen(false);
//   };

//   return (
//     <>
//       <AppBar position="fixed" sx={{ width: "100%" }}>
//         <Toolbar>
//           {/ Sidebar Toggle /}
//           <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
//             <MenuIcon />
//           </IconButton>

//           {/ Title /}
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             📚 My Book Store
//           </Typography>

//           {/ Login / Logout Toggle /}
//           {isLoggedIn ? (
//             <Button color="inherit" onClick={logout}>
//               🚪 Logout
//             </Button>
//           ) : (
//             <Button color="inherit" onClick={() => setLoginModalOpen(true)}>
//               🔑 Login
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/ Login Modal (calls Zustand login on success) /}
//       <LoginModal open={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} onLogin={handleLogin} />
//     </>
//   );
// }
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import LoginModal from "@/pages/auth/login";
import { useAuthStore } from "@/toolkit/store/store";
import { useRouter } from "next/router";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { isLoggedIn, login, logout } = useAuthStore();
  const router = useRouter();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLoginSuccess = () => {
    login();
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <AppBar position="fixed" sx={{ width: "100%" }}>
        <Toolbar
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>

          <Typography component="span" fontSize={isSmallScreen ? "1.8rem" : "2.5rem"}>
            📚
          </Typography>

          <Typography
            variant={isSmallScreen ? "h6" : "h4"}
            fontWeight="bold"
            sx={{
              flexGrow: 1,
              minWidth: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              background:
                "linear-gradient(90deg, rgb(210, 253, 80) 0%, rgb(248, 57, 229) 60%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              userSelect: "none",
            }}
          >
            My Book Store DashBoard
          </Typography>

          {isLoggedIn ? (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ whiteSpace: "nowrap" }}
              size={isSmallScreen ? "small" : "medium"}
            >
              🚪 Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => setLoginModalOpen(true)}
              sx={{ whiteSpace: "nowrap" }}
              size={isSmallScreen ? "small" : "medium"}
            >
              🔑 Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </>
  );
}
