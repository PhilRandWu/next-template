This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Next.js + Ts + TailwindCss + Eslint + Prettier + Husky + Lint-staged + Commitlint + Commitizen + Conventional-changelog

```bash
 yarn add eslint prettier eslint-config-prettier eslint-plugin-prettier -D
```

# 项目开发规范和工具配置说明

## 工具

本项目使用了以下工具来规范代码、管理提交和生成 Changelog：

ESLint：用于 JavaScript 代码的静态检查，保证代码风格和质量。
Prettier：代码格式化工具，用于保持代码风格一致。
Lint-staged：在提交前自动运行 ESLint 和 Prettier。
Commitlint：用于强制规范提交消息的格式。
Commitizen：提供了一个交互式的命令行界面，帮助规范化提交信息。
Husky：Git 钩子工具，用于在提交、推送等操作前运行预定义的命令。
Conventional-changelog：根据提交记录自动生成项目的 Changelog。

## 工具配置步骤

1. 安装依赖
   请确保项目根目录下已安装 Node.js，并执行以下命令安装依赖：

```bash
npm install --save-dev eslint prettier lint-staged  commitizen @commitlint/cli @commitlint/config-conventional
cz-conventional-changelog husky -D
```

2. 配置工具
   2.1 ESLint 和 Prettier
   在项目根目录下创建 .eslintrc.js 文件，并配置 ESLint 规则。在 package.json 中配置 prettier 字段，用于 Prettier 配置。

2.2 Lint-staged
在 package.json 中配置 lint-staged 字段，指定需要运行的 ESLint 和 Prettier 命令。

2.3 Commitlint
创建 commitlint.config.js 文件，并定义 Commitlint 规则。

2.4 Commitizen
在 package.json 文件的 config 字段中配置 Commitizen，指定使用 cz-conventional-changelog。

2.5 Husky
在 package.json 文件中配置 Husky 的 pre-commit 和 commit-msg 钩子，分别用于 lint-staged 和 commitlint 的执行。

2.6 Conventional-changelog
创建发布脚本，包括生成版本、生成 Changelog 等操作。

3. 使用工具
   在开发过程中，确保代码符合 ESLint 规范，并使用 Prettier 进行格式化。
   提交代码时，请使用 git commit 命令并且按照 Commitizen 的提示规范化提交消息。
   发布新版本时，请运行发布脚本以生成 Changelog。

## 结语

以上是本项目工具配置的基本指南。请在使用工具时遵守团队规范，并确保提交消息清晰明了，以便生成准确的 Changelog。

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
