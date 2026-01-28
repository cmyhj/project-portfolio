import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  tags: string[];
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    title: '哨兵环境重装指引',
    excerpt: 'RoboMaster哨兵机器人Linux上位机，从零开始搭建完整的Ubuntu22.04下运行环境配置。',
    image: '/project-portfolio/blog1.png',
    date: '2024-12-30',
    readTime: '40分钟',
    tags: ['哨兵', 'SLAM', '环境配置'],
    link: 'https://www.notion.so/16c24a7052ae80909490d654ea911af2?v=455b50111f0647c8bb69feead50456fc&source=copy_link',
  },
  {
    title: 'moveit2更新urdf',
    excerpt: '在moveit2中更新soildworks导出的机器人模型URDF。',
    image: '/project-portfolio/blog2.png',
    date: '2025-05-05',
    readTime: '5分钟',
    tags: ['Soildworks', 'moveit2', 'URDF'],
    link: 'https://www.notion.so/moveit2-urdf-1cc24a7052ae80e8ae58ff10fbdbb487',
  },
  {
    title: '25赛季哨兵组研发文档',
    excerpt: '南航长空御风战队25赛季哨兵组研发文档，包括许许多多注意事项。',
    image: '/project-portfolio/blog3.jpg',
    date: '2023-12-20',
    readTime: '30分钟',
    tags: ['哨兵', 'RoboMaster', '长空御风'],
    link: 'https://www.notion.so/25-1c724a7052ae80cab1cef2d2abbf24ba?source=copy_link',
  },
  {
    title: '视觉组新生讲义',
    excerpt: '第十章初步介绍导航，包括机器人导航基础、SLAM算法、路径规划等内容。',
    image: '/project-portfolio/blog4.png',
    date: '2025-05-05',
    readTime: '20分钟',
    tags: ['导航', 'SLAM', '哨兵'],
    link: '/project-portfolio/新生讲义导航部分.pdf',
  },
];

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.blog-card');
      
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
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
      className="relative w-full py-24 lg:py-32"
      id="blog"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-[#00a67d]" />
              <span className="text-[#00a67d] text-sm uppercase tracking-widest font-medium">
                技术博客
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              分享与<span className="text-gradient">探索</span>
            </h2>
          </div>
        </div>

        {/* Blog grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <a
              key={index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card group block"
            >
              <div className="relative overflow-hidden rounded-2xl glass-card hover:bg-[#00a67d]/5 transition-all duration-500">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-all duration-700
                               group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/50 to-transparent" />
                  
                  {/* Date badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 glass-card rounded-lg">
                    <span className="text-xs text-white/80">{post.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-white/50">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00a67d] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 text-xs text-[#00a67d] px-2 py-1 bg-[#00a67d]/10 rounded"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-[#00a67d]/0 group-hover:bg-[#00a67d] flex items-center justify-center
                                transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
