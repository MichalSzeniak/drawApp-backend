import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

const app = express();
const port = 3001;
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || ""; // Zastąp własnym URL projektu
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// Przykład zapytania do bazy danych
app.get("/data", async (req, res) => {
  const { data, error } = await supabase.from("UserDraws").select("*");

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json(data);
});

// fetchData();

app.post("/data", async (req, res) => {
  const { data, error } = await supabase.from("UserDraws").insert([req.body]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
