const projects = {
  en: [
    {
      id: 'sales-dashboard',
      title: 'Ship Information Management System',
      tag: 'Java System / Information Management',
      image: '/images/project-sales-dashboard.png',
      resultPdf: '/documents/ship-management-system.pdf',
      resultPdfPoster: '/images/ship-management-pdf-cover.png',
      resultPdfTitle: '项目成果 PDF',
      resultPdfDescription:
        '点击预览，可在弹窗中查看船舶信息管理系统课程设计论文，包含项目背景、需求分析、数据库设计、系统功能实现、运行结果和测试结论等内容。',
      description:
        'A ship information management system designed to improve dispatching, route, port entry, port departure, vessel, and operation information management.',
      background:
        'Traditional ship information management often relies on handwritten manual records, which are inefficient, time-consuming, labor-intensive, and difficult to synchronize quickly.',
      problem:
        'Port and vessel operation information needs to be updated in time, especially when weather or schedule changes affect port plans. Managers and dispatchers also need unified data for query, statistics, analysis, report generation, and printing.',
      solution:
        'Built a Java-based information management system to manage dispatchers, route information, port entry information, port departure information, vessel information, and operation information, while using Java cross-platform capabilities to improve system compatibility.',
      contribution: [
        'Organized core business modules including dispatcher management, route management, vessel information, port entry and departure records, and operation information.',
        'Designed query, statistics, analysis, report generation, and printing functions to support management decisions.',
        'Used Java and database design to support cross-platform deployment and data synchronization across different vessel management departments.',
      ],
      result:
        'Improved the efficiency of ship information management, reduced manual workload, supported real-time port status updates, and provided more convenient services for managers, dispatchers, and public travel planning.',
      techStack: ['Java', 'MySQL', 'Information Management System', 'Database Design', 'Report Generation'],
    },
    {
      id: 'sea-land-segmentation',
      title: 'Dual-Domain Alignment-Guided CNN-Transformer Network for Sea-Land Segmentation',
      tag: 'Remote Sensing / Semantic Segmentation',
      image: '/images/project-sea-land.png',
      description:
        'A remote sensing segmentation project focusing on robust sea-land segmentation in complex coastal scenes with weak boundaries, strong interference, and multi-scale structures.',
      background:
        'Sea-land segmentation is important for remote sensing analysis, coastal monitoring, and geographic information extraction.',
      problem:
        'Complex coastal scenes often contain weak boundaries, strong interference, shadows, waves, and multi-scale land structures, making accurate segmentation difficult.',
      solution:
        'Designed a CNN-Transformer segmentation approach to combine local texture extraction and global context modeling, improving robustness in complex coastal scenes.',
      contribution: [
        'Reviewed CNN, Transformer, Swin Transformer, and ResNet-based segmentation methods.',
        'Structured the model design around dual-domain feature alignment and multi-scale representation.',
        'Prepared project documentation and analysis around model motivation, architecture, and segmentation challenges.',
      ],
      result:
        'Built a clear research-oriented project framework for robust sea-land segmentation and improved understanding of deep learning methods in remote sensing scenarios.',
      techStack: ['PyTorch', 'CNN', 'Transformer', 'Swin Transformer', 'ResNet', 'Remote Sensing', 'Semantic Segmentation'],
    },
    {
      id: 'license-plate-recognition',
      title: 'License Plate Recognition System',
      tag: 'Computer Vision / OCR',
      image: '/images/project-license-plate.png',
      resultVideoPoster: '/images/license-plate-video-cover.png',
      description:
        'A two-stage license plate recognition system integrating object detection, character recognition, and database-based result management.',
      background:
        'License plate recognition is a common intelligent transportation scenario that requires stable detection, recognition, and result storage.',
      problem:
        'The system needed to locate license plates accurately, recognize characters reliably, and manage recognition results in a structured database.',
      solution:
        'Implemented a two-stage pipeline using YOLOv5 for plate detection and LPRNet for character recognition, with MySQL used for result management.',
      contribution: [
        'Integrated object detection and character recognition modules into one workflow.',
        'Used Python and OpenCV for image processing and system-level logic.',
        'Designed database-based result storage for later query and management.',
      ],
      result:
        'Completed an end-to-end recognition workflow covering image input, plate localization, character recognition, and result storage.',
      resultVideo: '/videos/license-plate-demo.mp4',
      techStack: ['YOLOv5', 'LPRNet', 'Python', 'OpenCV', 'MySQL'],
    },
    {
      id: 'recruitment-visualization',
      title: 'Multivariate Recruitment Data Visualization Analysis',
      tag: 'Data Visualization / Analytics',
      image: '/images/project-recruitment.png',
      description:
        'A data visualization project analyzing job market patterns across cities, salaries, education requirements, and experience levels.',
      background:
        'Recruitment data contains valuable signals about market demand, salary distribution, required skills, education requirements, and experience levels.',
      problem:
        'Raw recruitment data is often messy and difficult to interpret directly, making it hard to compare market patterns across multiple dimensions.',
      solution:
        'Cleaned and structured recruitment data, then designed ECharts-based visualizations to compare job market patterns across cities, salaries, education, and experience.',
      contribution: [
        'Performed data cleaning and feature organization with Python and Pandas.',
        'Designed visual analysis views for city distribution, salary range, education requirement, and experience level.',
        'Summarized insights from charts to support job market understanding.',
      ],
      result:
        'Produced a multivariate visualization analysis that made recruitment patterns easier to compare and communicate.',
      techStack: ['Python', 'Pandas', 'ECharts', 'Data Cleaning', 'Data Visualization'],
    },
  ],
  zh: [
    {
      id: 'sales-dashboard',
      title: '船舶信息管理系统',
      tag: 'Java 系统 / 数据管理产品',
      image: '/images/project-sales-dashboard.png',
      resultPdf: '/documents/ship-management-system.pdf',
      resultPdfPoster: '/images/ship-management-pdf-cover.png',
      description:
        '面向码头与船舶调度管理场景的信息管理系统，用于统一管理调度人员、航线、进港、出港、船舶、作业、事故、预警和检查等信息，提升船舶运营数据的录入、查询、统计和报表输出效率。',
      background:
        '传统船舶信息管理依赖人工手写记录和分散式台账，存在录入效率低、同步不及时、查询困难和统计成本高等问题。随着船舶运输、码头调度和航线管理的信息量持续增加，管理人员需要一套统一的信息系统来集中维护调度人员、航线、进出港、船舶和作业等关键数据。本项目基于船舶管理业务场景，设计并开发船舶信息管理系统，通过 Web 化方式提升船舶运营信息的录入、查询、统计和输出效率，为管理员与调度人员提供更稳定、规范和可追踪的信息管理工具。',
      problem:
        '船舶管理过程中涉及调度人员、航线、进港、出港、作业、事故、预警和检查等多类信息，若依赖传统人工记录，容易出现信息滞后、数据不一致、查询效率低和统计困难等问题。项目需要将分散的船舶运营信息统一沉淀到数据库中，根据不同角色提供差异化权限和功能入口，提升管理员与调度人员对航线、进出港和船舶信息的查询效率，并支持数据导出、打印和统计分析，辅助日常调度与决策。',
      solution:
        '本项目采用 Java Web 技术栈进行系统设计与开发，基于 B/S 架构和 MVC 思想，将系统拆分为前端展示、业务控制和数据库存储等层次，提升系统的模块化和可维护性。系统围绕船舶管理核心业务设计调度人员管理、航线信息管理、进港信息管理、出港信息管理、船舶信息管理、作业信息管理、事故记录管理、预警信息管理和检查信息管理等模块，并通过 MySQL 建立多张业务数据表，对各类船舶运营信息进行结构化存储。在功能实现上，系统支持不同角色登录与权限控制、分页查询、Token 登录校验、动态导航菜单、Excel 数据导出、打印和进出港信息统计等能力。',
      contribution: [
        '参与船舶信息管理系统的需求分析，梳理管理员、调度人员和船舶信息用户等不同角色的功能边界。',
        '参与数据库概念结构和逻辑结构设计，围绕航线、进港、出港、船舶、作业、事故、预警和检查等业务对象设计数据表。',
        '完成系统核心功能模块实现，包括信息录入、查询、修改、删除、分页展示和权限控制等。',
        '实现 Token 登录校验、动态菜单生成、Excel 导出、打印和进出港数据统计等功能。',
        '参与系统测试与论文整理，完成系统运行结果展示和项目总结。',
      ],
      result:
        '项目最终完成了一套可运行的船舶信息管理系统，实现了从用户登录、权限控制、数据录入、信息查询、分页展示、报表导出、打印到进出港统计分析的基础闭环。系统将传统分散的船舶运营信息转化为结构化数据管理流程，提升了调度人员、管理员和船舶信息用户对关键数据的维护与查询效率，也帮助我完整实践了从需求分析、数据库设计、系统功能拆解、后端逻辑实现到页面交互展示的应用软件开发流程。',
      techStack: ['Java', 'MySQL', 'JSP', 'B/S 架构', 'MVC', 'Spring Boot', '数据库设计', '权限控制', '分页技术', 'Token', '报表生成'],
    },
    {
      id: 'sea-land-segmentation',
      title: '双域对齐引导的 CNN-Transformer 网络用于复杂海岸遥感海陆分割',
      tag: 'AI 遥感分割 / 视觉模型研究',
      image: '/images/project-sea-land.png',
      description:
        '面向复杂海岸遥感场景，设计 D2AF-UNet 海陆分割网络，通过 CNN-Transformer 双分支编码、频域-空域双域融合和解码恢复增强，提升弱边界、强干扰和多尺度海岸结构下的海陆分割精度与边界连续性。',
      background:
        '海陆分割是岸线提取、海岸带动态监测、围填海监管、港口航道管理和海岸生态保护的重要基础任务。相比普通二分类分割，复杂海岸遥感场景中的海陆边界往往并不清晰，容易受到云雾遮挡、阴影、镜面反射、耀斑、高浑浊近岸水体、悬浮泥沙、潮滩过渡带、养殖塘、围垦岸段和人工岸线等因素影响。在这类场景中，模型既需要识别潮沟、港池、人工岸线等局部细节，也需要理解河口区域、主河道走向和大范围水陆分布等全局结构。传统 CNN 模型擅长局部纹理和边界恢复，但全局上下文建模不足；Transformer 具备长距离依赖建模能力，但对精细边界和局部几何结构刻画相对不足。因此，本项目尝试通过 CNN-Transformer 混合建模和双域特征融合，提高复杂海岸场景下海陆分割的鲁棒性与边界连续性。',
      problem:
        '复杂海岸遥感影像中的海陆分割主要面临弱边界、强干扰、类别混淆、异构特征融合不稳定和解码恢复不足等问题。潮滩、浑浊水体和浅滩过渡带容易形成连续渐变，导致海陆边界模糊；云雾、阴影、耀斑、镜面反射和局部高亮区域容易引发误分；自然岸线与人工岸线交错分布，养殖塘、围垦岸段、港池和潮沟等结构容易造成类别混淆。同时，CNN 与 Transformer 两类异构特征虽然互补，但在复杂场景下容易出现语义间隙、响应错位和融合不稳定，常规空间域融合难以充分解决复杂干扰下的稳健对齐问题，最终影响岸线结果的连续性和几何合理性。',
      solution:
        '本项目提出 D2AF-UNet，一种面向复杂海岸场景的双域双分支自适应融合网络。整体采用 U 型编码器-解码器结构，以 RGB 遥感影像作为输入，输出海陆二值分割结果。在编码端，模型采用 CNN-Transformer 双分支并行结构：CNN 分支基于改进的 TiedResNet-50，用于提取局部纹理、边界几何和细粒度空间结构；Transformer 分支引入 Swin Transformer，用于建模长距离依赖和区域级上下文关系。在融合阶段，设计 FSAR-Fusion 作为核心模块，通过 FSAB 对双分支特征进行融合前增强，其中空间路径强化局部边界、多尺度过渡结构和细长岸线响应，频域路径通过频谱重整补充全局结构组织与复杂背景抑制能力；随后将增强后的特征映射到统一通道空间并完成融合，最后通过 SARB 进行融合后协同精炼，缓解响应碎片化、空间不连续和残余错位问题。在解码阶段，引入 FPAB 特征金字塔聚合模块，通过多尺度卷积聚合、非对称深度可分离卷积链和双路通道注意力机制，提升模型对大尺度岸线轮廓、中尺度过渡带和细小潮沟、港池、人工岸线结构的恢复能力。',
      contribution: [
        '参与复杂海岸遥感海陆分割任务的问题定义，梳理弱边界、强干扰、多尺度结构和自然-人工复合岸线等核心难点。',
        '构建并整理长江口崇明三岛及周边区域的多时相遥感数据集，完成影像裁剪、重投影、波段组合、标签制备和样本切分。',
        '结合 RGB 与 NIR-SWIR1-Red 波段组合进行海陆边界判读与二值标签生成，构建 CMD 数据集并补充外部复杂样本。',
        '设计 D2AF-UNet 模型框架，采用 CNN-Transformer 双分支编码方式获取局部结构与全局语义信息。',
        '设计 FSAR-Fusion 模块，通过频域-空域自适应增强和融合后协同精炼，提升异构特征对齐与融合质量。',
        '引入 FPAB 解码增强模块，通过多尺度聚合、方向连续性建模和双路通道注意力增强边界恢复能力。',
        '设计并执行对比实验与可视化分析，使用 Precision、MPA、F1-Score 和 mIoU 等指标评估模型性能。',
        '整理实验结果、图表和论文内容，完成模型方法、数据集构建、实验分析和应用展示的系统化表达。',
      ],
      result:
        '项目构建并整理了覆盖多时相、多干扰和多类型海岸线的复杂场景海陆分割数据集。数据来源包括 Landsat 8-9 Collection 2 Level 2 影像，研究区覆盖长江入海口崇明岛、长兴岛、横沙岛及周边河口区域，并结合公开复杂样本构建 CMD 测试集和外部测试集。实验结果显示，D2AF-UNet 在 CMD 测试集和外部测试集上均取得最优表现：CMD 测试集 Precision 为 97.69%，MPA 为 98.92%，F1-Score 为 98.97%，mIoU 为 98.95%；外部测试集 Precision 为 97.09%，MPA 为 98.67%，F1-Score 为 98.75%，mIoU 为 98.72%。与 U-Net、U2Net、SegNet、DeepLabV3+、HED-UNet、A2RDNet、TransUNet 和 Swin-UNet 等模型相比，该方法在弱边界、人工水体密集和强干扰场景中表现出更好的区域完整性、边界连续性和外部样本适应能力。该项目获得“华为杯”中国研究生人工智能创新大赛三等奖，并发表 SCI 期刊论文。',
      highlights: [
        '面向真实复杂海岸场景，而不是理想化水陆二分类，重点处理弱边界、强干扰和多尺度结构共存问题。',
        '采用 CNN-Transformer 双分支并行编码，兼顾局部边界纹理与全局上下文语义。',
        '提出 FSAR-Fusion 模块，将频域增强、空间域增强和融合后精炼结合起来，提升异构特征对齐和融合质量。',
        '引入 FPAB 解码恢复增强模块，改善上采样过程中的边界平滑、结构断裂和细节衰减问题。',
        '构建覆盖 2014-2024 年多时相 Landsat 影像的复杂海岸数据集，并结合外部复杂样本验证模型泛化能力。',
        '在 CMD 测试集和外部测试集上均取得最优定量结果，mIoU 分别达到 98.95% 和 98.72%，F1-Score 分别达到 98.97% 和 98.75%。',
      ],
      techStack: [
        'PyTorch',
        'Python',
        'CNN',
        'Transformer',
        'Swin Transformer',
        'TiedResNet-50',
        'FSAR-Fusion',
        'FPAB',
        'FFT',
        'Attention',
        'Remote Sensing',
        'Semantic Segmentation',
        'Landsat 8-9',
        'ArcGIS',
        'mIoU',
        'F1-Score',
      ],
    },
    {
      id: 'license-plate-recognition',
      title: '基于深度学习的车牌识别系统',
      tag: 'AI 识别系统 / 智能交通',
      image: '/images/project-license-plate.png',
      resultVideoPoster: '/images/license-plate-video-cover.png',
      description:
        '面向智慧交通、停车场管理和车辆监管场景，设计并实现一套基于 YOLOv5 + LPRNet 的车牌识别系统，支持对图片和视频中的车牌区域进行检测定位，并完成车牌字符识别、用户登录和识别结果管理。',
      background:
        '在高速收费站、停车场管理、道路交通监控和电子警察等智能交通场景中，车牌号码是识别车辆身份的关键标识。传统车牌识别方法通常依赖图像预处理、车牌定位、字符分割、特征提取和字符分类等步骤，在复杂自然环境下容易受到光照变化、车牌倾斜、画面模糊、背景干扰和遮挡等因素影响。随着深度学习和计算机视觉技术的发展，基于目标检测和端到端识别模型的车牌识别方案能够自动提取图像特征，提升复杂场景下的识别准确性和稳定性。因此，本项目围绕智慧交通中的车牌识别需求，设计并实现一套集车牌检测、字符识别、可视化交互和用户管理于一体的 AI 识别系统。',
      problem:
        '车牌识别系统需要在复杂交通场景中快速、准确地完成车辆身份识别，但实际应用中存在自然场景背景复杂、光照变化、模糊遮挡、车牌倾斜等干扰因素；传统算法依赖人工特征设计和字符分割，流程复杂且泛化能力有限；单一模型容易出现过拟合、识别精度下降或部署灵活性不足等问题。同时，系统需要将车牌检测与字符识别形成完整流程，并具备可视化交互能力，方便用户上传图片 / 视频并查看识别结果，还需要配套用户注册、登录和用户信息管理等基础功能，形成较完整的应用闭环。',
      solution:
        '本项目采用 YOLOv5 + LPRNet 的两阶段识别方案，将车牌识别流程拆解为“车牌检测定位”和“车牌字符识别”两个核心环节。在车牌检测部分，使用 YOLOv5 模型对输入图片或视频帧中的车牌区域进行定位，结合 CCPD 数据集、自主拍摄图片和网络爬取图片构建训练数据，并通过标注目标边界框和类别信息完成检测数据准备。在模型训练过程中，引入自适应图片缩放、损失函数调整和 Anchor 重新聚类等优化方式，提升模型对车牌目标的检测效果。在车牌字符识别部分，引入 LPRNet 作为车牌字符识别模型，不依赖传统字符分割流程，能够直接对车牌区域进行字符序列识别，减少人工分割带来的误差，同时降低模型参数规模和计算量。系统层面使用 PyQt5 进行可视化界面设计，支持用户上传图片或视频进行识别，并实现用户注册、登录和用户信息管理功能。',
      contribution: [
        '参与车牌识别系统的需求分析，梳理智慧交通、停车场管理和车辆监管等应用场景下的核心识别需求。',
        '构建车牌检测与识别数据集，结合 CCPD 数据集、自主拍摄图片和网络爬取图片进行数据准备。',
        '使用 LabelImg 等工具完成车牌检测数据标注，并划分训练集、验证集和测试集。',
        '采用 YOLOv5 完成车牌区域检测模型训练与调优，提升复杂场景下的车牌定位效果。',
        '引入 LPRNet 完成车牌字符识别，减少传统字符分割流程带来的误差。',
        '使用 PyQt5 搭建系统可视化界面，支持图片 / 视频输入、识别结果展示、用户注册登录和用户信息管理。',
        '参与系统测试与论文撰写，完成系统运行结果、模型效果和系统性能的整理分析。',
      ],
      result:
        '项目最终实现了一套可运行的基于深度学习的车牌识别系统，完成了从数据集构建、模型训练、车牌检测、字符识别到系统界面集成的完整流程。系统支持图片和视频输入，能够对复杂自然场景中的车牌区域进行检测定位，并输出车牌字符识别结果。实验结果显示，系统在新的测试环境下仍具备较好的识别准确率、识别速度、鲁棒性和可靠性，能够满足基础车牌检测与识别任务需求。该项目也帮助我完整实践了 AI 应用系统从问题定义、数据准备、模型选择、模型优化、系统集成到结果测试的产品化流程，为后续理解 AI 产品中的数据、模型、交互和业务场景结合提供了实践基础。',
      resultVideo: '/videos/license-plate-demo.mp4',
      techStack: ['Python', 'PyTorch', 'YOLOv5', 'LPRNet', 'OpenCV', 'PyQt5', 'MySQL', 'CCPD 数据集', 'LabelImg', '目标检测', '字符识别', '模型优化'],
    },
    {
      id: 'recruitment-visualization',
      title: '多变量招聘数据可视化分析系统',
      tag: '数据可视化 / 人才数据分析产品',
      image: '/images/project-recruitment.png',
      description:
        '该项目来源于 ChinaVis Data Challenge 2024 招聘数据可视分析任务，面向招聘市场中的职位、薪酬、地域、行业和人才需求等多维信息，设计并实现一套交互式招聘数据可视化分析系统，帮助用户理解不同职位之间的差异、识别高薪岗位分布、分析地域与行业招聘特征，并发现急需人才的新兴职业。',
      background:
        '招聘市场数据通常包含职位名称、行业类别、薪资待遇、经验要求、学历要求、城市分布、企业数量和招聘规模等多类变量。单纯依靠表格或静态图表，很难快速识别不同职位之间的差异，也难以判断薪酬水平、地域分布、行业动态和新兴职业之间的潜在关系。在求职者侧，用户希望了解不同职位的薪酬水平、城市分布、学历与经验要求，从而辅助职业选择；在企业和人力资源管理侧，招聘方需要理解不同地区、行业和岗位的人才供需状态，从而优化招聘策略和薪酬方案。因此，本项目围绕招聘数据构建多视图联动的可视化分析系统，将复杂招聘数据转化为可探索、可比较、可解释的分析界面。',
      problem:
        '招聘数据具有维度多、字段杂、类别复杂和分析目标分散等特点，直接分析存在职位差异度难以量化、职位画像信息分散、薪资描述形式多样、地域招聘活动差异明显、行业动态和新兴职位难以综合判断等问题。用户难以判断哪些岗位相似、哪些岗位差异显著，也难以在职位、城市、行业和薪酬模式之间建立关联。多个分析任务之间存在联系，需要通过交互式视图联动帮助用户从整体概览逐步深入到具体职位、城市和行业。',
      solution:
        '本项目设计并实现了一个多变量招聘数据可视化分析系统，通过数据处理、建模分析和多视图交互设计，将招聘数据中的职位、薪酬、地域和行业信息转化为可探索的分析产品。在数据处理层面，项目对薪酬字段进行归一化处理，将多种薪资描述统一转换为可比较的月薪数据，并对职位、城市、行业、学历、经验和招聘数量等字段进行结构化处理。在职位差异分析层面，系统基于职位的行业类别、薪资待遇、经验要求和学历要求等维度进行聚类与降维展示，使用 t-SNE 将职位映射到二维空间中，并通过职位差异分析图和职位详细信息图展示不同职位之间的相似度和关键属性差异。在职位画像层面，系统设计控制台、多角度职位画像、职位画像总览、薪资对比盒须图和职位层级列表，支持用户按行政区域、行业类别、经验要求、学历要求和薪资范围筛选职位，并对职位特征进行对比分析。在薪酬模式分析层面，系统通过薪酬模式挖掘视图和薪酬模式对比环形图，从城市、职业和行业等角度分析薪酬分布关系，识别不同薪酬模式与学历要求、经验要求之间的潜在联系。在地域与行业分析层面，系统通过地域招聘活动画像、地域特征图、行业动态平行坐标图和新兴职业展示视图，帮助用户识别具有相似招聘特征的地域、分析行业发展动态，并发现高薪酬与高招聘量并存的新兴职业。',
      contribution: [
        '参与招聘数据可视化分析任务的问题拆解，围绕职位差异、职位画像、薪酬模式、地域特征和新兴职业发现设计分析框架。',
        '参与招聘数据清洗与字段处理，对薪酬、学历、经验、城市、行业和职位等字段进行结构化整理。',
        '参与薪酬归一化处理，将不同描述形式的薪酬数据转换为可比较的月薪指标。',
        '参与职位差异度分析，基于行业类别、薪资待遇、经验要求和学历要求等维度进行职位聚类和相似度表达。',
        '参与多视图可视化设计，包括职位聚类概览、职位差异矩阵、职位详细信息、职位画像、薪资箱须图、地域招聘活动画像、行业动态平行坐标图和新兴职业展示等。',
        '参与交互设计，支持筛选、缩放、悬浮提示、点击联动、相似职位推荐和多视图数据更新。',
        '参与案例分析和结论整理，从城市、行业、职业和薪酬模式等角度提炼招聘市场洞察。',
        '参与作品说明文档整理，将系统设计、数据处理、分析流程和可视化结果进行结构化表达。',
      ],
      result:
        '项目最终形成了一套完整的交互式招聘数据可视化分析系统，覆盖职位差异分析、职位画像挖掘、薪酬模式识别、地域招聘活动画像、行业动态分析和新兴职业发现等核心任务。系统通过多视图联动的方式，将招聘市场中的复杂多变量数据转化为直观可解释的视觉分析结果。用户可以从职位聚类概览快速识别岗位分布，再通过相似度矩阵、职位画像、薪资箱须图和地域招聘活动画像进一步分析职位差异、薪酬结构、城市特征和行业趋势。该项目帮助我完整实践了从数据清洗、指标建模、可视化设计、交互逻辑设计到分析结论表达的流程，也加深了我对“数据如何转化为产品洞察”的理解。对于 AI 产品经理 / AI 产品运营岗位而言，该项目体现了我在数据产品设计、用户分析场景拆解、可视化表达和业务洞察提炼方面的能力。',
      highlights: [
        '将复杂招聘数据拆解为职位、薪酬、地域、行业和新兴职业五类核心分析任务，形成清晰的数据产品分析框架。',
        '使用职位聚类和 t-SNE 降维方法，将多维职位信息映射为可探索的二维聚类视图，帮助用户识别岗位分布与职位差异。',
        '设计职位差异分析图和职位详细信息图，通过相似度矩阵和关键指标对比展示不同职位之间的差异。',
        '构建多角度职位画像，支持从薪资、经验、学历、行业、企业、城市等维度理解职位特征。',
        '对多种薪酬描述进行归一化处理，提升不同职位、城市和行业之间薪酬比较的可靠性。',
        '通过地域招聘活动画像识别相似城市招聘特征，为求职地域选择和企业招聘策略提供参考。',
        '通过行业动态平行坐标图和新兴职业展示，综合招聘数量与薪酬水平识别高潜力人才需求方向。',
        '系统采用多视图联动和交互探索方式，体现了从数据分析到可视化产品设计的完整闭环。',
      ],
      techStack: [
        'Python',
        'React.js',
        'Node Express',
        'D3.js',
        'ECharts',
        'Excel',
        'Git',
        '数据清洗',
        '数据建模',
        't-SNE 降维',
        '聚类分析',
        '交互式可视化',
        '薪酬归一化',
        '职位画像',
      ],
    },
  ],
};

export default projects;
