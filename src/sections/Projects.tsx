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
    title: 'RoboMaster 哨兵机器人自主导航与决策系统',
    subtitle: 'Autonomous Navigation and Decision-Making System',
    description: '基于ROS2的高性能哨兵平台，集成多传感器融合定位、动态路径规划与行为树决策架构，实现复杂战场环境下的完全自主导航与战术执行。',
    image: '/project-portfolio/project1.jpg',
    tags: ['ROS2', 'Navigation2', 'Sensor Fusion', 'C++17'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/nuaa-rm/auto_sentry2025',
    videoUrl: '/project-portfolio/project1-video.mp4',
    demoUrl: '/project-portfolio/project1-demo.mp4',
    details: {
      challenge: '在强干扰非结构化环境中实现鲁棒定位（大量动态障碍物），解决狭窄通道（<50cm）的高频路径规划，以及多任务并发下的实时决策调度（巡逻/追击/躲避优先级动态切换）。',
      solution: '设计并实现了双激光雷达点云融合前端，优化Point-LIO算法；开发Nav2自定义代价地图层与自动化标定工具链，重构TEB局部规划器参数以提升狭窄空间通过性；搭建分层行为树架构，实现感知-决策-控制闭环。',
      technologies: ['ROS2 Humble', 'Navigation2', 'PCL', 'Eigen', 'Point-LIO', 'BehaviourTree.CPP'],
      results: '定位初始化成功率提升至100%（20余场正式比赛中），在全国百余所高校参赛队伍中，狭窄通道通过性能位列第一梯队。'
    },
  },
  {
    id: 2,
    title: '仿生粘附壁面过渡机器人',
    subtitle: 'Bio-inspired Adhesive Robot for Wall Transition',
    description: '基于范德华力粘附机理的轮足式爬壁机器人，面向太空巡检场景中的多倾角表面连续过渡需求，实现全空间灵活机动。',
    image: '/project-portfolio/project3.gif',
    tags: ['Bionic Design', 'Adhesion Mechanism', 'STM32'],
    category: '科研项目',
    year: '2025',
    githubUrl: 'https://github.com/cmyhj/ClimBot',
    demoUrl: '/project-portfolio/project3-demo.mp4',
    details: {
      challenge: '仿壁虎粘附机构在粗糙表面的可靠性控制，以及90°内外直角过渡时的力矩平衡与姿态保持，需解决脚掌剥离/粘附的时序同步问题。',
      solution: '设计被动顺应性踝关节与柔性仿生足垫，实现接触力自平衡；开发基于有限状态机的多足协调控制算法，优化脚掌剥离轨迹实现平滑壁面过渡。',
      technologies: ['STM32', 'FreeRTOS', 'SolidWorks',  'Control Theory'],
      results: '实现全倾角表面（0-360°）稳定附着，90°越棱迁移成功率>85%，自适应粗糙度范围Ra 0.8-25μm。'
    },
  },
  {
    id: 3,
    title: '狭窄复杂空间自主巡防机器人电控系统',
    subtitle: 'Autonomous Patrol Robot for Complex Environments',
    description: '集侦、识、打功能于一体的狭窄空间自主巡防机器人，优化通信协议与底盘控制。',
    image: '/project-portfolio/project16.png',
    tags: ['Robotics', 'STM32', 'Control Algorithm', 'Communication Protocol'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/bandetip/sentinel',
    demoUrl: '/project-portfolio/project16-demo.mp4',
    details: {
      challenge: '在狭窄复杂空间（斜坡、台阶、狭窄隧道）实现自主巡防，面临多传感器实时数据融合、高频率目标识别与火控响应、半舵轮半全向轮混合底盘的复杂运动学解算、以及原通信协议传输速率瓶颈等难题；需在保证实时性的同时实现上下位机高速协同。',
      solution: '优化单片机与上位机通信协议，采用特定序列化/反序列化程序重构数据帧结构；针对半舵轮半全向轮混合底盘开发专用运动学解算算法与高性能控制器；基于FreeRTOS重构嵌入式软件架构，实现HAL层、RTOS层、应用层模块化分离；集成双激光雷达SLAM、视觉自瞄、行为树决策等算法，完成机电控一体化系统联调。',
      technologies: ['STM32', 'FreeRTOS', 'CAN Bus', 'PID Control'],
      results: '通信协议优化后传输速率提升50倍以上；半舵半全向底盘实现全向移动与原地转动，适应20度斜坡与复杂地形；完成机械、算法、电控一体化联调，实现无人干预自主巡防功能。'
    },
  },
  {
    id: 4,
    title: '迷宫战场自主导航系统',
    subtitle: 'Maze Battlefield Navigation System',
    description: '基于ROS2和OpenCV的模拟哨兵机器人视觉导航系统，实现动态迷宫中的目标识别、密码破解与自主路径规划。',
    image: '/project-portfolio/project14.png',
    tags: ['Autonomous Navigation', 'ROS2', 'Computer Vision'],
    category: '个人项目',
    year: '2025',
    githubUrl: 'https://github.com/cmyhj/answer2',
    videoUrl: '/project-portfolio/project14-video.mp4',
    demoUrl: '/project-portfolio/project14-demo.mp4',
    details: {
      challenge: '在随机生成的RM迷宫战场中，哨兵机器人需在有限视野条件下完成多阶段任务：识别并击毁巡逻敌方步兵获取密码片段，通过虚拟串口按特定协议（帧头0xAA、帧尾0xBB）收发密码数据，导航至中央蓝色区域解除敌方基地无敌状态，最终摧毁基地。困难模式下视野受限且地图未知，要求实时建图与动态避障。',
      solution: '采用分层导航架构：使用OpenCV进行视觉感知与目标识别，结合Nav2框架实现实时建图；全局路径规划采用A*算法确保最优路径，自研局部控制器处理动态避障与巡逻敌人跟踪；通过串口通信模块完成与判题机的密码交互协议，实现密码片段的自动拼接与验证；集成ROS2话题机制实现图像接收与发射控制指令的发送。',
      technologies: ['ROS2', 'OpenCV', 'Nav2', 'A* Algorithm', 'C++', 'Serial Communication'],
      results: '困难模式成功达成目标，实现有限视野下的实时建图与自主导航，完成敌方步兵识别、密码破解及基地摧毁全流程任务，系统稳定通过有限视野迷宫挑战。'
    },
  },
  {
    id: 5,
    title: '合成数据生成与自动标注系统',
    subtitle: 'Synthetic Data Generation Pipeline',
    description: '基于Godot引擎的自动化训练数据集生成工具，实现赛场环境的域随机化、视觉可见性校验与无人干预的自动标注导出。',
    image: '/project-portfolio/project15.png',
    tags: ['Godot', 'Computer Vision', 'Synthetic Data', 'Automation'],
    category: '个人项目',
    year: '2024',
    githubUrl: 'https://github.com/cmyhj/Carsimulator',
    videoUrl: '/project-portfolio/project15-video.mp4',
    details: {
      challenge: '解决神经网络训练缺乏大规模标注数据的问题：需要构建能够自动批量生成带标注训练数据的环境，确保生成的图像中目标物体具有完整的视觉特征（不被遮挡、在视野范围内），并且光照、位置等环境参数具有足够的多样性以提升模型泛化能力，同时实现无需人工干预的自动边界框和关键点标注。',
      solution: '基于Godot 4引擎构建3D赛场环境，集成域随机化技术动态调整车辆位置、光照强度和方向；开发基于物理射线检测的可见性验证算法（are_nodes_visible），确保相机视野内目标无遮挡且满足最小像素尺寸要求；实现屏幕空间投影关键点检测（car_getKeypoints）与自动标注导出功能，直接将归一化坐标和裁剪信息写入txt文件，构建从场景渲染到数据存储的全自动化Pipeline。',
      technologies: ['Godot 4', 'GDScript', '3D Rendering', 'Computer Vision', 'Domain Randomization', 'Auto-labeling'],
      results: '实现完全的自动化数据生成，无需人工拉框即可完成精准标注；支持实时可见性校验确保数据质量；通过光照和位置的域随机化生成多样化训练样本，有效提升下游视觉模型在实际赛场环境中的检测精度。'
    },
  },
  {
    id: 6,
    title: 'RoboCup物流投送机器人 - 嵌入式视觉融合定位',
    subtitle: 'Embedded Vision Localization for RoboCup AGV',
    description: '基于OpenMV的轻量级嵌入式视觉系统，实现AGV在复杂环境下的实时多模态定位与目标识别，通过视觉-里程计融合提升投送精度与鲁棒性。',
    image: '/project-portfolio/project4.jpg',
    tags: ['OpenMV', 'Sensor Fusion', 'Embedded Vision', 'Python'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/happyADD/Cart2024',
    videoUrl: '/project-portfolio/project4-video.mp4',
    demoUrl: '/project-portfolio/project4-demo.mp4',
    details: {
      challenge: '在资源受限的OpenMV平台（算力/内存有限）上，实现复杂环境下（光照变化、地面纹理缺失）的高频视觉定位；解决纯里程计在轮子打滑时的累积误差问题，确保厘米级精准停靠以完成物料投送任务。',
      solution: '设计轻量级视觉算法流水线：融合类AprilTag（通过白色方块）/色块检测与里程计数据实现视觉-惯性融合定位；开发动态曝光与自适应阈值算法应对环境光照突变；建立与主控的串口通信协议，实时回传目标位姿与识别结果。',
      technologies: ['OpenMV', 'Python', 'OpenCV', 'Serial Communication'],
      results: '荣获2024中国机器人大赛暨RoboCup中国赛智能投送赛项全国总冠军；实现厘米级投送精度，视觉辅助下里程计漂移降低90%，单帧目标检测与定位解算耗时<100ms。'
    },
  },
  {
    id: 7,
    title: 'RoboMaster工程机器人 - 七轴冗余机械臂自主操控',
    subtitle: '7-DOF Redundant Manipulator Autonomous Control',
    description: '基于ROS2 Humble与MoveIt2的七自由度冗余机械臂控制系统，集成视觉伺服实现矿石的自主识别、抓取与无碰撞码垛。',
    image: '/project-portfolio/project2.gif',
    tags: ['MoveIt2', 'ROS2', 'Visual Servoing', 'Kinematics'],
    category: '竞赛项目',
    year: '2025',
    githubUrl: 'https://github.com/nuaa-rm/RMAutoRedeemOre2025/tree/moveitarm',
    demoUrl: '/project-portfolio/project2-demo.mp4',
    details: {
      challenge: '在非结构化战场环境下实现全自主操作（非人工遥控）：解决七轴机械臂的冗余运动学实时逆解难题；在密集堆叠场景中规划无碰撞路径；克服手眼标定误差与通信延迟对抓取精度的影响。',
      solution: '基于SolidWorks构建URDF模型，配置MoveIt2运动规划框架（OMPL + RRTConnect）；利用七轴冗余特性开发关节限位优化与实时避障算法；与手眼相机配合实现视觉伺服闭环，通过ROS2-control硬件接口实现与嵌入式下位机的高速通信（>100Hz）。',
      technologies: ['ROS2 Humble', 'MoveIt2', 'Eigen', 'C++17', 'ROS2-Control'],
      results: '实现矿石从识别到码垛的全流程自动化；在模拟环境中实现99%的无碰撞路径规划成功率；与视觉前端成功对接，满足赛事高并发操作需求。'
    },
  },
  {
    id: 8,
    title: 'Phigros音游自动打歌系统',
    subtitle: 'Phigros Auto-Play Vision System',
    description: '基于ROS2和OpenCV开发Phigros音游自动打歌系统，实现音符检测、判定线识别与精准点击输出。',
    image: '/project-portfolio/project13.png',
    tags: ['Computer Vision', 'ROS2', 'OpenCV', 'C++'],
    category: '个人项目',
    year: '2024',
    githubUrl: 'https://github.com/cmyhj/answer',
    videoUrl: '/project-portfolio/project13-video.mp4',
    details: {
      challenge: '开发视觉算法自动识别Phigros游戏(模拟,非真实)中的Click音符：处理三种难度级别（EZ水平判定线、HD倾斜判定线、IN随机移动旋转判定线），实现垂直判定逻辑（计算音符到判定线的垂线距离），并在15px/30px/60px不同阈值范围内分别判定为perfect/good/bad，最终通过ROS2消息系统实时输出点击坐标。',
      solution: '构建ROS2 Package接收图像话题消息，利用OpenCV进行边缘检测与形态学操作识别音符和判定线位置，实现几何计算判断音符与判定线垂直距离。开发自适应延迟检测功能，通过第一次点击时音符与判定线的实际距离计算系统延迟，适配不同运行环境下的响应时差。根据动态阈值进行击打判定，通过ROS2 Topic发布点击指令消息，支持实时串流处理。',
      technologies: ['ROS2', 'OpenCV', 'C++', 'Linux', 'CLion', 'Git', 'Image Processing'],
      results: '完成ROS2功能包开发，实现音符实时检测与判定，miss率0%，perfect率95%，具备EZ/HD/IN三种难度适配能力及自适应延迟补偿功能，通过commit记录验收。'
    },
  },
  {
    id: 9,
    title: '基于视觉手势识别的三子棋对弈机器人',
    subtitle: 'Vision-Based Human-Robot Tic-Tac-Toe System',
    description: '融合实时视觉感知、AI博弈决策与精密运动控制，实现免触控手势交互的智能对弈装置。系统通过指尖定位实现"指哪落哪"的自然交互，并具备棋盘旋转自适应与错误自检能力。',
    image: '/project-portfolio/project9.png',
    tags: ['Computer Vision', 'Gesture Recognition', 'STM32', 'Game AI', 'Embedded Control'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/3126872157/dian_sai',
    demoUrl: '/project-portfolio/project9-demo.gif',
    details: {
      challenge: '在嵌入式平台（STM32+OpenMV）算力受限条件下，实现复杂背景下的实时指尖检测与棋盘定位；解决棋盘任意旋转导致的格点映射失真问题；设计高鲁棒性的人机交互逻辑，应对误触、遮挡等异常场景。',
      solution: '基于OpenCV实现棋盘角点检测与透视变换，建立旋转不变性的图像坐标系；利用肤色分割与遮挡检测实现指尖实时追踪，映射至棋盘逻辑坐标；采用Minimax算法配合α-β剪枝优化博弈树搜索深度，确保在嵌入式环境毫秒级决策；开发异常状态机检测落子失败并自动重试。',
      technologies: ['OpenCV', 'Minimax Algorithm', 'α-β Pruning', 'Python', 'STM32 HAL', 'Perspective Transform'],
      results: '创新性地实现零接触手势控制（指哪打哪），支持棋盘360°任意角度摆放；图像端到执行端全流程延迟<200ms；AI对弈 unbeatable（理论不败），硬件自动纠错成功率>98%；荣获电子设计竞赛省二等奖。'
    },
  },
  {
    id: 10,
    title: '传动机构设计',
    subtitle: 'Transmission Device Design',
    description: '综合运用机械设计知识完成传动装置总体设计、传动系统计算及减速器结构设计，培养工程实践能力和创新设计意识。',
    image: '/project-portfolio/project12.png',
    tags: ['Mechanical Design', 'Gear Transmission', 'AutoCAD', 'Engineering Drawing'],
    category: '课程项目',
    year: '2025',
    details: {
      challenge: '完成机械传动装置的完整设计流程：解决传动方案拟定与优化、电动机选型与动力参数计算、各级传动比合理分配、复杂轴系结构设计及强度校核、轴承寿命计算与密封润滑方案设计、箱体及附件结构设计等工程问题。需确保装配图、零件图与计算说明书三者数据严格一致，符合机械制图国家标准。',
      solution: '采用"先总体后局部、先箱外后箱内"的系统化设计方法：首先进行传动装置总体设计，选择电动机并计算运动和动力参数；先设计带传动确定实际传动比，再分配减速器传动比进行齿轮设计；通过草图设计阶段完成轴的结构设计、轴承选型与联轴器选择；进行轴强度、轴承寿命、键连接强度的详细校核计算；最后完成减速器装配图、零件图，编写设计计算说明书。',
      technologies: ['AutoCAD', 'Mechanical Design', 'GB/T Standards', 'Tolerance and Fit'],
      results: '完成两级减速器装配图(A0)一张，输出轴及低速级大齿轮零件工作图(A2)各一张，设计计算说明书一份，通过答辩考核，成绩优秀（95）。'
    }
  },
  {
    id: 11,
    title: '3D视觉识别装置',
    subtitle: 'RoboCup China - Advanced Vision 3D Recognition',
    description: '基于RGBD相机的静态与动态场景下日用品、副食品、饮料及水果的3D识别与计数系统，支持旋转目标台实时检测。',
    image: '/project-portfolio/project17.jpg',
    tags: ['Robotics', 'Computer Vision', '3D Perception', 'Edge AI', 'RGBD Camera'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/nuaa-rm/RoboCup',
    details: {
      challenge: '在复杂场景下实现高精度实时识别：1) 处理动态旋转目标台（5-30秒/圈）上的运动物体跟踪；2) 应对同类物品多姿态摆放及相互遮挡、叠放；3) 区分真实物品与随机打印的贴图干扰物及场地实物干扰；4) 在特定光源（7W黄光/白光）照射及多目标台（3台）场景下保持识别稳定性；5) 满足严格的时间限制（第一轮20-50s，第二轮MinTime=70s）。',
      solution: '采用传统算法与深度学习融合的混合方案，基于NVIDIA Jetson Nano边缘计算平台和奥比中光Astra+ RGBD相机，结合点云分割与深度学习检测实现多目标精准定位。开发裁判盒通信协议实现相机自动旋转控制与结果自动上报，具备自动终止机制，满足比赛全流程自动化要求。',
      technologies: ['Python', 'PyTorch', 'OpenCV', 'PCL', 'ROS', 'Orbbec Astra+', 'Jetson Nano', 'Socket Communication'],
      results: '2024中国机器人大赛暨RoboCup机器人世界杯中国赛-机器人先进视觉赛项3D识别项目全国二等奖'
    }
  },
  {
    id: 12,
    title: '工创赛智能物流AGV-嵌入式高速视觉定位系统',
    subtitle: 'High-Speed Embedded Vision for Industrial AGV',
    description: '面向工业物流场景的轻量级AGV视觉定位解决方案，在资源极度受限的嵌入式平台上实现亚毫米级色环/色块识别与动态路径校准，满足高精度码垛与低功耗运行的双重约束。',
    image: '/project-portfolio/project6.png',
    tags: ['Embedded Vision', 'AGV', 'Real-time System', 'Industrial Automation'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/cmyhj/RoboPoster-PRO-MAX',
    demoUrl: '/project-portfolio/project6-demo.mp4',
    details: {
      challenge: '在舍弃PC级计算平台（体积/重量/功耗约束）的前提下，在OpenMV（Cortex-M7，320x240@60fps）上实现工业级定位精度（<±1mm）与高帧率（>30fps）的平衡；解决环境光照剧烈变化导致的色环褪色/反光问题；设计动态路径校准补偿机制以消除轮式里程计累积误差。',
      solution: '研发轻量级色环定位算法：基于OpenCV优化色彩空间转换（Lab>HLS），自适应动态阈值分割结合轮廓几何约束（圆度、面积比）实现鲁棒色环检测；实现基于视觉反馈的实时路径校准，校正底盘行驶偏差。',
      technologies: ['OpenMV H7', 'Python', 'OpenCV', 'Color Space Filtering', 'Contour Analysis', 'Sensor Fusion'],
      results: '定位精度达±0.5mm（亚毫米级），处理帧率40fps，端到端延迟<25ms；系统功耗<2W（纯视觉模块）；成功完成工创赛物流投送全流程任务（抓取-搬运-码垛）。'
    },
  },
  {
    id: 13,
    title: '软体尺蠖机器人 - 三维空间气压驱动系统',
    subtitle: 'Pneumatic Soft Inchworm Robot for 3D Locomotion',
    description: '基于波纹管差分气压驱动的仿生软体机器人，突破传统一维/二维运动限制，实现三维空间内的多自由度灵活移动，用于狭窄管道检测与环境探索。',
    image: '/project-portfolio/project5.png',
    tags: ['Soft Robotics', 'Pneumatic Actuation', 'STM32', 'Embedded Control'],
    category: '科研项目',
    year: '2023',
    githubUrl: 'https://github.com/Rango8848/Inchworm',
    demoUrl: '/project-portfolio/project5-demo.gif',
    details: {
      challenge: '传统刚性尺蠖机器人受限于关节自由度与机构复杂度，难以在三维曲面或不规则空间中灵活转向；软体机器人面临气压-位移非线性建模、多腔体协同控制延迟及结构刚性不足的难题。',
      solution: '通过独立控制各腔体内气压进行波纹管差分驱动实现弯曲、伸展、扭转复合运动；基于STM32开发多路PWM气压控制算法，优化步态时序（前后锚定-中间收缩）实现仿尺蠖蠕动。',
      technologies: ['STM32', 'Pneumatic Control', 'Differential Drive', 'Gait Planning'],
      results: '突破性地实现三维空间全方位移动（XYZ三轴平移+俯仰偏航），直线行走速度达0.2m/s。'
    },
  },
  {
    id: 14,
    title: '工创赛智能救援机器人 - 电控系统',
    subtitle: 'Rescue Robot Control System',
    description: '面向灾害救援场景的异构机器人控制系统，集成多传感器融合定位、自适应差速底盘控制与多自由度执行器协同，实现复杂地形下的物资搜寻与精准搬运。',
    image: '/project-portfolio/project7.gif',
    tags: ['STM32', 'RTOS', 'Control Theory', 'Sensor Fusion'],
    category: '竞赛项目',
    year: '2024',
    githubUrl: 'https://github.com/cmyhj/broomaster',
    details: {
      challenge: '救援场景下的适应性；上位机视觉指令与底层控制的实时同步（延迟<50ms）；多执行器（底盘+执行机构）的并发控制与任务调度。',
      solution: '基于STM32F4与FreeRTOS构建分层控制架构：应用层负责任务解析，中间层实现OOP风格的设备对象管理（底盘/云台/执行器），驱动层处理电机PID与传感器采集；支持快速/精准/爬坡等多模式切换；实现基于串口的双向上位机通信协议，确保指令可靠传输。',
      technologies: ['STM32', 'FreeRTOS', 'C/C++', 'PID Control', 'Differential Drive', 'State Machine'],
      results: '控制指令响应延迟<20ms，底盘直线行驶轨迹偏差<2%，爬坡能力达25°，通过imu进行实时姿态矫正。'
    },
  },
  {
    id: 15,
    title: '自主避障导航小车',
    subtitle: 'Autonomous Navigation with Obstacle Avoidance',
    description: '基于超声波阵列与红外传感的嵌入式导航实验平台，实现动态环境下的实时避障与路径重规划。',
    image: '/project-portfolio/project8.gif',
    tags: ['STM32s', 'Sensor Fusion', 'Real-time Control'],
    category: '个人项目',
    year: '2023',
    details: {
      challenge: '在仅使用基础传感器（超声+红外）且算力受限的STM32平台上，实现障碍物的可靠检测与实时响应；。',
      solution: '通过该项目进行学习，成功部署超声波-红外多传感器融合策略；基于有限状态机（FSM）实现行为控制（前进-避障-转向-回正），麦克纳姆轮控制转向。',
      technologies: ['STM32', 'C', 'Ultrasonic Sensor', 'Infrared Sensor', 'State Machine', 'PID'],
      results: '在课程竞赛中成为小组唯一完赛项目，实现静态障碍物避障成功率100%，全程无人工干预自主完赛。'
    },
  },
  {
    id: 16,
    title: '仿生鸽爪式自适应扑翼飞行器起落架',
    subtitle: 'Bio-inspired Adaptive Landing Gear for Ornithopters',
    description: '借鉴鸽子着陆机制的创新型起落架设计，兼顾多种扑翼飞行器适配性与模块化扩展能力，实现不同地形下的稳定着陆与载荷保护。',
    image: '/project-portfolio/project10.gif',
    tags: ['Bio-inspired Design', 'Mechanical Design', 'Rapid Prototyping'],
    category: '课程项目',
    year: '2023',
    details: {
      challenge: '扑翼飞行器（Ornithopter）因机翼拍动产生振动，传统起落架难以兼容不同翼展与重量机型；需实现复杂地面（草地/砂石/斜坡）的自适应着陆缓冲，且要求低成本、快速拆装与功能扩展接口。',
      solution: '仿生学设计：模拟鸽爪肌腱被动抓握机制，设计弹性四连杆缓冲结构，着陆时通过自重触发爪式抱合增强摩擦；采用模块化快拆接口，支持相机/传感器载荷即插即用；基于SolidWorks参数化建模适配不同机型。',
      technologies: ['SolidWorks', '3D Printing', 'Finite Element Analysis', 'Mechanical Design'],
      results: '优秀结题评价。'
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
