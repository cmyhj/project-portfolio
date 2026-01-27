import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bot,
  Cog,
  Code,
  Eye,
  Cpu,
  Network,
  GitBranch,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
  category: string;
}

const skills: Skill[] = [
  { name: '机器人设计', level: 90, icon: Bot, category: '核心技能' },
  { name: '机械设计', level: 85, icon: Cog, category: '核心技能' },
  { name: 'ROS/ROS2', level: 95, icon: Network, category: '软件' },
  { name: 'Python', level: 88, icon: Code, category: '软件' },
  { name: 'C++', level: 85, icon: Code, category: '软件' },
  { name: '计算机视觉', level: 92, icon: Eye, category: 'AI' },
  { name: '嵌入式系统', level: 90, icon: Cpu, category: '硬件' },
  { name: '版本控制', level: 90, icon: GitBranch, category: '工具' },
];

const skillCategories = ['全部', '核心技能', '软件', 'AI', '硬件', '工具'];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = barsRef.current?.querySelectorAll('.skill-bar-fill');
      
      bars?.forEach((bar) => {
        const level = parseInt(bar.getAttribute('data-level') || '0', 10);
        
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32"
      id="skills"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-[#00a67d]" />
            <span className="text-[#00a67d] text-sm uppercase tracking-widest font-medium">
              专业技能
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            技术<span className="text-gradient">能力栈</span>
          </h2>
        </div>

        {/* Skills grid */}
        <div ref={barsRef} className="grid lg:grid-cols-2 gap-x-12 gap-y-8">
          {skills.map((skill, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <skill.icon className="w-5 h-5 text-[#00a67d]" />
                  <span className="text-white font-medium">{skill.name}</span>
                </div>
                <span className="text-[#00a67d] text-sm font-bold">
                  {skill.level}%
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="skill-bar-fill absolute inset-y-0 left-0 bg-gradient-to-r from-[#00a67d] to-[#00d4aa] rounded-full
                             shadow-[0_0_10px_rgba(0,166,125,0.5)]"
                  data-level={skill.level}
                  style={{ width: '0%' }}
                />
                
                {/* Glow effect */}
                <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Skill categories */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <h3 className="text-xl font-semibold text-white mb-8">专业领域</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.slice(1).map((category, index) => {
              const categorySkills = skills.filter((s) => s.category === category);
              return (
                <div
                  key={index}
                  className="p-6 glass-card rounded-xl hover:bg-[#00a67d]/5 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#00a67d]/10 flex items-center justify-center mb-4 group-hover:bg-[#00a67d]/20 transition-colors">
                    {category === '核心技能' && <Bot className="w-6 h-6 text-[#00a67d]" />}
                    {category === '软件' && <Code className="w-6 h-6 text-[#00a67d]" />}
                    {category === 'AI' && <Eye className="w-6 h-6 text-[#00a67d]" />}
                    {category === '硬件' && <Cpu className="w-6 h-6 text-[#00a67d]" />}
                    {category === '工具' && <GitBranch className="w-6 h-6 text-[#00a67d]" />}
                  </div>
                  <h4 className="text-white font-semibold mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-1">
                    {categorySkills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs text-white/60 px-2 py-0.5 bg-white/5 rounded"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
