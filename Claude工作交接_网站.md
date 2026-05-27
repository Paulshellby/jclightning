# Claude 工作交接提示词 — JC Lightning 网站
> 复制以下全部内容，粘贴给下一个 Claude 会话的开头

---

## 【直接粘贴给下一个 Claude 的提示词】

---

你好，我是嘉晨灯饰（JC Lightning）的负责人。我是深圳的太阳能灯饰 B2B 出口商，非技术背景，请用中文回复我。

## 我的业务背景

- 公司：JC Lightning（嘉晨照明科技有限公司）
- 主营：太阳能灯饰 B2B 出口
- 目标市场：非洲（南非/尼日利亚/肯尼亚）、拉美（哥伦比亚/厄瓜多尔）、大洋洲（澳洲）
- 产品卖点：CE+RoHS 认证、LiFePO4 电池、OEM、FOB 深圳
- 当前网站：https://paulshellby.github.io/jclightning/
- **网站源文件：`D:\嘉晨灯饰JC Lightning\网站\index源文件.html`**（单文件，约 350KB）

## 当前网站产品（30 款，6 大系列）

**Security & Street（8 款）**：
- p1: 3-Head Solar Motion Flood Light（2500-3500lm·IP65·PIR270°·LiFePO4）
- p9: All-in-One Solar Street Light [CCTV Smart Edition]（100/200/300W·IP66·雷达·LiFePO4）
- p4: PIR Motion Sensor Wall Light（800lm·IP65·4000mAh）
- p14: Up-Down Solar Wall Light [NEW]（2×3W·IP65·铝·3000K）
- p2: 30W Solar Flood Security Light（2400lm·IP66·PIR10m）
- p18: Portable Warning Light（磁吸·IP65·红蓝双闪）
- p19: Solar Traffic Cone Lamp（LED·IP65·360°可见）
- p20: Solar Beacon Signal Tower（IP66·modular·bridge/wind farm）

**Garden & Landscape（3 款）**：
- p28: Sphere Gate Pillar Light（5W·304SS·IP65·欧式球形）
- p6: Solar Garden Stake Light·8-Pack（1.2W·IP65·零售装）
- p8: Solar Garden Spike Spotlight（5W·400lm·360°旋转）

**Decorative & Ambiance（8 款）**：
- p10: Outdoor Wall Lantern·Solar/AC（IP44·E27·铜色/黑/古铜）
- p11: Solar Edison String Lights [5 Seasonal Themes]（40/60LED·IP65·2700K·30m）
- p21: Solar Flame Torch Light（IP65·3 modes·20h+）
- p22: Solar Neon Flex（RGB·IP67·5m roll）
- p23: Solar Hex Wall Light（RGBIC·IP65·app control）
- p24: Solar Pathway Marker Light（IP68·bearing 20T·airport grade）
- p25: Solar Underground Paver Light（IP68·bearing 40T·drive-over）
- p26: Solar Inground Uplight（IP67·adjustable·tree/facade）

**Off-Grid & Portable（8 款）**：
- p13: Solar Portable Camping Lantern [Multi-Function Edition]（5W·4000mAh·15h+·USB）
- p15: Solar Bug Zapper Light（UV-LED·IP65·100-200m²）
- p16: Solar Portable Work Light（IP65·10000mAh·magnetic）
- p17: Solar Foldable Panel Kit（21W·USB-C+DC·IP65·camping/RV）
- p27: Solar CCTV Camera Light（4G/WiFi·2K·PIR·two-way audio）
- p29: Solar Table/Desk Lamp（2W·2800mAh·学生/户外）
- p30: AC Chargeable Emergency UFO Light（80W·8000mAh·3-6h·bulb+flashlight）
- p7: Solar Power Bank（5000mAh·compact·emergency）

**AC Commercial（3 款）**：
- p31: AC Floodlight（100/200/300W·IP66·SMD3030·5 年保修）
- p32: UFO High Bay Light（150/200/240W·IP65·SMD3030·仓库/工厂）
- p33: AC Street Light Head（100-300W·SMD5050·道路/停车场）

## 网站技术架构

- **类型：** 单文件 HTML/CSS/JS（无框架）
- **文件编码：** UTF-8，CRLF 换行
- **动画库：** GSAP 3.12.5 + ScrollTrigger（CDN: cdnjs.cloudflare.com）
- **平滑滚动：** Lenis 1.0.42（CDN: jsdelivr.net）— 有容错，加载失败不阻塞页面
- **字体：** Playfair Display（标题/Logo）+ Outfit（正文/导航），Google Fonts CDN
- **CSS 变量（核心）：**
```css
--ink:       #0e0c0a;   /* 墨黑 — 深色区底色 */
--ink-soft:  #1c1814;   /* 软黑 — 浅色区正文 */
--chalk:     #f0ebe2;   /* 奶油底 — 浅色区背景 */
--chalk-w:   #f7f3ec;   /* 白奶油 — 更亮的浅色区 */
--brass:     #a87d2a;   /* 铜金色 — 主强调色 */
--brass-lt:  #c9a24e;   /* 亮金色 — 副强调 */
--brass-pale:#e2c98a;   /* 淡金色 — 渐变 */
--mist:      #d4cec4;   /* 浅灰 — 深色区正文 */
--stone:     #2d2824;   /* 深褐 — 浅色区次要文字 */
--stone-lt:  #4a4139;   /* 中褐 — 标签/元信息 */
--bdk: rgba(255,255,255,0.09);  /* 深色区边框 */
--blt: rgba(14,12,10,0.11);     /* 浅色区边框 */
```
- **浅色区（9 个模块）：** Categories, Scenarios, Factory, Process, Promise, Testimonials, Certs, Matchmaker, Contact — 底色 cream
- **深色区（4 个模块 + Hero + Footer）：** Hero, Products, Numbers, Why, FAQ — 底色 ink (#0e0c0a)
- **背景图：** 13 张 bg-*.jpg，路径 `D:\嘉晨灯饰JC Lightning\网站\images\`，透明度 5-12%

## i18n 五语系统（最关键）

- `data-i18n` 属性标注所有需要翻译的元素
- JS `T` 对象：`T.en` / `T.zh` / `T.es` / `T.fr` / `T.pt`
- `setLang(l)` 函数：`querySelectorAll('[data-i18n]')` 遍历替换 `innerHTML`
- `I18N_DEFAULTS` 对象：页面加载时捕获所有 HTML 默认文本作为英文回退
- **重要：T.en 中与 HTML 默认值相同的 key 已删除**（约 170 项），减少文件体积。英文依靠 `I18N_DEFAULTS` 自动回退
- URL 参数检测：`?lang=zh` / `?lang=es` / `?lang=fr` / `?lang=pt`
- 中文公司名：嘉晨照明科技有限公司（logo、footer、版权三处）
- 英文公司全称：JC Lightning Technology Co., Ltd.
- JS 中单引号转义规则：法语/葡语的撇号用 `\'` 转义（如 `d\'urgence`），**不能用两个单引号 `''`**

## 页面结构（从上到下）

1. **Preloader** — 加载动画，5s 超时强制隐藏
2. **Nav** — 固定导航，深色/浅色自适应，Mega Menu 下拉
3. **Hero** — 全屏，标语+Ken Burns 背景图+粒子+科技网格
4. **Marquee** — 滚动文字条（金色底）
5. **Brand** — 品牌引述（深色底）
6. **Categories** — 4 大分类卡片（浅色底）
7. **Products** — 30 款产品（深色底），含搜索框+筛选按钮+市场 Tab
8. **Scenarios** — 15 个应用场景，5 大类别（浅色底）
9. **Factory** — 工厂介绍 + Why Rows（浅色底）
10. **Numbers** — 5 个数据计数器（深色底）
11. **Why** — 4 大优势卡片（深色底）
12. **Process** — 4 步采购流程（浅色底）
13. **Promise** — 4 项承诺（浅色底）
14. **Certs** — 4 张认证证书（浅色底）
15. **Testimonials** — 4 条客户评价（浅色底）
16. **Trust Strip** — 国家标签条（深色底）
17. **FAQ** — 8 个问答手风琴（深色底）
18. **Matchmaker** — 产品匹配问答（浅色底）
19. **Contact** — 联系表单 + 信息（浅色底）
20. **Footer** — 页脚（深色底）

## 交互功能

- **产品搜索：** `.prod-search` 实时筛选 `.prod-card`，搜索产品名/描述/角标
- **产品筛选：** 6 个筛选按钮（All/Security/Garden/Decorative/Off-Grid/AC），显示产品计数
- **市场导航：** 6 个市场 Tab（USA/LATAM/French Africa/Middle East/Brazil/India），语言联动展开
- **询价车：** 产品卡片 "+" 按钮 → 右下角购物车 → WhatsApp 一键询价
- **Mega Menu：** Products hover 展开 5 列+预览图
- **快速查看：** 产品卡片点击弹窗
- **灯箱：** 产品图片点击放大
- **自定义光标：** 金色圆点+光环，hover 变换
- **FAQ 手风琴：** 点击展开/收起
- **ScrollTrigger 动画：** 各模块滚动入场（GSAP）
- **Lenis 平滑滚动：** 鼠标滚轮+触摸

## 当前已知问题

1. **字体和颜色用户还不满意** — 上一轮做了大幅调整（字重 300→400、字号+0.1rem、颜色加深），但用户仍觉得不够显眼。可能需要进一步放大字号、加粗、或换更粗的字体变体
2. **Lenis 有时加载失败** — 已加容错，但不稳定。考虑换更可靠的 CDN 或完全移除
3. **Preloader 偶尔卡住** — 已加 5s 超时，但根源可能是 CDN 加载慢
4. **文件体积大** — ~350KB，可进一步优化

## 部署流程

```powershell
Copy-Item -Force "D:\嘉晨灯饰JC Lightning\网站\index源文件.html" "D:\嘉晨灯饰JC Lightning\网站\index.html"
cd "D:\嘉晨灯饰JC Lightning\网站"
git add index源文件.html index.html
git commit -m "..."
git pull origin master
git push origin master
git push origin master:main -f
```

## 重要工作规则

- 用中文跟我沟通
- 我非技术背景，解释要简单直白
- **修改网站前必须给我看方案，获得确认才能动手**
- **所有修改都在 `index源文件.html`**，不要直接改 `index.html`
- 修改 HTML/CSS/JS 都要考虑五种语言（en/zh/es/fr/pt）
- JS 语法验证：用 `node --check` 检查（排除 `application/ld+json` 脚本块）
- 修改前先用 `git status` 确认状态，出错用 `git checkout` 回滚

---

*以上信息由当前 Claude 会话整理（2026-05-22），基于对网站源文件的全面分析。*
