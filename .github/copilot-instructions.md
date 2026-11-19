# FocusStride — Copilot Instructions

## Project Context
- **App:** FocusStride — a micro-habit and focus task manager built with Next.js (App Router), TypeScript, and Tailwind CSS, backed by Node.js and MongoDB Atlas (via Mongoose) for deployment on Vercel.
- **Core Capabilities:** Task breakdown into micro-sprints, interactive focus sprint countdown timers (defaulting to 10-minute focus blocks), and daily completed micro-habit tracking.

## Conventions & Architecture
- Place App Router pages and API route handlers under `app/` and shared UI components under `components/`.
- Define explicit TypeScript interfaces/types for domain entities (`User`, `Project`, `Task` / micro-sprint items) and avoid `any`.
- Follow Next.js App Router and React rules strictly—do not call `setState` synchronously inside `useEffect` bodies.
- Use Tailwind CSS utility classes for responsive, low-distraction UI layouts.
- Preserve the `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md`.

## Data Model
- **User:** `_id`, `name`, `email`, `passwordHash`, `dailyStreak`, `createdAt`
- **Project:** `_id`, `userId`, `title`, `description`, `status`, `createdAt`
- **Task (Micro-Sprint):** `_id`, `projectId`, `userId`, `title`, `durationMinutes` (default `10`), `isCompleted`, `completedAt`

## Quality Checks
- Always run `npm run lint` and `npm run build` before finishing feature work or opening a Pull Request.