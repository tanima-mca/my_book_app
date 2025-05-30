import {
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  InputAdornment,
} from "@mui/material";
import DashboardLayout from "@/layout/dashboard/dashboardlayout";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";

const featuredBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
  },
  {
    id: 2,
    title: "Wise Steps For Success",
    author: "Martin Louis Amis",
    image:
      "https://5.imimg.com/data5/IU/SQ/GD/SELLER-43618059/book-cover-page-design.jpg",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    image: "https://images.unsplash.com/photo-1601582581001-c5f4f270ac02",
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    image: "https://images.unsplash.com/photo-1578926287942-824c2b91b6cb",
  },
  {
    id: 6,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    image: "https://images.unsplash.com/photo-1576109126793-3c3f2b3cf13e",
  },
  {
    id: 7,
    title: "Becoming",
    author: "Michelle Obama",
    image: "https://images.unsplash.com/photo-1586487091833-6b8b6ac1d618",
  },
  {
    id: 8,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136",
  },
];

const genres = [
  "Fiction",
  "Self-help",
  "Mystery",
  "History",
  "Sci-Fi",
  "Romance",
];

export default function HomePage() {
  return (
    <DashboardLayout>
      <Box sx={{ px: 4, py: 6, minHeight: "100vh" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            📚 Welcome to <span style={{ color: "#ff6f61" }}>BookNest</span>
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={3}>
            Discover timeless stories, modern gems & your next great read.
          </Typography>

          {/* Search Bar */}
          <Box maxWidth="500px" mx="auto" mb={3}>
            <TextField
              fullWidth
              placeholder="Search for a book, author, or genre"
              variant="outlined"
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Link href="/cms" passHref>
            <Button
              variant="contained"
              size="large"
              sx={{
                textTransform: "capitalize",
                fontWeight: 600,
                px: 4,
                background: "linear-gradient(to right, #ff6f61, #ff9472)",
                color: "#fff",
                "&:hover": {
                  background: "linear-gradient(to right, #ff9472, #ff6f61)",
                  boxShadow: 4,
                },
              }}
            >
              Browse All Books
            </Button>
          </Link>
        </Box>

        {/* Genres */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
            Explore by Genre
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                clickable
                color="secondary"
                variant="filled"
                sx={{
                  fontWeight: "bold",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#ff9472",
                    color: "#fff",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Featured Books */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" mb={3}>
            🌟 Featured Books
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 3,
              }}
            >
              {featuredBooks.map((book) => (
                <Box
                  key={book.id}
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3,
                    transition: "box-shadow 0.3s",
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ width: "100%", height: 280, p: 1.5 }}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        borderRadius: 1,
                        overflow: "hidden",
                        "&:hover img": {
                          transform: "scale(1.08)",
                        },
                        "& img": {
                          transition: "transform 0.3s ease-in-out",
                        },
                      }}
                    >
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </Box>
                  </Box>

                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      by {book.author}
                    </Typography>
                    <Link href={`/book/${book.id}`} passHref>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          borderColor: "#ff6f61",
                          color: "#ff6f61",
                          "&:hover": {
                            backgroundColor: "#ff6f61",
                            color: "#fff",
                            borderColor: "#ff6f61",
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Link>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Stats Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" mb={3}>
            📈 BookNest in Numbers
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {[
              { label: "Books", value: "1,200+" },
              { label: "Authors", value: "450+" },
              { label: "Happy Readers", value: "25,000+" },
            ].map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  backgroundColor: "#ffffff",
                  px: 4,
                  py: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                  minWidth: 160,
                }}
              >
                <Typography variant="h4" color="secondary">
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1">{stat.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Newsletter Section */}
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            py: 6,
            px: 3,
            borderRadius: 0,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Stay Updated ✉️
          </Typography>
          <Typography variant="body1" mb={3}>
            Subscribe to our newsletter and never miss a new release!
          </Typography>
          <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap">
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              size="small"
              sx={{ width: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              size="small"
              sx={{
                background: "linear-gradient(to right, #ff6f61, #ff9472)",
                color: "#fff",
                "&:hover": {
                  background: "linear-gradient(to right, #ff9472, #ff6f61)",
                  boxShadow: 3,
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
