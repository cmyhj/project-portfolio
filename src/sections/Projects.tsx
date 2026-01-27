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
    title: 'RoboMaster哨兵机器人自主导航与决策系统',
    subtitle: 'Autonomous Navigation and Decision-Making System',
    description: '基于ROS2的哨兵机器人自主导航与决策系统，集成Nav2、行为树和C++17。',
    image: '/project-portfolio/project1.jpg',
    tags: ['ROS2', 'Navigation2', 'BehaviourTree', 'C++17'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/nuaa-rm/auto_sentry2025',
    videoUrl: '/project-portfolio/project1-video.mp4',
    demoUrl: '/project-portfolio/project1-demo.mp4',
    details: {
      challenge: '复杂室内环境中的自主导航与任务决策，包括非纯净强干扰环境定位、狭窄通道穿越和多任务分层优先级实时执行。',
      solution: '自研Nav2地图层插件及其标定工具，优化TEB局部规划器参数，在Point-LIO下实现双激光雷达点云融合。',
      technologies: ['ROS2 Humble', 'Navigation2', 'PCL', 'Eigen', 'Point-LIO'],
      results: '大幅优化初始化定位成功率，通过极窄通道性能位列全国百所高校第一梯队。',
    },
  },
  {
    id: 2,
    title: '工程机器人机械臂控制系统',
    subtitle: 'Robot Arm Control System',
    description: '基于ROS2的七轴协作机械臂控制系统，配合视觉引导操作。',
    image: '/project-portfolio/project2.gif',
    tags: ['ROS2', 'MoveIt2', 'Python', 'C++'],
    category: '竞赛项目',
    year: '2025',
    githubUrl: 'https://github.com/nuaa-rm/RMAutoRedeemOre2025/tree/moveitarm',
    demoUrl: '/project-portfolio/project2-demo.mp4',
    details: {
      challenge: 'RoboMaster工程机器人需要具备在操作手不可见的情况下进行自主精准码垛的能力，同时需要在复杂环境中实现路径规划放置碰撞。',
      solution: '通过SolidWorks导出机器人URDF，使用Moveit2进行机械臂正逆运动学解以及路径规划。',
      technologies: ['ROS2 Humble', 'MoveIt2', 'Eigen', 'C++17'],
      results: '完成Moveit2的配置，成功与视觉识别前端对接，与下位机通信实现机械臂的运动规划和控制。',
    },
  },
  {
    id: 3,
    title: '仿生粘附爬壁机器人设计与性能研究',
    subtitle: 'Bionic Adhesive Wall-Climbing Robot',
    description: '面向多倾角表面及壁面过渡场景，开发轮足式爬壁机器人系统 。',
    image: '/project-portfolio/project3.gif',
    tags: ['仿生粘附', 'PCB设计', '机械结构设计', 'STM32'],
    category: '科研项目',
    year: '2025',
    githubUrl: 'https://github.com/cmyhj/ClimBot',
    demoUrl: '/project-portfolio/project3-demo.mp4',
    details: {
      challenge: '仿生爬壁机器人在复杂壁面环境常面临运动稳定性差与连续过渡能力不足的问题。',
      solution: '设计被动踝关节与柔性足垫，实现对不同地形的自适应爬壁。',
      technologies: ['STM32', 'Servo Motor', 'C', 'SolidWorks', 'PCB Design'],
      results: '可在全空间外壁进行90°越棱迁移，适应多种粗糙度和坡度。',
    },
  },
  {
    id: 4,
    title: '智能物流投送机器人的视觉系统',
    subtitle: 'AGV Visual System',
    description: '基于视觉识别，对AGV进行辅助定位和任务目标识别。',
    image: '/project-portfolio/project4.jpg',
    tags: ['OpenMV', 'Python', 'Communication'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/happyADD/Cart2024',
    videoUrl: '/project-portfolio/project4-video.mp4',
    details: {
      challenge: '中国机器人大赛暨RoboCup中国赛智能投送赛项。',
      solution: '通过视觉同时完成定位和目标识别，与里程计定位相结合，提高鲁棒性，实现精准投送。',
      technologies: ['OpenMV', 'Python', 'OpenCV'],
      results: '获得2024中国机器人大赛暨RoboCup中国赛智能投送赛项全国总冠军。',
    },
  },
  {
    id: 5,
    title: '仿生尺蠖软体机器人的设计与制作',
    subtitle: 'Inchworm Robot',
    description: '一种多自由度仿生尺蠖软体机器人的设计与制作。',
    image: '/project-portfolio/project5.png',
    tags: ['仿生', 'STM32', '气动', '步态规划'],
    category: '科研项目',
    year: '2023',
    githubUrl: 'https://github.com/Rango8848/Inchworm',
    demoUrl: '/project-portfolio/project5-demo.gif',
    details: {
      challenge: '目前大部分仿生尺蠖机器人灵活性欠佳，主要集中在一维直线运动和二维平面运动转换，而对在三维空间内实现自由移动的研究较为有限。 。',
      solution: '使用气压驱动，通过差分控制三列波纹管气压完成运动，设计了一种新型前进步态。',
      technologies: ['STM32', '气压驱动', '差分控制', 'C'],
      results: '实现了在三维空间内的灵活移动，行走速度0.2m/s。',
    },
  },
  {
    id: 6,
    title: '工创赛智能+物流投送机器人视觉系统',
    subtitle: 'AGV Visual System',
    description: '定位、移动、无线通信、避障、物料抓取与载运，实现物料自动搬运。',
    image: '/project-portfolio/project6.png',
    tags: ['AGV', '码垛', 'OpenMV', 'Industrial'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/cmyhj/RoboPoster-PRO-MAX',
    demoUrl: '/project-portfolio/project6-demo.mp4',
    details: {
      challenge: '该项目需要极高的定位码垛精度,又需要低功耗低延迟，且对体积与重量有严格要求（舍弃PC方案）。',
      solution: '采用OpenMV进行定位和码垛识别，研发快、准、稳的低功耗色环定位算法，同时可切换色块识别程序，路径校准功能，提高处理效率。',
      technologies: ['OpenMV', 'Python', 'OpenCV'],
      results: '定位精度±0.5mm，帧率达40fps。',
    },
  },
  {
    id: 7,
    title: '智能救援机器人电控系统',
    subtitle: 'Intelligent Rescue Robot',
    description: '2025中国大学生工程创新与实践大赛 智能+赛道 智能救援赛项',
    image: '/project-portfolio/project7.gif',
    tags: ['STM32', '差速控制', 'PID控制'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/cmyhj/broomaster',
    details: {
      challenge: '完成机器人可靠稳定的控制系统，包括定位、运动、与上位机通信、物料抓取与载运。',
      solution: '采用STM32进行定位和控制，FreeRTOS实现多任务管理，通过结构体，按类与对象的思路进行控制管理；研发快、准、稳的低功耗差速控制算法，可切换不同控制模式。',
      technologies: ['STM32', 'FreeRTOS', 'C', 'PID'],
      results: '运动控制稳定灵敏，响应快捷。',
    },
  },
  {
    id: 8,
    title: '智能避障小车',
    subtitle: 'Intelligent Obstacle Avoidance Car',
    description: '自动导航并避开障碍物的智能小车。',
    image: '/project-portfolio/project8.gif',
    tags: ['Robotics', 'Autonomous', 'Obstacle Avoidance'],
    category: '个人项目',
    year: '2023',
    details: {
      challenge: '学习项目，在复杂环境中自主导航并避开障碍物。',
      solution: '采用STM32进行定位和控制。',
      technologies: ['STM32', 'C', '传感器使用'],
      results: '小组唯一完赛。',
    },
  },
  {
    id: 9,
    title: '具备手指识别功的三子棋智能对弈装置',
    subtitle: 'Tic-tac-toe Game',
    description: '对双方棋子进行识别和定位，对当前棋盘布局进行分析，计算出最优落子位置坐标。',
    image: '/project-portfolio/project9.png',
    tags: ['人机交互', 'STM32', '图像识别', '人工智能对弈'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/3126872157/dian_sai',
    videoUrl: '/project-portfolio/project9-video.gif',
    details: {
      challenge: '1、精确放置棋子\n2、棋盘旋转适应性\n3、智能对弈策略\n4、错误应对与自动纠正\n5、实时反馈与交互',
      solution: '通过OpenCV实现对棋盘和棋子的实时识别，利用Minimax算法加上α-β剪枝进行对弈策略。',
      technologies: ['OpenCV', 'Minimax', 'Python', 'α-β剪枝'],
      results: '在实现基础功能的同时，还额外实现了对手指的识别，实现指哪打哪。',
    },
  },
  {
    id: 10,
    title: '仿鸽爪式多功能扑翼飞行器起落架',
    subtitle: 'Multifunctional Wings Landing Gear',
    description: '为扑翼飞行器设计的多功能起落架，支持不同类型的扑翼飞行器。',
    image: '/project-portfolio/project10.gif',
    tags: ['Multifunctional', 'Wings', 'Landing Gear'],
    category: '课程项目',
    year: '2023',
    details: {
      challenge: '设计一个成本低、易操作、可扩展的多功能起落架，支持不同类型的扑翼飞行器。',
      solution: '采用仿鸽爪式设计，支持不同类型的扑翼飞行器，同时可扩展添加其他功能模块。',
      technologies: ['SolidWorks', '3D Printing', 'Arduino'],
      results: '优秀结题',
    },
  },
  {
    id: 11,
    title: '3D视觉识别装置',
    subtitle: 'Agricultural Harvesting Robot',
    description: '智能识别日用品。',
    image: '/project-portfolio/project1.jpg',
    tags: ['Agriculture', 'Deep Learning', 'Robotic Arm', 'Vision'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/nuaa-rm/RoboCup',
    details: {
      challenge: '在复杂果园环境中准确识别日用品并进行无损采摘。',
      solution: '结合深度学习和机器视觉，实现精准物品识别和柔性抓取。',
      technologies: ['PyTorch', 'YOLO', 'Depth Camera', 'ROS'],
      results: '中国机器人大赛暨RoboCup中国赛先进视觉赛项全国二等奖',
    },
  },
  {
    id: 12,
    title: '减速箱设计',
    subtitle: 'Medical Assistance Robot',
    description: '医院环境中的智能导诊和配送机器人。',
    image: '/project-portfolio/project1.jpg',
    tags: ['Medical', 'Navigation', 'Human-Robot Interaction', 'IoT'],
    category: '课程项目',
    year: '2025',
    githubUrl: 'https://github.com/example/medical-robot',
    videoUrl: '/project-portfolio/project12-video.mp4',
    details: {
      challenge: '在医院复杂环境中实现自主导航和与患者安全交互。',
      solution: '集成激光雷达、深度摄像头和语音交互系统。',
      technologies: ['ROS', 'Speech Recognition', 'SLAM', 'Android'],
      results: '导航成功率96%，语音识别准确率90%，支持语音对话。',
    },
  },
  {
    id: 13,
    title: '模拟音游击打',
    subtitle: 'Smart Home Robot',
    description: '集成语音助手和移动底盘的家庭服务机器人。',
    image: '/project-portfolio/project1.jpg',
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
    title: '迷宫坦克小游戏',
    subtitle: 'Maze Tank Game',
    description: '在迷宫中控制坦克移动，避免撞到墙或其他坦克。',
    image: '/project-portfolio/project1.jpg',
    tags: ['Tank', 'Maze', 'Game', 'Python'],
    category: '个人项目',
    year: '2024',
    githubUrl: 'https://github.com/example/maze-tank',
    videoUrl: 'https://youtube.com/watch?v=example14',
    details: {
      challenge: '实现高效、灵活的水下推进和姿态控制。',
      solution: '设计多关节仿生尾鳍，模拟真实鱼类游动姿态。',
      technologies: ['3D Printing', 'Servo Control', 'Waterproof', 'Arduino'],
      results: '游动速度0.5m/s，转向半径15cm，续航时间45分钟。',
    },
  },
  {
    id: 15,
    title: '数据集拍摄模拟器',
    subtitle: 'Dataset Shooting Simulator',
    description: '模拟数据集拍摄过程，包括相机移动、场景渲染和数据标注。',
    image: '/project-portfolio/project1.jpg',
    tags: ['Game', '2048', 'Python'],
    category: '个人项目',
    year: '2024',
    githubUrl: 'https://github.com/example/2048-game',
    videoUrl: 'https://youtube.com/watch?v=example15',
    details: {
      challenge: '实现一个简单而又有趣的游戏，同时保持代码的可读性和可维护性。',
      solution: '使用Python和Pygame库开发游戏，采用MVC架构模式。',
      technologies: ['Python', 'Pygame', 'MVC'],
      results: '玩家可以通过合并方块来获得更高的分数，同时保持游戏的简单性。',
    },
  }
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

              {/* Image or Video */}
              <div className="relative h-64 rounded-xl overflow-hidden mt-4">
                {selectedProject.videoUrl ? (
                  selectedProject.videoUrl.includes('youtube.com') || selectedProject.videoUrl.includes('youtu.be') ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedProject.videoUrl.split('v=')[1]?.split('&')[0] || selectedProject.videoUrl.split('/').pop()}`}
                      title={selectedProject.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={selectedProject.videoUrl}
                      controls
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                )}
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
