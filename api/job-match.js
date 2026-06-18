const MAX_JD_LENGTH = 5000;

const candidateProfile = `
Candidate: Yuting Li / 李雨婷
Positioning: Computer Science graduate student focused on Data Analysis, AI Product, User Operations, and Sales Operations.

Core Experience:
- NIO / ONVO User Operations & Business Planning Intern.
- Supported sales operation and user operation through SQL, Python, and data dashboards.
- Built and maintained user segmentation for approximately 100,000 users, including test drive status, follow-up status, order status, lead source, interaction frequency, and intention deposit records.
- Assisted in building sales operation dashboards covering leads, test drives, forecast, intention deposits, orders, locked orders, and deliveries.
- Supported task distribution and follow-up tracking, including overdue follow-ups, invalid interactions, and users with no interaction for 30 days.
- Created multi-dimensional tables, questionnaire statistics, coupon code ledgers, operation tables, and automated reminder workflows.

Projects:
1. Sales Operation Dashboard and User Task Tracking System: sales funnel analysis, user segmentation, task distribution, closed-loop follow-up tracking. Tech: SQL, Python, Pandas, Excel, BI Dashboard, Multi-dimensional Tables.
2. Dual-Domain Alignment-Guided CNN-Transformer Network for Sea-Land Segmentation: remote sensing segmentation in complex coastal scenes. Tech: PyTorch, CNN, Transformer, Swin Transformer, ResNet, Semantic Segmentation.
3. License Plate Recognition System: object detection, character recognition, database result management. Tech: YOLOv5, LPRNet, Python, OpenCV, MySQL.
4. Multivariate Recruitment Data Visualization Analysis: job market visualization across cities, salaries, education, and experience. Tech: Python, Pandas, ECharts, Data Cleaning, Data Visualization.

Skills:
Data Analysis: SQL, Python, Pandas, NumPy, Excel, Data Cleaning, Funnel Analysis, User Segmentation.
Product & Operations: AI Product Thinking, User Operations, Sales Operations, Requirement Analysis, Dashboard Design, Task Tracking.
Machine Learning & CV: PyTorch, CNN, Transformer, YOLOv5, LPRNet, Semantic Segmentation.
Visualization & Tools: ECharts, Tableau / BI, Matplotlib, MySQL, Git, PyCharm, Codex.
`;

function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

function buildPrompt(jd) {
  return `
You are an expert career matching analyst. Analyze the job description against the candidate profile.

Candidate Profile:
${candidateProfile}

Job Description:
${jd}

Return JSON only. Do not include markdown, comments, or extra text.
The JSON schema must be:
{
  "overallLevel": "高度匹配 | 中度匹配 | 低度匹配",
  "overallScore": 0-100,
  "matchMatrix": {
    "roleFit": { "label": "岗位方向匹配", "score": 0-100, "reason": "one concise Chinese sentence" },
    "experienceFit": { "label": "工作经历匹配", "score": 0-100, "reason": "one concise Chinese sentence" },
    "skillFit": { "label": "技能能力匹配", "score": 0-100, "reason": "one concise Chinese sentence" },
    "projectFit": { "label": "项目经历匹配", "score": 0-100, "reason": "one concise Chinese sentence" }
  },
  "highlights": ["2-3 concise Chinese bullet points"],
  "gaps": ["1-2 concise Chinese bullet points"],
  "summary": "2-3 Chinese sentences summarizing the match"
}
`;
}

function parseModelContent(content) {
  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error('Model response is not valid JSON.');
    }

    return JSON.parse(match[0]);
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { message: 'Method not allowed.' });
  }

  const apiKey = process.env.DASHSCOPE_API_KEY;
  const baseUrl = process.env.DASHSCOPE_BASE_URL;
  const model = process.env.DASHSCOPE_MODEL;

  if (!apiKey || !baseUrl || !model) {
    return sendJson(response, 500, {
      message: 'Server environment variables are missing. Please configure DASHSCOPE_API_KEY, DASHSCOPE_BASE_URL, and DASHSCOPE_MODEL.',
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
            content: 'You are a strict JSON generator. Always return valid JSON only.',
          },
          {
            role: 'user',
            content: buildPrompt(jd),
          },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      }),
    });

    const dashscopeText = await dashscopeResponse.text();
    let dashscopePayload;

    try {
      dashscopePayload = JSON.parse(dashscopeText);
    } catch {
      return sendJson(response, 502, { message: '模型服务返回了无法解析的响应。' });
    }

    if (!dashscopeResponse.ok) {
      return sendJson(response, dashscopeResponse.status, {
        message: dashscopePayload?.error?.message || '模型服务调用失败。',
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
