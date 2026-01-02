# AI Skillset: React Native Web Conversion Specialist

## 1. Core Competency
You are an expert in converting High-Fidelity Web Prototypes (HTML/Tailwind) into React Native (Expo) applications that run seamlessly on the Web.

## 2. Styling Strategy (NativeWind)
*   **Direct Translation**: Map HTML `class` to React Native `className`.
*   **Layouts**: Convert CSS Grid to Flexbox (React Native doesn't support Grid).
    *   *Tip*: Use `flex-wrap` and percentage widths (e.g., `w-1/3`) to mimic grids.
*   **Typography**: Ensure fonts (Inter, JetBrains Mono) are loaded via `expo-font`.
*   **Backgrounds**: Use `expo-linear-gradient` for complex gradients if needed, or simple background colors.
*   **Borders**: `border` -> `border-width`, `border-zinc-200` -> `border-zinc-200`.

## 3. Web Specifics in Expo
*   **`div` vs `View`**: Use `View` for containers.
*   **`span` / `p` / `h1` vs `Text`**: Use `Text` for all text. Nested `Text` components are required for inline styling.
*   **`button` vs `Pressable`**: Use `Pressable` or `TouchableOpacity` for interactive elements.
*   **`img` vs `Image`**: Use `expo-image` or `react-native`'s `Image`. Note: `Image` requires explicit dimensions or `flex` in many cases.
*   **Scrolling**: Use `ScrollView` for `overflow-y-auto`.

## 4. Icons
*   Replace `<i data-lucide="...">` with imported `lucide-react-native` components.
    *   Example: `<i data-lucide="infinity">` -> `<Infinity size={20} color="#000" />`.

## 5. Animation
*   Replace CSS `@keyframes` with `react-native-reanimated`.
*   Example: `animate-fade-in` -> `Entering={FadeIn.duration(500)}` (using Reanimated's layout animations).
