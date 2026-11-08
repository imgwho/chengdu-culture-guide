/**
 * 锦官道与禅 - 交互核心逻辑 (DBS 彻底去抽象化 · 图片完整性与灯箱预览)
 */

// 1. 六十甲子与太岁神对照
const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const DIZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const ELEMENT_MAP = {
  "甲": { name: "木", en: "Wood", color: "#2D5A3F", desc: "像参天大树，扎根深、护他人，天生有担当。", enDesc: "Like a giant forest tree: grounded, protective, resilient." },
  "乙": { name: "木", en: "Wood", color: "#2D5A3F", desc: "像柔韧绿竹，遇大风弯腰不折，善于变通拐弯。", enDesc: "Like green bamboo: flexible, bends with the storm, never breaks." },
  "丙": { name: "火", en: "Fire", color: "#B93826", desc: "像正午太阳，直率敞亮，走到哪把能量带到哪。", enDesc: "Like the midday sun: bright, direct, warm, radiating power." },
  "丁": { name: "火", en: "Fire", color: "#B93826", desc: "像暗夜烛火，不扎眼但暖透人心，第六感极灵。", enDesc: "Like a cozy candle in the dark: gentle, observant, intuitive." },
  "戊": { name: "土", en: "Earth", color: "#8D6B3C", desc: "像沉稳大山，靠得住、话不多，朋友最信你。", enDesc: "Like a solid mountain: stable, dependable, deeply trustworthy." },
  "己": { name: "土", en: "Earth", color: "#8D6B3C", desc: "像沃土良田，包容心极大，善于把乱摊子理顺。", enDesc: "Like rich soil: patient, forgiving, turning chaos into growth." },
  "庚": { name: "金", en: "Metal", color: "#965A20", desc: "像出鞘钢刀，办事利索不拖拉，最恨虚情假意。", enDesc: "Like polished steel: sharp, decisive, honest, values honor." },
  "辛": { name: "金", en: "Metal", color: "#965A20", desc: "像精致珠宝，对自己要求极高，细节控、有审美。", enDesc: "Like a fine diamond: high standards, aesthetic eye, refined." },
  "壬": { name: "水", en: "Water", color: "#1E4E54", desc: "像奔腾江河，脑子转得飞快，不撞南墙懂得绕弯。", enDesc: "Like a rushing river: clever, adaptable, flows around obstacles." },
  "癸": { name: "水", en: "Water", color: "#1E4E54", desc: "像润物春雨，轻声细语却能把硬心肠化开。", enDesc: "Like gentle spring rain: soft-spoken, empathetic, deeply persuasive." }
};

const ZODIAC_ANIMALS = [
  { name: "鼠", en: "Rat", desc: "嗅觉敏锐，别人没看见的机会你先闻到了", enDesc: "Sharp senses, quick wit, finds the escape route first" },
  { name: "牛", en: "Ox", desc: "脾气硬但肯下死力气，把活交给你最踏实", enDesc: "Tough, persistent, gets the heavy work done quietly" },
  { name: "虎", en: "Tiger", desc: "气场两米八，不怕硬仗，天生爱拿主意", enDesc: "Natural leader, loves challenges, brave to the bone" },
  { name: "兔", en: "Rabbit", desc: "不惹事也不吃闷亏，待人舒服有分寸", enDesc: "Peaceful, well-mannered, agile when danger arrives" },
  { name: "龙", en: "Dragon", desc: "心气高、胃口大，做事情就想搞点动静", enDesc: "High ambitions, magnetic charm, dreams on a big scale" },
  { name: "蛇", en: "Snake", desc: "外冷内热，别人瞎咋呼你在暗中观察", enDesc: "Quiet observer, thinks three steps ahead, calm under fire" },
  { name: "马", en: "Horse", desc: "关不住的野马，爱自由，坐不住办公室", enDesc: "Free spirit, restless energy, hates sitting in a cubicle" },
  { name: "羊", en: "Goat", desc: "嘴硬心软，看不得别人受委屈，有艺术家脾气", enDesc: "Soft heart, hates cruelty, creative and patient" },
  { name: "猴", en: "Monkey", desc: "鬼点子最多，冷场救星，绝不受憋屈", enDesc: "Quick-thinking, humor master, always finds a workaround" },
  { name: "鸡", en: "Rooster", desc: "自带闹钟体质，守时严谨，眼里揉不得沙子", enDesc: "Punctual, organized, zero tolerance for sloppy mistakes" },
  { name: "狗", en: "Dog", desc: "认死理讲义气，对朋友护短到底", enDesc: "Fiercely loyal, honest, protects friends no matter what" },
  { name: "猪", en: "Pig", desc: "吃嘛嘛香、心态极好，老天爷赏饭吃的天生赢家", enDesc: "Warm-hearted, loves good food, shakes off stress easily" }
];

const TAI_SUI_NAMES = [
  "甲子金赤大将军", "乙丑陈泰大将军", "丙寅耿章大将军", "丁卯沈兴大将军", "戊辰赵达大将军", "己巳郭灿大将军",
  "庚午王清大将军", "辛未李素大将军", "壬申刘旺大将军", "癸酉康志大将军", "甲戌施广大将军", "乙亥任保大将军",
  "丙子郭嘉大将军", "丁丑汪文大将军", "戊寅曾广大将军", "己卯伍仲大将军", "庚辰董德大将军", "辛巳郑但大将军",
  "壬午陆明大将军", "癸未魏仁大将军", "甲申方杰大将军", "乙酉蒋崇大将军", "丙戌白敏大将军", "丁亥封济大将军",
  "戊子邹铛大将军", "己丑傅佑大将军", "庚寅邬桓大将军", "辛卯范宁大将军", "壬辰彭泰大将军", "癸巳徐单大将军",
  "甲午章词大将军", "乙未杨仙大将军", "丙申管仲大将军", "丁酉唐杰大将军", "戊戌姜武大将军", "己亥谢太大将军",
  "庚子卢秘大将军", "辛丑杨信大将军", "壬寅贺谔大将军", "癸卯皮时大将军", "甲辰李诚大将军", "乙巳吴遂大将军",
  "丙午文哲大将军", "丁未缪丙大将军", "戊申徐浩大将军", "己酉程宝大将军", "庚戌倪秘大将军", "辛亥叶坚大将军",
  "壬子丘德大将军", "癸丑朱得大将军", "甲寅张朝大将军", "乙卯万清大将军", "丙辰辛亚大将军", "丁巳杨彦大将军",
  "戊午黎卿大将军", "己未傅党大将军", "庚申毛梓大将军", "辛酉石政大将军", "壬戌洪充大将军", "癸亥虞程大将军"
];

// 灵签题库
const FORTUNE_STICKS = [
  {
    num: "第一签",
    numEn: "Stick No. 1",
    level: "上上大吉 · 顺势而飞",
    levelEn: "Top Fortune · Clear Skies Ahead",
    poem: "巍巍独步向云间，玉宇琼楼任往还。凡事若逢神道佑，清风明月一开颜。",
    meaning: "【别死磕，顺着风走】：眼下别去和死规定硬顶，找准缝隙顺着滑过去。你苦苦发愁的那件事，放低姿态别绷着，下周自然有转机。",
    enPoem: "Step into the open breeze; clear skies open through the trees. When you stop fighting the rock, the path appears.",
    enMeaning: "Taoist Reality: Stop banging your head against the wall. Step aside, take the easier route, and let things fall into place naturally."
  },
  {
    num: "第十二签",
    numEn: "Stick No. 12",
    level: "上吉 · 骑牛出关",
    levelEn: "Auspicious · The Old Sage Moves On",
    poem: "函谷关前紫气升，青牛西去道初生。莫愁前路无知己，一念清心万法明。",
    meaning: "【别纠结过去，翻篇】：老子骑着青牛出了函谷关，过去的事一笔勾销。手头这事别怕没人理解，把今天的每一步走实，剩下的时间会给你答案。",
    enPoem: "Riding the ox into the sunset, leave the noisy fortress behind. Clean hands, quiet head, the road is yours.",
    enMeaning: "Zen Reality: Yesterday's mess is already done. Tomorrow hasn't arrived. Close your eyes, breathe, and only handle the one task right in front of you."
  },
  {
    num: "第二十八签",
    numEn: "Stick No. 28",
    level: "中吉 · 歇脚养精",
    levelEn: "Health Fortune · Touch The Bronze Goat",
    poem: "古刹松阴岁月长，灵羊抚拭保身康。养精蓄锐循天理，自是家和百事祥。",
    meaning: "【身体在报警，先睡饱】：拼命不是透支。最近肠胃或腰椎已经在抗议了。今晚别熬夜刷手机，给家里长辈打个电话问候一声，心里踏实了，病痛自然退。",
    enPoem: "Beneath the pine, let the copper goat cool your fever. Sleep deeply tonight; you can't protect your family with a broken back.",
    enMeaning: "Confucian & Taoist Reality: Hard work is noble, but exhaustion is reckless. Go to bed on time, drink warm tea, and call your parents."
  },
  {
    num: "第三十六签",
    numEn: "Stick No. 36",
    level: "吉 · 浮生偷闲",
    levelEn: "Mind Ease · A Cup of Gaiwan Tea",
    poem: "竹径清风鸟语幽，盖碗新茶润笔喉。世间多少营营客，偷得浮生半日休。",
    meaning: "【天塌不下来，喝杯茶先】：满脑子都是做不完的工作和焦虑？地球离了你照样转。坐到竹椅子上，把这碗茉莉花茶喝透，半小时后回来，脑子比谁都清楚。",
    enPoem: "Green leaves shade the bamboo stool; steam rises from the porcelain bowl. The world can wait for thirty minutes.",
    enMeaning: "Chengdu Zen Reality: 90% of what you worry about never happens. Put your phone face-down, take three deep sips of hot tea, and reset."
  }
];

// 独角铜羊部位解构
const ZODIAC_PARTS = {
  ear: { animalZh: "子鼠之耳", animalEn: "Rat's Ear", benefitZh: "专治耳鸣、听力差。祈求脑子转得像老鼠一样快，听得懂弦外之音。", benefitEn: "Rub for ringing ears. Sharpens hearing and street-smarts." },
  nose: { animalZh: "丑牛之鼻", animalEn: "Ox's Nose", benefitZh: "专治鼻炎、换季鼻塞。祈求像老黄牛一样呼吸匀畅、底气十足。", benefitEn: "Rub for stuffy nose and sinus relief. Gives you steady stamina." },
  claw: { animalZh: "寅虎之爪", animalEn: "Tiger's Claw", benefitZh: "专治鼠标手、手腕腱鞘炎与老寒腿。祈求抓钱有力、手脚利索。", benefitEn: "Rub for mouse-wrist and joint pain. Keeps your grip strong." },
  back: { animalZh: "卯兔之背", animalEn: "Rabbit's Back", benefitZh: "专治办公室久坐腰酸背痛。祈求脊椎像兔子一样轻盈、跳得动路。", benefitEn: "Rub for lower-back stiffness from long desk hours." },
  horn: { animalZh: "辰龙之独角", animalEn: "Dragon's Single Horn", benefitZh: "全羊最亮部位！专治偏头痛、熬夜脑胀。祈求头脑清醒、出门高人一筹。", benefitEn: "The shiniest spot! Rub for headaches, migraines, and big career luck." },
  tail: { animalZh: "巳蛇之尾", animalEn: "Snake's Tail", benefitZh: "专治坐骨神经痛、腰间盘突出。祈求下半身灵活不僵硬。", benefitEn: "Rub for sciatica and hip aches. Keeps your spine flexible." },
  mouth: { animalZh: "午马之嘴", animalEn: "Horse's Mouth", benefitZh: "专治嗓子干哑、咽喉炎。祈求出门跟人打交道不吵架、话说得好听。", benefitEn: "Rub for sore throat and speech fatigue. Brings smooth talk." },
  beard: { animalZh: "未羊之须", animalEn: "Goat's Beard", benefitZh: "专治面部抽搐、法令纹疲惫。祈求脸上少点火气，活得长寿松弛。", benefitEn: "Rub for jaw clenching and facial fatigue. Brings long, peaceful life." },
  neck: { animalZh: "申猴之颈", animalEn: "Monkey's Neck", benefitZh: "专治低头看手机落枕、富贵包。祈求脖子转动灵活，别死脑筋。", benefitEn: "Rub for stiff neck from phone scrolling. Brings agile thinking." },
  eye: { animalZh: "酉鸡之眼", animalEn: "Rooster's Eye", benefitZh: "专治看电脑眼干、近视眼酸。祈求像大公鸡破晓一样两眼放光。", benefitEn: "Rub for dry eyes from screen fatigue. Clears eyesight." },
  belly: { animalZh: "戌狗之腹", animalEn: "Dog's Belly", benefitZh: "全场最热部位！专治胃胀、积食、拉肚子。祈求吃嘛嘛香、肠胃温乎。", benefitEn: "Crowd favorite! Rub the belly for stomach cramps and digestion." },
  hip: { animalZh: "亥猪之臀", animalEn: "Pig's Hip", benefitZh: "专治坐骨骨盆酸疼。祈求吃饱睡香、心宽体胖无烦恼。", benefitEn: "Rub for hip fatigue and pelvis ache. Symbol of wealth and good sleep." }
};

let currentSlide = 0;
const totalSlides = 7;

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  initPptDeck();
  initZodiacTool();
  initFortuneSticks();
  initGoatInteraction();
  initImageLightbox();
});

// 1. 语言切换
function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll("[data-set-lang]");
  const savedLang = localStorage.getItem("preferred_lang") || "bi";
  setLanguage(savedLang);

  langBtns.forEach(btn => {
    btn.onclick = () => {
      const targetLang = btn.getAttribute("data-set-lang");
      setLanguage(targetLang);
      localStorage.setItem("preferred_lang", targetLang);
    };
  });
}

function setLanguage(lang) {
  document.documentElement.setAttribute("data-lang", lang);
  const langBtns = document.querySelectorAll("[data-set-lang]");
  langBtns.forEach(btn => {
    if (btn.getAttribute("data-set-lang") === lang) {
      btn.className = "px-3 py-1 rounded-full bg-stone-900 text-white font-bold transition-all shadow-sm";
    } else {
      btn.className = "px-3 py-1 rounded-full text-stone-600 hover:text-stone-900 transition-all";
    }
  });
}

// 2. PPT 翻页功能
function initPptDeck() {
  const prevBtn = document.getElementById("ppt-prev-btn");
  const nextBtn = document.getElementById("ppt-next-btn");
  const dotsContainer = document.getElementById("ppt-dots");

  if (!prevBtn || !nextBtn || !dotsContainer) return;

  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.className = `h-2.5 rounded-full transition-all ${i === 0 ? 'bg-tao w-6' : 'bg-stone-300 w-2.5'}`;
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }

  prevBtn.onclick = () => goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  nextBtn.onclick = () => goToSlide((currentSlide + 1) % totalSlides);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    } else if (e.key === "ArrowRight") {
      goToSlide((currentSlide + 1) % totalSlides);
    }
  });

  const btnPpt = document.getElementById("btn-mode-ppt");
  const btnGrid = document.getElementById("btn-mode-grid");
  const pptView = document.getElementById("ppt-deck-view");
  const gridView = document.getElementById("grid-deck-view");

  if (btnPpt && btnGrid && pptView && gridView) {
    btnPpt.onclick = () => {
      pptView.classList.remove("hidden");
      gridView.classList.add("hidden");
      btnPpt.className = "px-3 py-1.5 rounded-lg bg-tao text-white font-medium flex items-center gap-1.5 shadow-sm";
      btnGrid.className = "px-3 py-1.5 rounded-lg text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1.5";
    };

    btnGrid.onclick = () => {
      gridView.classList.remove("hidden");
      pptView.classList.add("hidden");
      btnGrid.className = "px-3 py-1.5 rounded-lg bg-tao text-white font-medium flex items-center gap-1.5 shadow-sm";
      btnPpt.className = "px-3 py-1.5 rounded-lg text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1.5";
    };
  }
}

function goToSlide(index) {
  const slides = document.querySelectorAll(".ppt-slide");
  const dotsContainer = document.getElementById("ppt-dots");
  const counter = document.getElementById("ppt-counter");

  if (index < 0 || index >= slides.length) return;

  slides[currentSlide].classList.remove("active");
  if (dotsContainer && dotsContainer.children[currentSlide]) {
    dotsContainer.children[currentSlide].className = "w-2.5 h-2.5 rounded-full bg-stone-300 transition-all";
  }

  currentSlide = index;

  slides[currentSlide].classList.add("active");
  if (dotsContainer && dotsContainer.children[currentSlide]) {
    dotsContainer.children[currentSlide].className = "w-6 h-2.5 rounded-full bg-tao transition-all";
  }

  if (counter) {
    counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
  }
}

// 3. 年月日测生肖五行太岁工具
function initZodiacTool() {
  const calcBtn = document.getElementById("calc-zodiac-btn");
  const yearInput = document.getElementById("birth-year");
  const monthInput = document.getElementById("birth-month");
  const dayInput = document.getElementById("birth-day");
  const resultCard = document.getElementById("zodiac-result-card");

  if (!calcBtn || !yearInput) return;

  calcBtn.onclick = () => {
    const year = parseInt(yearInput.value.trim(), 10);
    const month = monthInput.value ? parseInt(monthInput.value.trim(), 10) : 1;
    const day = dayInput.value ? parseInt(dayInput.value.trim(), 10) : 1;

    if (isNaN(year) || year < 1900 || year > 2060) {
      alert("请输入 1900 ~ 2060 之间的有效年份 (Please enter a valid year)");
      return;
    }

    const offset = (year - 4) % 60;
    const tianganIdx = (year - 4) % 10;
    const dizhiIdx = (year - 4) % 12;

    const gan = TIANGAN[tianganIdx >= 0 ? tianganIdx : tianganIdx + 10];
    const zhi = DIZHI[dizhiIdx >= 0 ? dizhiIdx : dizhiIdx + 12];
    const ganZhi = gan + zhi;
    const zodiac = ZODIAC_ANIMALS[dizhiIdx >= 0 ? dizhiIdx : dizhiIdx + 12];
    const element = ELEMENT_MAP[gan];
    const taiSui = TAI_SUI_NAMES[offset >= 0 ? offset : offset + 60];

    document.getElementById("res-birth-date").textContent = `${year}年 ${month}月 ${day}日 (${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day})`;
    document.getElementById("res-zodiac-zh").textContent = `${zodiac.name} (${zodiac.desc})`;
    document.getElementById("res-zodiac-en").textContent = `Year of the ${zodiac.en}: ${zodiac.enDesc}`;
    
    const elemBadge = document.getElementById("res-element-badge");
    elemBadge.textContent = `${element.name} (${element.en})`;
    elemBadge.style.backgroundColor = element.color;

    document.getElementById("res-element-desc-zh").textContent = element.desc;
    document.getElementById("res-element-desc-en").textContent = element.enDesc;
    document.getElementById("res-ganzhi-name").textContent = `${ganZhi}年 (${ganZhi} Year)`;
    document.getElementById("res-taisui-guard").textContent = taiSui;

    resultCard.classList.remove("hidden");
  };
}

// 4. 摇签互动
function initFortuneSticks() {
  const shakeBtn = document.getElementById("shake-fortune-btn");
  const cup = document.getElementById("fortune-cup");
  const resultCard = document.getElementById("fortune-result-card");

  if (!shakeBtn || !cup || !resultCard) return;

  shakeBtn.onclick = () => {
    shakeBtn.disabled = true;
    shakeBtn.textContent = "诚心摇签中... / Shaking gently...";
    cup.classList.add("animating-shake");
    resultCard.classList.add("hidden");

    setTimeout(() => {
      cup.classList.remove("animating-shake");
      const randomIndex = Math.floor(Math.random() * FORTUNE_STICKS.length);
      const fortune = FORTUNE_STICKS[randomIndex];

      document.getElementById("fortune-num").textContent = `${fortune.num} · ${fortune.numEn}`;
      document.getElementById("fortune-level").textContent = `${fortune.level} (${fortune.levelEn})`;
      document.getElementById("fortune-poem").textContent = fortune.poem;
      document.getElementById("fortune-enpoem").textContent = fortune.enPoem;
      document.getElementById("fortune-meaning").textContent = fortune.meaning;
      document.getElementById("fortune-enmeaning").textContent = fortune.enMeaning;

      resultCard.classList.remove("hidden");

      shakeBtn.disabled = false;
      shakeBtn.textContent = "再次摇签求问 (Shake Again)";
    }, 900);
  };
}

// 5. 独角铜羊部位解构
function initGoatInteraction() {
  const badges = document.querySelectorAll(".zodiac-badge");
  const detailAnimalZh = document.getElementById("goat-part-animal-zh");
  const detailAnimalEn = document.getElementById("goat-part-animal-en");
  const detailBenefitZh = document.getElementById("goat-part-benefit-zh");
  const detailBenefitEn = document.getElementById("goat-part-benefit-en");

  badges.forEach(badge => {
    badge.onclick = () => {
      badges.forEach(b => b.classList.remove("active"));
      badge.classList.add("active");

      const partKey = badge.getAttribute("data-part");
      const info = ZODIAC_PARTS[partKey];
      if (info) {
        if (detailAnimalZh) detailAnimalZh.textContent = info.animalZh;
        if (detailAnimalEn) detailAnimalEn.textContent = info.animalEn;
        if (detailBenefitZh) detailBenefitZh.textContent = info.benefitZh;
        if (detailBenefitEn) detailBenefitEn.textContent = info.benefitEn;
      }
    };
  });
}

// 6. 图片灯箱全屏预览系统 (彻底解决小图看不全、手机端被截断问题)
function initImageLightbox() {
  let lightbox = document.getElementById("image-lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "image-lightbox";
    lightbox.innerHTML = `
      <div class="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
        <button id="lightbox-close-btn" class="absolute -top-10 right-0 text-white/80 hover:text-white text-2xl font-bold bg-black/40 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-colors">✕</button>
        <img id="lightbox-img" src="" alt="大图预览" class="rounded shadow-2xl">
        <p id="lightbox-caption" class="text-xs sm:text-sm text-stone-200 mt-2.5 text-center font-medium bg-black/60 px-3 py-1 rounded backdrop-blur-sm"></p>
      </div>
    `;
    document.body.appendChild(lightbox);

    const closeBtn = document.getElementById("lightbox-close-btn");
    closeBtn.onclick = () => lightbox.classList.remove("active");
    lightbox.onclick = (e) => {
      if (e.target === lightbox) lightbox.classList.remove("active");
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        lightbox.classList.remove("active");
      }
    });
  }

  const zoomImages = document.querySelectorAll(".photo-zoomable, .photo-card img, .slide-photo-frame img, .ritual-photo-frame img");
  zoomImages.forEach(img => {
    img.style.cursor = "zoom-in";
    img.onclick = (e) => {
      e.stopPropagation();
      const targetSrc = img.getAttribute("src");
      const altText = img.getAttribute("alt") || "青羊宫文化实景";
      const lightboxImg = document.getElementById("lightbox-img");
      const lightboxCaption = document.getElementById("lightbox-caption");
      if (lightboxImg && targetSrc) {
        lightboxImg.src = targetSrc;
        lightboxCaption.textContent = altText;
        lightbox.classList.add("active");
      }
    };
  });
}
