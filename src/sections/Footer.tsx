import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: '首页', href: '#hero' },
    { label: '关于', href: '#about' },
    { label: '项目', href: '#projects' },
    { label: '技能', href: '#skills' },
    { label: '服务', href: '#services' },
    { label: '经历', href: '#experience' },
    { label: '博客', href: '#blog' },
    { label: '联系', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@robotics.dev', label: 'Email' },
  ];

  return (
    <footer className="relative w-full py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              王艺<span className="text-gradient">臻</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              机器人设计师与开发者，专注于创新机器人解决方案。
              用代码赋予机器生命，让科技改变生活。
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
                hello@robotics.dev
              </p>
              <p className="text-white/60">
                <span className="text-white/80">电话：</span>
                +86 138 8888 8888
              </p>
              <p className="text-white/60">
                <span className="text-white/80">地址：</span>
                深圳市南山区
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} 王艺臻. 保留所有权利.
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
