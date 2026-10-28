import ProjectList from '@/components/ProjectList';

const projects = [
  {
    title: 'FocusStride Task Manager',
    description: 'A full-stack web application designed for breaking down projects into focus blocks and tracking daily habits.',
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'EJS'],
    link: 'https://github.com/your-username/focus-stride'
  },
  {
    title: 'Automated CI/CD Pipeline',
    description: 'A GitHub Actions integration featuring automated linting with Flake8 and CodeQL security scanning.',
    technologies: ['GitHub Actions', 'Python', 'YAML', 'Security Scanning'],
    link: 'https://github.com/your-username/ci-cd-pipeline'
  }
];

export default function Home() { 
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          I am a software development student building full-stack web applications and robust cloud workflows. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}