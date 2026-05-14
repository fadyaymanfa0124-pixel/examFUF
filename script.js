// ========== دوال المساعدة ==========
const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const trueFalseQuestions = (items) =>
  items.map(([text, correct, explanation = ""]) => ({
    type: "صح أو خطأ",
    text,
    answers: shuffleArray(["صح", "خطأ"]),
    correct: (correct === "صح" || correct === "صحيح") ? "صح" : "خطأ",
    explanation,
  }));

const choiceQuestions = (items) =>
  items.map(([text, answers, correct, explanation = ""]) => ({
    type: "اختيار من متعدد",
    text,
    answers: shuffleArray([...answers]),
    correct,
    explanation,
  }));

// ========== تعريف الأسئلة (الامتحان الأول والثاني) ==========
const firstTermTrueFalse = [
  ["يعتبر المحتوى التعليمي الرقمي مجرد نسخة إلكترونية تفاعلية من الكتب المدرسية التقليدية.", "غلط", "المحتوى الرقمي ليس مجرد كتاب، بل مزيج من المصادر والأنشطة التفاعلية."],
  ["خاصية 'إعادة الاستخدام' في المحتوى الرقمي تعني إمكانية تعديل المعلومة دون تغيير المحتوى بالكامل.", "غلط", "هذا تعريف 'التعديل'، أما إعادة الاستخدام فتعني استخدام العنصر في أكثر من مقرر."],
  ["ترتبط خاصية 'الترابطية' بشكل مباشر بمراعاة الفروق الفردية بين مستويات الطلاب.", "صح", "الترابطية تسمح بدمج عناصر تناسب كل المستويات."],
  ["المحتوى 'الديناميكي' هو الذي يتفاعل مع سلوك الطالب لتحقيق الكفاءة.", "صح", "الديناميكية تعني الاستجابة لتصرفات المتعلم."],
  ["الكتب الإلكترونية تفتقر لخاصية التغذية الراجعة الفورية مقارنة بالاختبارات الإلكترونية.", "غلط", "الكتب الإلكترونية المصممة جيداً توفر أنشطة تفاعلية ونتائج فورية."],
  ["المقالات التعليمية هي الوسيلة الأمثل لشرح التفاصيل المعقدة جداً والمطولة.", "غلط", "المقالات تقدم معلومات موجزة ومركزة، بينما المحتوى النصي العام أفضل للتفاصيل."],
  ["ترتيب الموضوعات في المدونات التعليمية يعتمد على الأهمية العلمية.", "غلط", "الترتيب يكون زمنياً (الأحدث أولاً)."],
  ["الفيديو التعليمي يتفوق على الكتاب في قدرته على 'تجسيد' المعلومة واقعياً.", "صح", "الكتاب 'يحكي' التجربة، والفيديو 'يجسدها'."],
  ["الرسومات المتحركة هي الأنسب لشرح العمليات التي تفتقر للحركة.", "غلط", "هي الأفضل لشرح العمليات التي تحتوي على خطوات وحركة."],
  ["خاصية 'التركيز' في الصور التعليمية تقلل المشتتات وتسليط الضوء على العناصر المهمة.", "صح", "الصورة تركز على جوهر الدرس."],
  ["التدوين الصوتي (Podcast) يتطلب اتصالاً دائمًا بالإنترنت.", "غلط", "يمكن تحميل الملفات واستماعها دون إنترنت."],
  ["التسجيلات الصوتية هي الوسيلة المثالية لتعلم اللغات والنطق الصحيح.", "صح", "تعتمد اللغات على السمع والنطق."],
  ["عنصر 'المنافسة' في الألعاب التعليمية يقتصر على التنافس بين الطلاب فقط.", "غلط", "يمكن أن تكون المنافسة مع النفس أو مع الكمبيوتر."],
  ["التغذية الراجعة في الألعاب التعليمية يجب أن تكون مؤجلة لنهاية اللعبة.", "غلط", "يجب أن تكون فورية لتصحيح المسار."],
  ["اختبارات NBA تعتمد على الشبكة، بينما CBA تعمل بدون إنترنت.", "صح", "NBA = Network Based, CBA = Computer Based."],
  ["الاختبارات القصيرة (Quizzes) تقيس فهم الطالب للمنهج كاملاً.", "غلط", "تقيس أجزاء صغيرة ومحددة."],
  ["من مميزات الاختبارات الإلكترونية توفير تكلفة الطباعة والمخازن.", "صح", "التحول الرقمي يقلل التكاليف الورقية والمادية."],
  ["Google Drive هو أداة لكتابة النصوص بشكل تعاوني.", "غلط", "هو مخزن سحابي، أما Google Docs فمخصص للنصوص."],
  ["Google Forms يمكنه تحويل نتائج الاختبارات إلى جداول Excel تلقائياً.", "صح", "تكامل تطبيقات جوجل يسمح بذلك."],
  ["تطبيق 'بريليانت' يركز على تعلم اللغات.", "غلط", "يركز على STEM (رياضيات وعلوم)."],
  ["المحتوى 'النشط' يعتمد على المشاركة والتفاعل، وليس مجرد العرض الرقمي.", "صح", "مثل المعامل الافتراضية."],
  ["المحتوى 'المهني' يركز على مهارات العمل كالبرمجة والتسويق.", "صح", "يختلف عن المحتوى الأكاديمي النظري."],
  ["خاصية 'الاستقلالية' تعني أن كل جزئية مرتبطة بما قبلها.", "غلط", "الاستقلالية تعني أن الجزئية واضحة ومستقلة بذاتها."],
  ["النماذج الجذابة وسهولة التنقل من جوهر تصميم المحتوى الرقمي.", "صح", "التصميم الجذاب يسهل الاستخدام."],
  ["المصداقية من مميزات التسجيلات الصوتية لنقل الأحداث بأصوات أصحابها.", "صح", "الصوت الأصلي يمنح الثقة."],
];

const firstTermChoice = [
  ["العملية التي يتم فيها بناء المعرفة بشكل منظم من السهل إلى الصعب تسمى خاصية:", ["الترابطية", "الاستقلالية", "التحجيم", "التخصيص"], "التحجيم", "التحجيم يشبه السلم في التسلسل."],
  ["جوهر عملية تصميم المحتوى الرقمي هو:", ["تحويل الكتب الورقية إلى PDF", "دمج المادة العلمية مع التكنولوجيا الرقمية", "توفير إنترنت سريع", "الاستغناء عن المعلم"], "دمج المادة العلمية مع التكنولوجيا الرقمية", "التصميم هو دمج المحتوى مع التقنية."],
  ["استخدام فيديو تعليمي واحد في ثلاثة مقررات يطبق خاصية:", ["القابلية للتعلم", "الاستدامة", "إعادة الاستخدام", "العمل على منصات مختلفة"], "إعادة الاستخدام", "استخدام العنصر نفسه في أكثر من مكان."],
  ["قدرة المحتوى على العمل على Android و iOS و Windows تعبر عن:", ["قابلية الاستخدام", "العمل على منصات مختلفة", "الثبات", "الديناميكية"], "العمل على منصات مختلفة", "الوصول من أي جهاز."],
  ["الروابط الفائقة في الكتب الإلكترونية تهدف إلى:", ["تقليل المساحة", "توفير تغذية راجعة", "التنقل السريع", "النشر السريع"], "التنقل السريع", "Hyperlinks لملاحة داخلية."],
  ["الميزة التي تجعل المدونات تتفوق في التواصل الاجتماعي هي:", ["الروابط الدائمة", "الأرشفة", "التعليق والنقاش", "سهولة النشر"], "التعليق والنقاش", "التواصل عبر التعليقات."],
  ["الوسيلة التي تحول المفاهيم المجردة إلى ملموسة وجذابة:", ["المقالات", "الصور الثابتة", "الرسومات المتحركة", "البودكاست"], "الرسومات المتحركة", "الرسوم المتحركة تبسط الصعب."],
  ["قدرة المعلم على تكبير الخلية النباتية تندرج تحت ميزة:", ["الواقعية", "التركيز", "التحكم في الحجم", "تقريب المسافات"], "التحكم في الحجم", "رؤية التفاصيل الدقيقة."],
  ["الإذاعة الرقمية التي تنشر ملفات صوتية مضغوطة تسمى:", ["تسجيلات صوتية", "بودكاست", "موسيقى هادفة", "مدونات"], "بودكاست", "Podcast = إذاعة رقمية."],
  ["نصيحة لاستخدام الصوت الناجح في التعليم:", ["استخدامه للغات فقط", "منع النقاش", "تهيئة مكان هادئ", "الاعتماد على السماع العابر"], "تهيئة مكان هادئ", "التركيز مطلوب."],
  ["بيئة آمنة لتجارب كيميائية خطيرة هي ميزة:", ["فيديو", "ألعاب/معامل افتراضية", "صور", "كتب"], "ألعاب/معامل افتراضية", "تجربة بلا خطر."],
  ["عنصر التحدي في اللعبة التعليمية يعني:", ["صعوبة بالغة", "سهولة مفرطة", "إثارة الذكاء بمستوى متوازن", "اعتماد على الحظ"], "إثارة الذكاء بمستوى متوازن", "توازن بين الصعوبة والمتعة."],
  ["مراعاة 'الفئة المستهدفة' عند اختيار لعبة تعني:", ["وضوح العنوان", "مناسبة اللعبة لسن وذكاء الطلاب", "وجود دليل", "دعم فني"], "مناسبة اللعبة لسن وذكاء الطلاب", "مراعاة الفروق الفردية."],
  ["اختبارات الميدتيرم الخاضعة لقوانين صارمة تسمى:", ["Quizzes", "NBA", "اختبارات رسمية", "CBA"], "اختبارات رسمية", "مقيدة بوقت وقوانين."],
  ["ميزة 'تعدد الوسائط' في الاختبارات الإلكترونية تعني:", ["أداء الامتحان من البيت", "أسئلة تعتمد على فيديو أو صوت", "تصحيح آلي", "إرسال النتائج للأهل"], "أسئلة تعتمد على فيديو أو صوت", "دمج الوسائط المتعددة."],
  ["تطبيق جوجل لعمل خرائط ذهنية هو:", ["Sheets", "Drawings", "Slides", "Drive"], "Drawings", "أداة الرسم للمخططات."],
  ["الميزة الأساسية في Google Docs للعمل الجماعي:", ["السرعة", "التعاون والتشارك", "المساحة الصغيرة", "الأرشفة"], "التعاون والتشارك", "عمل أكثر من مستخدم معاً."],
  ["فكرة Quizlet الأساسية تعتمد على:", ["محاضرات مسجلة", "بطاقات تعليمية (Flashcards)", "نطق اللغات", "ألغاز رياضيات"], "بطاقات تعليمية (Flashcards)", "حفظ عبر البطاقات."],
  ["المعامل الافتراضية تصنف ضمن المحتوى:", ["تقليدي", "أكاديمي صرف", "نشط (تفاعلي)", "مسموع"], "نشط (تفاعلي)", "التجريب والتفاعل."],
  ["المحتوى الذي يهدف للتثقيف في قالب مسلٍ يسمى:", ["مهني", "أكاديمي", "تعليمي ترفيهي", "ديناميكي"], "تعليمي ترفيهي", "Edutainment."],
  ["خاصية الثبات والاستدامة تعني:", ["لا يتغير أبداً", "يعيش طويلاً ويتجدد", "يعمل على أجهزة قديمة", "خاص بالمعلم"], "يعيش طويلاً ويتجدد", "البقاء مع التجديد."],
  ["ميزة التطبيقات التعليمية الأساسية:", ["وصول لأي وقت وأي مكان", "تكلفة عالية", "حاجة لخبراء برمجة", "اقتصار على النص"], "وصول لأي وقت وأي مكان", "مرونة زمانية مكانية."],
  ["أهمية LMS و LCMS في التدريس الحديث:", ["الاستغناء عن المعلم", "مساعدة المعلم دون حاجة لخبرة برمجية", "اعتماد على الورق", "تقليل التفاعل"], "مساعدة المعلم دون حاجة لخبرة برمجية", "تسهيل الإدارة."],
  ["'المحتوى الرقمي قلب التعليم الإلكتروني' تشير إلى:", ["مفهومه العام", "خصائصه التقنية", "أنواع وسائطه", "عيوبه"], "مفهومه العام", "محورية المحتوى."],
  ["الفرق بين المحتوى المقروء والمرئي:", ["المقروء بلا رسوم", "المرئي أسرع جذباً وتبسيطاً", "المقروء لا يتحدّث", "المرئي لا يحتاج إنترنت"], "المرئي أسرع جذباً وتبسيطاً", "الجاذبية البصرية."],
];

const secondTermTrueFalse = [
  ["نظم إدارة التعلم (LMS) هي المسؤول الأول عن تأليف كائنات التعلم.", "غلط", "التأليف وظيفة LCMS."],
  ["LCMS يهدف لخدمة المتعلم بشكل مباشر وليس المطورين.", "غلط", "LCMS يستهدف المطورين."],
  ["Moodle نظام تجاري مغلق يحتاج رخصة.", "غلط", "مودل مفتوح المصدر."],
  ["CMS (نظام إدارة المقرر) يهتم بالمادة العلمية فقط وليس الجداول.", "غلط", "يدير المادة ومواعيد الدروس."],
  ["خاصية 'التعاون' تسمح للمعلمين بمشاركة المحتوى وتطويره.", "صح", "تعاون المطورين والمعلمين."],
  ["التكلفة العالية هي العائق الرئيسي للأنظمة مفتوحة المصدر.", "غلط", "مفتوحة المصدر غالباً مجانية."],
  ["سكوليرا تجمع الأدوات الإدارية والتعليمية في منصة واحدة.", "صح", "نظام شامل."],
  ["تتبع المسار (Tracking) يمكن المعلم من معرفة وقت دراسة الطالب.", "صح", "مراقبة السلوك الأكاديمي."],
  ["SMS يهتم بالدرجات فقط ولا يتدخل في الشؤون المالية.", "غلط", "يدير المال والمديونيات أيضاً."],
  ["صعوبة تغيير قناعات المعلمين هي معوق تقني.", "غلط", "معوق بشري/ثقافي."],
  ["LMS لا يشترط وجود واجهة رسومية (GUI).", "غلط", "الواجهة أساسية."],
  ["الأنظمة التجارية تتميز بدعم فني وتحديثات دورية.", "صح", "سبب شرائها."],
  ["إدارة المستخدمين تقتصر على تسجيل الطلاب الجدد.", "غلط", "تشمل صلاحيات وبيانات المعلمين."],
  ["LCMS يعمل كمستودع مركزي لكائنات التعلم.", "صح", "قلب إدارة المحتوى."],
  ["تحفيز الطلاب بالأوسمة (Badges) هو تطبيق لـ Gamification.", "صح", "تشجيع تنافسي."],
  ["LMS يسمح فقط بالتعلم المتزامن.", "غلط", "يسمح بالمتزامن وغير المتزامن."],
  ["يمكن لـ LMS إرسال تنبيهات SMS لأولياء الأمور.", "صح", "تواصل متكامل."],
  ["LCMS يمتلك القدرة على تتبع نتائج الطلاب.", "غلط", "التتبع وظيفة LMS."],
  ["الخصوصية ليست مشكلة في LMS لأن البيانات مشفرة.", "غلط", "الخصوصية تحدي دائم."],
  ["LCMS يسمح لأكثر من مصمم بالعمل على نفس الكائن.", "صح", "تشارك في التأليف."],
  ["LMS مثل المطعم والمحتوى مثل الأكل.", "صح", "تشبيه دقيق."],
  ["اللغة عائق إذا كان النظام يدعم الإنجليزية فقط.", "صح", "صعوبة لغير الناطقين."],
  ["تقارير LMS تهدف فقط لمعرفة الناجح والراسب.", "غلط", "تحليل أداء وفجوات."],
  ["Canvas هو نظام LCMS.", "غلط", "Canvas هو LMS."],
  ["إدارة البنية تشمل جداول الحصص.", "صح", "بنية تنظيمية."],
];

const secondTermChoice = [
  ["المصطلح الذي يمثل الوعاء الذي تدار منه العملية التعليمية:", ["SMS", "LMS", "LCMS", "CMS"], "LMS", "إدارة المسارات والطلاب."],
  ["الفرق الجوهري بين LCMS و LMS هو:", ["رصد الغياب", "تركيز LCMS على إنشاء المحتوى", "كونه مجانياً", "اعتماده على التواصل"], "تركيز LCMS على إنشاء المحتوى", "C للمحتوى."],
  ["المكون المسؤول عن تخزين المادة العلمية والبيانات هو:", ["واجهة المستخدم", "قاعدة البيانات", "أداة التأليف", "تطبيق الجوال"], "قاعدة البيانات", "بدونها لا حفظ."],
  ["Blackboard يصنف ضمن الأنظمة:", ["مفتوحة المصدر", "مجانية", "تجارية (مغلقة)", "إدارة محتوى فقط"], "تجارية (مغلقة)", "يتطلب تراخيص."],
  ["ليس من وظائف LMS:", ["التسجيل", "الجدولة", "تأليف كائنات التعلم", "التقييم"], "تأليف كائنات التعلم", "التأليف لـ LCMS."],
  ["تخصيص التعلم (Personalization) يعني:", ["جعل النظام بالعربية", "تقديم محتوى يتناسب مع كل طالب", "إغلاق النظام", "تقليل عدد الطلاب"], "تقديم محتوى يتناسب مع كل طالب", "ملاءمة لمستوى الفرد."],
  ["SMS يركز على الجانب:", ["الأكاديمي", "الإداري والمالي وبيانات الطالب", "تصميم الفيديو", "التواصل مع المعلمين"], "الإداري والمالي وبيانات الطالب", "سجل شامل."],
  ["عائق بنية تحتية لتطبيق LMS:", ["نقص تدريب المعلمين", "ضعف سرعة الإنترنت والأجهزة", "عدم الرغبة في التغيير", "جودة المادة"], "ضعف سرعة الإنترنت والأجهزة", "عتاد واتصالات."],
  ["كائن التعلم (Learning Object) وحدة أساسية في نظام:", ["SMS", "LCMS", "GPS", "Windows"], "LCMS", "قابل لإعادة الاستخدام."],
  ["التوسع (Scalability) في سكوليرا يعني:", ["زيادة حجم الشاشة", "استيعاب عدد أكبر مستقبلاً", "زيادة ساعات الدراسة", "إجبار الطلاب"], "استيعاب عدد أكبر مستقبلاً", "قدرة النمو."],
  ["أداة تساعد في بناء خطة الدروس في سكوليرا:", ["الشؤون المالية", "أدوات التعليم والتعلم", "إدارة البنية", "نظام الامتحانات"], "أدوات التعليم والتعلم", "جزء تربوي."],
  ["كون LMS مركزاً للعملية التعليمية يعني:", ["مكان واحد", "جمع كل الأنشطة والمصادر في واجهة واحدة", "لا يعمل إلا بإنترنت قوي", "مخصص للمدير"], "جمع كل الأنشطة والمصادر في واجهة واحدة", "نقطة تجمع."],
  ["فائدة أرشفة المقررات في LMS:", ["حذف القديم", "الرجوع إليها مستقبلاً", "تقليل السرعة", "منع الغش"], "الرجوع إليها مستقبلاً", "ذاكرة طويلة الأمد."],
  ["CMS التقليدي يختلف عن LCMS التعليمي في أنه:", ["لا يدعم الصور", "مخصص للمحتوى العام وليس تعليمياً", "أغلى", "يحتاج مبرمجين"], "مخصص للمحتوى العام وليس تعليمياً", "مثل ووردبريس."],
  ["الدعم الفني لضمان نجاح LMS يعني:", ["رواتب المعلمين", "فريق يحل المشكلات التقنية", "أجهزة جديدة", "شرح الدروس"], "فريق يحل المشكلات التقنية", "مسعف تقني."],
  ["تصحيح الاختبار فورياً وإرسال النتيجة هي وظيفة:", ["إدارية", "تقييمية (LMS)", "تأليفية", "مالية"], "تقييمية (LMS)", "جوهر LMS للمتعلم."],
  ["من الأدوات الإدارية في سكوليرا:", ["تحفيز الطلاب", "مشاركة المحتوى", "التحكم في الفصول وجداول الحصص", "حل الواجبات"], "التحكم في الفصول وجداول الحصص", "تنظيم إداري."],
  ["المستهدفون من LMS هم:", ["المصممون", "المتعلمون", "المبرمجون", "الشركات"], "المتعلمون", "مصمم للطالب."],
  ["LMS موزع للمحتوى، و LCMS هو:", ["مستقبل", "مصنع للمحتوى", "معارض", "ناقد"], "مصنع للمحتوى", "مكان الصنع."],
  ["سهولة الاستخدام تعني:", ["ألعاب كثيرة", "فهم بدون تدريب معقد", "بدون كلمة مرور", "للأطفال فقط"], "فهم بدون تدريب معقد", "واجهة بسيطة."],
  ["الحاجة لتدريب مستمر بسبب:", ["كثرة الأعطال", "التطور السريع للتقنيات", "نسيان المعلمين", "رغبة الطلاب"], "التطور السريع للتقنيات", "التكنولوجيا متغيرة."],
  ["ميزة التقويم (Calendar) في LMS تهدف إلى:", ["حساب العمر", "تنظيم مواعيد التسليمات والاختبارات", "عرض صور المعلمين", "تسجيل الغياب"], "تنظيم مواعيد التسليمات والاختبارات", "خارطة طريق زمنية."],
  ["سكوليرا متاح على منصات:", ["ويندوز فقط", "Android و iOS", "تلفزيونات", "ورق"], "Android و iOS", "تطبيق جوال."],
  ["أكثر الأنظمة شمولاً لتغطية حياة الطالب المدرسية:", ["LMS", "LCMS", "SMS", "CMS"], "SMS", "ملف شامل صحي ومالي وأكاديمي."],
  ["التغذية الراجعة تكون فعالة أكثر لأنها:", ["مكتوبة بخط اليد", "فورية ومباشرة", "سرية", "تعتمد على العقاب"], "فورية ومباشرة", "سرعة تصحيح الخطأ."],
];

// ========== تجميع الامتحانات ==========
const exams = {
  certificateTest: {
    title: "تجربة الشهادة",
    certificateLabel: "تجربة الشهادة",
    questions: [
      {
        type: "سؤال تجريبي",
        text: "اختار الإجابة الصحيحة لتحصل على 100% وتفتح الشهادة.",
        answers: ["الإجابة الصحيحة", "خيار خطأ", "خيار خطأ آخر", "مش دي"],
        correct: "الإجابة الصحيحة",
        explanation: "سؤال تجريبي، الإجابة الصحيحة هي 'الإجابة الصحيحة'.",
      },
    ],
  },
  web: {
    title: "امتحان الفصل الأول - المحتوى الرقمي",
    certificateLabel: "امتحان الفصل الأول",
    questions: [...trueFalseQuestions(firstTermTrueFalse), ...choiceQuestions(firstTermChoice)],
  },
  general: {
    title: "امتحان الفصل الثاني - نظم إدارة التعلم",
    certificateLabel: "امتحان الفصل الثاني",
    questions: [...trueFalseQuestions(secondTermTrueFalse), ...choiceQuestions(secondTermChoice)],
  },
};

// ========== إضافة تحسينات جمالية وأنيميشن عبر JS ==========
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  /* أنيميشن الانتقال بين الأسئلة */
  .question-area {
    animation: fadeSlide 0.3s ease-out;
  }
  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
  /* أنيميشن ظهور الخيارات */
  .option-btn {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .option-btn:hover:not(:disabled) {
    transform: translateX(-5px);
    box-shadow: 0 2px 8px rgba(59,130,246,0.3);
  }
  /* أنيميشن للفييدباك */
  .feedback-msg {
    animation: fadeScale 0.25s ease-out;
  }
  @keyframes fadeScale {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  /* تحسين شكل الأزرار */
  .btn-primary, .btn-secondary, .btn-outline {
    transition: all 0.2s;
  }
  .btn-primary:hover, .btn-secondary:hover, .btn-outline:hover {
    transform: translateY(-2px);
  }
  /* شريط التقدم مع تأثير */
  .progress-fill {
    transition: width 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
  }
  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }
  /* تأثير نبض للشهادة */
  .certificate-screen:not(.hidden) .btn-primary {
    animation: softGlow 1.2s infinite alternate;
  }
  @keyframes softGlow {
    from { box-shadow: 0 0 5px #10b981; }
    to { box-shadow: 0 0 18px #10b981; }
  }
  /* أنيميشن ظهور النتيجة */
  .results-panel {
    animation: fadeUp 0.4s ease;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

// ========== عناصر DOM ==========
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const sideScreen = document.getElementById('side-screen');
const certScreen = document.getElementById('certificate-screen');
const homeIcon = document.getElementById('home-icon');
const restartBtn = document.getElementById('restart-quiz');
const prevBtn = document.getElementById('prev-question');
const nextBtn = document.getElementById('next-question');
const explanationTrigger = document.getElementById('explanation-trigger');
const questionTextEl = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const feedbackMsg = document.getElementById('feedback-msg');
const qTypeLabel = document.getElementById('q-type-label');
const scoreValue = document.getElementById('score-value');
const questionCounter = document.getElementById('question-counter');
const progressFill = document.getElementById('progress-fill');
const answeredCounter = document.getElementById('answered-counter');
const correctCounter = document.getElementById('correct-counter');
const quizTitle = document.getElementById('quiz-title');
const studentFullname = document.getElementById('student-fullname');
const downloadCertBtn = document.getElementById('download-certificate-btn');
const startTotal = document.getElementById('start-total-questions');

let current = 0, score = 0, answered = false;
let selectedExam = exams.certificateTest;
let questions = selectedExam.questions;
let userAnswers = Array(questions.length).fill(null);
let autoTimeout = null;
let explanationDiv = null;

function createExplanationDiv() {
  if (explanationDiv) return;
  explanationDiv = document.createElement('div');
  explanationDiv.id = 'dynamic-explanation';
  explanationDiv.style.marginTop = '0.8rem';
  explanationDiv.style.padding = '0.6rem';
  explanationDiv.style.background = '#1f2937';
  explanationDiv.style.border = '1px solid #374151';
  explanationDiv.style.borderRadius = '0.75rem';
  explanationDiv.style.fontSize = '0.85rem';
  explanationDiv.style.color = '#9ca3af';
  explanationDiv.style.display = 'none';
  optionsList.parentNode.insertBefore(explanationDiv, optionsList.nextSibling);
}

function showExplanation(text) {
  if (!explanationDiv) createExplanationDiv();
  explanationDiv.textContent = text || 'لا يوجد شرح.';
  explanationDiv.style.display = 'block';
}

function hideExplanation() { if (explanationDiv) explanationDiv.style.display = 'none'; }

explanationTrigger.addEventListener('click', () => {
  const q = questions[current];
  showExplanation(q.explanation || 'لا يوجد شرح مخصص لهذا السؤال.');
});

function renderQuestion() {
  if (autoTimeout) clearTimeout(autoTimeout);
  const item = questions[current];
  const saved = userAnswers[current];
  answered = saved !== null;
  feedbackMsg.textContent = '';
  feedbackMsg.className = 'feedback-msg';
  // تمكين/تعطيل الأزرار حسب الحالة
  nextBtn.disabled = !answered;
  prevBtn.disabled = (current === 0);
  nextBtn.textContent = (current === questions.length - 1) ? 'عرض النتيجة' : 'التالي';
  
  questionTextEl.textContent = item.text;
  qTypeLabel.textContent = item.type;
  questionCounter.textContent = `السؤال ${current + 1} من ${questions.length}`;
  updateScore();
  updateProgress();
  answeredCounter.textContent = userAnswers.filter(a => a !== null).length;
  correctCounter.textContent = score;

  optionsList.innerHTML = '';
  item.answers.forEach(ans => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = ans;
    btn.addEventListener('click', () => lockAnswer(ans));
    optionsList.appendChild(btn);
  });

  hideExplanation();
  if (answered) showSavedAnswer(saved);
  // إضافة أنيميشن للانتقال (عن طريق إعادة تشغيل الأنيميشن)
  const qArea = document.querySelector('.question-area');
  if (qArea) {
    qArea.style.animation = 'none';
    setTimeout(() => { qArea.style.animation = 'fadeSlide 0.3s ease-out'; }, 10);
  }
}

function lockAnswer(selected) {
  if (answered) return;
  const item = questions[current];
  const buttons = [...document.querySelectorAll('.option-btn')];
  const isCorrect = (selected === item.correct);
  answered = true;
  userAnswers[current] = selected;
  if (isCorrect) {
    score++;
    feedbackMsg.textContent = 'إجابة صحيحة';
    feedbackMsg.classList.add('good');
  } else {
    feedbackMsg.textContent = `خطأ. الإجابة الصحيحة: ${item.correct}`;
    feedbackMsg.classList.add('bad');
  }
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === item.correct) btn.classList.add('correct');
    else if (btn.textContent === selected) btn.classList.add('wrong');
  });
  updateScore();
  answeredCounter.textContent = userAnswers.filter(a => a !== null).length;
  correctCounter.textContent = score;
  updateProgress();
  nextBtn.disabled = false;
  if (autoTimeout) clearTimeout(autoTimeout);
  autoTimeout = setTimeout(() => {
    if (current < questions.length - 1) {
      current++;
      renderQuestion();
    } else {
      showFinalResult();
    }
  }, 800);
}

function showSavedAnswer(saved) {
  const item = questions[current];
  const buttons = [...document.querySelectorAll('.option-btn')];
  const isCorrect = (saved === item.correct);
  feedbackMsg.textContent = isCorrect ? 'صحيح' : `خطأ. الصواب: ${item.correct}`;
  feedbackMsg.classList.add(isCorrect ? 'good' : 'bad');
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === item.correct) btn.classList.add('correct');
    else if (btn.textContent === saved) btn.classList.add('wrong');
  });
}

function updateScore() {
  scoreValue.textContent = `${score} نقطة`;
}

function updateProgress() {
  const perc = Math.round((userAnswers.filter(a => a !== null).length / questions.length) * 100);
  progressFill.style.width = `${perc}%`;
}

function showFinalResult() {
  const percentage = Math.round((score / questions.length) * 100);
  const wrongList = [];
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] && userAnswers[i] !== questions[i].correct) {
      wrongList.push({
        num: i + 1,
        text: questions[i].text,
        user: userAnswers[i],
        correct: questions[i].correct
      });
    }
  }

  quizScreen.classList.add('hidden');
  sideScreen.classList.add('hidden');
  sideScreen.style.display = 'none';

  let resultsPanel = document.getElementById('results-panel');
  if (!resultsPanel) {
    resultsPanel = document.createElement('div');
    resultsPanel.id = 'results-panel';
    resultsPanel.className = 'results-panel';
    document.querySelector('.app-container').appendChild(resultsPanel);
  }
  resultsPanel.innerHTML = `
    <div class="results-header">
      <div class="badge">النتيجة النهائية</div>
      <div class="results-percent">${percentage}%</div>
      <p>${score} من ${questions.length} إجابات صحيحة</p>
      <button id="retryBtn" class="btn-primary" style="margin-top:0.5rem;">⟳ إعادة المحاولة</button>
      <button id="homeFromResults" class="btn-secondary" style="margin-top:0.5rem;">الرئيسية</button>
    </div>
    ${wrongList.length === 0 ? '<p style="text-align:center; color:#10b981;">ممتاز! لا توجد أخطاء.</p>' :
      `<h4 style="margin:1rem 0 0.5rem;">الأخطاء (${wrongList.length})</h4><div class="wrong-list">` +
      wrongList.map(w => `
        <div class="wrong-item">
          <strong>${w.num}.</strong> ${w.text}<br>
          <small>إجابتك: <span style="color:#ef4444;">${w.user}</span> | الصواب: <span style="color:#10b981;">${w.correct}</span></small>
        </div>
      `).join('') + `</div>`
    }
  `;
  resultsPanel.style.display = 'block';

  document.getElementById('retryBtn').onclick = () => {
    resultsPanel.style.display = 'none';
    startExam(Object.keys(exams).find(k => exams[k] === selectedExam));
  };
  document.getElementById('homeFromResults').onclick = () => {
    resultsPanel.style.display = 'none';
    startScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');
    sideScreen.classList.add('hidden');
    sideScreen.style.display = 'none';
    certScreen.classList.add('hidden');
  };

  if (percentage >= 90 && selectedExam.certificateLabel) {
    certScreen.classList.remove('hidden');
  } else {
    certScreen.classList.add('hidden');
  }
}

function startExam(examKey) {
  if (autoTimeout) clearTimeout(autoTimeout);
  if (!exams[examKey]) {
    alert('هذا الامتحان غير متوفر حالياً.');
    return;
  }
  selectedExam = exams[examKey];
  questions = selectedExam.questions;
  userAnswers = Array(questions.length).fill(null);
  current = 0;
  score = 0;
  quizTitle.textContent = selectedExam.title;
  certScreen.classList.add('hidden');
  studentFullname.value = '';
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  sideScreen.classList.remove('hidden');
  sideScreen.style.display = 'flex';
  const rp = document.getElementById('results-panel');
  if (rp) rp.style.display = 'none';
  renderQuestion();
}

// إخفاء العداد في البداية
sideScreen.style.display = 'none';

// ========== أحداث الأزرار ==========
homeIcon.addEventListener('click', () => {
  if (autoTimeout) clearTimeout(autoTimeout);
  startScreen.classList.remove('hidden');
  quizScreen.classList.add('hidden');
  sideScreen.classList.add('hidden');
  sideScreen.style.display = 'none';
  certScreen.classList.add('hidden');
  const rp = document.getElementById('results-panel');
  if (rp) rp.style.display = 'none';
});

restartBtn.addEventListener('click', () => {
  if (autoTimeout) clearTimeout(autoTimeout);
  userAnswers = Array(questions.length).fill(null);
  current = 0;
  score = 0;
  answered = false;
  renderQuestion();
});

nextBtn.addEventListener('click', () => {
  if (autoTimeout) clearTimeout(autoTimeout);
  // التأكد من أنه تم الإجابة على السؤال الحالي
  if (!answered) {
    // لا يسمح بالانتقال دون إجابة
    return;
  }
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showFinalResult();
  }
});

prevBtn.addEventListener('click', () => {
  if (autoTimeout) clearTimeout(autoTimeout);
  if (current === 0) return;
  current--;
  renderQuestion();
});

// ربط أزرار الامتحانات
document.querySelectorAll('.exam-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const examKey = btn.dataset.exam;
    if (examKey === 'psychMedium' || examKey === 'psychHard') {
      alert('هذا الامتحان غير متوفر حالياً.');
      return;
    }
    if (examKey && exams[examKey]) startExam(examKey);
    else alert('هذا الامتحان غير متوفر حالياً.');
  });
});

document.querySelectorAll('.demo-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const pwd = prompt('كلمة المرور للامتحان التجريبي:');
    if (pwd === btn.dataset.password) startExam(btn.dataset.exam);
    else alert('كلمة المرور غير صحيحة');
  });
});

// ========== كود الشهادة الأصلي (يعمل 100%) ==========
function fitNameFontSize(ctx, name, maxWidth) {
  let size = 86;
  while (size > 44) {
    ctx.font = `900 ${size}px Cairo, Tahoma, Arial, sans-serif`;
    if (ctx.measureText(name).width <= maxWidth) return size;
    size -= 4;
  }
  return size;
}

function drawStudentName(ctx, name) {
  const centerX = 1988;
  const baselineY = 872;
  const maxWidth = 720;
  ctx.save();
  ctx.direction = "rtl";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#2f5689";
  ctx.font = `900 ${fitNameFontSize(ctx, name, maxWidth)}px Cairo, Tahoma, Arial, sans-serif`;
  ctx.fillText(name, centerX, baselineY, maxWidth);
  ctx.restore();
}

downloadCertBtn.addEventListener('click', async () => {
  if (!window.jspdf) {
    alert('مكتبة PDF لم تحمل بعد. تأكد من اتصال الإنترنت.');
    return;
  }
  const name = studentFullname.value.trim();
  if (!name) {
    alert('الرجاء إدخال اسمك.');
    return;
  }
  downloadCertBtn.disabled = true;
  downloadCertBtn.textContent = 'جاري التحميل...';
  try {
    await document.fonts.ready;
    const templateSrc = typeof certificateTemplateDataUrl === 'string' ? certificateTemplateDataUrl : 'شهادة تقدير رمادي و أزرق.png';
    const template = await loadImage(templateSrc);
    const canvas = document.createElement('canvas');
    canvas.width = template.naturalWidth;
    canvas.height = template.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
    drawStudentName(ctx, name);
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
    pdf.save(`certificate-${name}.pdf`);
  } catch (error) {
    alert('خطأ: تأكد من وجود ملف صورة الشهادة في نفس المجلد.');
  } finally {
    downloadCertBtn.disabled = false;
    downloadCertBtn.textContent = 'تحميل PDF';
  }
});

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = encodeURI(src);
  });
}

startTotal.textContent = exams.web.questions.length;