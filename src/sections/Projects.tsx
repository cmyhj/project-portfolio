import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Play, ArrowRight, Search, Filter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  year: string;
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  details: {
    challenge: string;
    solution: string;
    technologies: string[];
    results: string;
  };
}

const categories = ['全部', '课程项目', '竞赛项目', '科研项目', '个人项目'];

const projects: Project[] = [
  {
    id: 1,
    title: '协作机械臂控制系统',
    subtitle: 'Cobot Control System',
    description: '基于ROS2的七轴协作机械臂控制系统，支持力控和视觉引导操作。',
    image: '/project-portfolio/project1.jpg',
    tags: ['ROS2', 'MoveIt', 'Python', 'C++'],
    category: '科研项目',
    year: '2024',
    githubUrl: 'https://github.com/example/cobot-control',
    demoUrl: 'https://youtube.com/watch?v=example1',
    details: {
      challenge: '传统工业机器人缺乏安全的人机协作能力，需要开发能够感知环境并安全交互的控制系统。',
      solution: '设计了基于阻抗控制的力感知算法，集成视觉系统进行物体识别和抓取规划。',
      technologies: ['ROS2 Foxy', 'MoveIt2', 'OpenCV', 'Eigen', 'C++17'],
      results: '实现亚毫米级定位精度，力控响应时间小于10ms，通过ISO 10218安全认证。',
    },
  },
  {
    id: 2,
    title: '智能配送机器人',
    subtitle: 'Autonomous Delivery Robot',
    description: '室内自主导航配送机器人，支持多点配送和电梯控制。',
    image: '/project2.jpg',
    tags: ['SLAM', 'Navigation', 'Python', 'Deep Learning'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/example/delivery-bot',
    videoUrl: 'https://youtube.com/watch?v=example2',
    details: {
      challenge: '复杂室内环境中的自主导航，包括动态障碍物规避和多楼层配送。',
      solution: '采用Cartographer进行SLAM建图，结合YOLO进行动态障碍物检测，实现智能路径规划。',
      technologies: ['ROS Noetic', 'Cartographer', 'YOLOv5', 'Python3', 'TensorRT'],
      results: '定位精度±5cm，导航成功率99.2%，单次充电可运行8小时。',
    },
  },
  {
    id: 3,
    title: '人形机器人平衡控制',
    subtitle: 'Humanoid Balance Control',
    description: '双足人形机器人步态规划和平衡控制系统。',
    image: '/project3.jpg',
    tags: ['Control Theory', 'Gazebo', 'C++', 'MATLAB'],
    category: '课程项目',
    year: '2023',
    githubUrl: 'https://github.com/example/humanoid-balance',
    details: {
      challenge: '双足机器人在不平坦地面上的稳定行走和动态平衡。',
      solution: '实现基于ZMP的步态规划器，结合MPC控制器进行实时平衡调整。',
      technologies: ['Gazebo', 'MPC', 'C++', 'MATLAB', 'Simulink'],
      results: '可在15°斜坡稳定行走，抗冲击能力达50N，步行速度0.8m/s。',
    },
  },
  {
    id: 4,
    title: '自主无人机编队',
    subtitle: 'UAV Swarm System',
    description: '多无人机协同编队飞行控制系统。',
    image: '/project4.jpg',
    tags: ['Swarm', 'PX4', 'Python', 'Communication'],
    category: '竞赛项目',
    year: '2023',
    githubUrl: 'https://github.com/example/uav-swarm',
    demoUrl: 'https://youtube.com/watch?v=example4',
    details: {
      challenge: '多无人机之间的通信同步和编队保持，特别是在GPS信号弱的环境下。',
      solution: '开发分布式控制算法，结合视觉里程计进行相对定位，实现鲁棒编队。',
      technologies: ['PX4', 'MAVROS', 'OpenCV', 'Python', 'ZigBee'],
      results: '支持最多10架无人机编队，队形保持精度±20cm，通信延迟<50ms。',
    },
  },
  {
    id: 5,
    title: '六足仿生机器人',
    subtitle: 'Hexapod Robot',
    description: '仿生昆虫六足机器人，适应复杂地形行走。',
    image: '/project5.jpg',
    tags: ['Bionic', 'Arduino', 'Servo', 'Gait Planning'],
    category: '个人项目',
    year: '2023',
    githubUrl: 'https://github.com/example/hexapod',
    videoUrl: 'https://youtube.com/watch?v=example5',
    details: {
      challenge: '六足机器人在不平坦地形上的稳定步态规划和运动控制。',
      solution: '设计三角步态和波动步态，实现多种地形自适应行走。',
      technologies: ['Arduino', 'Servo Motor', 'Inverse Kinematics', 'Python'],
      results: '可跨越5cm高障碍物，爬坡角度达30°，行走速度0.2m/s。',
    },
  },
  {
    id: 6,
    title: 'AGV物流机器人',
    subtitle: 'Automated Guided Vehicle',
    description: '工业仓库自动导引车，实现物料自动搬运。',
    image: '/project6.jpg',
    tags: ['AGV', 'Navigation', 'PLC', 'Industrial'],
    category: '课程项目',
    year: '2023',
    githubUrl: 'https://github.com/example/agv-robot',
    details: {
      challenge: '在复杂工业环境中实现精准导航和物料搬运。',
      solution: '采用磁导航和二维码定位，结合PLC控制系统。',
      technologies: ['PLC', 'Magnetic Navigation', 'RFID', 'C#'],
      results: '定位精度±10mm，载重500kg，续航12小时。',
    },
  },
  {
    id: 7,
    title: '智能巡检机器人',
    subtitle: 'Inspection Robot',
    description: '工业厂房自动巡检机器人，实时监测设备状态。',
    image: '/project7.jpg',
    tags: ['Inspection', 'Computer Vision', 'IoT', 'Edge Computing'],
    category: '科研项目',
    year: '2024',
    githubUrl: 'https://github.com/example/inspection-bot',
    demoUrl: 'https://youtube.com/watch?v=example7',
    details: {
      challenge: '在高温、高噪音工业环境中进行设备状态检测和故障预警。',
      solution: '集成红外热成像、声学传感器和边缘计算单元。',
      technologies: ['YOLO', 'Thermal Imaging', 'MQTT', 'NVIDIA Jetson'],
      results: '异常检测准确率95%，巡检覆盖率100%，故障预警时间提前2小时。',
    },
  },
  {
    id: 8,
    title: '水面清洁机器人',
    subtitle: 'Water Surface Cleaning Robot',
    description: '自动收集水面垃圾的环保机器人。',
    image: '/project8.jpg',
    tags: ['Environmental', 'Solar', 'Autonomous', 'Marine'],
    category: '竞赛项目',
    year: '2022',
    githubUrl: 'https://github.com/example/water-cleaner',
    videoUrl: 'https://youtube.com/watch?v=example8',
    details: {
      challenge: '在流动水域中自主导航并有效收集各类漂浮垃圾。',
      solution: '采用双体船设计，结合太阳能供电和视觉识别系统。',
      technologies: ['Solar Panel', 'GPS Navigation', 'OpenCV', 'Arduino'],
      results: '垃圾收集效率85%，续航时间8小时，覆盖面积2km²/天。',
    },
  },
  {
    id: 9,
    title: '智能垃圾分类系统',
    subtitle: 'Intelligent Waste Sorting',
    description: '基于机器视觉的自动垃圾分类系统。',
    image: '/project9.jpg',
    tags: ['Computer Vision', 'CNN', 'Python', 'Automation'],
    category: '课程项目',
    year: '2022',
    githubUrl: 'https://github.com/example/waste-sorting',
    details: {
      challenge: '实时识别和分类多种生活垃圾，准确率要求90%以上。',
      solution: '训练深度学习模型，结合机械臂实现自动分拣。',
      technologies: ['TensorFlow', 'ResNet', 'Python', 'Raspberry Pi'],
      results: '分类准确率92%，处理速度30件/分钟，支持15种垃圾类型。',
    },
  },
  {
    id: 10,
    title: '模块化教育机器人',
    subtitle: 'Educational Robot Kit',
    description: '面向STEM教育的可编程机器人套件。',
    image: '/project10.jpg',
    tags: ['Education', 'STEM', 'Scratch', 'Arduino'],
    category: '个人项目',
    year: '2022',
    githubUrl: 'https://github.com/example/edu-robot',
    demoUrl: 'https://youtube.com/watch?v=example10',
    details: {
      challenge: '设计一款低成本、易上手、可扩展的教育机器人平台。',
      solution: '采用模块化设计，支持图形化编程和Python代码编程。',
      technologies: ['Arduino', 'Scratch', 'Python', '3D Printing'],
      results: '支持10+种传感器模块，编程难度分3级，成本控制在200元以内。',
    },
  },
  {
    id: 11,
    title: '农业采摘机器人',
    subtitle: 'Agricultural Harvesting Robot',
    description: '智能识别和采摘成熟水果的农业机器人。',
    image: '/project11.jpg',
    tags: ['Agriculture', 'Deep Learning', 'Robotic Arm', 'Vision'],
    category: '科研项目',
    year: '2024',
    githubUrl: 'https://github.com/example/harvesting-robot',
    details: {
      challenge: '在复杂果园环境中准确识别成熟果实并进行无损采摘。',
      solution: '结合深度学习和机器视觉，实现精准果实识别和柔性抓取。',
      technologies: ['PyTorch', 'YOLO', 'Depth Camera', 'ROS'],
      results: '识别准确率88%，采摘成功率85%，损伤率<5%。',
    },
  },
  {
    id: 12,
    title: '医疗辅助机器人',
    subtitle: 'Medical Assistance Robot',
    description: '医院环境中的智能导诊和配送机器人。',
    image: '/project12.jpg',
    tags: ['Medical', 'Navigation', 'Human-Robot Interaction', 'IoT'],
    category: '课程项目',
    year: '2023',
    githubUrl: 'https://github.com/example/medical-robot',
    videoUrl: 'https://youtube.com/watch?v=example12',
    details: {
      challenge: '在医院复杂环境中实现自主导航和与患者安全交互。',
      solution: '集成激光雷达、深度摄像头和语音交互系统。',
      technologies: ['ROS', 'Speech Recognition', 'SLAM', 'Android'],
      results: '导航成功率96%，语音识别准确率90%，支持语音对话。',
    },
  },
  {
    id: 13,
    title: '智能家居机器人',
    subtitle: 'Smart Home Robot',
    description: '集成语音助手和移动底盘的家庭服务机器人。',
    image: '/project13.jpg',
    tags: ['Smart Home', 'Voice Assistant', 'Mobile', 'IoT'],
    category: '个人项目',
    year: '2024',
    githubUrl: 'https://github.com/example/home-robot',
    details: {
      challenge: '实现自然语言交互和智能家居设备控制。',
      solution: '集成语音识别、自然语言处理和物联网控制模块。',
      technologies: ['Alexa Skills', 'MQTT', 'Python', 'OpenCV'],
      results: '支持50+语音指令，可控制10种智能家居设备，续航6小时。',
    },
  },
  {
    id: 14,
    title: '仿生鱼机器人',
    subtitle: 'Bionic Fish Robot',
    description: '模仿鱼类游动方式的水下机器人。',
    image: '/project14.jpg',
    tags: ['Bionic', 'Underwater', 'Servo', '3D Printing'],
    category: '竞赛项目',
    year: '2023',
    githubUrl: 'https://github.com/example/fish-robot',
    videoUrl: 'https://youtube.com/watch?v=example14',
    details: {
      challenge: '实现高效、灵活的水下推进和姿态控制。',
      solution: '设计多关节仿生尾鳍，模拟真实鱼类游动姿态。',
      technologies: ['3D Printing', 'Servo Control', 'Waterproof', 'Arduino'],
      results: '游动速度0.5m/s，转向半径15cm，续航时间45分钟。',
    },
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on category and search
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = 
        selectedCategory === '全部' || project.category === selectedCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: (index % 6) * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32"
      id="projects"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-[#00a67d]" />
            <span className="text-[#00a67d] text-sm uppercase tracking-widest font-medium">
              作品集
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                我的<span className="text-gradient">机器人项目</span>
              </h2>
              <p className="text-white/60 max-w-2xl">
                从课程设计到竞赛项目，从个人兴趣到科研合作，
                每个项目都代表着我在机器人领域的学习与成长。
              </p>
            </div>
            
            {/* Project count */}
            <div className="flex items-center gap-2 text-[#00a67d]">
              <span className="text-3xl font-bold">{filteredProjects.length}</span>
              <span className="text-white/60">个项目</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              placeholder="搜索项目名称、技术栈..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40
                       focus:border-[#00a67d] focus:ring-[#00a67d]/20"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-white/60" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#00a67d] text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative overflow-hidden rounded-2xl glass-card cursor-pointer
                         hover:scale-[1.02] hover:bg-[#00a67d]/5 transition-all duration-500"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/50 to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-3 left-3 px-3 py-1 glass-card rounded-lg">
                  <span className="text-xs text-[#00a67d]">{project.category}</span>
                </div>
                
                {/* Year badge */}
                <div className="absolute top-3 right-3 px-3 py-1 glass-card rounded-lg">
                  <span className="text-xs text-white/80">{project.year}</span>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#00a67d]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#00a67d] flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-xs bg-[#00a67d]/10 text-[#00a67d] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-0.5 text-xs bg-white/5 text-white/50 rounded-full">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00a67d] transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#00a67d] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>代码</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#00a67d] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>演示</span>
                    </a>
                  )}
                  {project.videoUrl && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-white/50 hover:text-[#00a67d] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>视频</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Search className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">未找到匹配的项目</h3>
            <p className="text-white/50">尝试调整搜索关键词或筛选条件</p>
          </div>
        )}
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl bg-[#181818] border-white/10 text-white max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-white/60">
                  {selectedProject.subtitle}
                </DialogDescription>
              </DialogHeader>

              {/* Image */}
              <div className="relative h-64 rounded-xl overflow-hidden mt-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
                
                {/* Meta badges */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-3 py-1 glass-card rounded-lg text-sm text-[#00a67d]">
                    {selectedProject.category}
                  </span>
                  <span className="px-3 py-1 glass-card rounded-lg text-sm text-white/80">
                    {selectedProject.year}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedProject.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs bg-[#00a67d]/20 text-[#00a67d] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="text-lg font-semibold text-[#00a67d] mb-2">项目挑战</h4>
                  <p className="text-white/70">{selectedProject.details.challenge}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#00a67d] mb-2">解决方案</h4>
                  <p className="text-white/70">{selectedProject.details.solution}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#00a67d] mb-2">技术栈</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.details.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-white/5 text-white/80 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#00a67d] mb-2">项目成果</h4>
                  <p className="text-white/70">{selectedProject.details.results}</p>
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-8">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-[#00a67d]/20 rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>查看代码</span>
                  </a>
                )}
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#00a67d] hover:bg-[#00d4aa] rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>在线演示</span>
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
