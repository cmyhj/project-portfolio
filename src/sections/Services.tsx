import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bot,
  Cog,
  Monitor,
  Code,
  ArrowUpRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Bot,
    title: '机器人设计',
    description: '从概念到原型，提供完整的机器人系统设计服务。',
    features: ['机械结构设计', '运动学分析', '控制系统集成', '原型制造'],
  },
  {
    icon: Cog,
    title: '机械设计',
    description: '精密机械零部件设计与仿真分析。',
    features: ['CAD建模', '有限元分析', '运动仿真', '优化设计'],
  },
  {
    icon: Monitor,
    title: '嵌入式系统设计',
    description: '基于STM32等平台的嵌入式系统设计与开发。',
    features: ['PCB设计', '通信接口设计', '实时操作系统集成', '代码优化'],
  },
  {
    icon: Code,
    title: '软件开发',
    description: 'ROS2驱动开发与机器人应用程序。',
    features: ['驱动开发', '算法实现', '界面开发', '系统集成'],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
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
      id="services"
    >
      {/* Background image with dark gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/project-portfolio/bgImages_service.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-black/80" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-[#00a67d]" />
            <span className="text-[#00a67d] text-sm uppercase tracking-widest font-medium">
              能力范围
            </span>
            <div className="w-12 h-0.5 bg-[#00a67d]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            我能<span className="text-gradient">做什么</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            从设计到实现的全方位机器人技术，助力创新项目落地。
          </p>
        </div>

        {/* Services grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative p-8 glass-card rounded-2xl
                         hover:bg-[#00a67d]/5 transition-all duration-500 cursor-pointer"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-[#00a67d]/0 group-hover:bg-[#00a67d]/5 transition-colors duration-500" />
              
              {/* Icon */}
              <div className="relative w-16 h-16 rounded-xl bg-[#00a67d]/10 flex items-center justify-center mb-6
                              group-hover:bg-[#00a67d]/20 group-hover:scale-110 transition-all duration-500">
                <service.icon className="w-8 h-8 text-[#00a67d]" />
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-[#00a67d] transition-colors">
                {service.title}
              </h3>
              <p className="relative text-white/60 text-sm mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="relative space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/50">
                    <div className="w-1 h-1 bg-[#00a67d] rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Arrow */}
              <div className="relative flex items-center gap-2 text-[#00a67d] text-sm font-medium
                              opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span>了解更多</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Border glow */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[#00a67d]/30 transition-colors" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-6">有项目想法？让我们一起实现它。</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#00a67d] hover:bg-[#00d4aa] text-white font-medium rounded-full
                       transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,166,125,0.3)]"
          >
            <span>开始合作</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
