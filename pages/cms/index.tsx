// import {
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Container,
//   Typography,
//   Alert,
//   Button,
//   Stack,
//   CircularProgress,
// } from "@mui/material";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import DashboardLayout from "@/layout/dashboard/dashboardlayout";
// import { useBooks } from "@/customHooks/query/usebook";

// type Book = {
//   id: number;
//   title: string;
//   desc: string;
//   cover: string | null;
// };

// export default function Booklist() {
//   const queryClient = useQueryClient();
//   const { data: books, isLoading, error } = useBooks();
//   const router = useRouter();

//   const handleUpdate = (bookId: number) => {
//     router.push(`/cms/updatebook/${bookId}`);
//   };

//   const deleteMutation = useMutation({
//     mutationFn: async (id: number) => {
//       await axios.delete(`/api/functions/deletebook?id=${id}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["books"] });
//     },
//     onError: (err) => {
//       console.error("❌ Error deleting book:", err);
//       alert("❌ Failed to delete book.");
//     },
//   });

//   const handleDelete = (id: number) => {
//     const confirmDelete = confirm(
//       "⚠️ Are you sure you want to delete this book?"
//     );
//     if (confirmDelete) {
//       deleteMutation.mutate(id);
//     }
//   };

//   if (isLoading) {
//     return (
//       <Container sx={{ textAlign: "center", mt: 4 }}>
//         <CircularProgress />
//         <Typography variant="h6" mt={2}>
//           ⏳ Loading books...
//         </Typography>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Alert severity="error">❌ Failed to load books</Alert>
//       </Container>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <Container maxWidth="lg" sx={{ mt: 4 }}>
//         <Box display="flex" justifyContent="center" mt={4}>
//           <Box display="flex" alignItems="center" gap={1}>
//             <Typography component="span" fontSize="2.5rem">
//               📚
//             </Typography>
//             <Typography
//               variant="h3"
//               fontWeight="bold"
//               gutterBottom
//               sx={{
//                 background:
//                   "linear-gradient(90deg, rgb(67, 221, 252) 0%, rgb(14, 232, 119) 100%)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               Discover Your Bookshelf
//             </Typography>
//           </Box>
//         </Box>

//         {books?.length === 0 ? (
//           <Alert severity="warning">⚠ No books found.</Alert>
//         ) : (
//           <Box
//             sx={{
//               display: "flex",
//               flexWrap: "wrap",
//               justifyContent: "flex-start", // Aligns items neatly
//               gap: 3,
//               mt: 4,
//             }}
//           >
//             {books.map((book: Book) => (
//               <Card
//                 key={book.id}
//                 sx={{
//                   flexBasis: "calc(25% - 24px)", // 4 cards per row
//                   borderRadius: 4,
//                   boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                   transition: "transform 0.3s ease-in-out",
//                   ":hover": {
//                     transform: "scale(1.03)",
//                     boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
//                   },
//                   "@media (max-width: 1200px)": {
//                     flexBasis: "calc(33.33% - 24px)", // 3 per row on medium screens
//                   },
//                   "@media (max-width: 900px)": {
//                     flexBasis: "calc(50% - 24px)", // 2 per row on tablets
//                   },
//                   "@media (max-width: 600px)": {
//                     flexBasis: "100%", // 1 per row on mobile
//                   },
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="180"
//                   image={book.cover ?? "/placeholder.png"}
//                   alt={book.title}
//                   sx={{ objectFit: "cover" }}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold" gutterBottom>
//                     {book.title}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{
//                       display: "-webkit-box",
//                       WebkitLineClamp: 3,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {book.desc}
//                   </Typography>
//                   <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
//                     <Button
//                       variant="contained"
//                       fullWidth
//                       onClick={() => handleUpdate(book.id)}
//                       sx={{
//                         background:
//                           "linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)",
//                         color: "#fff",
//                         fontWeight: "bold",
//                         textTransform: "none",
//                         "&:hover": {
//                           background:
//                             "linear-gradient(45deg, #5c0dbc, #1e63e9)",
//                         },
//                       }}
//                       startIcon={<span>✏️</span>}
//                     >
//                       Update
//                     </Button>

//                     <Button
//                       variant="outlined"
//                       fullWidth
//                       onClick={() => handleDelete(book.id)}
//                       sx={{
//                         borderColor: "#f44336",
//                         color: "#f44336",
//                         fontWeight: "bold",
//                         textTransform: "none",
//                         "&:hover": {
//                           backgroundColor: "#ffeaea",
//                           borderColor: "#d32f2f",
//                         },
//                       }}
//                       startIcon={<span>🗑</span>}
//                     >
//                       Delete
//                     </Button>
//                   </Stack>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         )}
//       </Container>
//     </DashboardLayout>
//   );
// }

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Alert,
  Button,
  Stack,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/layout/dashboard/dashboardlayout";
import { useBooks } from "@/customHooks/query/usebook";
import React from "react";
import Image from "next/image";

type Book = {
  id: number;
  title: string;
  desc: string;
  cover: string | null;
};

export default function Booklist() {
  const queryClient = useQueryClient();
  const { data: books, isLoading, error } = useBooks();
  const router = useRouter();
  const [isCardView, setIsCardView] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleUpdate = (bookId: number) => {
    router.push(`/cms/updatebook/${bookId}`);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`/api/functions/deletebook?id=${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (err) => {
      console.error("❌ Error deleting book:", err);
      alert("❌ Failed to delete book.");
    },
  });

  const handleDelete = (id: number) => {
    const confirmDelete = confirm(
      "⚠️ Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      deleteMutation.mutate(id);
    }
  };

  const filteredBooks =
    books?.filter((book: Book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  const sortedBooks = [...filteredBooks].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  if (isLoading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          ⏳ Loading books...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">❌ Failed to load books</Alert>
      </Container>
    );
  }

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Header */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography component="span" fontSize="2.5rem">
              📚
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                background:
                  "linear-gradient(90deg, rgb(67, 221, 252) 0%, rgb(14, 232, 119) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Discover Your Bookshelf
            </Typography>
          </Box>
        </Box>

        {/* View Toggle + Search */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={4}
          flexWrap="wrap"
          gap={2}
        >
          <Button
            onClick={() => setIsCardView(!isCardView)}
            variant="contained"
            sx={{
              background: isCardView
                ? "linear-gradient(to right, #f7971e, #ffd200)"
                : "linear-gradient(to right, #00c6ff, #0072ff)",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 3,
              px: 3,
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            {isCardView ? "Switch to Table View" : "Switch to Card View"}
          </Button>

          <TextField
            label="Search by Title"
            variant="filled"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 250 }}
          />
        </Box>

        {/* Content */}
        {sortedBooks.length === 0 ? (
          <Alert severity="warning">⚠ No books found.</Alert>
        ) : isCardView ? (
          // Card View
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mt: 2,
            }}
          >
            {sortedBooks.map((book) => (
              <Card
                key={book.id}
                sx={{
                  flexBasis: "calc(25% - 24px)",
                  borderRadius: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease-in-out",
                  ":hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                  },
                  "@media (max-width: 1200px)": {
                    flexBasis: "calc(33.33% - 24px)",
                  },
                  "@media (max-width: 900px)": {
                    flexBasis: "calc(50% - 24px)",
                  },
                  "@media (max-width: 600px)": {
                    flexBasis: "100%",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={book.cover ?? "/placeholder.png"}
                  alt={book.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {book.desc}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleUpdate(book.id)}
                      sx={{
                        background:
                          "linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)",
                        color: "#fff",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": {
                          background: "linear-gradient(45deg, #5c0dbc, #1e63e9)",
                        },
                      }}
                      startIcon={<span>✏️</span>}
                    >
                      Update
                    </Button>

                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleDelete(book.id)}
                      sx={{
                        borderColor: "#f44336",
                        color: "#f44336",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#ffeaea",
                          borderColor: "#d32f2f",
                        },
                      }}
                      startIcon={<span>🗑</span>}
                    >
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          // Table View
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Cover</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell align="center">
                      <Image
                        src={book.cover ?? "/placeholder.png"}
                        alt={book.title}
                        width={80}
                        height={80}
                        style={{ objectFit: "cover", borderRadius: "4px" }}
                      />
                    </TableCell>
                    <TableCell align="center">{book.title}</TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        sx={{
                          maxWidth: "300px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {book.desc}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                          variant="contained"
                          onClick={() => handleUpdate(book.id)}
                          sx={{
                            background:
                              "linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)",
                            color: "#fff",
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": {
                              background: "linear-gradient(45deg, #5c0dbc, #1e63e9)",
                            },
                          }}
                          startIcon={<span>✏️</span>}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleDelete(book.id)}
                          sx={{
                            borderColor: "#f44336",
                            color: "#f44336",
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "#ffeaea",
                              borderColor: "#d32f2f",
                            },
                          }}
                          startIcon={<span>🗑</span>}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </DashboardLayout>
  );
}
