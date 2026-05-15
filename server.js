require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files (index.html, styles.css, script.js)
app.use(express.static(path.join(__dirname)));

// API Route for chat
app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({ error: "Le message est requis" });
        }

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // You can use gpt-4o or another model
            messages: [
                {
                    role: "system",
                    content: "Tu es l'assistant virtuel de 'Edenfrom Engineering', une entreprise d'ingénierie civile et industrielle basée au Congo Brazzaville. Tu dois répondre de manière professionnelle, courte et cordiale pour aider les clients avec leurs projets."
                },
                { role: "user", content: userMessage }
            ],
            max_tokens: 250,
            temperature: 0.7,
        });

        const reply = response.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        console.error("Erreur OpenAI:", error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la communication avec l'assistant." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log(`L'assistant est prêt à recevoir des messages.`);
});
