import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import DashboardLayout from "@/layout/dashboard/dashboardlayout";
import Link from "next/link";

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
    image: "https://5.imimg.com/data5/IU/SQ/GD/SELLER-43618059/book-cover-page-design.jpg",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
];

export default function HomePage() {
  return (
    <DashboardLayout>
      <Box sx={{ p: 4, backgroundColor: "#f4f4f4", borderRadius: 2 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
            Welcome to BookNest 📚
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Discover your next great read from our curated collection of timeless classics and modern bestsellers.
          </Typography>
          <Link href="/cms" passHref>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 2,
                textTransform: "capitalize",
                fontWeight: 600,
                letterSpacing: 1.2,
                paddingX: 4,
              }}
            >
              Browse All Books
            </Button>
          </Link>
        </Box>

        {/* Featured Books Section */}
        <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 3 }}>
          {featuredBooks.map((book) => (
            <Card
              key={book.id}
              sx={{
                maxWidth: 300,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="350"
                image={book.image}
                alt={book.title}
                sx={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
              <CardContent sx={{ paddingTop: 2 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  by {book.author}
                </Typography>
                <Link href={`/book/${book.id}`} passHref>
                  <Button variant="outlined" color="primary" size="small" sx={{ textTransform: "none", fontWeight: 600 }}>
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </DashboardLayout>
  );
}
