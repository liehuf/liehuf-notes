const head = require('./config/head.js');
const plugins = require('./config/plugins.js');
const themeConfig = require('./config/themeConfig.js');

module.exports = {
  theme: 'vdoing', // 使用npm包主题
  title: "liehuf-notes",
  description: 'vdoing博客主题模板',
  base: '/liehuf-notes/', // 格式：'/<仓库名>/'， 默认'/'
  markdown: {
    lineNumbers: true, // 代码行号
  },

  head,
  plugins,
  themeConfig,
}

// vssue 评论插件
  plugins: [
    [
      "vuepress-plugin-vssue-global",
      {
        platform: "github",
        title: "[Comment]<%- frontmatter.title %>",
        needComments: true,
        // 其他的 Vssue 配置
        autoCreateIssue: true,
        clientId: "Ov23liIHWTbxUErIpbmK",
        clientSecret: "95f92bf987054e3509ed8c30f425716b092e7f09",
        owner: "liehuf",
        repo: "liehuf-notes",
        redirectUri: "https://liehuf.github.io/liehuf-notes/",
      },
    ],
  ]