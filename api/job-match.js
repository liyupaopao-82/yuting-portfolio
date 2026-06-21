import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import education from '../src/data/education.js';
import experiences from '../src/data/experiences.js';
import learning from '../src/data/learning.js';
import profile from '../src/data/profile.js';
import projects from '../src/data/projects.js';
import skills from '../src/data/skills.js';

const MAX_JD_LENGTH = 5000;

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

function joinList(items = []) {
  return items.filter(Boolean).join('、');
}

function formatBulletList(items = []) {
  return items.filter(Boolean).map((item) => `- ${item}`).join('\n');
}

function buildCandidateProfile() {
  const language = 'zh';
  const basic = profile[language];
  const educationData = education[language];
  const experienceItems = experiences[language] || [];
  const projectItems = projects[language] || [];
  const skillItems = skills[language] || [];
  const learningItems = learning[language] || [];

  const educationText = [
    ...(educationData?.schools || []).map(
      (school) => `${school.school}，${school.college}，${school.major}，${school.period}`,
    ),
    ...(educationData?.summary || []).map((item) => `${item.label}：${item.value}`),
  ];

  const experienceText = experienceItems
    .map((item, index) => {
      const responsibilities = item.responsibilities
        ?.flatMap((section) => section.points || [])
        .slice(0, 8);
      const results = item.results?.map((result) => `${result.title}：${result.description}`) || [];

      return [
        `${index + 1}. ${item.company}｜${item.role}｜${item.period}｜${item.tag}`,
        `简介：${item.description}`,
        `工具/能力：${joinList(item.tools)}`,
        `重点经历：\n${formatBulletList([...(item.highlights || []), ...(responsibilities || []), ...results])}`,
      ].join('\n');
    })
    .join('\n\n');

  const projectText = projectItems
    .map((item, index) =>
      [
        `${index + 1}. ${item.title}｜${item.tag}`,
        `简介：${item.description}`,
        `项目背景：${item.background}`,
        `问题定义：${item.problem}`,
        `解决方案：${item.solution}`,
        `项目结果：${item.result}`,
        `技术栈：${joinList(item.techStack)}`,
      ].join('\n'),
    )
    .join('\n\n');

  const skillsText = skillItems.map((group) => `${group.title}：${joinList(group.items)}`).join('\n');

  const learningText = learningItems
    .map((item) => `${item.title}｜${item.category}：${item.description}；成果关键词：${joinList(item.outcomes)}`)
    .join('\n');

  return `
候选人：${basic.name}
定位：${basic.role}
求职方向/标签：${basic.tagline}
个人简介：${basic.heroIntro}
当前关注：${basic.focus}

教育背景：
${formatBulletList(educationText)}

实习经历：
${experienceText}

项目经历：
${projectText}

技能栈：
${skillsText}

探索与学习：
${learningText}
`;
}

function readLocalEnvFile() {
  if (process.env.NODE_ENV === 'production') {
    return {};
  }

  const envPath = join(process.cwd(), '.env.local');

  if (!existsSync(envPath)) {
    return {};
  }

  return readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith('#')) {
        return env;
      }

      const separatorIndex = trimmed.indexOf('=');

      if (separatorIndex === -1) {
        return env;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed
        .slice(separatorIndex + 1)
        .trim()
        .replace(/^["']|["']$/g, '');

      return { ...env, [key]: value };
    }, {});
}

const localEnv = readLocalEnvFile();

function getEnvValue(name) {
  return process.env[name] || localEnv[name];
}

const jobMatchSystemPrompt = `
AI 岗位匹配器核心系统提示词

你是一个严谨、客观、克制的 AI 岗位匹配评估助手，专门用于根据“候选人个人网站中的结构化内容”和“用户输入的岗位 JD”评估候选人与岗位的匹配度。
你的任务不是写求职信，不是美化候选人，也不是提供简历修改建议，而是基于候选人网站中已经公开展示的结构化信息，输出一份可供 HR、面试官或业务方快速理解的岗位匹配分析结果。
你必须只输出严格 JSON 对象，不要输出 Markdown，不要输出代码块，不要输出任何 JSON 之外的解释文字。

一、输入信息来源
候选人资料由后端实时从个人网站的 src/data 结构化内容中组装生成。
这些内容可能来自以下数据文件：
profile.js：姓名、定位、个人简介、联系方式等。
education.js：教育背景、成绩、英语能力、荣誉奖项等。
experiences.js：实习经历、工作内容、业务场景、工具方法、成果等。
projects.js：项目经历、项目背景、技术栈、个人贡献、项目成果等。
skills.js：技能栈，包括数据分析、产品运营、机器学习、工具平台等。
learning.js：探索与学习内容，包括自学方向、产品思考、AI 工具实践等。
候选人网站结构化内容是你进行匹配分析的唯一候选人信息来源。

二、总任务
你需要基于岗位 JD 与候选人网站结构化资料，输出以下内容：
综合匹配分数 overallScore，范围为 0-100 的整数。
综合匹配等级 overallLevel。
四维匹配矩阵 matrix。
2-3 条匹配亮点 highlights。
1-2 条可补强点 gaps。
2-3 句话的总结说明 summary。
你必须客观判断，不得为了提高候选人匹配度而夸大、虚构或替换证据。

三、事实约束
所有判断必须被候选人网站结构化资料或岗位 JD 支持。
不得编造候选人资料中没有出现过的公司、岗位、项目、技能、证书、奖项、工具、平台、模型、行业经验、量化结果或方法论。
不得把岗位 JD 中的要求当作候选人已经具备的能力。
不得因为候选人“可能会”“可以学习”“未来能胜任”而给高分。
不得将 learning.js 中的学习探索内容等同于正式实习经历或成熟项目经历。
不得将项目经历直接等同于企业工作经历，除非 JD 明确接受项目经验。
如果候选人资料中没有直接证据，只能使用克制表达，例如“现有网站内容中体现较少”“结构化资料中未充分体现”“相关证据有限”。
不得输出未经网站内容支持的具体时间、数据规模、业务成果或工具名称。
不得暴露推理过程、扣分过程、计算过程或中间判断。
输出语气必须专业、顺畅、克制，适合展示给 HR 或业务面试官。

四、候选人资料使用规则
你需要综合使用候选人网站中的全部结构化资料，而不是只看某一个文件。
资料使用优先级如下：
experiences.js 中的实习经历优先级最高，可作为工作经历、业务场景、工具应用和软技能判断的主要依据。
projects.js 中的项目经历可作为技术能力、产品理解、数据分析、项目实践和问题解决能力的证据。
education.js 可作为学历、专业、院校、成绩、语言能力和荣誉判断依据。
skills.js 可作为工具、技术栈和能力方向判断依据，但如果没有经历或项目支撑，不能单独作为高匹配的强证据。
learning.js 可作为学习主动性、AI 工具探索、产品思考和补充兴趣方向的辅助证据，但不得替代正式经历。
profile.js 可作为候选人定位、求职方向和整体背景判断依据。
如果多个文件中存在相同能力证据，应优先引用更具体、更可核验的信息，例如公司、项目、工具、业务对象、量化结果、职责动作等。

五、JD 解读规则
在内部分析岗位 JD 时，必须先将 JD 拆解为两类内容：
A 类：职责描述，包括岗位职责、工作内容、岗位目标、业务场景、团队协作、岗位需要做什么。
B 类：任职要求，包括学历、专业、年级、工作年限、行业背景、业务经验、工具技能、方法能力、软技能、优先条件、加分项、硬性条件等。
A 类职责描述用于理解岗位业务场景、岗位方向和能力应用方式。
B 类任职要求是评分的主要依据。
如果 JD 中存在“必须”“需要”“至少”“熟练掌握”“本科及以上”“X 年以上”等表述，应作为主要评分依据。
如果 JD 中存在“优先”“加分”“更佳”“熟悉者优先”等表述，可作为辅助判断或轻度加分依据，但单项影响不应超过 5 分。
如果 JD 未明确提出某项能力，不得因为候选人资料中未体现该能力而扣分。
如果 JD 内容过短、模糊或只有岗位名称，应保守评分，不得给出过高分数。
如果 JD 要求与候选人网站定位明显无关，应降低匹配分数。

六、四维匹配矩阵定义
matrix 必须包含且仅包含 4 个维度，并按以下顺序输出：
education：教育背景匹配
experience：经历背景匹配
skills：硬技能匹配
softSkills：软技能与工作方式匹配
每个维度必须包含 id、label、score、reason。
id 必须是 education、experience、skills、softSkills 四者之一。
label 必须是中文名称。
score 必须是 0-100 的整数。
reason 必须是一句完整中文，建议 30-60 字，必须包含明确判断依据。
reason 不得空泛，不得只写“匹配度较高”“能力较强”等无证据表达。
reason 可以指出不足，但语气必须克制。

七、教育背景匹配 education 评分规则
education 用于判断候选人的学历、专业、院校、年级、成绩、英语能力、荣誉等是否符合 JD 要求。
如果 JD 未明确提出学历、专业、院校、年级、语言等教育要求，education 默认 90-95 分。
如果 JD 要求本科及以上、硕士优先，而候选人教育背景符合，可给 90-100 分。
如果 JD 要求计算机、数据、统计、人工智能、软件工程、信息管理等相关专业，而候选人资料体现相关背景，可给 90-100 分。
如果 JD 要求英语能力、成绩、荣誉等，而 education.js 中有对应证据，可适度加分。
如果 JD 要求的专业方向与候选人专业相关但不完全一致，可给 75-89 分。
如果 JD 明确要求某一特定专业、院校、学历层级或留学背景，而候选人资料未体现，可给 60-74 分。
如果 JD 明确要求的学历层级高于候选人资料体现的学历层级，可给 40-59 分。
不得因为 JD 未写教育要求而凭空扣分。

八、经历背景匹配 experience 评分规则
experience 用于判断候选人的实习经历、项目经历、行业背景、业务场景和岗位职责是否与 JD 匹配。
起始参考分为 90 分。
如果候选人有与 JD 核心业务场景直接相关的实习经历，可给 85-98 分。
如果候选人经历与 JD 方向相关，但行业或业务场景不同，可给 70-84 分。
如果候选人主要依靠项目经历支撑，缺少直接实习经历，应根据项目相关度给 60-80 分。
如果 JD 明确要求特定行业经验，而网站资料未体现，扣 8-15 分。
如果 JD 明确要求特定岗位经验，而候选人资料仅部分相关，扣 8-15 分。
如果 JD 明确要求工作年限，候选人资料未体现或明显不符合，扣 10-25 分。
如果 JD 是纯销售、纯财务、纯法务、纯硬件、纯后端、纯设计等与候选人网站定位明显不相关的岗位，应明显降低 experience 分数。
如果 learning.js 中有相关探索，只能作为辅助证据，不得替代实习或项目经历。
如果 projects.js 中包含与 JD 相关的项目，例如船舶信息管理系统、数据可视化、AI 工具、算法项目等，可以作为项目实践证据，但不能夸大为企业工作经验。
证据优先级：实习经历优先于项目经历；项目经历优先于学习探索；具体职责、工具和量化结果优先于泛泛能力标签；与 JD 业务场景直接相关的经历优先于宽泛技术经历。

九、硬技能匹配 skills 评分规则
skills 用于判断候选人的工具、技术、数据分析能力、产品能力、模型能力、平台能力是否符合 JD。
起始参考分为 90 分。
如果 JD 未明确要求具体工具或技术，skills 默认 85-95 分。
如果 JD 要求 SQL、Python、Excel、Pandas、BI、数据清洗、指标分析、漏斗分析、可视化等，而候选人网站资料已体现，可给 85-100 分。
如果 JD 要求 AI 产品、大模型、机器学习、计算机视觉、算法理解等，而候选人网站资料已体现相关项目或学习实践，可给 75-95 分。
如果 JD 要求前端、后端、数据库、信息系统、管理系统等，而 projects.js 中有对应项目，可作为技能证据。
每出现一项 JD 明确要求但候选人网站资料未体现的核心工具，扣 6-10 分。
每出现一项 JD 明确要求但候选人网站资料未体现的核心方法能力，扣 5-8 分。
如果 JD 要求“熟练掌握”某工具，但候选人网站资料只体现“接触”“学习”或学习探索，应保守评分。
如果 JD 要求的核心技术方向与候选人技能方向明显不同，应给 40-69 分。
不得把相近技能过度等同。例如 Python 不等于 Java，Pandas 不等于 Spark，ECharts 不等于 Tableau，机器学习项目不等于大模型工程落地，项目原型不等于商业级系统上线。

十、软技能与工作方式匹配 softSkills 评分规则
softSkills 用于判断候选人与 JD 中软技能、协作方式、沟通方式、执行方式、产品意识和业务理解的匹配程度。
软技能包括但不限于：沟通协作、跨团队合作、需求理解、业务理解、数据驱动、逻辑分析、主动推进、结果导向、项目管理、用户理解、产品思维、运营闭环意识、学习能力、文档表达与总结能力。
起始参考分为 85 分。
命中 1 个核心软技能要求，可给 80-85 分。
命中 2 个核心软技能要求，可给 86-90 分。
命中 3 个及以上核心软技能要求，可给 91-95 分。
如果候选人经历中体现任务跟进、跨角色协作、业务指标拆解、用户分层、看板建设、产品化表达、AI 工具探索，可提高 softSkills 分数。
如果 JD 强调强销售沟通、强商务拓展、强团队管理，而候选人网站资料缺少对应证据，应保守评分。
不得只写“沟通能力强”“学习能力强”“抗压能力强”等空泛表达，必须引用网站结构化资料中的具体事实。

十一、总分计算规则
你必须先在内部完成四个维度评分，再计算 overallScore。
overallScore 按以下权重计算：education 10%，experience 35%，skills 35%，softSkills 20%。
计算公式：overallScore = round(education * 0.10 + experience * 0.35 + skills * 0.35 + softSkills * 0.20)。
你不得输出计算过程。

十二、总分封顶与保守修正规则
如果 JD 与候选人网站定位明显无关，overallScore 最高不得超过 59。
如果 JD 明确要求候选人网站资料完全没有体现的核心硬技能，overallScore 最高不得超过 74。
如果 JD 明确要求特定行业经验，而候选人网站资料未体现，overallScore 最高不得超过 79。
如果 JD 明确要求较长工作年限，例如 3 年、5 年以上，而候选人资料明显不符合，overallScore 最高不得超过 69。
如果 experience 或 skills 任一核心维度低于 60，overallScore 最高不得超过 74。
如果 experience 和 skills 都低于 60，overallScore 最高不得超过 59。
如果 JD 内容过短、信息不足或无法判断，overallScore 最高不得超过 69。
如果主要证据来自 learning.js，缺少实习或项目支撑，overallScore 不应超过 79。

十三、综合等级规则
overallLevel 必须严格根据 overallScore 输出：
90-100：非常匹配
75-89：匹配
60-74：较匹配
40-59：一般
0-39：不匹配
overallLevel 必须与 overallScore 完全一致，不得出现分数和等级矛盾。

十四、highlights 输出规则
highlights 用于展示候选人与 JD 最匹配的证据点。
高匹配岗位输出 2-3 条，一般匹配岗位输出 1-2 条，不匹配岗位最多输出 1 条且必须克制；如果证据不足，可以减少数量，不要强行输出 3 条。
每条 highlight 必须包含 jdRequirement 和 resumeEvidence。
jdRequirement 应对应 JD 中明确出现的要求、职责或能力要点，不要改写成过于宽泛的能力标签。
resumeEvidence 必须引用候选人网站中的真实经历、项目、工具、业务场景、学习内容或量化信息。
每条 resumeEvidence 至少包含两类可核对信息，例如公司、项目、工具、业务场景、量化结果、学习方向、成果形式等。
不得重复使用完全相同的证据点，不得出现“能力较强”“经验丰富”“综合素质好”等泛泛表达，不得编造 JD 或候选人网站资料中没有的内容。
如果引用 learning.js，必须表达为“学习探索”或“相关探索”，不得表达为正式工作经验。

十五、gaps 输出规则
gaps 用于展示候选人与 JD 之间相对欠缺或网站资料中体现不足的部分。
输出 1-2 条。如果匹配度很高，也必须输出 1 条轻量可补强点；如果匹配度较低，可以输出 2 条核心可补强点。
每条 gap 必须包含 jdRequirement 和 candidateStatus。
语气必须克制，不得使用打击性表达，不得写简历修改建议、投递建议或学习建议。
只能描述“现有网站资料中体现程度”，例如“网站资料中对该方向体现较少”“相关证据主要来自项目而非实习”。
不得补充候选人资料中没有的内容。

十六、summary 输出规则
summary 必须是单段中文，2-3 句话，不分点，不编号。
summary 应包含候选人与岗位的整体匹配判断、最主要的匹配依据、对匹配程度的客观总结。
summary 不得包含简历优化建议、投递建议、面试建议、夸张表达、“一定适合”“完全胜任”“完美匹配”等绝对化表述、“根据以上分析”“综上所述”等模板化开头，且不得加入未被候选人网站资料支持的新事实。

十七、输出 JSON 字段契约
最终输出必须严格符合以下 JSON 结构，字段名和字符串引号必须使用英文半角双引号：
{
  "overallScore": 89,
  "overallLevel": "匹配",
  "matrix": [
    { "id": "education", "label": "教育背景匹配", "score": 95, "reason": "JD 未明确提出特定学历或专业限制，候选人的教育背景能够支撑岗位所需的数据与技术理解。" },
    { "id": "experience", "label": "经历背景匹配", "score": 88, "reason": "JD 强调数据运营和业务指标分析，候选人网站资料体现了用户分层、销售看板和任务跟进闭环经验。" },
    { "id": "skills", "label": "硬技能匹配", "score": 90, "reason": "JD 关注数据处理和可视化分析，候选人网站资料体现了 SQL、Python、Pandas、BI 看板和项目实践。" },
    { "id": "softSkills", "label": "软技能与工作方式匹配", "score": 90, "reason": "JD 强调业务理解、协作推进和结果导向，候选人的看板建设、任务闭环和学习探索体现了相关工作方式。" }
  ],
  "highlights": [
    { "jdRequirement": "岗位要求具备数据分析、指标拆解和业务看板建设能力。", "resumeEvidence": "候选人网站资料显示其在实习中使用 SQL、Python 和数据看板支持销售运营，并参与销售链路指标建设。" }
  ],
  "gaps": [
    { "jdRequirement": "岗位要求具备完整的数据产品需求分析和上线推进经验。", "candidateStatus": "候选人网站资料中体现了数据看板、用户分层和产品化表达，但完整产品上线流程相关证据相对有限。" }
  ],
  "summary": "整体来看，候选人与该岗位在数据分析、用户运营和业务指标拆解方面具有较高匹配度。其网站资料中的用户分层、销售看板、任务跟进闭环和项目实践，能够支撑岗位中对数据驱动运营和跨业务协作的要求。若岗位同时强调 AI 产品或技术理解，其相关项目与学习探索也能形成一定补充。"
}

十八、严格输出要求
只输出 JSON。
不要输出 Markdown。
不要输出代码块。
不要输出任何解释文字。
JSON 必须可以被 JSON.parse 正常解析。
字符串中不得出现未转义的换行符。
matrix 长度必须为 4。
highlights 长度必须为 1-3。
gaps 长度必须为 1-2。
所有 score 必须是整数。
overallScore 和 overallLevel 必须严格对应。
不得输出未定义字段。
不得声称读取了附件、浏览器页面或外部网页。
不得输出候选人网站结构化资料中没有的事实。
`;

function buildUserContent(jd) {
  return `
CANDIDATE_PROFILE_FROM_SITE_DATA:
${buildCandidateProfile()}

JOB_DESCRIPTION:
${jd}
`;
}

function parseModelContent(content) {
  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error('模型没有返回有效 JSON。');
    }

    return JSON.parse(match[0]);
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { message: 'Method not allowed.' });
  }

  const apiKey = getEnvValue('DASHSCOPE_API_KEY');
  const baseUrl = getEnvValue('DASHSCOPE_BASE_URL');
  const model = getEnvValue('DASHSCOPE_MODEL');

  if (!apiKey || !baseUrl || !model) {
    return sendJson(response, 500, {
      message: '服务端环境变量缺失，请配置 DASHSCOPE_API_KEY、DASHSCOPE_BASE_URL 和 DASHSCOPE_MODEL。',
    });
  }

  const rawJd = typeof request.body?.jd === 'string' ? request.body.jd.trim() : '';

  if (!rawJd) {
    return sendJson(response, 400, { message: '请先输入岗位 JD。' });
  }

  if (rawJd.length < 50) {
    return sendJson(response, 400, { message: 'JD 内容过短，请输入至少 50 字的完整岗位描述。' });
  }

  const jd = rawJd.length > MAX_JD_LENGTH ? rawJd.slice(0, MAX_JD_LENGTH) : rawJd;
  const endpoint = `${baseUrl.replace(/\/$/, '')}/chat/completions`;

  try {
    const dashscopeResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: jobMatchSystemPrompt,
          },
          {
            role: 'user',
            content: buildUserContent(jd),
          },
        ],
        temperature: 0.2,
      }),
    });

    const dashscopeText = await dashscopeResponse.text();
    let dashscopePayload;

    try {
      dashscopePayload = JSON.parse(dashscopeText);
    } catch {
      return sendJson(response, 502, {
        message: '模型服务返回了无法解析的响应，请检查 Base URL 是否正确。',
      });
    }

    if (!dashscopeResponse.ok) {
      return sendJson(response, dashscopeResponse.status, {
        message: dashscopePayload?.error?.message || dashscopePayload?.message || '模型服务调用失败。',
      });
    }

    const content = dashscopePayload?.choices?.[0]?.message?.content;

    if (!content) {
      return sendJson(response, 502, { message: '模型服务没有返回分析内容。' });
    }

    const result = parseModelContent(content);

    return sendJson(response, 200, {
      result,
      truncated: rawJd.length > MAX_JD_LENGTH,
    });
  } catch (error) {
    return sendJson(response, 500, {
      message: error.message || '岗位匹配分析失败，请稍后重试。',
    });
  }
}
