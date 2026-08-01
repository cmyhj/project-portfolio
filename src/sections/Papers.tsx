import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Github, Globe, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface PaperLink {
  label: string;
  href: string;
  icon: 'paper' | 'code' | 'project';
}

interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: string;
  links: PaperLink[];
}

// TODO: 添加更多论文时按 Paper 接口补充条目
const papers: Paper[] = [
  {
    title: 'Controllable External Transition of a Gecko-Inspired Wheel-Legged Robot on Complex Surfaces',
    authors: 'Muyuan Li, Qian Zhang, Hongze Wang, Zhiwei Yu',
    venue: 'IEEE/ASME TMECH',
    year: '2026',
    links: [],
  },
  {
    title: 'Key technologies of bionic inchworm robots: a survey',
    authors: 'Zhiwei Yu, Shuoyan Ma, Qian Zhang, Zhiyuan Liu, Yixing Shi, Muyuan Li, Zhengxin Yu',
    venue: 'Intell. Robot.',
    year: '2026',
    links: [
      { label: 'Paper', href: 'https://doi.org/10.20517/ir.2026.03', icon: 'paper' },
    ],
  },
];

const linkIcons = {
  paper: FileText,
  code: Github,
  project: Globe,
};

const highlightAuthors = (authors: string) => {
  return authors.split(',').map((name, i) => (
    <span key={i}>
      {i > 0 && ', '}
      <span className={name.trim() === 'Muyuan Li' ? 'text-[#00a67d]' : undefined}>
        {name.trim()}
      </span>
    </span>
  ));
};

const Papers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = rowsRef.current?.querySelectorAll('.paper-row');

      rows?.forEach((row, index) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-32" id="papers">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-[#00a67d]" />
              <span className="text-[#00a67d] text-sm uppercase tracking-widest font-medium">
                {language === 'zh' ? '论文' : 'Publications'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {language === 'zh' ? '研究' : 'Research '}
              <span className="text-gradient">{language === 'zh' ? '成果' : 'Work'}</span>
            </h2>
          </div>
        </div>

        {/* Paper list */}
        <div ref={rowsRef} className="flex flex-col gap-6">
          {papers.map((paper, index) => (
            <div
              key={index}
              className="paper-row group glass-card rounded-2xl p-6 lg:p-8
                         hover:bg-[#00a67d]/5 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Index + venue */}
                <div className="flex lg:flex-col lg:items-center gap-3 lg:gap-2 lg:w-24 shrink-0">
                  <span className="text-white/30 text-sm font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#00a67d] px-2.5 py-1 bg-[#00a67d]/10 rounded-full font-medium">
                      {paper.venue} {paper.year}
                    </span>
                  </div>
                </div>

                {/* Title + authors */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-2
                                 group-hover:text-[#00a67d] transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-white/60">
                    {highlightAuthors(paper.authors)}
                  </p>
                </div>

                {/* Link icons */}
                <div className="flex items-center gap-3 shrink-0">
                  {paper.links.map((link) => {
                    const Icon = linkIcons[link.icon];
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10
                                   flex items-center justify-center text-white/60
                                   hover:bg-[#00a67d] hover:text-white hover:border-[#00a67d]
                                   transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                  <div className="hidden lg:flex w-10 h-10 rounded-full bg-[#00a67d]/0
                                  group-hover:bg-[#00a67d] items-center justify-center
                                  opacity-0 group-hover:opacity-100
                                  transform translate-x-2 group-hover:translate-x-0
                                  transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Papers;
