import 'dotenv/config';
import express from 'express';
import { invokeAgent } from './agent.js';

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// --- THIS IS THE NEW LINE ---
// Serve static files (HTML, CSS, etc.) from the 'public' directory
app.use(express.static('public'));

// Root endpoint for health checks (now mostly handled by the static server)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// The main endpoint to interact with the agent
app.post('/invoke', async (req, res) => {
  const { message, session_id } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const result = await invokeAgent(message, session_id);
    res.json(result);
  } catch (error) {
    console.error('Error invoking agent:', error);
    res.status(500).json({ error: 'An internal error occurred.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});