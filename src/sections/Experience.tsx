import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  companyEn: string;
  role: string;
  roleEn: string;
  period: string;
  location: string;
  locationEn: string;
  description: string;
  descriptionEn: string;
  achievements: string[];
  achievementsEn: string[];
  image: string;
}

const experiences: ExperienceItem[] = [
  {
    company: '南京航空航天大学',
    companyEn: 'Nanjing University of Aeronautics and Astronautics',
    role: '机器人工程专业本科生',
    roleEn: 'Undergraduate Student in Robotics Engineering',
    period: '2023 - Present',
    location: '南京',
    locationEn: 'Nanjing',
    description: '学业主修机电',
    descriptionEn: 'Major in mechanical and electrical engineering',
    achievements: [
      '开发基于STM32的电控系统，实现仿生软体尺蠖机器人粘附运动',
      '研发爬壁机器人，实现负角度（80°+）越棱迁移',
      '学业成绩优异，荣获24以及25年度国家奖学金',
    ],
    achievementsEn: [
      'Developed STM32-based electronic control system for bio-inspired soft inchworm robot adhesion movement',
      'R&D wall-climbing robot, achieving negative angle (80°+) edge crossing migration',
      'Excellent academic performance, won national scholarship for 2024 and 2025',
    ],
    image: '/project-portfolio/work1.jpg',
  },
  {
    company: '南航长空御风机器人战队',
    companyEn: 'NAAU Changkong Yufeng Robot Team',
    role: '哨兵组组长',
    roleEn: 'Sentry Group Leader',
    period: '2024 - 2025',
    location: '南京',
    locationEn: 'Nanjing',
    description: '负责哨兵机器人导航与决策模块以及部分电控，领导7人技术团队。',
    descriptionEn: 'Responsible for sentry robot navigation and decision-making modules as well as part of electronic control, leading a 7-person technical team.',
    achievements: [
      '开发基于LIDAR的SLAM算法，实现环境地图构建',
      '实现基于A*/TEB算法的路径规划，导航成功率95%',
      '参与机器人导航系统的硬件选型和调试',
    ],
    achievementsEn: [
      'Developed LIDAR-based SLAM algorithm for environment map construction',
      'Implemented path planning based on A*/TEB algorithm with 95% navigation success rate',
      'Participated in hardware selection and debugging of robot navigation system',
    ],
    image: '/project-portfolio/work2.jpg',
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

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
                {language === 'zh' ? '工作经历' : 'Experience'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {language === 'zh' ? '职业' : 'Professional'}<span className="text-gradient">{language === 'zh' ? '历程' : ' Journey'}</span>
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
                      className={`flex flex-wrap items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}
                    >
                      <div className="flex items-center gap-2 text-[#00a67d]">
                        <Building2 className="w-4 h-4" />
                        <span className="font-semibold">{language === 'zh' ? exp.company : exp.companyEn}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{language === 'zh' ? exp.location : exp.locationEn}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{exp.period}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {language === 'zh' ? exp.role : exp.roleEn}
                    </h3>
                    <p className="text-white/60 text-sm mb-4">{language === 'zh' ? exp.description : exp.descriptionEn}</p>

                    {/* Achievements */}
                    <ul className="space-y-2">
                      {(language === 'zh' ? exp.achievements : exp.achievementsEn).map((achievement, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2 text-sm text-white/70 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
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
