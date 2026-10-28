import SkillCard from '@/components/SkillCard';

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="text-lg text-gray-700 mb-8">
        I am a software development student specializing in full-stack web architectures, database persistence, and automated quality assurance workflows.
      </p>

      <h3 className="text-2xl font-semibold mb-4">Technical Skills</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <SkillCard category="Frontend Development" skills={['React', 'Next.js', 'Tailwind CSS', 'EJS', 'HTML/CSS']} />
        <SkillCard category="Backend & Databases" skills={['Node.js', 'Express.js', 'Python', 'PostgreSQL', 'MongoDB']} />
        <SkillCard category="Testing & QA" skills={['Pytest', 'Squash TM', 'GitHub Actions', 'CodeQL']} />
        <SkillCard category="Tools & Version Control" skills={['Git', 'GitHub', 'Visual Studio Code', 'PowerShell']} />
      </div>
    </main>
  );
}