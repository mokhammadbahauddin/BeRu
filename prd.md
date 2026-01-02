Product Requirements Document (PRD): "Bebek Biru" - Mental Health Companion

1. Product Vision

"Bebek Biru" is not just a mood tracker; it is a Gamified Mental Health Companion. It transforms the mundane task of logging emotions into a rewarding, "kawaii", and interactive experience. The user cares for a digital duck whose world changes based on the user's mental state.

Core Philosophy:

Cozy & Safe: The UI must feel like a warm hug. Soft colors, rounded corners (Glassmorphism).

Gamified Self-Care: Self-care actions (breathing, gratitude) are the "fuel" for the game economy.

AI-Powered Empathy: The app listens and responds with context-aware advice using LLMs (Gemini).

2. Technical Foundation (Strict)

Base Repo: CaioCamatta/mood-tracker-react-native (forked/cloned).

Framework: React Native (Expo SDK 50+).

Language: TypeScript (Strict Mode).

Styling: NativeWind (Tailwind CSS). Critically important for speed and consistency.

Animations: react-native-reanimated (v3) + react-native-skia (optional for advanced particles).

Storage: AsyncStorage (MVP) -> SQLite/Supabase (Future).

AI Engine: Google Gemini API (generative-ai SDK).

Icons: lucide-react-native.

3. Feature Specifications (The "God Level" Implementation)

A. The Immersive Home Screen (Dashboard)

Visual Style: Full-screen immersive background that changes color based on MoodState.

Happy: #E0F2FE (Sky Blue) + Moving Cloud Animations.

Neutral: #ECFEFF (Minty/White) + Slow drifting particles.

Sad: #C7D2FE (Indigo/Purple) + Darker overlay + Rain particles (optional).

The Anchor: A central "Glassmorphism" panel is NOT used for the main pet container to keep it organic, but used for UI controls.

The Pet (Bebek):

Asset: Use Image component.

Animation: Implement a continuous "Breathing" animation (scale 1.0 -> 1.05) using Reanimated withRepeat.

Interactivity:

Tap: Triggers animate-bounce + spawns heart particles.

Long Press: Opens the "Interaction Menu" (Pet, Feed, Hug).

Accessory Layer: Must render equipped items (Hat, Scarf, etc.) on top of the pet.

B. Gamification Economy (The "Addiction" Loop)

Currency: Coins (Koin).

Earned by: Mood Check-in (+20), Gratitude (+15), Breathing (+15), Watching Ads (+50).

Spent on: Accessories (Shop).

Streak System:

Tracks consecutive days of interaction.

Visual: Fire icon in the header.

Shop (Lemari Gaya):

Modal: Bottom Sheet using react-native-reanimated or a library like @gorhom/bottom-sheet.

Items: Hats, Glasses, Background props (Tea, Blanket).

Logic: Items must be persisted in state.inventory.

C. Mental Health Tools (The "Utility")

Mood Check-in:

UI: A grid of 6 emojis (Happy, Normal, Sad, Anxious, Angry, Excited).

AI Integration: When a mood is selected, call Gemini:

Prompt: "User just logged mood: [MOOD]. Give a 1-sentence supportive response in casual Indonesian slang."

Output: Display in a Speech Bubble above the duck.

Toples Syukur (Gratitude Jar):

UI: A modal with a text input.

Storage: Save entries to an array in local storage.

Display: Show a scrollable list of past entries in "Paper Note" style cards.

Magic Activity (Saran Ajaib):

Trigger: Tap a "Sparkle" button.

AI: Call Gemini for a self-care activity suggestion based on current mood score.

D. The AI Therapist (Curhat Mode)

UI: A chat interface (Modal or Screen).

Persona: "Bebek Biru" - Supportive, cute, uses "Kwek", speaks informal Indonesian ("Aku/Kamu").

Tech: Maintain a short conversation history in context window for continuity.

4. UI/UX Design System (The "Kawaii" Standard)

Typography:

Headings: Rounded/Cute font (e.g., Fredoka or Nunito).

Body: Quicksand or System default rounded.

Note: Use expo-font to load custom fonts.

Components:

Buttons: High border-radius (rounded-3xl), thick borders (border-b-4), "Juicy" press states (scale down on press).

Modals: Glassmorphism effect (White with 80% opacity + Blur). Note: On Android, use a translucent background color as Blur is expensive.

Particles:

Implement a reusable <ParticleSystem /> component.

Spawns SVG icons (Hearts, Stars) at coordinates $(x,y)$.

Animates Opacity (1->0) and TranslateY (upwards).

5. Development Phases

Phase 1: Setup & Porting [COMPLETED]
- Project structure set up with NativeWind, Reanimated, Expo Fonts.
- Core components: `GlassPanel`, `JuicyButton`, `PetAvatar`, `ParticleSystem`.
- `GameContext` implemented with persistence.
- `HomeScreen` basic layout and mood state background.

Phase 2: The Tools (UI & Logic) [COMPLETED]
- Interactive Modals for Mood, Gratitude, Breathing, Shop, Chat implemented.
- State connection for buying items and logging mood.
- Shop logic exists (data persistence).
- [Fix Needed]: Visual representation of accessories on Pet.

Phase 3: AI & Juice [CURRENT]
- Setup `src/services/ai.ts` with Gemini.
- Connect AI to Mood Check-in (Speech Bubble response).
- Connect AI to Chat Modal (Interactive conversation).
- Setup `expo-av` for Sound Effects (Tap, Coin, Success).
- Implement Accessory rendering on `PetAvatar`.
