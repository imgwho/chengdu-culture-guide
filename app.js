/**
 * 锦官道与禅 - 交互核心逻辑
 */

// 1. 六十甲子与太岁神对照
const TIANGAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const DIZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const ELEMENT_MAP = {
  "甲": { name: "木", en: "Wood", color: "#2D5A3F", desc: "仁厚宽容，生机盎然。", enDesc: "Vitality, growth, and compassion." },
  "乙": { name: "木", en: "Wood", color: "#2D5A3F", desc: "柔韧通达，生生不息。", enDesc: "Flexibility and quiet resilience." },
  "丙": { name: "火", en: "Fire", color: "#B93826", desc: "热情似火，光明磊落。", enDesc: "Passion, clarity, and leadership." },
  "丁": { name: "火", en: "Fire", color: "#B93826", desc: "内心炽热，洞察幽微。", enDesc: "Inner warmth and deep intuition." },
  "戊": { name: "土", en: "Earth", color: "#8D6B3C", desc: "厚德载物，沉稳守信。", enDesc: "Stability, grounded trust, and reliability." },
  "己": { name: "土", en: "Earth", color: "#8D6B3C", desc: "温润包容，心思细腻。", enDesc: "Nurturing, thoughtful, and diplomatic." },
  "庚": { name: "金", en: "Metal", color: "#965A20", desc: "刚毅坚毅，重视义气。", enDesc: "Strength, integrity, and righteousness." },
  "辛": { name: "金", en: "Metal", color: "#965A20", desc: "晶莹剔透，追求精良。", enDesc: "Refinement, brilliance, and precision." },
  "壬": { name: "水", en: "Water", color: "#1E4E54", desc: "智者乐水，奔流不息。", enDesc: "Wisdom, free flow, and broad mind." },
  "癸": { name: "水", en: "Water", color: "#1E4E54", desc: "润物无声，灵性聪颖。", enDesc: "Gentle nourishment and quiet intuition." }
};

const ZODIAC_ANIMALS = [
  { name: "鼠", en: "Rat", desc: "机警聪颖、适应力强", enDesc: "Sharp, witty, resourceful" },
  { name: "牛", en: "Ox", desc: "勤勉踏实、坚韧可靠", enDesc: "Diligent, dependable, strong" },
  { name: "虎", en: "Tiger", desc: "勇毅威武、敢为人先", enDesc: "Brave, dynamic, confident" },
  { name: "兔", en: "Rabbit", desc: "温润优雅、平和敏捷", enDesc: "Gentle, peaceful, intuitive" },
  { name: "龙", en: "Dragon", desc: "胸怀广阔、尊贵吉祥", enDesc: "Noble, energetic, visionary" },
  { name: "蛇", en: "Snake", desc: "深思洞察、灵性敏锐", enDesc: "Wise, observant, graceful" },
  { name: "马", en: "Horse", desc: "豁达开朗、一往无前", enDesc: "Active, energetic, free-spirited" },
  { name: "羊", en: "Goat", desc: "慈和温良、祥和安泰", enDesc: "Gentle, compassionate, creative" },
  { name: "猴", en: "Monkey", desc: "灵巧变通、幽默敏捷", enDesc: "Inventive, curious, smart" },
  { name: "鸡", en: "Rooster", desc: "恪尽职守、守时守信", enDesc: "Punctual, hardworking, observant" },
  { name: "狗", en: "Dog", desc: "忠诚正直、守望相助", enDesc: "Loyal, honest, protective" },
  { name: "猪", en: "Pig", desc: "敦厚纯正、乐天知命", enDesc: "Generous, sincere, optimistic" }
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
    level: "上上大吉 · 混元乾坤",
    levelEn: "Greatest Fortune · Universal Harmony",
    poem: "巍巍独步向云间，玉宇琼楼任往还。凡事若逢神道佑，清风明月一开颜。",
    meaning: "大道坦途，顺应自然规律，不与万物争先而万物皆顺。心中所求之事，当如水般顺势而为，自能水到渠成。",
    enPoem: "Walk softly through mist and clouds; peace fills your heart as nature allows. When you flow like clear water, fortune greets you everywhere.",
    enMeaning: "Taoist Wisdom: Do not force things. Let events unfold in their natural rhythm, and success will come without friction."
  },
  {
    num: "第十二签",
    numEn: "Stick No. 12",
    level: "上吉 · 紫气东来",
    levelEn: "Auspicious · The Eastern Purple Mist",
    poem: "函谷关前紫气升，青牛西去道初生。莫愁前路无知己，一念清心万法明。",
    meaning: "老子出函谷之象。过去积累的智慧与底蕴正迎来转机，保持心念专注，不念过去、不畏将来。",
    enPoem: "Purple mist gathers as the ancient sage rides west. Keep your mind calm and quiet; the path ahead will reveal itself clearly.",
    enMeaning: "Zen Wisdom: When you enjoy the present journey and stay mindful, tomorrow's worries vanish on their own."
  },
  {
    num: "第二十八签",
    numEn: "Stick No. 28",
    level: "中吉 · 灵羊抚身",
    levelEn: "Fortune of Health · The Bronze Goat Blessing",
    poem: "古刹松阴岁月长，灵羊抚拭保身康。养精蓄锐循天理，自是家和百事祥。",
    meaning: "身心调适之吉。需注意作息平和与身体调理，善待父母家人。百善孝为先，身心同健则事业自顺。",
    enPoem: "Under ancient pines, touch the bronze goat for peace and health. Care for your body and respect your elders, and all will be well.",
    enMeaning: "Confucian & Taoist Balance: Work hard for your family, but never forget to rest your body and nourish your spirit."
  },
  {
    num: "第三十六签",
    numEn: "Stick No. 36",
    level: "吉 · 竹影煎茶",
    levelEn: "Peaceful Mind · Tea Beneath Bamboo",
    poem: "竹径清风鸟语幽，盖碗新茶润笔喉。世间多少营营客，偷得浮生半日休。",
    meaning: "放下焦躁，得闲饮茶。所虑之事多为自寻烦恼，不妨暂歇片刻，在成都式的慢生活中找到答案。",
    enPoem: "Green bamboo whispers as wild birds sing; hot tea soothes the tired mind. Why rush in a hurry? True clarity lives in quiet moments.",
    enMeaning: "Chengdu Zen: Pause. Take a breath, drink hot tea, and return to your challenges with an unclouded mind."
  }
];

// 独角铜羊部位解构
const ZODIAC_PARTS = {
  ear: { animalZh: "子鼠之耳", animalEn: "Rat's Ear", benefitZh: "祛耳鸣、聪耳开窍，祈求听觉敏锐，处世机敏通达。", benefitEn: "For clear hearing, sharp perception and adaptive wit." },
  nose: { animalZh: "丑牛之鼻", animalEn: "Ox's Nose", benefitZh: "祛鼻疾、呼吸顺畅，祈求勤勉踏实、身强力壮。", benefitEn: "For smooth breathing and the enduring strength of an ox." },
  claw: { animalZh: "寅虎之爪", animalEn: "Tiger's Claw", benefitZh: "祛手脚筋骨酸痛，祈求行动矫健威猛，避邪驱灾。", benefitEn: "Relieves muscle soreness and brings courageous vitality." },
  back: { animalZh: "卯兔之背", animalEn: "Rabbit's Back", benefitZh: "祛脊椎腰酸背痛，抚平劳累，祈求敏捷安宁。", benefitEn: "Eases back tension and brings peaceful flexibility." },
  horn: { animalZh: "辰龙之独角", animalEn: "Dragon's Single Horn", benefitZh: "独角贯顶，祛偏头痛，启发智慧灵性，步步高升。", benefitEn: "Clears headaches, inspires sharp wisdom and noble growth." },
  tail: { animalZh: "巳蛇之尾", animalEn: "Snake's Tail", benefitZh: "祛下肢腰疾，灵活自如，象征逢凶化吉与生机绵延。", benefitEn: "Promotes lower-body ease and continuous life renewal." },
  mouth: { animalZh: "午马之嘴", animalEn: "Horse's Mouth", benefitZh: "祛口舌咽喉之疾，祈求言谈广纳善缘、马到成功。", benefitEn: "Guards throat comfort and brings articulate success." },
  beard: { animalZh: "未羊之须", animalEn: "Goat's Beard", benefitZh: "祛面部风疾与疲惫，祈求温和慈悲、长寿安泰。", benefitEn: "Brings longevity, gentle kindness and peaceful mood." },
  neck: { animalZh: "申猴之颈", animalEn: "Monkey's Neck", benefitZh: "祛颈椎僵直不适，转动自如，寓意变通机灵。", benefitEn: "Relieves neck stiffness, encouraging flexible adaptability." },
  eye: { animalZh: "酉鸡之眼", animalEn: "Rooster's Eye", benefitZh: "祛目涩眼疾、明目开眼，破晓见光，明察秋毫。", benefitEn: "Brightens vision and sharpens observational clarity." },
  belly: { animalZh: "戌狗之腹", animalEn: "Dog's Belly", benefitZh: "摸羊腹祛脾胃虚寒与消化不畅，保胃气和顺（最受欢迎部位）。", benefitEn: "Most popular: rub the belly for digestive comfort and calm." },
  hip: { animalZh: "亥猪之臀", animalEn: "Pig's Hip", benefitZh: "祛骨盆与下半身酸困，寓意安泰丰盈、诸事圆满。", benefitEn: "Relieves physical fatigue, symbolizing wholesome fulfillment." }
};

// 全局状态
let currentSlide = 0;
const totalSlides = 7;

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  initPptDeck();
  initZodiacTool();
  initFortuneSticks();
  initGoatInteraction();
});

// 1. 语言切换
function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll("[data-set-lang]");
  const savedLang = localStorage.getItem("preferred_lang") || "bi";
  setLanguage(savedLang);

  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetLang = btn.getAttribute("data-set-lang");
      setLanguage(targetLang);
      localStorage.setItem("preferred_lang", targetLang);
    });
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

  // 动态创建 7 个圆点
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.className = `h-2.5 rounded-full transition-all ${i === 0 ? 'bg-tao w-6' : 'bg-stone-300 w-2.5'}`;
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  prevBtn.onclick = () => goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  nextBtn.onclick = () => goToSlide((currentSlide + 1) % totalSlides);

  // 键盘左右键支持
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    } else if (e.key === "ArrowRight") {
      goToSlide((currentSlide + 1) % totalSlides);
    }
  });

  // 视图切换（PPT vs 平铺）
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
    document.getElementById("res-zodiac-en").textContent = `Year of the ${zodiac.en} (${zodiac.enDesc})`;
    
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
