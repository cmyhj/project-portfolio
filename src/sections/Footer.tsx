import { Github, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: '首页', href: '#hero' },
    { label: '关于', href: '#about' },
    { label: '项目', href: '#projects' },
    { label: '技能', href: '#skills' },
    { label: '能力', href: '#services' },
    { label: '经历', href: '#experience' },
    { label: '博客', href: '#blog' },
    { label: '联系', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Mail, href: 'mailto:hello@robotics.dev', label: 'Email' },
  ];

  return (
    <footer className="relative w-full py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              李沐<span className="text-gradient">远</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              一名机器人实践者，兼具机械设计、电控开发与算法实现的
              全栈能力。将创意转化为现实，用代码赋予机器生命。
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center
                           hover:bg-[#00a67d]/20 hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-[#00a67d]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">快速链接</h4>
            <div className="grid grid-cols-2 gap-3">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/60 text-sm hover:text-[#00a67d] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">联系方式</h4>
            <div className="space-y-3 text-sm">
              <p className="text-white/60">
                <span className="text-white/80">邮箱：</span>
                autism2484684043@163.com
              </p>
              <p className="text-white/60">
                <span className="text-white/80">电话：</span>
                +86 189 6501 3309
              </p>
              <p className="text-white/60">
                <span className="text-white/80">地址：</span>
                南京航空航天大学 将军路校区
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} 李沐远. 保留所有权利.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            用 <Heart className="w-4 h-4 text-[#00a67d]" /> 和代码构建
          </p>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00a67d]/30 to-transparent" />
    </footer>
  );
};

export default Footer;
