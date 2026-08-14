const LANGUAGE_KEY = "weshop-2-0:language";

const en = {
  "新建画布": "New canvas", "删除当前": "Delete current", "管理画布": "Manage canvases",
  "上传文件": "Upload files", "图片、视频、音频、TXT": "Images, video, audio, TXT", "直接写入画布": "Write directly to canvas",
  "支持图片、视频、音频和文字，生成结果会自动出现。": "Supports images, video, audio, and text. Generated results appear automatically.",
  "返回上一步": "Undo", "返回上一步 (⌘/Ctrl+Z)": "Undo (⌘/Ctrl+Z)", "已返回上一步": "Undone",
  "API 已配置": "API configured", "配置 API Key": "Set API Key", "配置 WeShop API Key": "Configure WeShop API Key",
  "连接 WeShop": "Connect WeShop", "密钥只保存在这台电脑的 Harness 主机中，不会写入画布、对话或浏览器存储。": "The key is stored only by Harness on this computer. It is never written to the canvas, chat, or browser storage.",
  "画布私密存储": "private canvas storage", "插件设置": "plugin settings", "环境变量": "environment variable",
  "输入新密钥以替换当前配置": "Enter a new key to replace the current configuration", "粘贴 WeShop API Key": "Paste your WeShop API Key",
  "获取 WeShop API Key ↗": "Get a WeShop API Key ↗", "清除画布密钥": "Clear canvas key", "取消": "Cancel", "安全保存": "Save securely", "保存中…": "Saving…",
  "WeShop API Key 已保存": "WeShop API Key saved", "已恢复其他 API Key 配置": "Restored another API Key source", "API Key 已清除": "API Key cleared", "API Key 保存失败，请稍后重试": "Could not save the API Key. Try again.",
  "选择工具": "Select tool", "手型工具": "Hand tool", "选择 / 框选 (V)": "Select / marquee (V)", "拖动画布 (H)，或按住 Space": "Pan canvas (H), or hold Space",
  "下载所选内容": "Download selection", "删除所选内容": "Delete selection", "下载": "Download", "删除": "Delete",
  "已开始下载": "Download started", "原图已打开，可从浏览器保存": "Original opened; save it from the browser",
  "添加文字": "Add text", "添加文字到画布": "Add text to canvas", "添加文字到画布": "Add text to canvas",
  "写下提示词、说明、脚本或任何需要保留的文字…": "Write a prompt, note, script, or anything you want to keep…",
  "想修改哪里？": "What would you like to change?", "描述区域和预期效果，agent 会通过 WeShop 生成新结果，原图不会被覆盖。": "Describe the area and desired result. WeShop will create a new version without overwriting the original.",
  "例如：把左上角的天空改成日落，保持人物和构图不变": "Example: turn the upper-left sky into a sunset while preserving the person and composition",
  "提交编辑": "Submit edit", "素材": "Material", "结果": "Result", "查看大图": "View full size", "在画布上方预览原图": "Preview the original above the canvas",
  "反推提示词": "Reverse prompt", "分析画面并生成可复用提示词": "Analyze the image and create a reusable prompt", "高清放大": "Upscale", "通过 WeShop 增强清晰度": "Enhance clarity with WeShop", "局部编辑": "Local edit", "描述需要修改的区域和内容": "Describe the region and desired change",
  "已提交反推提示词任务": "Reverse-prompt task submitted", "已提交高清放大任务": "Upscale task submitted", "已提交局部编辑任务": "Local-edit task submitted", "任务提交失败，请确认本地画布服务正在运行": "Could not submit the task. Make sure the local canvas service is running.",
  "WeShop 正在处理": "WeShop is working", "关闭": "Close", "拖到这里添加素材": "Drop here to add materials", "图片、视频、音频和 TXT": "Images, video, audio, and TXT",
  "模型": "Model", "输出": "Output", "在 DeepSeek 对话中继续即可执行": "Continue in the DeepSeek conversation to run it",
  "需要你的选择": "Your input is needed", "请选择一个选项或输入回答": "Choose an option or enter an answer", "或者输入自己的答案": "Or enter your own answer", "输入你的答案": "Enter your answer", "下一题": "Next", "提交": "Submit", "跳过": "Skip",
  "取消问题": "Cancel question",
  "需要授权": "Approval required", "允许执行此操作？": "Allow this action?", "拒绝": "Reject", "允许一次": "Allow once", "工具": "Tool",
  "你": "You", "当前对话": "Current conversation", "关闭画布": "Close canvas", "返回 Harness": "Back to Harness", "正在执行": "Running", "已调用": "Called", "正在思考与创作…": "Thinking and creating…",
  "需要配置 WeShop API Key": "WeShop API Key required", "打开 DSH 设置 → 插件 → weshop2.0，填写 API Key 后即可生成。也可以在启动 Harness 前设置 WESHOP_API_KEY。": "Open DSH Settings → Plugins → weshop2.0 and enter an API Key, or set WESHOP_API_KEY before starting Harness.",
  "画布与对话已连接": "Canvas and conversation connected", "在这里描述你想生成或修改的内容，消息会同步到当前 Harness 会话。": "Describe what you want to create or change. Messages sync to the current Harness session.",
  "画布选区引用": "Canvas selection references", "告诉 WeShop 要如何处理选中的内容…": "Tell WeShop what to do with the selection…", "继续和 WeShop 对话…": "Continue with WeShop…", "停止生成": "Stop generation", "发送消息": "Send message", "消息发送失败": "Could not send message", "Enter 发送 · Shift + Enter 换行": "Enter to send · Shift + Enter for a new line",
  "当前已配置": "Configured", "配置来源": "Source", "语言": "Language",
};

const dictionaries = { "zh-CN": {}, en };

export function initialLocale() {
  const saved = localStorage.getItem(LANGUAGE_KEY);
  if (saved && dictionaries[saved]) return saved;
  return /^zh\b/i.test(document.documentElement.lang || navigator.language) ? "zh-CN" : "en";
}

export function saveLocale(locale) {
  if (dictionaries[locale]) localStorage.setItem(LANGUAGE_KEY, locale);
}

export function translator(locale) {
  const dictionary = dictionaries[locale] || dictionaries.en;
  return (key) => dictionary[key] || key;
}
