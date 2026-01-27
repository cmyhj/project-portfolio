import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Code2, Wrench, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

  const stats = [
    { number: 20, label: '完成项目', suffix: '+' },
    { number: 5, label: '年行业经验', suffix: '' },
    { number: 10, label: '技术专利', suffix: '+' },
    { number: 99, label: '客户满意度', suffix: '%' },
  ];

  const highlights = [
    { icon: Cpu, text: '嵌入式系统开发' },
    { icon: Code2, text: 'ROS/ROS2架构' },
    { icon: Wrench, text: '机械设计仿真' },
    { icon: Lightbulb, text: '创新解决方案' },
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
                关于我
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              将复杂问题转化为
              <span className="text-gradient"> 优雅解决方案</span>
            </h2>

            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                我是一名专注于机器人技术的工程师，拥有超过5年的行业经验。从协作机械臂的精密控制到自主导航系统的智能决策，
                我致力于将前沿技术转化为实用的机器人解决方案。
              </p>
              <p>
                我的专业领域涵盖机械设计、嵌入式系统、ROS/ROS2开发以及计算机视觉。我相信优秀的机器人不仅仅是技术的堆砌，
                更是人机协作的完美体现。每一个项目都是一次探索，每一次创新都推动着行业的边界。
              </p>
              <p>
                在业余时间，我积极参与开源社区，贡献代码和分享经验。我相信知识共享能加速整个行业的进步，
                让更多人受益于机器人技术的发展。
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
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative p-8 glass-card rounded-2xl group hover:bg-[#00a67d]/5 transition-all duration-500"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-[#00a67d]/0 group-hover:bg-[#00a67d]/10 transition-colors duration-500" />
                
                <div className="relative z-10">
                  <span
                    className="stat-number block text-5xl lg:text-6xl font-bold text-[#00a67d] mb-2"
                    data-target={stat.number}
                  >
                    0
                    {stat.suffix}
                  </span>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-32 h-0.5 bg-[#00a67d]/30 transform rotate-45 translate-x-8 -translate-y-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-[#00a67d]/30 to-transparent" />
    </section>
  );
};

export default About;
