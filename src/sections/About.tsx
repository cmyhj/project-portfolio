import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Code2, Wrench, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      const statElements = statsRef.current?.querySelectorAll('.stat-number');
      statElements?.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = language === 'zh' ? [
    { number: 16, label: '参与研发机器人', suffix: '款', link: '#projects' },
    { number: 10, label: '国家级奖项', suffix: '项' },
    { number: 300, label: '社区技术影响', suffix: '+' },
    { number: 10, label: '项目工程', suffix: '+', link: 'https://github.com/cmyhj' },
  ] : [
    { number: 16, label: 'Robots Developed', suffix: '+', link: '#projects' },
    { number: 10, label: 'National Awards', suffix: '' },
    { number: 300, label: 'Community Impact', suffix: '+' },
    { number: 10, label: 'Projects', suffix: '+', link: 'https://github.com/cmyhj' },
  ];

  const highlights = language === 'zh' ? [
    { icon: Cpu, text: '嵌入式系统开发' },
    { icon: Code2, text: 'ROS/ROS2架构' },
    { icon: Wrench, text: '机械设计仿真' },
    { icon: Lightbulb, text: '创新解决方案' },
  ] : [
    { icon: Cpu, text: 'Embedded Systems' },
    { icon: Code2, text: 'ROS/ROS2 Architecture' },
    { icon: Wrench, text: 'Mechanical Design' },
    { icon: Lightbulb, text: 'Innovative Solutions' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div ref={contentRef}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-[#00a67d]" />
              <span className="text-[#00a67d] text-sm uppercase tracking-widest font-medium">
                {t('aboutTitle')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              {language === 'zh' ? '在硬件与算法的交界处' : 'At the Intersection of Hardware and Algorithms'}
              <span className="text-gradient"> {language === 'zh' ? '寻找机器人的最优解' : 'Finding Optimal Solutions for Robotics'}</span>
            </h2>

            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                {language === 'zh' ? '我是南航机器人工程专业的本科生，一名专注于机器人技术的实践者。从仿生机器人的粘附控制到自主导航系统的智能决策，我致力于将前沿技术转化为实用的机器人解决方案。' : 'I am an undergraduate student majoring in Robotics Engineering at Nanjing University of Aeronautics and Astronautics, a practitioner focused on robotics technology. From adhesion control of bionic robots to intelligent decision-making in autonomous navigation systems, I am committed to transforming cutting-edge technology into practical robotics solutions.'}
              </p>
              <p>
                {language === 'zh' ? '我的专业领域涵盖机械设计、嵌入式系统、ROS2开发等。我相信优秀的机器人不仅仅是技术的堆砌，更是人机协作的完美体现。擅长将跨学科知识整合为完整的机器人解决方案——从PCB设计到SLAM算法，从底层驱动到上层决策，追求让每个模块在系统中发挥最优价值。每一个项目都是一次探索，每一次创新都推动着自我的边界。' : 'My professional fields cover mechanical design, embedded systems, ROS2 development, etc. I believe that excellent robots are not just a pile of technology, but a perfect embodiment of human-machine collaboration. I excel at integrating interdisciplinary knowledge into complete robotics solutions — from PCB design to SLAM algorithms, from low-level drivers to high-level decision-making, pursuing to make each module realize its optimal value in the system. Every project is an exploration, and every innovation pushes the boundaries of myself.'}
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 glass-card rounded-xl hover:bg-[#00a67d]/10 transition-colors group"
                >
                  <item.icon className="w-5 h-5 text-[#00a67d] group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const bgImages = ['/project-portfolio/bgImages1.jpg', '/project-portfolio/bgImages2.jpg', '/project-portfolio/bgImages3.jpg', '/project-portfolio/bgImages4.jpg'];
              const handleClick = () => {
                if (stat.link) {
                  if (stat.link.startsWith('#')) {
                    document.querySelector(stat.link)?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.open(stat.link, '_blank');
                  }
                }
              };
              return (
                <div
                  key={index}
                  className={`relative p-8 glass-card rounded-2xl group hover:bg-[#00a67d]/5 transition-all duration-500 overflow-hidden ${stat.link ? 'cursor-pointer' : ''}`}
                  onClick={handleClick}
                >
                  {/* Background image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
                    style={{ backgroundImage: `url(${bgImages[index]})` }}
                  />
                  
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/5" />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-[#00a67d]/0 group-hover:bg-[#00a67d]/10 transition-colors duration-500" />
                  
                  <div className="relative z-10">
                  <div className="block text-5xl lg:text-6xl font-bold text-[#00a67d] mb-2">
                    <span
                      className="stat-number"
                      data-target={stat.number}
                    >
                      0
                    </span>
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </div>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                    <div className="absolute top-0 right-0 w-32 h-0.5 bg-[#00a67d]/30 transform rotate-45 translate-x-8 -translate-y-8" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-[#00a67d]/30 to-transparent" />
    </section>
  );
};

export default About;
