/* JC Lightning — product-page chrome i18n.
   When the visitor chose 中文 on the homepage (localStorage 'jc-lang' === 'zh'),
   translate the page FRAME (nav, breadcrumb, category, spec labels, headings,
   CTA, related, footer) to Chinese. Product title, dek, body prose and spec
   VALUES intentionally stay in English. Other languages have their own pages. */
(function () {
  var lang;
  try { lang = localStorage.getItem('jc-lang'); } catch (e) {}
  if (lang !== 'zh') return;

  // Full-text dictionary (keys = English textContent, entities decoded).
  var T = {
    // nav + breadcrumb
    'Products': '产品', 'Insights': '洞察', 'Get a Quote': '获取报价', 'Home': '首页',
    // section headings + related
    'Specifications': '规格参数', 'Related products': '相关产品', 'Related guides': '相关指南',
    // spec datasheet CTA
    'Request full datasheet & wholesale pricing →': '索取完整规格书与批发价 →',
    // CTA buttons
    'See all products': '查看全部产品',
    'See the full security range': '查看完整安防系列',
    'See the full garden range': '查看完整花园系列',
    'See the full decorative range': '查看完整装饰系列',
    'See the full off-grid range': '查看完整离网系列',
    // CTA headings (<em> stripped in textContent)
    'Need this for your market?': '需要供应到你的市场?',
    "Tell us your market — we'll spec the right security range.": '告诉我们你的市场,我们为你配齐合适的安防系列。',
    "Tell us your market — we'll spec the right garden range.": '告诉我们你的市场,我们为你配齐合适的花园系列。',
    "Tell us your market — we'll spec the right decorative range.": '告诉我们你的市场,我们为你配齐合适的装饰系列。',
    "Tell us your market — we'll spec the right off-grid range.": '告诉我们你的市场,我们为你配齐合适的离网系列。',
    // CTA paragraphs
    "Tell us your country and volume and we'll send the full datasheet, certificates and wholesale pricing — typically within 24 hours.": '告诉我们你的国家和数量,我们会发送完整规格书、证书和批发价——通常 24 小时内回复。',
    "Tell us your country, application and volume and we'll send the full datasheet, certificates and wholesale pricing — typically within 24 hours.": '告诉我们你的国家、应用场景和数量,我们会发送完整规格书、证书和批发价——通常 24 小时内回复。',
    "Tell us your country, channel and volume and we'll send the full datasheet, certificates and wholesale pricing — typically within 24 hours.": '告诉我们你的国家、渠道和数量,我们会发送完整规格书、证书和批发价——通常 24 小时内回复。',
    "Tell us your country, project type and volume and we'll send the full datasheet, certificates and wholesale pricing — typically within 24 hours.": '告诉我们你的国家、项目类型和数量,我们会发送完整规格书、证书和批发价——通常 24 小时内回复。',
    "Tell us your country, road type and volume and we'll send the full datasheet, certificates and wholesale pricing — typically within 24 hours.": '告诉我们你的国家、道路类型和数量,我们会发送完整规格书、证书和批发价——通常 24 小时内回复。',
    "Tell us your country, use case and volume and we'll send the full datasheet, certificates and wholesale pricing — typically within 24 hours.": '告诉我们你的国家、使用场景和数量,我们会发送完整规格书、证书和批发价——通常 24 小时内回复。',
    "Share your country, application (residential / municipal / worksite) and volume, and we'll recommend the models and specs that fit — with wholesale pricing within 24 hours.": '告诉我们你的国家、应用(住宅 / 市政 / 工地)和数量,我们会推荐合适的型号与规格——并在 24 小时内给出批发价。',
    "Share your country, channel (hospitality / retail / events) and volume, and we'll recommend the finishes and formats that fit — with wholesale pricing within 24 hours.": '告诉我们你的国家、渠道(酒店 / 零售 / 活动)和数量,我们会推荐合适的饰面与款式——并在 24 小时内给出批发价。',
    "Share your country, project type (residential / landscaping / hospitality) and volume, and we'll recommend the models and finishes that fit — with wholesale pricing within 24 hours.": '告诉我们你的国家、项目类型(住宅 / 景观 / 酒店)和数量,我们会推荐合适的型号与饰面——并在 24 小时内给出批发价。',
    "Share your country, use case (home / emergency / outdoor / worksite) and volume, and we'll recommend the products that fit — with wholesale pricing within 24 hours.": '告诉我们你的国家、使用场景(家用 / 应急 / 户外 / 工地)和数量,我们会推荐合适的产品——并在 24 小时内给出批发价。',
    // spec table <th> labels
    'Adjustability': '可调节性', 'Backup': '备用供电', 'Base': '灯头型号', 'Battery': '电池', 'Battery / panel': '电池 / 光伏板', 'Beam angle': '光束角', 'Blades': '扇叶', 'Body': '主体', 'Build': '结构', 'Cable': '线缆', 'Cables': '线缆', 'Certification': '认证', 'Charging': '充电', 'Colour temperature': '色温', 'Colours': '颜色', 'Control': '控制', 'Cooling': '散热', 'Coverage': '覆盖范围', 'Customisation': '定制', 'Diameter': '直径', 'Dimming': '调光', 'Dome': '灯罩', 'Effect': '效果', 'Extra': '附加', 'Fast charging': '快充', 'Finishes': '表面处理', 'Head': '灯头', 'Height': '高度', 'Heights': '高度', 'Housing': '外壳', 'Install': '安装', 'IP rating': 'IP 防护等级', 'Lamp heads': '灯头', 'LEDs': 'LED', 'Length': '长度', 'Lifespan': '使用寿命', 'Light': '灯光', 'Light source': '光源', 'Lights': '灯具', 'Luminous flux': '光通量', 'Material': '材质', 'Modes': '模式', 'Motion sensor': '运动传感器', 'Motor': '电机', 'Mounting': '安装方式', 'Operating temperature': '工作温度', 'Operation': '运行', 'Packaging': '包装', 'Panel': '光伏板', 'Pole clamp': '灯杆夹', 'Pole fit': '适配灯杆', 'Power': '功率', 'Power options': '功率选项', 'Power source': '供电方式', 'Runtime': '续航时间', 'Sensor': '传感器', 'Speeds': '档速', 'Style': '风格', 'Type': '类型', 'Visibility': '可视距离', 'Wire': '线材', 'Working modes': '工作模式'
  };

  // category + badge maps for the .cat tag and breadcrumb category links
  var CAT = {
    'AC Commercial': '市电商用', 'Decorative & Ambiance': '装饰与氛围', 'Garden & Landscape': '花园与景观',
    'Off-Grid & Portable': '离网与便携', 'Security & Street': '安防与路灯', 'Product Range': '产品系列'
  };
  var BADGE = {
    'Floodlight': '泛光灯', 'High Bay': '工矿灯', 'Street': '路灯', 'Classic': '经典', 'Hot': '热销',
    'Patio': '庭院', 'Pool & Water': '泳池与水景', 'Statement': '个性款', 'Adjustable': '可调节', 'New': '新品',
    'Retail 8-Pack': '零售 8 件装', 'Blackout-Ready': '停电应急', 'Comfort': '舒适', 'Emergency': '应急',
    'Home System': '家用系统', 'Insect Control': '灭蚊', 'Lantern': '提灯', 'Pro': '专业版', 'Worksite': '工地',
    'Bestseller': '热销', 'CCTV Smart Edition': 'CCTV 智能版', 'IP66': 'IP66', 'Recommended': '推荐', 'Warning & Signal': '警示与信号'
  };

  function norm(s) { return (s || '').replace(/’/g, "'").trim(); }   // curly → straight apostrophe
  function setIf(el) { if (!el) return; var z = T[norm(el.textContent)]; if (z !== undefined) el.textContent = z; }

  document.querySelectorAll('.hd-nav a').forEach(setIf);

  document.querySelectorAll('.crumb a').forEach(function (a) {
    var k = norm(a.textContent);
    if (T[k] !== undefined) { a.textContent = T[k]; return; }
    if (CAT[k] !== undefined) a.textContent = CAT[k];
  });

  document.querySelectorAll('.cat').forEach(function (el) {
    el.textContent = el.textContent.split('·').map(function (p) {
      p = p.trim(); return CAT[p] || BADGE[p] || p;
    }).join(' · ');
  });

  document.querySelectorAll('.byline span').forEach(function (s) {
    if (s.innerHTML.indexOf('Shenzhen factory') > -1)
      s.innerHTML = s.innerHTML.replace('Shenzhen factory', '深圳工厂');
  });

  document.querySelectorAll('.spec-table th').forEach(setIf);
  document.querySelectorAll('.art-body h2').forEach(setIf);          // translates "Specifications"; leaves content headings
  document.querySelectorAll('.spec-cta, .cta h2, .cta p, .cta .btn, .related h3').forEach(setIf);

  document.querySelectorAll('.site-ft div').forEach(function (d) {
    if (d.innerHTML.indexOf('Solar outdoor lighting manufacturer') > -1) {
      d.innerHTML = d.innerHTML
        .replace('Solar outdoor lighting manufacturer', '太阳能户外照明制造商')
        .replace('Shenzhen, China', '中国深圳')
        .replace('>Contact<', '>联系我们<');
    }
  });

  document.documentElement.lang = 'zh-CN';
})();

// Product photography overrides shared by all product detail pages.
(function () {
  var replacements = {
    'images/uploaded-product-photos/three-head-solar-motion-light-main.png': 'images/product-library/3-Head%20Solar%20Motion%20Flood%20Light/3-Head%20Solar%20Motion%20Flood%20Light.png',
    'images/product-02.webp': 'images/product-library/All-in-One%20Solar%20Street%20Light/68a6647c-3537-48cd-bac5-fba0eb906a03.png',
    'images/product-04.webp': 'images/product-library/Up-Down%20Solar%20Wall%20Light/622717f8-2083-49f2-a8c3-e9b51ccc7bd2.png',
    'images/new/product-26.webp': 'images/product-library/solar%20pole%20flag%20lights/3620f839-07a2-4162-b109-a2385968ba79.png',
    'images/product-28.webp': 'images/product-library/%E5%A4%AA%E9%98%B3%E8%83%BD%E6%9F%B1%E7%81%AF/s.png',
    'images/product-13.webp': 'images/product-library/Solar%20Lights%20Outdoor%20Waterproof%2C%2012%20Pack%2C%20Stainless%20Steel%20LED%20Solar%20Garden%20Lights/23dfbbdb-4400-4c7b-8a69-d423090b70fb.png',
    'images/product-14.webp': 'images/product-library/Solar%20Spotlights%20Outdoor/0be844f2-89ff-45d9-bad8-2c9a950d4567.png',
    'images/product-09.webp': 'images/product-library/Wall%20Lamp/1fd0b658-e1f3-4997-8e59-be610152f6fc.png',
    'images/product-06.webp': 'images/product-library/LED%20String%20Lights/33323be8-c3f6-4b5f-a673-6d89e9a5ab99.png',
    'images/new/product-19.webp': 'images/product-library/Solar%20Flame%20Torch%20Light/0ec82fba-26fb-4eba-b0be-ba437fe0b2c5.png',
    'images/new/product-21.webp': 'images/product-library/Patio%20Umbrella%20Light/6bba0100-614e-4572-a988-2df0dca66733.png',
    'images/new/product-22.webp': 'images/product-library/Solar%20Outdoor%20Floor%20Lamp/267cd3fb-ea43-456a-9263-aa5e05c0a3d2.png',
    'images/product-29.webp': 'images/product-library/Solar%20Floating%20Swimming%20Pool%20LED%20Lights/380d8a86-35ab-46a2-85d3-fd78c73a43aa.png',
    'images/product-10.webp': 'images/product-library/LED%20Camping%20Lanterns%20Portable%20Solar%20Rechargeable%20Lights/00a624b1-f0e1-4264-a22b-1d12a44ab88a.png',
    'images/product-11.webp': 'images/product-library/Solar%20Bug%20Zapper%20Light/33cbc386-9c99-4afd-a079-e83f19f5870a.png',
    'images/new/product-23.webp': 'images/product-library/Solar%20Portable%20Work%20Light/16229c88-48d0-4cf5-bfaf-88190fb939f7.png',
    'images/product-31.webp': 'images/product-library/Stadium%20Lights%20Outdoor%20LED%20Flood%20Light/4b919572-4c95-40ed-a779-b82968f5c51e.png',
    'images/product-32.webp': 'images/product-library/High%20Bay%20Led%20Shop%20Lights/1119c537-aa9f-4569-b2ec-2778f32dbe62.png'
  };

  document.querySelectorAll('img.pa-img').forEach(function (img) {
    var source = img.getAttribute('src') || '';
    var offset = source.indexOf('images/');
    var replacement = offset >= 0 ? replacements[source.slice(offset)] : null;
    if (replacement) img.src = source.slice(0, offset) + replacement;
  });
})();
