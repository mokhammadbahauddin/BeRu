# Product Requirements Document (PRD): ViralLoop - Content Repurposing Engine

## 1. Product Vision
ViralLoop is a content repurposing engine designed to help creators turn one piece of long-form content (YouTube video) into a week's worth of high-engagement social media posts. The goal is to stop summarizing and start repurposing.

## 2. Technical Foundation
*   **Framework**: React Native (Expo SDK 51+) targeting Web.
*   **Language**: TypeScript.
*   **Styling**: NativeWind (Tailwind CSS).
*   **Icons**: `lucide-react-native`.
*   **Navigation**: `react-navigation` (or simple state-based switching for MVP).
*   **AI Engine**: Google Gemini API (via `src/services/ai.ts`).

## 3. Feature Specifications

### A. Landing Page
*   **Hero Section**: Strong value proposition ("Stop Summarizing. Start Repurposing.").
*   **Call to Action**: "Get Started" / "Try ViralLoop Free" buttons leading to the Dashboard.
*   **Features Grid**: Highlighting "LinkedIn Ghostwriter", "Thread Weaver", and "SEO Blog Builder".
*   **Visuals**: Clean, monochrome aesthetic (Zinc/White/Black) with a grid background.

### B. Dashboard
*   **Input**: URL Input for YouTube videos.
*   **Video Context**: Display thumbnail and metadata of the processed video.
*   **Editor Toolbar**: Tabs to switch between output modes (Summary, LinkedIn, Twitter, Blog).
*   **Content Area**: Markdown rendering of the generated content.
*   **Action Buttons**: Copy to Clipboard, Regenerate.

### C. Content Generation Modes (AI)
1.  **Summary**: Key insights and structured takeaways.
2.  **LinkedIn**: Viral hook + "Meat and Potatoes" value + Engagement question.
3.  **Twitter**: Thread format (1/x, 2/x) with clear lessons.
4.  **Blog**: H1/H2 structured article for SEO.

## 4. Design System
*   **Font**: Inter (Sans-serif) and JetBrains Mono (Monospace).
*   **Colors**: Zinc (Greyscale) palette.
    *   Primary: Zinc-900 (Black).
    *   Background: Zinc-50.
    *   Card: White with Zinc-200 border.
*   **Components**: "Vertex" Design System (Sharp corners or slight rounding, clean borders, shadow-sm).

## 5. Development Phases
1.  **Setup**: Configure Expo for Web and NativeWind.
2.  **UI Porting**: Convert HTML/Tailwind reference to React Native components.
3.  **Logic Integration**: Implement state for switching views and mocking generation.
4.  **AI Integration**: Connect Gemini API for real content generation.
