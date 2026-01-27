import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'sonner';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('消息已发送', {
      description: '感谢您的来信，我会尽快回复您！',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: '邮箱', value: 'hello@robotics.dev' },
    { icon: Phone, label: '电话', value: '+86 138 8888 8888' },
    { icon: MapPin, label: '地址', value: '深圳市南山区' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="contact-content grid lg:grid-cols-2 gap-16">
          {/* Left info */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-[#00a67d]" />
              <span className="text-[#00a67d] text-sm uppercase tracking-widest font-medium">
                联系方式
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
              让我们开始<span className="text-gradient">合作</span>
            </h2>

            <p className="text-white/60 mb-10 leading-relaxed">
              无论是机器人项目咨询、技术合作还是工作机会，都欢迎与我联系。
              我期待与您一起探索机器人技术的无限可能。
            </p>

            {/* Contact info */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#00a67d]/10 flex items-center justify-center
                                  group-hover:bg-[#00a67d]/20 transition-colors">
                    <info.icon className="w-5 h-5 text-[#00a67d]" />
                  </div>
                  <div>
                    <span className="text-white/50 text-sm">{info.label}</span>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-white font-semibold mb-4">社交媒体</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center
                             hover:bg-[#00a67d]/20 hover:scale-110 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-[#00a67d]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="p-8 glass-card rounded-2xl">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/60 text-sm mb-2">姓名</label>
                  <Input
                    type="text"
                    placeholder="您的姓名"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30
                             focus:border-[#00a67d] focus:ring-[#00a67d]/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">邮箱</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30
                             focus:border-[#00a67d] focus:ring-[#00a67d]/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">主题</label>
                <Input
                  type="text"
                  placeholder="消息主题"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30
                           focus:border-[#00a67d] focus:ring-[#00a67d]/20"
                  required
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">消息</label>
                <Textarea
                  placeholder="请描述您的需求或想法..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30
                           focus:border-[#00a67d] focus:ring-[#00a67d]/20 resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00a67d] hover:bg-[#00d4aa] text-white font-medium py-6
                         transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,166,125,0.3)]"
              >
                <Send className="w-5 h-5 mr-2" />
                发送消息
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
