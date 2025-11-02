# Open Source Navigator 🧭

An AI-powered chat agent designed to help beginners and non-coders find and contribute to open-source projects. This project provides a friendly, conversational interface to demystify the world of open source.

## Core Features

*   **🔍 Project Discovery:** Users can describe their skills (e.g., design, writing, coding) and interests (e.g., environmentalism, mental health), and the agent will search the web to find relevant open-source projects.
*   **💡 Onboarding Guidance:** The agent can be given a URL to a GitHub repository. It will use its web-scraping tool to read the `README.md` or `CONTRIBUTING.md` files and answer specific questions about project setup, contribution rules, and how to get started.
*   **🧠 Conversational Memory:** The agent remembers the context of your conversation, allowing for natural, multi-turn follow-up questions.
*   **🎨 Polished UI:** A clean, modern, and responsive chat interface for a great user experience.

<img width="3146" height="4145" alt="screencapture-localhost-8000-2025-11-02-18_52_38" src="https://github.com/user-attachments/assets/2b2666b6-5f70-4e3f-9da6-8983fc911882" />
<img width="2106" height="2215" alt="screencapture-localhost-8000-2025-11-02-17_38_12" src="https://github.com/user-attachments/assets/4255f099-4edc-4fdc-8437-7af59ef83c31" />
<img width="2106" height="3552" alt="screencapture-localhost-8000-2025-11-02-17_37_54" src="https://github.com/user-attachments/assets/36f594ce-71ce-479b-8071-6cda4bd8c1de" />\

https://github.com/user-attachments/assets/1e46b4a9-c92a-4bbb-a701-87c1f74e7a43


## Tech Stack

*   **Backend:** Node.js with Express.js
*   **AI Model:** Google Gemini 1.5 Flash
*   **AI Functionality:** Function Calling / Tool Use for dynamic actions
*   **Tools:**
    *   DuckDuckGo for web search
    *   Axios & Cheerio for web scraping
*   **Frontend:** HTML, CSS, and vanilla JavaScript (with the Marked.js library for Markdown rendering)
*   **Deployment:** Docker & Docker Compose for easy, containerized setup

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   [Docker](https://www.docker.com/products/docker-desktop/)
*   [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)
*   A **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

## How to Run

1.  **Clone or Download the Repository:**
    Get all the project files onto your local machine.

2.  **Create the Environment File:**
    In the root of the project directory, create a file named `.env`.

3.  **Add Your API Key:**
    Open the `.env` file and add your Gemini API key like this:
    ```
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Install Local Dependencies (Optional but Recommended):**
    This step helps your code editor with features like autocompletion.
    ```bash
    npm install
    ```

5.  **Build and Run the Docker Container:**
    From the root of your project directory, run the following command. This will build the Docker image and start the application.
    ```bash
    docker-compose up --build
    ```
    The server will start, and you will see log output in your terminal.

## How to Use

Once the Docker container is running, simply open your web browser and navigate to:

**`http://localhost:8000`**
