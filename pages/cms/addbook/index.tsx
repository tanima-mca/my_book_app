import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  useTheme,
  Alert,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

export default function AddBookPage() {
  const theme = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState<{
    title: string;
    desc: string;
    cover: File | null;
  }>({
    title: "",
    desc: "",
    cover: null,
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "cover" && files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        setError("❌ Please upload a valid image file.");
        return;
      }
      setFormData((prev) => ({ ...prev, cover: file }));
      setError("");
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("desc", formData.desc);
    if (formData.cover) {
      data.append("cover", formData.cover);
    }

    try {
      const response = await axios.post("/api/functions/addbook", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`✅ Book added: ${response.data.book.title}`);
      setFormData({ title: "", desc: "", cover: null });
    } catch (error) {
      console.error("❌ Failed to add book:", error);
      alert("❌ Failed to add book!");
      setError("❌ Something went wrong while adding the book.");
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
        px: 2,
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, #fce3ec, #ffffff)"
            : "linear-gradient(135deg, #2e2e2e, #1a1a1a)",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 540,
          p: 4,
          borderRadius: 4,
          backdropFilter: "blur(12px)",
          backgroundColor:
            theme.palette.mode === "light" ? "#ffffffcc" : "#1a1a1acc",
          boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          gutterBottom
          sx={{ mb: 3 }}
        >
          📘 Add a New Book
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="📖 Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              size="small"
              required
            />
            <TextField
              label="📝 Description"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              size="small"
              required
            />

            <Button
              variant="outlined"
              component="label"
              sx={{
                borderStyle: "dashed",
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "medium",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              📂 Upload Cover
              <input
                type="file"
                name="cover"
                accept="image/*"
                hidden
                onChange={handleChange}
              />
            </Button>

            {formData.cover && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Image
                  src={URL.createObjectURL(formData.cover)}
                  alt="Cover Preview"
                  width={250}
                  height={350}
                  style={{
                    borderRadius: 12,
                    objectFit: "cover",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
                  }}
                />
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                type="submit"
                size="large"
                color="primary"
                sx={{
                  flex: 1,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 3,
                  transition: "0.3s",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                🚀 Add Book
              </Button>

              <Button
                variant="outlined"
                size="large"
                color="secondary"
                onClick={() => router.push("/cms")}
                sx={{
                  flex: 1,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 3,
                  borderWidth: 2,
                  borderColor: theme.palette.secondary.main,
                  transition: "0.3s",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    borderColor: theme.palette.secondary.dark,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                🔙 Back to Book List
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
