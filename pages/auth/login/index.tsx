// import { useState } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Card,
//   Box,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import RegisterModal from "../registration";
// import { Dialog } from "@mui/material";


// // Validation Schema
// const schema = yup.object().shape({
//   email: yup.string().email("Invalid email format").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
// });

// const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isRegisterOpen, setRegisterOpen] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data: { email: string; password: string }) => {
//     setLoading(true);
//     try {
//       const response = await axios.post("/api/functions/auth", { ...data, action: "login" });
//       alert(response.data.message);
//       reset();
//     } catch (error: any) {
//       alert(error.response?.data?.error || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       {/ <Container maxWidth="sm" sx={{ padding: 3 }}> /}
//         <Card sx={{ p: 4, boxShadow: 5 ,width:400 }}>
//           <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#1976d2" }}>
//             Login
//           </Typography>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/ Email Field /}
//             <TextField sx={{mb:3}}fullWidth label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />

//             {/ Password Field /}
//             <TextField
//               fullWidth
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               {...register("password")}
//               error={!!errors.password}
//               helperText={errors.password?.message}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             {/ Login Button /}
//             <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
//               {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
//             </Button>

//             {/ Register Link /}
//             <Typography align="center" sx={{ mt: 2 }}>
//               Don't have an account?{" "}
//               <Button onClick={() => setRegisterOpen(true)} sx={{ textTransform: "none", color: "#1976d2" }}>
//                 Register here
//               </Button>
//             </Typography>
//           </form>
//         </Card>
//       {/ </Container> /}

//       {/ Register Modal (Open only when triggered) /}
//       <RegisterModal open={isRegisterOpen} onClose={() => setRegisterOpen(false)} />
//     </Dialog>
//   );
// };
// export default LoginModal;




import { FC,useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  CircularProgress,
  IconButton,
  InputAdornment,
  Dialog,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import RegisterModal from "../registration";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { LoginFormInputs } from "@/typescript/auth.inerface";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void; // Zustand login trigger
}

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginModal: FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const router = useRouter();
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<LoginFormInputs>({
      resolver: yupResolver(schema),
    });
  
    const onSubmit = async (data: LoginFormInputs) => {
      setLoading(true);
      try {
        const response = await axios.post("/api/functions/auth", {
          ...data,
          action: "login",
        });
        alert(response.data.message);
        reset();
        onLogin();
        onClose();
        router.push("/cms/home");
      } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        alert(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
        <Dialog open={open} onClose={onClose}>
          <Card sx={{ p: 4, boxShadow: 5, width: 400 }}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Login
            </Typography>
  
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Email"
                sx={{ mb: 3 }}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
  
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Login"
                )}
              </Button>
  
              <Typography align="center" sx={{ mt: 2 }}>
                Do not have an account?{" "}
                <Button
                  onClick={() => setRegisterOpen(true)}
                  sx={{ textTransform: "none", color: "#1976d2" }}
                >
                  Register here
                </Button>
              </Typography>
            </form>
          </Card>
        </Dialog>
  
        <RegisterModal
          open={isRegisterOpen}
          onClose={() => setRegisterOpen(false)}
        />
      </>
    );
  };
  
  export default LoginModal;