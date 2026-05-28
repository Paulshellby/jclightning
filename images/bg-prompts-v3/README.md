# JC Lightning · 网站背景图生成 Prompt 包 v3

## 使用流程

1. 进入对应区块文件夹（按 01-14 编号顺序）
2. 打开 `prompt.txt`，复制全部内容
3. 粘到 Leonardo.AI 提示词框
4. 按 `settings.txt` 设置 Generation Mode / Dimensions / Number
5. 生成 4 张挑最佳的
6. 下载，重命名为文件夹里指定的 `target-filename`
7. 放回到 `D:\嘉晨灯饰JC Lightning\网站\images\` 根目录
8. 全部完成后告诉我，我帮你逐个上线

---

## 全套品牌色板（写在每个 prompt 里）

- **Brass gold**: #a87d2a
- **Bright brass**: #c9a24e
- **Pale brass**: #e2c98a
- **Ink black**: #0e0c0a
- **Chalk cream**: #f0ebe2

---

## 全套统一风格关键词（每个 prompt 都包含）

```
photorealistic, cinematic, B2B premium aesthetic,
FOX ESS / Tesla / Bang & Olufsen-inspired,
ultra-detailed, soft studio lighting,
shallow depth of field, ultra-wide composition,
NEGATIVE: text, watermark, logo, low-quality, cartoon, illustration, person face, blurry
```

---

## 区块清单

| 序号 | 文件夹 | 用途 | 主色调 | 文件尺寸 |
|------|--------|------|--------|----------|
| 01 | brand-quote | "电网失灵" 引言区 | 深色暗调 | 1920×800 |
| 02 | categories | "Five Solar Ranges" 产品分类 | 浅米色 | 1920×800 |
| 03 | products | "Every Light" 产品目录 | 深色 | 1920×1200 |
| 04 | scenarios | "Solutions by Scenario" 应用场景 | 中性 | 1920×800 |
| 05 | factory | "Built for markets" 工厂叙事 | 工业暖灰 | 1920×1000 |
| 06 | numbers | 30+ / 4 / 2000+ 数据展示 | 深黑+金 | 1920×600 |
| 07 | global-map | "Trusted across 30 markets" 世界地图 | 深空蓝 | 1920×900 |
| 08 | why-choose-us | "Why Choose Us" 玻璃卡片 | 深色 | 1920×900 |
| 09 | promise | "Our Promise" 信任承诺 | 深色 | 1920×900 |
| 10 | testimonials | "Client Voices" 客户证言 | 深色 | 1920×900 |
| 11 | faq | "FAQ" 常见问题 | 深色 | 1920×800 |
| 12 | matchmaker | "Find Your Light" 互动选灯 | 中性暖 | 1920×900 |
| 13 | contact | "Get In Touch" 联系表单 | 浅色 | 1920×800 |
| 14 | footer | 页脚 | 深色 | 1920×600 |

---

## 推荐 Leonardo 通用设置

| 项目 | 值 |
|------|---|
| Model | Lucid Origin（或 Phoenix） |
| Style | Cinematic / Dynamic |
| Generation Mode | 先 **Fast** 试效果, 满意后 **Ultra** 出终稿 |
| Image Dimensions | **16:9 Small (2752×1536)** 默认；contact/footer 可用 **Landscape Wide** |
| Number of generations | **4** |
| Prompt Enhance | Auto |
| Negative Prompt | （每个 prompt 末尾已附） |

---

## 注意事项

- 所有图最终都要放回 `images/` 根目录（不是 v3 子文件夹）
- 文件名严格按 `target-filename` 命名，否则我换图会出错
- 如果某张图你不满意，可以多生成一轮或微调 prompt 第一行
- 14 张图 token 用量大，建议升级 Leonardo $12 一个月版本（10000 tokens）一次性出完
