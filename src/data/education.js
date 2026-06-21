const education = {
  zh: {
    kicker: 'Education',
    title: '教育背景',
    schools: [
      {
        school: '上海海事大学（学硕）',
        college: '信息工程学院',
        major: '计算机科学与技术（人工智能）',
        period: '2024.09-2027.06',
        logo: '/images/xjtu-logo.png',
        logoAlt: '上海海事大学校徽',
      },
      {
        school: '上海海事大学（本科）',
        college: '信息工程学院',
        major: '计算机科学与技术（卓越工程）',
        period: '2020.09-2024.06',
        logo: '/images/znufe-logo.png',
        logoAlt: '上海海事大学校徽',
      },
    ],
    summary: [
      {
        id: 'score',
        label: '成绩',
        emoji: '📄',
        value: 'GPA：3.6/4.0',
        proofLabel: '点击查看成绩证明',
        href: '/proof/score',
        image: '/images/education-score-proof.png',
      },
      {
        id: 'english',
        label: '英语水平',
        emoji: '🗣️',
        value: 'CET-4/6',
        proofLabel: '点击查看英语证明',
        href: '/proof/english',
        image: '/images/education-english-proof.png',
      },
      {
        id: 'honors',
        label: '荣誉奖项',
        emoji: '🏆',
        value: '连续5年获得校综合奖学金、“华为杯”中国研究生人工智能创新大赛三等奖、人工智能高级训练师证书',
        proofLabel: '点击查看荣誉证明',
        href: '/proof/honors',
        image: '/images/education-honors-proof.png',
      },
    ],
  },
};

export default education;
