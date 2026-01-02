// Mock AI Service since no API key is available
// In a real scenario, this would call Google Gemini via fetch/axios

export type ContentFormat = 'summary' | 'linkedin' | 'twitter' | 'blog';

interface GenerateOptions {
  url: string;
  format: ContentFormat;
  tone: string;
  creativity: number;
}

const TEMPLATES = {
  summary: (topic: string) => `## Analysis: ${topic}

This video dives deep into the core concepts of ${topic.toLowerCase()}, revealing several critical insights that challenge conventional wisdom.

### Key Takeaways
*   **Insight 1:** The speaker emphasizes that consistency beats intensity in 90% of cases.
*   **Insight 2:** A hidden mechanism drives the results, often overlooked by beginners.
*   **Insight 3:** Strategic alignment is more important than tactical execution.

> "The moment you stop innovating is the moment you start dying." — Key Quote

### Conclusion
Understanding ${topic} is crucial for navigating the modern landscape. The video provides a roadmap for implementation.`,

  linkedin: (topic: string) => `Stop ignoring ${topic.toLowerCase()}. 🛑

I just watched a breakdown that completely changed my perspective.

Most people think ${topic} is about X. It's actually about Y.

Here are the 3 non-obvious lessons I learned:
1️⃣ **First Principle:** It's not about working harder, it's about leverage.
2️⃣ **The Trap:** Avoid the common mistake of optimizing for the wrong metric.
3️⃣ **The Fix:** Shift your focus to long-term sustainability.

If you're not applying this today, you're falling behind.

👇 What's your biggest challenge with ${topic}?

#Growth #Strategy #${topic.replace(/\s/g, '')} #Innovation`,

  twitter: (topic: string) => `1/ Everything you know about ${topic} might be wrong. 🧵

2/ I spent 2 hours analyzing the latest data on ${topic}.
The results were shocking.
Here is the breakdown:

3/ Insight #1: The "Standard Model" is broken.
Data shows that relying on old methods leads to a 40% drop in efficiency.

4/ Insight #2: Speed is a feature.
The faster you iterate on ${topic.toLowerCase()}, the faster you learn.

5/ Insight #3: Community is the moat.
Building around ${topic} creates defensibility that capital cannot buy.

6/ TL;DR:
- Move fast
- Break standards
- Build community

RT if you found this valuable! ♻️`,

  blog: (topic: string) => `# The Ultimate Guide to ${topic}

## Introduction
In the rapidly evolving world of ${topic.toLowerCase()}, staying ahead of the curve is not just an advantage—it's a necessity. This article breaks down the expert analysis from the latest video.

## The Core Problem
Many professionals struggle with ${topic} because they focus on surface-level tactics rather than underlying principles.

## The Solution Framework
The video outlines a 3-step process:
1.  **Diagnosis:** Identify the bottleneck.
2.  **Implementation:** Apply the new model.
3.  **Optimization:** Refine based on feedback.

## Conclusion
By adopting this new perspective on ${topic}, you can unlock significant growth and efficiency.`
};

export const generateContent = async ({ url, format, tone }: GenerateOptions): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Extract "topic" from URL (mock logic)
  let topic = "Modern Strategy";
  if (url.includes("youtube")) {
    // Randomize topic slightly for realism if it's a generic mock
    const topics = ["Digital Marketing", "SaaS Growth", "AI Revolution", "Remote Work", "Financial Freedom"];
    topic = topics[Math.floor(Math.random() * topics.length)];
  }

  // Adjust content based on tone (mock logic)
  let content = TEMPLATES[format](topic);

  if (tone.includes("Witty")) {
    content = content.replace(/Stop/g, "Whoa there").replace(/Analysis/g, "Hot Take");
  } else if (tone.includes("Professional")) {
    content = content.replace(/Stop/g, "Reconsidering").replace(/broken/g, "suboptimal");
  }

  return content;
};
