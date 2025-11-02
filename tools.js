// --- THIS IS THE CORRECTED PART ---
// Import the default export from the CommonJS module first
import duckduckgo from 'duckduckgo-search-api';
// Then, destructure the 'search' function from the imported object
const { search } = duckduckgo;

import axios from 'axios';
import * as cheerio from 'cheerio';

// Tool 1: DuckDuckGo Search
export async function duckduckgo_search(query) {
  console.log(`[Tool] Performing search for: ${query}`);
  try {
    const searchResults = await search(query, { safeSearch: 'Strict' });
    if (!searchResults.results || searchResults.results.length === 0) {
      return 'No results found.';
    }
    // Format the results into a simple string for the LLM
    return searchResults.results.slice(0, 5).map(r => 
      `Title: ${r.title}\nURL: ${r.url}\nSnippet: ${r.description}`
    ).join('\n\n');
  } catch (error) {
    console.error('Error in DuckDuckGo search:', error);
    return 'Error performing search.';
  }
}

// Tool 2: Web Scraper
export async function scrape_website(url) {
  console.log(`[Tool] Scraping website: ${url}`);
  try {
    const response = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(response.data);
    
    // Try to get the main content, fall back to the whole body
    const mainContent = $('main').text() || $('body').text();
    
    // Clean up excessive whitespace
    return mainContent.replace(/\s\s+/g, ' ').trim().slice(0, 4000);
  } catch (error) {
    console.error('Error scraping website:', error);
    return `Error scraping URL. It might be inaccessible or timed out.`;
  }
}

// This is the definition the Gemini model needs to understand the tools
export const toolDeclarations = [
  {
    function_declarations: [
      {
        name: 'duckduckgo_search',
        description: 'Performs a DuckDuckGo search to find open source projects or general information.',
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'The search query.' }
          },
          required: ['query']
        }
      },
      {
        name: 'scrape_website',
        description: 'Scrapes the text content of a given URL, like a GitHub README or CONTRIBUTING file.',
        parameters: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'The URL to scrape.' }
          },
          required: ['url']
        }
      }
    ]
  }
];