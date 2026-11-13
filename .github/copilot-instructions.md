# FocusStride Project Guidelines
- **Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, MongoDB (Mongoose).
- **Architecture:** Modular React components with strict TypeScript interfaces. Use `next/font/google` with Inter (UI) and JetBrains Mono (timers).
- **Styling:** Mobile-first responsive Tailwind CSS (`slate-50` backgrounds, `indigo-600` primary actions, `emerald-500` completed states).
- **Data Models:** `User` (1-to-many `Project`), `Project` (1-to-many `Task`), and `Task` (10-minute micro-sprint items).