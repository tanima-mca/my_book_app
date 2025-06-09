// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   CircularProgress,
//   Alert,
//   Box,
//   Card,
//   CardContent,
//   useTheme,
// } from "@mui/material";
// import DashboardLayout from "@/layout/dashboard/dashboardlayout";
// import Image from "next/image"; // Import Image from next/image
// import axios, { AxiosError, AxiosResponse } from "axios";

// interface Book {
//   title: string;
//   desc: string;
//   cover: string;
// }

// export default function UpdateBook() {
//   const router = useRouter();
//   const { id } = router.query;
//   const theme = useTheme();

//   const [book, setBook] = useState<Book>({ title: "", desc: "", cover: "" });
//   const [coverFile, setCoverFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`/api/functions/${id}`)
//         .then((response: AxiosResponse<Book>) => {
//           setBook(response.data);
//           setLoading(false);
//         })
//         .catch(( ) => {
//           const errorMessage =
//             "Failed to load book details.";
//           setError(errorMessage);
//           setLoading(false);
//         });
//     }
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBook({ ...book, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setCoverFile(file);
//       setBook({ ...book, cover: URL.createObjectURL(file) });
//     }
//   };

//   const handleUpdate = async () => {
//     if (!id) {
//       alert("❌ Book ID is missing.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("id", String(id));
//     formData.append("title", book.title);
//     formData.append("desc", book.desc);
//     if (coverFile) {
//       formData.append("cover", coverFile);
//     }

//     try {
//       await axios.put("/api/functions/updatebook", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("✅ Book updated successfully!");
//       router.push("/cms");
//     } catch (err) {
//       // Cast the error to an AxiosError to access its properties
//       if (err instanceof AxiosError) {
//         const errorMessage = err.response?.data?.message || "Unknown error";
//         alert(`❌ Failed to update book: ${errorMessage}`);
//       } else {
//         alert("❌ Failed to update book: Unknown error");
//       }
//     }
//   };
//   if (loading)
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           mt: 10,
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );

//   return (
//     <DashboardLayout>
//       <Container
//         maxWidth="md"
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Card
//           sx={{
//             width: "500px",
//             p: 4,
//             borderRadius: 4,
//             boxShadow: 12,
//             backdropFilter: "blur(8px)",
//             background: theme.palette.mode === "light" ? "#fff" : "#ba68c8",
//           }}
//         >
//           <Typography
//             variant="h4"
//             textAlign="center"
//             color="primary"
//             gutterBottom
//             sx={{ fontWeight: 700 }}
//           >
//             ✏️ Edit Book Details
//           </Typography>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           <CardContent>
//             <TextField
//               label="📖 Book Title"
//               name="title"
//               value={book.title}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//             />

//             <TextField
//               label="📝 Description"
//               name="desc"
//               value={book.desc}
//               onChange={handleChange}
//               fullWidth
//               multiline
//               rows={3}
//               margin="normal"
//               variant="outlined"
//             />

//             <Button component="label" variant="contained" sx={{ mt: 2, mb: 2 }}>
//               📤 Upload Cover Image
//               <input
//                 type="file"
//                 hidden
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </Button>

//             {book.cover && typeof book.cover === "string" && (
//               <Box sx={{ textAlign: "center", mt: 3 }}>
//                 <Image
//                   src={book.cover} // Ensure book.cover is a valid URL string
//                   alt="Book Cover"
//                   width={300}
//                   height={450}
//                   style={{
//                     borderRadius: "12px",
//                     objectFit: "cover",
//                     boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
//                   }}
//                 />
//               </Box>
//             )}

//             <Box
//               sx={{
//                 mt: 4,
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: 3,
//                 flexWrap: "wrap",
//               }}
//             >
//               <Button
//                 variant="contained"
//                 color="success"
//                 onClick={handleUpdate}
//                 sx={{
//                   px: 4,
//                   py: 1.5,
//                   borderRadius: "8px",
//                   fontWeight: "bold",
//                   textTransform: "none",
//                   transition: "all 0.3s",
//                   "&:hover": {
//                     backgroundColor: "#2e7d32",
//                     transform: "scale(1.05)",
//                   },
//                 }}
//               >
//                 💾 Save Changes
//               </Button>

//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={() => router.push("/cms")}
//                 sx={{
//                   px: 4,
//                   py: 1.5,
//                   borderRadius: "8px",
//                   fontWeight: "bold",
//                   textTransform: "none",
//                   transition: "all 0.3s",
//                   "&:hover": {
//                     backgroundColor: "#ffcdd2",
//                     color: "#b71c1c",
//                     transform: "scale(1.05)",
//                   },
//                 }}
//               >
//                 🔙 Cancel
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       </Container>
//     </DashboardLayout>
//   );
// }

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import DashboardLayout from "@/layout/dashboard/dashboardlayout";
import Image from "next/image";
import axios, { AxiosError, AxiosResponse } from "axios";

interface Book {
  title: string;
  desc: string;
  cover: string;
}

export default function UpdateBook() {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();

  const [book, setBook] = useState<Book>({ title: "", desc: "", cover: "" });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/functions/${id}`)
        .then((response: AxiosResponse<Book>) => {
          setBook(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load book details.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setBook({ ...book, cover: URL.createObjectURL(file) });
    }
  };

  const handleUpdate = async () => {
    if (!id) {
      alert("❌ Book ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("title", book.title);
    formData.append("desc", book.desc);
    if (coverFile) {
      formData.append("cover", coverFile);
    }

    try {
      await axios.put("/api/functions/updatebook", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Book updated successfully!");
      router.push("/cms");
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message || "Unknown error";
        alert(`❌ Failed to update book: ${errorMessage}`);
      } else {
        alert("❌ Failed to update book: Unknown error");
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DashboardLayout>
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card
          sx={{
            width: "500px",
            p: 4,
            borderRadius: 4,
            boxShadow: 12,
            backdropFilter: "blur(8px)",
            background: theme.palette.mode === "light" ? "#fff" : "#ba68c8",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            ✏️ Edit Book Details
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <CardContent>
            <TextField
              label="📖 Book Title"
              name="title"
              value={book.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />

            <TextField
              label="📝 Description"
              name="desc"
              value={book.desc}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
            />
            {book.cover && (
              <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
                <Typography variant="subtitle1">📷 Current Cover:</Typography>
                <Image
                   src={book.cover} // Ensure book.cover is a valid URL string
                   alt="Book Cover"
                   width={300}
                   height={450}
                   style={{
                     borderRadius: "12px",
                     objectFit: "cover",
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                   }}
                 />
              </Box>
            )}

            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ my: 2 }}
            >
              Upload New Cover
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpdate}
              sx={{ mt: 2 }}
            >
              💾 Update Book
            </Button>
          </CardContent>
        </Card>
      </Container>
    </DashboardLayout>
  );
}
