import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Card,
  IconButton,
  InputAdornment,
  Dialog,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import {
  ErrorResponse,
  RegisterInput,
  RegisterModalProps,
  RegisterResponse,
} from "@/typescript/auth.inerface";

// Validation schema
const schema = yup.object({
  name: yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required();

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: yupResolver(schema),
    mode: "onTouched", // better UX, validate on touched fields
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    try {
      const response = await axios.post<RegisterResponse>("/api/functions/auth", {
        ...data,
        action: "register",
      });

      alert(response.data.message);
      reset();
      onClose();
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      if (!err.response) {
        console.error("Network error:", err.message);
        alert("Network error. Please check your connection or server.");
        return;
      }

      console.error("Error response:", err.response);
      alert(err.response.data?.error || "An unexpected error occurred");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Card sx={{ p: 4, boxShadow: 5, borderRadius: 4, background: "#f3e5f5" }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
          />
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete="email"
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
            autoComplete="new-password"
            required
            aria-invalid={!!errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    type="button" // avoid submitting form
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
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Button
              onClick={onClose}
              sx={{ textTransform: "none", color: "#1976d2" }}
              aria-label="Switch to login modal"
              type="button"
            >
              Login here
            </Button>
          </Typography>
        </form>
      </Card>
    </Dialog>
  );
};

export default RegisterModal;
