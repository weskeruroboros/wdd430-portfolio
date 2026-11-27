import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Background, full-stack development skills, and sprint goals for Edward Salim Tiyari.",
  openGraph: {
    title: "About | Edward Tiyari",
    description: "Background, full-stack development skills, and sprint goals for Edward Salim Tiyari.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">About Me</h1>
      <p className="text-gray-700 leading-relaxed">
        I am Edward Salim Tiyari, a full-stack web developer building modern applications with
        Next.js, TypeScript, React Server Actions, and Auth.js.
      </p>
    </section>
  );
}
