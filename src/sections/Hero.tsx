import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Mail, FileText } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([titleRef.current, subtitleRef.current, imageRef.current, nameRef.current, socialRef.current], {
        opacity: 0,
        y: 50,
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
      }, '-=0.5')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      }, '-=0.6')
      .to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'expo.out',
      }, '-=0.8')
      .to(socialRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'expo.out',
      }, '-=0.6');

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !imageRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      gsap.to(imageRef.current, {
        rotateY: xPercent * 5,
        rotateX: -yPercent * 5,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/cmyhj', label: 'GitHub' },
    { icon: Mail, href: 'mailto:autism2484684043@163.com', label: 'Email' },
    { icon: FileText, href: '/project-portfolio/个人简历.pdf', label: 'Resume' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00a67d]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00a67d]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div ref={nameRef} className="mb-6">
              <span className="text-[#00a67d] text-sm uppercase tracking-[0.3em] font-medium">
                李沐远
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8"
            >
              <span className="block text-white">机器人实践者</span>
              <span className="block text-gradient mt-2">与探索者</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg text-white/70 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              一名深耕机器人自主导航的实践者，兼具机械设计、电控开发与算法实现的
              全栈能力。将创意转化为现实，用代码赋予机器生命。
            </p>

            <div ref={socialRef} className="flex flex-wrap justify-center lg:justify-start gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-5 py-2.5 glass-card rounded-full hover:bg-[#00a67d]/20 transition-all duration-300"
                >
                  <link.icon className="w-4 h-4 text-[#00a67d] group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-[#00a67d]/20 blur-3xl scale-110 rounded-full" />
              
              {/* Main image container */}
              <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] lg:w-96 lg:h-[32rem] rounded-2xl overflow-hidden glass-card">
                <img
                  src="/project-portfolio/portrait.png"
                  alt="李沐远"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/60 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-3 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#00a67d] rounded-full animate-pulse" />
                  <span className="text-sm text-white/80">欢迎交流</span>
                </div>
              </div>

              {/* Experience badge */}
              <div className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-3 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-[#00a67d]">20+</span>
                  <span className="text-xs text-white/60">项目经验</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#181818] to-transparent" />
    </section>
  );
};

export default Hero;
