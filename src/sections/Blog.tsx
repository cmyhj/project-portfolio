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
    title: '协作机器人安全控制策略研究',
    excerpt: '探讨基于阻抗控制的协作机器人安全交互机制，分析不同控制策略在实际应用中的表现。',
    image: '/blog1.jpg',
    date: '2024-01-15',
    readTime: '8分钟',
    tags: ['协作机器人', '力控制', '安全'],
    link: 'https://blog.example.com/cobot-safety',
  },
  {
    title: 'ROS2与Gazebo仿真环境搭建指南',
    excerpt: '从零开始搭建完整的ROS2机器人仿真环境，包含传感器模拟和物理引擎配置。',
    image: '/blog2.jpg',
    date: '2024-01-08',
    readTime: '12分钟',
    tags: ['ROS2', 'Gazebo', '仿真'],
    link: 'https://blog.example.com/ros2-gazebo',
  },
  {
    title: '视觉SLAM在移动机器人中的应用',
    excerpt: '深入分析ORB-SLAM3在移动机器人导航中的实际应用，包含性能优化技巧。',
    image: '/blog3.jpg',
    date: '2023-12-20',
    readTime: '10分钟',
    tags: ['SLAM', '计算机视觉', '导航'],
    link: 'https://blog.example.com/vslam-robot',
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
          <a
            href="https://blog.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#00a67d] hover:text-[#00d4aa] transition-colors"
          >
            <span>查看全部文章</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
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
