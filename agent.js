import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import { duckduckgo_search, scrape_website, toolDeclarations } from './tools.js';

// Simple in-memory storage for conversation history
const sessions = new Map();

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-001',
  systemInstruction: `You are the "Open Source Navigator," a friendly and helpful AI assistant. Your mission is to help users, especially beginners and non-coders, contribute to open-source projects. Always be encouraging, clear, and avoid overly technical jargon.`,
});

const availableTools = {
  duckduckgo_search,
  scrape_website,
};

export async function invokeAgent(message, sessionId) {
  // Get or create a session
  if (!sessionId) {
    sessionId = uuidv4();
    sessions.set(sessionId, { history: [] });
  }
  const session = sessions.get(sessionId);

  const chat = model.startChat({
    history: session.history,
    tools: toolDeclarations,
  });

  const result = await chat.sendMessage(message);
  let response = result.response;
  
  // This is the final text we will send back to the user.
  // We initialize it here in case there are no tool calls.
  let responseText = response.text();

  // Handle tool calls if the model requests them
  if (response.functionCalls) {
    let calls = response.functionCalls;
    if (!Array.isArray(calls)) {
      calls = [calls];
    }
    
    const toolResponses = [];

    for (const call of calls) {
      const toolName = call.name;
      const toolArgs = call.args;

      if (availableTools[toolName]) {
        const toolResult = await availableTools[toolName](...Object.values(toolArgs));
        toolResponses.push({
          functionName: toolName,
          response: { name: toolName, content: toolResult },
        });
      }
    }
    
    // Send the tool results back to the model
    const secondResult = await chat.sendMessage(JSON.stringify(toolResponses));
    // The final text response comes from this second result
    responseText = secondResult.response.text();
  }

  // --- THIS IS THE CORRECTED PART ---
  // Instead of manually managing history, get the full, updated history 
  // from the chat object itself. This includes the tool calls and responses.
  const updatedHistory = await chat.getHistory();
  session.history = updatedHistory;
  // --- END OF CORRECTION ---

  return { response: responseText, session_id: sessionId };
}