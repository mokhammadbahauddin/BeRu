# Product Requirements Document (PRD): ViralLoop - Enterprise Content Engine

## 1. Product Vision
ViralLoop Enterprise is a Gen-2 content repurposing engine designed for marketing teams. It transforms video content into revenue-generating assets with a focus on scale, brand consistency, and performance prediction.

## 2. Technical Foundation
*   **Framework**: React Native (Expo SDK 51+) targeting Web.
*   **Language**: TypeScript.
*   **Styling**: NativeWind (Tailwind CSS) with custom animations.
*   **Icons**: `lucide-react-native`.
*   **Navigation**: `react-navigation` (Stack) + Custom Tab Switching for Dashboard.
*   **State Management**: Local State / Context for Dashboard Tabs.

## 3. Feature Specifications

### A. Landing Page (Enterprise)
*   **Hero**: "Gen-2 Engine Live" badge, gradient blobs, and high-fidelity dashboard mockup.
*   **Social Proof**: "Trusted By" section with monochrome logos.
*   **Features**: Bento Grid layout highlighting "Instant Repurposing", "Contextual AI", "Tone Matching", and "Performance Prediction".
*   **Footer**: Comprehensive sitemap and legal links.

### B. Dashboard Shell
*   **Sidebar**: Persistent navigation with groups (Main, Intelligence, Workspace).
*   **User Profile**: Credits usage indicator and profile dropdown.
*   **Tabs**: Home, History, Templates, Analytics, SEO, Team, Assets, Settings.

### C. Dashboard Views
1.  **Home (Generator)**:
    *   **Configuration Panel**: URL input, Video Preview, Content Format checkboxes (LinkedIn, X, Blog), Creativity Slider, Tone Selector.
    *   **Editor Workspace**: Rich text toolbar, empty state, loading state with skeleton UI, and generated content area.
2.  **Analytics**:
    *   **Stats Cards**: Impressions, CTR, Read Time, Generated Post count.
    *   **Engagement Chart**: Visual bar chart representation.
    *   **Top Content**: List of best-performing generated assets.
3.  **Settings**:
    *   **Profile**: Avatar, Name, Email.
    *   **Preferences**: Notification and Auto-save toggles.
4.  **History**: Data table of past projects with status indicators.
5.  **Templates**: Grid of pre-configured content frameworks (e.g., "Viral Storytelling", "SEO Deep Dive").

## 4. Design System
*   **Visuals**: "Glassmorphism" (blur effects), Grid backgrounds, delicate borders (Zinc-200).
*   **Animation**: `Entering` animations (Fade/Slide), Shimmer loading effects, Marquee progress bars.
*   **Typography**: Inter (Sans) and JetBrains Mono (Code/Technical data).

## 5. Development Phases
1.  **Structure**: Scaffold component hierarchy for the complex dashboard.
2.  **Landing**: Implement the high-fidelity marketing page.
3.  **Dashboard Core**: Implement the Sidebar and Home View logic.
4.  **Secondary Views**: Implement Analytics, Settings, etc.
