# Setup Guide for Bebek Biru

This guide helps you set up the development environment for **Bebek Biru**, run the application on an Android Emulator, and execute tests.

## 1. Prerequisites

Before you begin, ensure you have the following installed on your machine:

*   **Node.js** (LTS version recommended, e.g., v18 or v20).
    *   Check version: `node -v`
*   **npm** (comes with Node.js).
*   **Java Development Kit (JDK)** (Version 11 or 17 recommended for Android builds).
    *   Check version: `java -version`
*   **Android Studio** (Required for Android Emulator).
    *   Install "Android SDK", "Android SDK Platform-Tools", and "Android Virtual Device".
    *   Set up an Android Virtual Device (AVD) via the Device Manager in Android Studio.

## 2. Installation

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the project directory**:
    ```bash
    cd bebek-biru
    ```
3.  **Install dependencies**:
    ```bash
    npm install --legacy-peer-deps
    ```
    *Note: The `--legacy-peer-deps` flag is important due to some version mismatches in React Native ecosystem libraries.*

## 3. Configuration (API Keys)

To fully enable the AI features (Chat & Mood Analysis), you need a Google Gemini API Key.

1.  Get an API key from [Google AI Studio](https://aistudio.google.com/).
2.  **Option A (Temporary/Quick):**
    Open `src/services/ai.ts` and replace the empty string or env variable logic with your key (Not recommended for commit).
    ```typescript
    const API_KEY = "YOUR_ACTUAL_API_KEY";
    ```
3.  **Option B (Proper Environment Variable):**
    *   Create a `.env` file in the root (if using expo-env) or simply export it in your shell before running start.
    *   *Note: This project currently checks `process.env.EXPO_PUBLIC_GEMINI_API_KEY`.*
    *   On Mac/Linux: `export EXPO_PUBLIC_GEMINI_API_KEY=your_key_here`

## 4. Running the App

### Start the Expo Server
```bash
npm start
```

### Run on Android Emulator
1.  Open **Android Studio** and launch your **Virtual Device (AVD)**.
2.  Once the emulator is running, go to your terminal where `npm start` is running.
3.  Press `a` to open on Android.
4.  Expo Go will install on the emulator and load the app.

*Troubleshooting:*
*   If the build fails with Gradle errors, ensure your `JAVA_HOME` environment variable is set correctly.
*   If you see "Network Error" on the emulator, ensure you have internet access on the device.

## 5. Running Tests

This project uses **Jest** for unit testing game logic.

To run the test suite:
```bash
npm test
```

You should see a report confirming that the game logic utilities (Coin calculations, Mood levels) are functioning correctly.

## 6. Project Structure

*   `src/components`: Reusable UI components (Buttons, Panels).
*   `src/components/home`: Specific sub-components for the Home Screen.
*   `src/components/modals`: The overlays for specific features (Mood, Shop, Chat).
*   `src/context`: Global state management (`GameContext`).
*   `src/screens`: Main screen views.
*   `src/services`: External logic (AI, Audio).
