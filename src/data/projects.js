const projects = {
  en: [
    {
      id: 'sales-dashboard',
      title: 'Sales Operation Dashboard and User Task Tracking System',
      tag: 'Sales Operations / User Operations',
      image: '/images/project-sales-dashboard.png',
      description:
        'A business data operation project focused on sales funnel analysis, user segmentation, task distribution, and closed-loop follow-up tracking.',
      background:
        'Sales and user operation teams need timely visibility into leads, test drives, intention deposits, orders, deliveries, and follow-up quality.',
      problem:
        'Operational data was distributed across multiple tables and workflows, making it difficult to identify overdue follow-ups, low-quality interactions, and high-intent users quickly.',
      solution:
        'Built a dashboard and task tracking workflow that combined user segmentation, funnel metrics, task distribution, and follow-up status into a structured operating view.',
      contribution: [
        'Defined user segmentation fields for test drive status, order status, lead source, interaction frequency, and intention deposit records.',
        'Used SQL, Python, Pandas, Excel, BI dashboards, and multi-dimensional tables to support analysis and daily operation tracking.',
        'Created operational tables, coupon code ledgers, questionnaire statistics, and automated reminder workflows.',
      ],
      result:
        'Improved visibility into sales funnel progress and follow-up quality, enabling more structured task distribution and closed-loop user operation management.',
      techStack: ['SQL', 'Python', 'Pandas', 'Excel', 'BI Dashboard', 'Multi-dimensional Tables'],
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
      title: '销售运营看板与用户任务跟踪系统',
      tag: '销售运营 / 用户运营',
      image: '/images/project-sales-dashboard.png',
      description: '聚焦销售漏斗分析、用户分层、任务分发和闭环跟进的业务数据运营项目。',
      background: '销售与用户运营团队需要及时了解线索、试驾、意向金、订单、交付和跟进质量等关键业务状态。',
      problem: '运营数据分散在多个表格和流程中，难以及时识别逾期跟进、无效互动和高意向用户。',
      solution: '搭建销售运营看板与任务跟踪流程，将用户分层、漏斗指标、任务分发和跟进状态整合到统一运营视图中。',
      contribution: [
        '定义试驾状态、订单状态、线索来源、互动频次和意向金记录等用户分层字段。',
        '使用 SQL、Python、Pandas、Excel、BI 看板和多维表支持数据分析与日常运营跟踪。',
        '制作运营表、优惠券台账、问卷统计和自动提醒流程。',
      ],
      result: '提升了销售漏斗进展和跟进质量的可见性，支持更结构化的任务分发和用户运营闭环管理。',
      techStack: ['SQL', 'Python', 'Pandas', 'Excel', 'BI 看板', '多维表'],
    },
    {
      id: 'sea-land-segmentation',
      title: '双域对齐引导的 CNN-Transformer 海陆分割网络',
      tag: '遥感影像 / 语义分割',
      image: '/images/project-sea-land.png',
      description: '面向复杂海岸场景的遥感分割项目，关注弱边界、强干扰和多尺度结构下的鲁棒海陆分割。',
      background: '海陆分割对于遥感影像分析、海岸监测和地理信息提取具有重要意义。',
      problem: '复杂海岸场景中常存在弱边界、海浪、阴影、强干扰和多尺度陆地区域，导致分割难度较高。',
      solution: '采用 CNN-Transformer 结合的分割思路，同时利用局部纹理特征和全局上下文信息，提升复杂海岸场景下的鲁棒性。',
      contribution: [
        '调研 CNN、Transformer、Swin Transformer 和 ResNet 等分割相关方法。',
        '围绕双域特征对齐和多尺度表达设计模型思路。',
        '整理项目文档，分析模型动机、网络结构和遥感分割难点。',
      ],
      result: '形成了清晰的研究型项目框架，加深了对遥感场景中深度学习分割方法的理解。',
      techStack: ['PyTorch', 'CNN', 'Transformer', 'Swin Transformer', 'ResNet', '遥感影像', '语义分割'],
    },
    {
      id: 'license-plate-recognition',
      title: '车牌识别系统',
      tag: '计算机视觉 / OCR',
      image: '/images/project-license-plate.png',
      description: '集成目标检测、字符识别和数据库结果管理的两阶段车牌识别系统。',
      background: '车牌识别是智能交通中的典型场景，需要稳定完成检测、识别和结果管理。',
      problem: '系统需要准确定位车牌区域，可靠识别字符，并将识别结果结构化保存，便于后续查询和管理。',
      solution: '使用 YOLOv5 完成车牌检测，使用 LPRNet 完成字符识别，并通过 MySQL 管理识别结果。',
      contribution: [
        '将目标检测和字符识别模块整合为完整识别流程。',
        '使用 Python 和 OpenCV 进行图像处理与系统逻辑实现。',
        '设计基于数据库的识别结果存储方式，支持后续查询管理。',
      ],
      result: '完成了从图像输入、车牌定位、字符识别到结果存储的端到端识别流程。',
      techStack: ['YOLOv5', 'LPRNet', 'Python', 'OpenCV', 'MySQL'],
    },
    {
      id: 'recruitment-visualization',
      title: '多变量招聘数据可视化分析',
      tag: '数据可视化 / 数据分析',
      image: '/images/project-recruitment.png',
      description: '分析不同城市、薪资、学历要求和经验年限下的招聘市场特征与趋势。',
      background: '招聘数据包含市场需求、薪资分布、技能要求、学历要求和经验要求等重要信息。',
      problem: '原始招聘数据较为杂乱，直接阅读难以比较不同城市、薪资、学历和经验维度下的市场特征。',
      solution: '使用 Python 和 Pandas 清洗整理数据，并基于 ECharts 设计多维可视化视图展示招聘市场模式。',
      contribution: [
        '使用 Python 和 Pandas 完成数据清洗和字段整理。',
        '设计城市分布、薪资区间、学历要求和经验要求等可视化分析视图。',
        '根据图表结果总结招聘市场洞察。',
      ],
      result: '形成了多变量招聘数据可视化分析，使岗位市场特征更容易比较和表达。',
      techStack: ['Python', 'Pandas', 'ECharts', '数据清洗', '数据可视化'],
    },
  ],
};

export default projects;
