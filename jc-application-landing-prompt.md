# JC Lighting 应用门户｜四段式 Landing Page 提示词

## 使用边界

本提示词只借鉴外部参考的四段叙事、沉浸媒体与半透明信息层方法；不复制其 NFT、霓虹、紫色、视频、文字、Logo 或代码。输出必须保持 JC Lightning 的 B2B 语气与既有视觉体系。

## 主提示词（HTML / 网站生成）

```text
Create a premium four-section application landing page for JC Lighting, a Shenzhen-based solar-lighting B2B supplier. The goal is to help distributors, contractors and project buyers understand which product range fits each environment, then enter the relevant product selection flow.

Brand system: use warm chalk #f0ebe2, ink #0e0c0a, brass #a87d2a, Playfair Display for editorial display text and Outfit for interface text. The tone is professional, calm, technically credible and warm. Avoid dark-mode UI, neon purple/pink, NFT/Web3 language, fake metrics, emoji, fabricated certifications, prices, projects or product specifications.

Use a four-section narrative:
1. Hero — “Light, placed with purpose.” Use a bright, real solar-security / perimeter environment. Show daylight-to-after-dark continuity with a restrained scroll-linked shift. Primary action: Explore applications. Secondary action: View all ranges.
2. System logic — explain that each environment calls for a different lighting approach. Present security, road, garden, decorative, portable, commercial and off-grid as clear application systems. The composition should feel editorial, not like a SaaS dashboard.
3. Application atlas — create seven image-led cards using real, relevant scene imagery. Each card opens a small accessible detail panel and routes to the relevant product range. Keep the images visible; overlays may improve readability but must not darken the scenes excessively.
4. Closing CTA — “Build the range around the site.” Give buyers a clear way to view the catalogue or request a quote. Do not mention price, MOQ, stock, lead time or unverified performance claims.

Interaction: smooth but restrained reveal-on-scroll transitions, card image zoom on hover/focus, keyboard-accessible cards and modal/dialog behavior, visible focus styles, and a prefers-reduced-motion static fallback. Use semantic HTML, CSS custom properties and vanilla JavaScript only. Avoid heavy libraries and autoplay video dependencies. Design responsive layouts for 1440px, 768px and 375px without horizontal overflow.

Imagery: use the existing JC application scenes rather than invented abstract artwork. Keep solar fixtures, architecture, roads, vegetation and outdoor lighting physically plausible. Product imagery must remain white-background product imagery when shown. No random text, no watermarks, no fake logos, no fake certifications.
```

## 场景图 Prompt as Code（后续增补素材时使用）

```text
任务：JC 应用门户 / {场景编号}
视觉目的：让经销商或工程买家一眼理解该产品系统服务的真实环境
连续性锚点：同一气候、建筑材料、道路或动线方向、时间段必须与上一个镜头一致
本镜变化：从 {上一空间} 沿合理动线进入 {当前应用空间}；只新增与该场景有关的设施
构图：16:9 横幅，保留左侧或右侧文字安全区，主体与照明设施清晰但不过度夸张
光线：可见环境细节的蓝调黄昏或早夜；灯光为合理暖白 / 中性白，不压黑背景
真实约束：合理建筑比例、路面标线、车辆停放、植栽密度和灯具安装位置
禁止：文字、Logo、水印、假认证、随机产品、无人脸、变形建筑、漂浮物、过度黑暗、霓虹色
验收：与相邻镜头能顺滑衔接；产品类别与场景一致；可作为网页背景；不构成商业事实证明
```

## 当前预览的场景映射

| 应用系统 | 场景资产 | 产品导向 |
|---|---|---|
| Security & Perimeter | `jc-portal-scene-01-security-v2.png` | 周界、入口与庭院安防灯具 |
| Road & Municipal | `jc-portal-scene-02-road-v2.png` | 道路与公共通行照明 |
| Garden & Landscape | `jc-portal-scene-03-garden-v2.png` | 路径、花园与景观灯具 |
| Decorative & Hospitality | `jc-portal-scene-04-decorative-v2.png` | 酒店、庭院与氛围照明 |
| Portable & Field | `jc-portal-scene-05-portable-v2.png` | 现场与便携照明 |
| Commercial & Industrial | `jc-portal-scene-06-commercial-v2.png` | 商业与工业场地照明 |
| Off-Grid Home | `jc-portal-scene-07-offgrid-v2.png` | 离网住宅与基础照明 |

