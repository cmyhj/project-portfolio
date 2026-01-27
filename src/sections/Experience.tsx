import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  image: string;
}

const experiences: ExperienceItem[] = [
  {
    company: '未来机器人科技',
    role: '高级机器人工程师',
    period: '2022 - 至今',
    location: '深圳',
    description: '负责人形机器人平衡控制系统的研发，领导5人技术团队。',
    achievements: [
      '开发双足步态规划算法，实现15°斜坡稳定行走',
      '优化MPC控制器，抗冲击能力提升40%',
      '申请3项机器人平衡控制相关专利',
    ],
    image: '/work1.jpg',
  },
  {
    company: '智能制造研究院',
    role: '机器人算法工程师',
    period: '2020 - 2022',
    location: '上海',
    description: '参与协作机械臂控制系统开发，负责运动规划和力控算法。',
    achievements: [
      '实现基于阻抗控制的力感知算法，响应时间<10ms',
      '开发视觉引导抓取系统，成功率达99.5%',
      '主导完成3个客户项目的交付',
    ],
    image: '/work2.jpg',
  },
  {
    company: '创新科技实验室',
    role: '机器人开发工程师',
    period: '2019 - 2020',
    location: '北京',
    description: '参与自主配送机器人的研发，负责SLAM和导航模块。',
    achievements: [
      '实现Cartographer建图，定位精度±5cm',
      '开发动态障碍物检测算法，导航成功率99.2%',
      '完成机器人电梯控制模块集成',
    ],
    image: '/work3.jpg',
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll('.experience-item');
      
      items?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
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
      id="experience"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-[#00a67d]" />
            <span className="text-[#00a67d] text-sm uppercase tracking-widest font-medium">
              工作经历
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            职业<span className="text-gradient">历程</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={itemsRef} className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden lg:block" />
          
          {/* Timeline items */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`experience-item relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                  index % 2 === 0 ? '' : 'lg:direction-rtl'
                }`}
              >
                {/* Content */}
                <div
                  className={`relative ${
                    index % 2 === 0
                      ? 'lg:text-right lg:pr-16'
                      : 'lg:col-start-2 lg:pl-16'
                  }`}
                >
                  <div className="p-6 lg:p-8 glass-card rounded-2xl hover:bg-[#00a67d]/5 transition-colors group">
                    {/* Image */}
                    <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                      <img
                        src={exp.image}
                        alt={exp.company}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/80 to-transparent" />
                    </div>

                    {/* Company info */}
                    <div
                      className={`flex flex-wrap items-center gap-4 mb-4 ${
                        index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-[#00a67d]">
                        <Building2 className="w-4 h-4" />
                        <span className="font-semibold">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{exp.period}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-white/60 text-sm mb-4">{exp.description}</p>

                    {/* Achievements */}
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2 text-sm text-white/70 ${
                            index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                          }`}
                        >
                          <div className="w-1.5 h-1.5 bg-[#00a67d] rounded-full mt-1.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                  <div className="w-4 h-4 rounded-full bg-[#00a67d] shadow-[0_0_20px_rgba(0,166,125,0.5)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
