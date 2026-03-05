import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译文件
const translations = {
  zh: {
    // 导航栏
    about: '关于',
    projects: '项目',
    skills: '技能',
    services: '服务',
    experience: '经历',
    blog: '博客',
    contact: '联系',
    startCooperation: '开始合作',
    
    // Hero 部分
    name: '李沐远',
    title1: '机器人实践者',
    title2: '与探索者',
    subtitle: '兼具机械设计、电控开发与算法实现的全栈能力。将创意转化为现实，用代码赋予机器生命。',
    github: 'GitHub',
    email: 'Email',
    resume: 'Resume',
    welcome: '欢迎交流',
    experienceCount: '项目经验',
    
    // About 部分
    aboutTitle: '关于我',
    aboutDescription1: '我是一名专注于机器人技术的全栈工程师，拥有机械设计、电控开发和算法实现的综合能力。',
    aboutDescription2: '我热爱将创意转化为现实，通过代码赋予机器生命。在过去的项目中，我积累了丰富的经验，从概念设计到原型实现，再到最终产品。',
    aboutDescription3: '我的技术栈包括机械设计软件、嵌入式系统开发、机器人控制算法等。我不断学习新技术，以保持在这个快速发展领域的竞争力。',
    
    // Projects 部分
    projectsTitle: '我的项目',
    
    // Skills 部分
    skillsTitle: '我的技能',
    
    // Services 部分
    servicesTitle: '我的服务',
    
    // Experience 部分
    experienceTitle: '我的经历',
    
    // Blog 部分
    blogTitle: '我的博客',
    
    // Contact 部分
    contactTitle: '联系我',
    sendMessage: '发送消息',
    namePlaceholder: '您的姓名',
    emailPlaceholder: '您的邮箱',
    messagePlaceholder: '您的消息',
    
    // Footer 部分
    copyright: '© 2024 李沐远. 保留所有权利。',
  },
  en: {
    // 导航栏
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    services: 'Services',
    experience: 'Experience',
    blog: 'Blog',
    contact: 'Contact',
    startCooperation: 'Start Cooperation',
    
    // Hero 部分
    name: 'Muyuan LI',
    title1: 'Robot Practitioner',
    title2: 'and Explorer',
    subtitle: 'Full-stack capabilities combining mechanical design, electronic control development, and algorithm implementation. ' +
    'Transforming ideas into reality, breathing life into machines with code.',
    github: 'GitHub',
    email: 'Email',
    resume: 'Resume',
    welcome: 'Welcome to connect',
    experienceCount: 'Project Experience',
    
    // About 部分
    aboutTitle: 'About Me',
    aboutDescription1: 'I am a full-stack engineer focused on robotics technology, with comprehensive capabilities in mechanical design, electronic control development, and algorithm implementation.',
    aboutDescription2: 'I love transforming ideas into reality, breathing life into machines through code. In past projects, I have accumulated rich experience, from conceptual design to prototype implementation, to final products.',
    aboutDescription3: 'My tech stack includes mechanical design software, embedded system development, robot control algorithms, etc. I continuously learn new technologies to maintain competitiveness in this rapidly developing field.',
    
    // Projects 部分
    projectsTitle: 'My Projects',
    
    // Skills 部分
    skillsTitle: 'My Skills',
    
    // Services 部分
    servicesTitle: 'My Services',
    
    // Experience 部分
    experienceTitle: 'My Experience',
    
    // Blog 部分
    blogTitle: 'My Blog',
    
    // Contact 部分
    contactTitle: 'Contact Me',
    sendMessage: 'Send Message',
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'Your Email',
    messagePlaceholder: 'Your Message',
    
    // Footer 部分
    copyright: '© 2024 Li Muyuan. All rights reserved.',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['zh']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
