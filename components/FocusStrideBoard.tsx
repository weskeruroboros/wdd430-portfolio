"use client";

import { useEffect, useState } from "react";

export type SprintStatus = "todo" | "in-progress" | "completed";

export interface FocusSprintTask {
  id: string;
  projectTitle: string;
  title: string;
  durationMinutes: number;
  status: SprintStatus;
  completedAt?: string;
}

const INITIAL_TASKS: FocusSprintTask[] = [
  {
    id: "sprint-1",
    projectTitle: "WDD 430 Portfolio",
    title: "Outline FocusStride task breakdown & sprint flow",
    durationMinutes: 10,
    status: "completed",
    completedAt: "Today",
  },
  {
    id: "sprint-2",
    projectTitle: "FocusStride MVP",
    title: "Refine sprint timer controls and task completion state",
    durationMinutes: 10,
    status: "todo",
  },
];

function formatSeconds(totalSeconds: number): string {
  const safeSeconds = Math.max(0, totalSeconds);
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function FocusStrideBoard() {
  const [tasks, setTasks] = useState<FocusSprintTask[]>(INITIAL_TASKS);
  const [projectTitle, setProjectTitle] = useState<string>("FocusStride MVP");
  const [title, setTitle] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState<number>(10);

  const [activeTaskId, setActiveTaskId] = useState<string>("sprint-2");
  const [secondsLeft, setSecondsLeft] = useState<number>(10 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  function handleAddTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    const newTask: FocusSprintTask = {
      id: `sprint-${Date.now()}`,
      projectTitle: projectTitle.trim() || "General Focus",
      title: trimmedTitle,
      durationMinutes,
      status: "todo",
    };

    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
    setActiveTaskId(newTask.id);
    setSecondsLeft(durationMinutes * 60);
    setIsRunning(false);
  }

  function handleSelectSprint(task: FocusSprintTask) {
    setActiveTaskId(task.id);
    setSecondsLeft(task.durationMinutes * 60);
    setIsRunning(false);
    setTasks((prev) =>
      prev.map((item) =>
        item.id === task.id && item.status === "todo"
          ? { ...item, status: "in-progress" }
          : item
      )
    );
  }

  function handleToggleComplete(taskId: string) {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id !== taskId) {
          return item;
        }
        const nextCompleted = item.status !== "completed";
        return {
          ...item,
          status: nextCompleted ? "completed" : "todo",
          completedAt: nextCompleted ? "Completed today" : undefined,
        };
      })
    );
  }

  const completedTasks = tasks.filter((task) => task.status === "completed");
  const focusedMinutes = completedTasks.reduce(
    (sum, task) => sum + task.durationMinutes,
    0
  );
  const activeTask =
    tasks.find((task) => task.id === activeTaskId) ?? tasks[0] ?? null;

  return (
    <section
      aria-label="FocusStride Sprint Workspace"
      className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            FocusStride · Micro-Sprint Planner
          </span>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            10-Minute Focus Sprints &amp; Habit Log
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Break large goals into short, focused sessions and log completed
            micro-habits.
          </p>
        </div>

        <div className="flex gap-4 rounded-lg bg-slate-50 px-4 py-3 text-sm">
          <div>
            <p className="text-xs text-slate-500">Completed</p>
            <p className="font-semibold text-emerald-700">
              {completedTasks.length} / {tasks.length}
            </p>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <p className="text-xs text-slate-500">Focused Time</p>
            <p className="font-semibold text-indigo-700">{focusedMinutes} min</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-indigo-100 bg-indigo-50/40 p-5 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
            Active Sprint Timer
          </p>
          <p className="mt-1 truncate text-sm font-medium text-slate-800">
            {activeTask ? activeTask.title : "Select a task to start"}
          </p>

          <div className="my-5 rounded-lg bg-white py-4 text-center shadow-xs">
            <p className="font-mono text-4xl font-bold text-slate-900">
              {formatSeconds(secondsLeft)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {activeTask ? `${activeTask.projectTitle} · ${activeTask.durationMinutes}m block` : "Ready"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsRunning((prev) => !prev)}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {isRunning ? "Pause" : "Start Sprint"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft((activeTask?.durationMinutes ?? 10) * 60);
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-5 lg:col-span-2">
          <form
            onSubmit={handleAddTask}
            className="grid gap-3 rounded-lg bg-slate-50 p-4 sm:grid-cols-12"
          >
            <div className="sm:col-span-4">
              <label
                htmlFor="sprint-project"
                className="block text-xs font-medium text-slate-700"
              >
                Project
              </label>
              <input
                id="sprint-project"
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="FocusStride MVP"
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </div>

            <div className="sm:col-span-5">
              <label
                htmlFor="sprint-title"
                className="block text-xs font-medium text-slate-700"
              >
                Micro-Sprint Task
              </label>
              <input
                id="sprint-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Write MongoDB Task schema"
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="sprint-minutes"
                className="block text-xs font-medium text-slate-700"
              >
                Sprint (min)
              </label>
              <select
                id="sprint-minutes"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              >
                <option value={5}>5 min</option>
                <option value={10}>10 min</option>
                <option value={15}>15 min</option>
                <option value={25}>25 min</option>
              </select>
            </div>

            <div className="sm:col-span-12">
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                + Add Focus Sprint
              </button>
            </div>
          </form>

          <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200">
            {tasks.map((task) => {
              const isCompleted = task.status === "completed";
              return (
                <li
                  key={task.id}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => handleToggleComplete(task.id)}
                      aria-label={`Mark ${task.title} complete`}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600"
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isCompleted
                            ? "text-slate-400 line-through"
                            : "text-slate-900"
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {task.projectTitle} · {task.durationMinutes} min sprint
                        {task.completedAt ? ` · ${task.completedAt}` : ""}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectSprint(task)}
                    className="self-start rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50 sm:self-center"
                  >
                    Load in Timer
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
