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
  Terminal,
  Map,
  Navigation,
  Box,
  Calculator,
  FileText,
  Book,
  BarChart,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
  category: string;
}

const skills: Skill[] = [
  { name: 'C/C++', level: 85, icon: Code, category: '编程语言' },
  { name: 'Python', level: 75, icon: Code, category: '编程语言' },
  { name: 'HTML', level: 70, icon: Code, category: '编程语言' },
  { name: 'Linux', level: 85, icon: Terminal, category: '编程语言' },
  { name: 'CMake', level: 80, icon: Code, category: '编程语言' },
  { name: 'GDScript', level: 80, icon: Code, category: '编程语言' },
  { name: 'ROS2', level: 90, icon: Network, category: '算法/库' },
  { name: 'MoveIt2', level: 85, icon: Bot, category: '算法/库' },
  { name: 'Nav2', level: 90, icon: Map, category: 'SLAM' },
  { name: '路径规划(A*,TEB等)', level: 90, icon: Navigation, category: 'SLAM' },
  { name: 'LIO算法', level: 85, icon: Map, category: 'SLAM' },
  { name: 'OpenCV', level: 80, icon: Eye, category: '算法/库' },
  { name: 'PCL', level: 85, icon: Box, category: 'SLAM' },
  { name: 'STM32', level: 90, icon: Cpu, category: '嵌入式' },
  { name: 'FreeRTOS', level: 85, icon: Cpu, category: '嵌入式' },
  { name: 'PCB设计', level: 80, icon: Cpu, category: '嵌入式' },
  { name: 'OpenMV', level: 90, icon: Eye, category: '嵌入式' },
  { name: '传感器驱动', level: 85, icon: Cpu, category: '嵌入式' },
  { name: 'SolidWorks', level: 85, icon: Cog, category: '机械设计' },
  { name: 'AutoCAD', level: 80, icon: Cog, category: '机械设计' },
  { name: 'MATLAB', level: 70, icon: Calculator, category: '学术' },
  { name: 'LaTeX', level: 75, icon: FileText, category: '学术' },
  { name: 'Zotero', level: 80, icon: Book, category: '学术' },
  { name: 'SPSS', level: 65, icon: BarChart, category: '学术' },
];

const skillCategories = ['全部', '编程语言', '算法/库', 'SLAM', '嵌入式', '机械设计', '学术'];

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
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      id="skills"
    >
      {/* Background image with dark gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/project-portfolio/bgImages_skill.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
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
        <div ref={barsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
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
          <h3 className="text-xl font-semibold text-white mb-6">专业领域</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skillCategories.slice(1).map((category, index) => {
              const categorySkills = skills.filter((s) => s.category === category);
              return (
                <div
                  key={index}
                  className="p-6 glass-card rounded-xl hover:bg-[#00a67d]/5 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#00a67d]/10 flex items-center justify-center mb-4 group-hover:bg-[#00a67d]/20 transition-colors">
                    {category === '编程语言' && <Code className="w-6 h-6 text-[#00a67d]" />}
                    {category === '算法/库' && <Bot className="w-6 h-6 text-[#00a67d]" />}
                    {category === 'SLAM' && <Map className="w-6 h-6 text-[#00a67d]" />}
                    {category === '嵌入式' && <Cpu className="w-6 h-6 text-[#00a67d]" />}
                    {category === '机械设计' && <Cog className="w-6 h-6 text-[#00a67d]" />}
                    {category === '学术' && <Book className="w-6 h-6 text-[#00a67d]" />}
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
