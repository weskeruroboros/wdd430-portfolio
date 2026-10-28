interface SkillCardProps {
  category: string;
  skills: string[];
}

export default function SkillCard({ category, skills }: SkillCardProps) {
  return (
    <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm mb-4">
      <h3 className="text-lg font-semibold text-blue-600 mb-2">{category}</h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill} className="bg-blue-50 text-blue-700 px-3 py-1 text-sm rounded-full font-medium">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}