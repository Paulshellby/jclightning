# JC Lightning · 网站背景图 Prompt 包 v4 (品牌深度优化版)

## 设计哲学

这套 prompt 围绕 **3 个核心元素** 重新设计：

1. **品牌色调** — 严格使用网站 CSS 变量定义的色板
2. **产品故事** — 每张图都暗示我们卖什么（太阳能灯/LiFePO4/IP65/出口）
3. **市场场景** — 体现我们的客户在哪（非洲限电/拉美 apagones/澳洲偏远/中东沙漠）

---

## 品牌色板（严格遵守，每个 prompt 都内嵌）

| 用途 | HEX | 描述 |
|------|-----|------|
| 主背景深色 | `#12100e` | ink black (CSS `--ink`) |
| 主背景浅色 | `#f0ebe2` | chalk cream (CSS `--chalk`) |
| 浅色变体 | `#f7f3ec` | warm white |
| **品牌金** | `#a87d2a` | brass (主品牌色) |
| 亮金 | `#c9a24e` | bright brass |
| 浅金 | `#e2c98a` | pale brass |
| 黄昏暖光 | `#fde9b9` | warm amber (灯光发光色) |
| 暗调辅助 | `#2d2824` | warm dark stone |

**禁用色**: 蓝色 / 绿色 / 紫色 / 红色 / 霓虹色

---

## 视觉一致性原则

| 维度 | 标准 |
|------|------|
| **整体光线** | Golden hour（黄昏暖金色调）从早到晚都保持 |
| **质感** | 哑光 + 金属反光（铝合金外壳的感觉）|
| **景深** | 浅景深 f/2-f/2.8 摄影感 |
| **构图** | 大量负空间留给文字内容 |
| **细节** | 暗示但不突出产品 — 背景永远是配角 |
| **避免** | 卡通 / 矢量插画 / 平面设计感 / 文字 / 水印 / 人脸 |

---

## 操作流程

1. 进对应 `0X-xxx/` 文件夹
2. 打开 `prompt.txt` 复制全部
3. 粘到 Leonardo / Midjourney / Lucid 等
4. 推荐 Leonardo: **Lucid Origin** 模型 + **Cinematic** style
5. 推荐设置: **Fast 模式** 试 → 满意再 **Ultra** 出终稿
6. 16:9 Small (2752×1536) + 4 张
7. 下载，按 `prompt.txt` 里指定的 `目标文件名` 重命名
8. 放回 `images/` 根目录
9. 全做完通知我，一次性上线

---

## 14 个区块清单（按优先级）

### ⭐⭐⭐ 必做（用户最常看）

| # | 文件夹 | 用途 | 色调 | 文件名 |
|---|--------|------|------|--------|
| 01 | brand-quote | "电网失灵"引言 | 深色 | bg-01-brand-quote.jpg |
| 02 | categories | "Five Solar Ranges" | 浅色 | bg-02-categories.jpg |
| 03 | products | "Every Light" 目录 | 深色 | bg-03-products.jpg |
| 06 | numbers | 数据展示 | 深+金 | bg-06-numbers.jpg |
| 13 | contact | 联系表单 | 浅色 | bg-13-contact.jpg |

### ⭐⭐ 重要

| # | 文件夹 | 用途 | 色调 | 文件名 |
|---|--------|------|------|--------|
| 05 | factory | 工厂叙事 | 工业暖灰 | bg-05-factory.jpg |
| 07 | global-map | 世界地图底 | 深空 | bg-07-global-map.jpg |
| 08 | why-choose-us | Why Choose Us | 深色 | bg-08-why-choose-us.jpg |
| 09 | promise | 信任承诺 | 深色 | bg-09-promise.jpg |
| 10 | testimonials | 客户证言 | 深色 | bg-10-testimonials.jpg |

### ⭐ 锦上添花

| # | 文件夹 | 用途 | 色调 | 文件名 |
|---|--------|------|------|--------|
| 04 | scenarios | 应用场景 | 中性 | bg-04-scenarios.jpg |
| 11 | faq | FAQ | 深色 | bg-11-faq.jpg |
| 12 | matchmaker | 选灯向导 | 暖色 | bg-12-matchmaker.jpg |
| 14 | footer | 页脚 | 深黑 | bg-14-footer.jpg |

---

## Token 预算

- 14 张全 Fast 模式: ≈ 210-350 tokens
- 5 张 Ultra 出终稿: ≈ 100-150 tokens
- **建议**: 升级 Leonardo $12/月（10000 tokens）一次性出完最划算

---

## 与 Hero 3D 视频的关系

Hero 区域用 10秒视频（已上线）作为顶部入口。
往下滚动时，14 个区块的背景图要与 hero 形成 **连贯的视觉叙事**：

```
顶部 Hero 视频（白底 + 暖金光 + 动态）
  ↓
brand quote (深色，城市夜景剪影)
  ↓
categories (浅色，产品分类网格)
  ↓
products (深色目录页风格)
  ↓
... 深浅交替 ...
  ↓
footer (深黑，与 hero 收束)
```

这种"深浅交替"的节奏让用户滚动时有呼吸感、不疲劳。
