

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const path = require("path");

    dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve files statically

// PostgreSQL connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "driveclone",
    password: "Chede@5844",
    port: 5432,
});

// Multer storage configuration
const storage = multer.diskStorage({
    destination: "uploads/", // Store files in 'uploads' folder
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

// Upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const { filename, mimetype, size } = req.file;
        const filepath = `/uploads/${filename}`;

        const result = await pool.query(
            "INSERT INTO files (filename, filepath, file_size, file_type, uploaded_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [filename, filepath, size, mimetype, 1] // Replace 1 with the actual user ID
        );

        res.json({ message: "File uploaded successfully!", file: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch uploaded files
app.get("/files", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM files");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
