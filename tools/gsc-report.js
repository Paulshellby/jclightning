/*
 * JC Lightning — Google Search Console monthly report puller.
 *
 * Reads GSC Search Analytics + sitemap status via the service account
 * (the same key n8n already uses) and prints a concise Chinese report to stdout.
 *
 * Requirements (one-time): `npm install googleapis` in this folder (网站/tools).
 * Prereq (one-time, done by the site owner in their Google account):
 *   1) Enable "Google Search Console API" in Cloud project soy-infusion-496708-p6
 *   2) Add service account n8n-sheets-bot@soy-infusion-496708-p6.iam.gserviceaccount.com
 *      as a user (Restricted is enough) on the jclightning.com GSC property.
 *
 * The private key is read from the JSON key file by path — never printed.
 * Usage:  node gsc-report.js
 */
const path = require('path');
const { google } = require('googleapis');

const KEY_FILE = path.resolve(__dirname, '..', '..', 'google-sheets-key.json'); // project-root key
const SITE_CANDIDATES = ['sc-domain:jclightning.com', 'https://jclightning.com/'];

function ymd(d) { return d.toISOString().slice(0, 10); }
function daysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return d; }

async function pickSite(webmasters) {
  const { data } = await webmasters.sites.list();
  const entries = (data.siteEntry || []).map(s => s.siteUrl);
  for (const c of SITE_CANDIDATES) if (entries.includes(c)) return c;
  if (entries.length) return entries[0];
  throw new Error('服务账号在 GSC 里看不到任何站点 —— 请确认第 2 步"加用户"已完成。');
}

async function query(webmasters, siteUrl, startDate, endDate, dimensions, rowLimit) {
  const { data } = await webmasters.searchanalytics.query({
    siteUrl,
    requestBody: { startDate, endDate, dimensions, rowLimit: rowLimit || 1000 },
  });
  return data.rows || [];
}

function totals(rows) {
  return rows.reduce((a, r) => {
    a.clicks += r.clicks || 0; a.impressions += r.impressions || 0; return a;
  }, { clicks: 0, impressions: 0 });
}
function pct(now, prev) {
  if (!prev) return now ? '+∞%' : '0%';
  const v = ((now - prev) / prev) * 100;
  return (v >= 0 ? '+' : '') + v.toFixed(0) + '%';
}

(async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    const webmasters = google.webmasters({ version: 'v3', auth });
    const site = await pickSite(webmasters);

    const end = ymd(daysAgo(2));            // GSC data lags ~2 days
    const start = ymd(daysAgo(30));         // last 28 days
    const prevEnd = ymd(daysAgo(31));
    const prevStart = ymd(daysAgo(59));     // prior 28 days

    const [byQuery, byPage, cur, prev, sitemaps] = await Promise.all([
      query(webmasters, site, start, end, ['query'], 1000),
      query(webmasters, site, start, end, ['page'], 1000),
      query(webmasters, site, start, end, [], 1),
      query(webmasters, site, prevStart, prevEnd, [], 1),
      webmasters.sitemaps.list({ siteUrl: site }).then(r => r.data.sitemap || []).catch(() => []),
    ]);

    const c = totals(cur), p = totals(prev);
    const top = (rows, label) => rows
      .sort((a, b) => (b.clicks - a.clicks) || (b.impressions - a.impressions))
      .slice(0, 10)
      .map((r, i) => `  ${i + 1}. ${r.keys[0]}  —  点击 ${r.clicks}，曝光 ${r.impressions}，均位 ${r.position.toFixed(1)}`)
      .join('\n') || `  （暂无${label}数据）`;

    const out = [];
    out.push(`# JC Lightning · GSC 月报（${start} ~ ${end}）`);
    out.push(`站点：${site}`);
    out.push('');
    out.push(`## 总览（近 28 天 vs 上一个 28 天）`);
    out.push(`- 点击：${c.clicks}（环比 ${pct(c.clicks, p.clicks)}）`);
    out.push(`- 曝光：${c.impressions}（环比 ${pct(c.impressions, p.impressions)}）`);
    out.push('');
    out.push(`## 热门搜索词 Top 10`);
    out.push(top(byQuery, '搜索词'));
    out.push('');
    out.push(`## 表现最好的页面 Top 10`);
    out.push(top(byPage, '页面'));
    out.push('');
    out.push(`## Sitemap 状态`);
    if (sitemaps.length) {
      sitemaps.forEach(s => out.push(`- ${s.path} · 已提交URL ${s.contents ? s.contents[0].submitted : '?'} · 错误 ${s.errors || 0} · 警告 ${s.warnings || 0}`));
    } else {
      out.push('- （未在 GSC 提交 sitemap，或服务账号无权限）');
    }
    out.push('');
    out.push(`## 建议`);
    out.push(`- 看"热门搜索词"里位次 5-15 的词：这些是最容易再往上推的，针对它们补内容/优化标题。`);
    out.push(`- 看"表现最好的页面"：曝光高但点击低 = 标题/描述不吸引，可改写。`);

    console.log(out.join('\n'));
  } catch (e) {
    console.error('GSC 拉取失败：' + (e && e.message ? e.message : e));
    console.error('常见原因：① 未启用 Search Console API ② 服务账号未加进 GSC 用户 ③ 未 npm install googleapis');
    process.exit(1);
  }
})();
