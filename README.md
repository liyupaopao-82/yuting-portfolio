# yuting-portfolio

这是一个使用 React + Vite + Tailwind CSS 创建的个人作品展示网站项目，使用 JavaScript 编写，不包含后端、数据库、登录或注册功能。

## 初始化命令

如果你想从零手动创建同类项目，可以执行：

```bash
npm create vite@latest yuting-portfolio -- --template react
cd yuting-portfolio
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

本仓库已经帮你完成了上述初始化和配置文件创建。

## 安装命令

```bash
cd yuting-portfolio
npm install
```

## 运行命令

```bash
npm run dev
```

浏览器打开：

```text
http://localhost:5173/
```

## 在 PyCharm 中打开和运行

1. 打开 PyCharm。
2. 选择 `File` -> `Open`。
3. 选择本项目目录：`D:\Codex\yuting-portfolio`。
4. 打开 PyCharm 底部的 `Terminal`。
5. 执行 `npm install`。
6. 执行 `npm run dev`。
7. 在浏览器访问 `http://localhost:5173/`。

如果 PyCharm 识别不到 npm，请先安装 Node.js LTS，并在 PyCharm 的 `Settings` -> `Languages & Frameworks` -> `Node.js` 中选择本机 Node 解释器。

## 目录结构

```text
yuting-portfolio/
  public/
    images/
      README.md
    profile-mark.svg
    resume/
      Yuting_Li_Resume.pdf
    yuting-resume-placeholder.txt
  src/
    components/
      About.jsx
      Contact.jsx
      Experience.jsx
      Footer.jsx
      Hero.jsx
      Navbar.jsx
      Projects.jsx
      Resume.jsx
      Skills.jsx
    App.jsx
    index.css
    main.jsx
  .gitignore
  index.html
  package.json
  postcss.config.js
  tailwind.config.js
  vite.config.js
  README.md
```

## 核心文件说明

- `package.json`：项目名称、依赖包和运行脚本。
- `index.html`：Vite 的 HTML 入口文件，页面会挂载到 `#root`。
- `vite.config.js`：Vite 配置，启用 React 插件并固定本地端口为 `5173`。
- `tailwind.config.js`：Tailwind CSS 扫描路径和主题扩展配置。
- `postcss.config.js`：PostCSS 配置，用于加载 Tailwind 和 Autoprefixer。
- `src/main.jsx`：React 应用入口，负责把 `App` 渲染到页面中。
- `src/App.jsx`：页面组合入口，只负责组合各个模块组件。
- `src/index.css`：Tailwind 指令和全局基础样式。
- `public/profile-mark.svg`：页面首屏使用的本地视觉资源。
- `public/yuting-resume-placeholder.txt`：简历下载模块使用的占位下载文件。
- `public/resume/Yuting_Li_Resume.pdf`：简历下载按钮指向的 PDF 文件。
- `public/images/`：头像和项目图片资源目录。

## 页面模块

- `src/components/Navbar.jsx`：顶部导航栏，点击菜单会跳转到对应页面模块。
- `src/components/Hero.jsx`：首页首屏，模块 id 为 `home`。
- `src/components/About.jsx`：关于我，模块 id 为 `about`。
- `src/components/Experience.jsx`：实习经历，模块 id 为 `experience`。
- `src/components/Projects.jsx`：项目作品，模块 id 为 `projects`。
- `src/components/Skills.jsx`：技能栈，模块 id 为 `skills`。
- `src/components/Resume.jsx`：简历下载，模块 id 为 `resume`。
- `src/components/Contact.jsx`：联系方式，模块 id 为 `contact`。
- `src/components/Footer.jsx`：页脚和返回顶部入口。

## 图片和简历资源

请把真实简历放到：

```text
public/resume/Yuting_Li_Resume.pdf
```

请把真实图片放到：

```text
public/images/avatar.jpg
public/images/project-sales-dashboard.png
public/images/project-sea-land.png
public/images/project-license-plate.png
public/images/project-recruitment.png
```

如果图片暂时不存在，页面会显示占位区域，不会报错。
