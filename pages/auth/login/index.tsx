import { FC, useState } from "react";
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
import axios, { AxiosError } from "axios";
import RegisterModal from "../registration";
import { useRouter } from "next/router";
import { LoginFormInputs, LoginModalProps } from "@/typescript/auth.inerface";





// Validation Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
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
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <Card
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            boxShadow: 5,
            width: { xs: "100%" },
            mx: "auto",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Login
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label="Email"
              sx={{ mb: 3 }}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              autoComplete="email"
              autoFocus
              required
              aria-invalid={!!errors.email}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="current-password"
              required
              aria-invalid={!!errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label={showPassword ? "Hide password" : "Show password"}
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
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2 }}>
            Dont have an account?{" "}
            <Button
              onClick={() => setRegisterOpen(true)}
              sx={{ textTransform: "none", color: "#1976d2" }}
              aria-label="Open registration modal"
            >
              Register here
            </Button>
          </Typography>
        </Card>

        {/* Register Modal */}
        <RegisterModal
          open={isRegisterOpen}
          onClose={() => setRegisterOpen(false)}
        />
      </Dialog>
    </>
  );
};

export default LoginModal;
