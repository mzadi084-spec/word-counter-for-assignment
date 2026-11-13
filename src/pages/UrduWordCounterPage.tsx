import React from 'react';
import { CounterTool } from '../components/CounterTool';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { BookOpen, HelpCircle, Lightbulb, ChevronDown, CheckCircle2, Languages } from 'lucide-react';

const URDU_FAQS = [
  {
    q: 'کیا یہ ٹول اردو املا اور الفاظ کو درست طریقے سے شمار کرتا ہے؟',
    a: 'جی ہاں، ہمارا کاؤنٹر جدید یونیکوڈ (Unicode) الگورتھم کے تحت اردو رسم الخط، جوڑ توڑ، اور اعراب کو سمجھ کر درست الفاظ، حروف اور جملوں کا حساب لگاتا ہے۔'
  },
  {
    q: 'اردو میں جملے کے خاتمے کی نشانی (۔) اور سوالیہ نشان (؟) کا حساب کیسے ہوتا ہے؟',
    a: 'ہم نے خصوصی طور پر اردو فل اسٹاپ (۔) اور اردو سوالیہ نشان (؟) کو ڈیٹیکٹ کرنے کا فیچر شامل کیا ہے، تاکہ روایتی انگریزی نقطے (.) پر انحصار نہ کرنا پڑے۔'
  },
  {
    q: 'کیا میرا اردو مقالہ یا تحریر انٹرنیٹ پر محفوظ ہوتی ہے؟',
    a: 'بالکل نہیں! تمام تر پراسیسنگ آپ کے براؤزر کے اندر ہوتی ہے۔ آپ کی ذاتی تحریر کسی بھی بیرونی سرور پر نہیں بھیجی جاتی، اس لیے آپ کا تحقیقی کام 100 فیصد محفوظ ہے۔'
  },
  {
    q: 'رومن اردو (Roman Urdu) کا ورڈ کاؤنٹ کیسے کیا جائے؟',
    a: 'یہ ٹول بیک وقت خالص اردو اور رومن اردو دونوں کے لیے یکساں مؤثر ہے۔ آپ بغیر کسی رکاوٹ کے رومن اردو متن بھی یہاں چیک کر سکتے ہیں۔'
  }
];

export const UrduWordCounterPage: React.FC = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: URDU_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Urdu Word Counter – اردو ورڈ کاؤنٹر',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description: 'Free Urdu word counter online. Count Urdu words, characters, sentences with (۔) and (؟), and reading time instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <SEOHead
        title="Urdu Word Counter Online – اردو ورڈ کاؤنٹر"
        description="مفت آن لائن اردو ورڈ کاؤنٹر۔ اردو اور رومن اردو الفاظ، حروف اور جملوں (۔ ؟) کا لائیو حساب لگائیں۔ طلبہ اور محققین کے لیے بہترین ٹول۔"
        canonicalPath="/urdu-word-counter"
        schema={[webAppSchema, faqSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200/60 dark:border-emerald-900/60">
            <Languages className="w-3.5 h-3.5" />
            <span>اردو اور رومن اردو سپورٹ • 100% مفت</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Urdu Word Counter – آن لائن اردو ورڈ کاؤنٹر
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed urdu-text" dir="rtl">
            اردو مضامین، اسائنمنٹس، کالم اور شاعری کے الفاظ، حروف اور جملوں کا لائیو اور درست شمار کریں۔
          </p>
        </div>

        {/* Counter Tool with Urdu RTL Enabled by default */}
        <section aria-label="Urdu Text Counter">
          <CounterTool
            highlightStat="words"
            placeholder="اپنا اردو یا رومن اردو اسائنمنٹ، مضمون یا تحقیقی مقالہ یہاں درج کریں..."
            romanUrduTip="Urdu khat-e-nastaliq ya Roman Urdu mein apna text paste karein aur live words check karein."
            isUrduRtl={true}
          />
        </section>

        {/* RTL Urdu Explanation Content Section (300+ Words in Urdu) */}
        <section className="mt-16 space-y-12">
          <div
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-right"
            dir="rtl"
          >
            <div className="flex items-center justify-end gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <span className="urdu-text text-base">طالب علموں اور محققین کے لیے مکمل رہنمائی</span>
              <BookOpen className="w-4 h-4" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight urdu-text leading-relaxed">
              اردو اسائنمنٹس اور مضامین میں الفاظ کی حد کی اہمیت
            </h2>

            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-lg leading-loose urdu-text">
              <p>
                یونیورسٹیوں، کالجوں اور تعلیمی بورڈز میں اردو ادب، ابلاغیات، تاریخ اور اسلامیات کے اسائنمنٹس کے لیے الفاظ کی مخصوص حد مقرر کی جاتی ہے۔ اکثر اوقات طلبہ کو یہ دشواری پیش آتی ہے کہ انگریزی کے عام ورڈ پروسیسرز اردو جملوں اور الفاظ کے اختتام کو درست انداز میں شناخت نہیں کر پاتے۔ انگریزی ٹولز میں اردو کے مخصوص رموز اوقاف جیسے کہ فل اسٹاپ (۔) اور سوالیہ نشان (؟) کی سہولت موجود نہیں ہوتی، جس کی وجہ سے جملوں کی گنتی غلط ہو جاتی ہے۔
              </p>
              <p>
                ہمارا "اردو ورڈ کاؤنٹر" خاص طور پر اردو زبان کے فونٹ، جوڑ توڑ، اور رموزِ اوقاف کو مدنظر رکھ کر بنایا گیا ہے۔ یہ ٹول آپ کو ریئل ٹائم میں بتاتا ہے کہ آپ کی تحریر میں کل کتنے الفاظ، حروف (اسپیس کے ساتھ اور بغیر اسپیس)، جملے اور پیراگراف شامل ہیں۔ مزید برآں، یہ ٹول پڑھنے کے اوسط وقت (تقریباً 200 الفاظ فی منٹ) اور تقریر یا پریزنٹیشن میں بولنے کے اندازاً وقت (تقریباً 130 الفاظ فی منٹ) کا معیاری اندازہ بھی فراہم کرتا ہے جو ہر فرد کے حساب سے مختلف ہو سکتا ہے۔
              </p>
              <p>
                سب سے اہم بات یہ ہے کہ یہ ٹول مکمل طور پر آپ کے اپنے موبائل یا کمپیوٹر کے براؤزر کے اندر چلتا ہے۔ آپ کا قیمتی مقالہ یا ادبی مسودہ انٹرنیٹ پر کسی سرور پر اپلوڈ نہیں ہوتا، جس سے آپ کے کام کی 100 فیصد رازداری برقرار رہتی ہے۔
              </p>
            </div>

            {/* Urdu 3-step usage */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-right">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 urdu-text">
                اردو کاؤنٹر استعمال کرنے کا آسان طریقہ:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mb-2 mr-auto ml-0">
                    1
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1 urdu-text">متن پیسٹ کریں</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 urdu-text">
                    اپنا اردو مسودہ باکس میں پیسٹ کریں یا براہ راست ٹائپ کریں۔
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mb-2 mr-auto ml-0">
                    2
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1 urdu-text">الفاظ کی حد مقرر کریں</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 urdu-text">
                    اگر اسائنمنٹ کی کوئی مخصوص حد ہے تو وہ درج کریں تاکہ پروگریس بار نظر آئے۔
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mb-2 mr-auto ml-0">
                    3
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1 urdu-text">کاپی یا کلیئر کریں</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 urdu-text">
                    حساب مکمل ہونے پر ایک کلک سے اپنی تحریر محفوظ اور کاپی کریں۔
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Urdu Tips */}
          <div
            className="p-6 sm:p-8 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60 shadow-sm space-y-4 text-right"
            dir="rtl"
          >
            <div className="flex items-center justify-end gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
              <span className="urdu-text">مفید تدابیر (Tips)</span>
              <Lightbulb className="w-4 h-4" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white urdu-text">
              بہترین اردو تحریر کے سنہری اصول
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-emerald-100 dark:border-slate-800 text-base urdu-text text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span>جملے کا اختتام ہمیشہ اردو فل اسٹاپ (۔) سے کریں تاکہ جملوں کا صحیح تجزیہ ہو سکے۔</span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-emerald-100 dark:border-slate-800 text-base urdu-text text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span>پیراگراف 100 سے 150 الفاظ کے درمیان رکھیں تاکہ پڑھنے والے کو سمجھنے میں آسانی ہو۔</span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-emerald-100 dark:border-slate-800 text-base urdu-text text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span>غیر ضروری بار بار دہرائے جانے والے الفاظ سے گریز کریں اور ذخیرہ الفاظ میں تنوع لائیں۔</span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-emerald-100 dark:border-slate-800 text-base urdu-text text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span>تقریر یا مباحثے کے لیے تقریباً 130 الفاظ فی منٹ کے عمومی اندازے کے مطابق اپنے مسودے کے وقت کی مشق کریں۔</span>
              </div>
            </div>
          </div>

          {/* Urdu 4 FAQs */}
          <div
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-right"
            dir="rtl"
          >
            <div className="flex items-center justify-end gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <span className="urdu-text">عام سوالات</span>
              <HelpCircle className="w-4 h-4" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white urdu-text">
              اکثر پوچھے جانے والے سوالات (FAQ)
            </h2>

            <div className="space-y-3">
              {URDU_FAQS.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4 transition-all duration-200 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-slate-900 dark:text-white focus:outline-none urdu-text leading-relaxed">
                    <span className="shrink-0 rounded-full p-1 text-slate-400 group-open:rotate-180 transition-transform">
                      <ChevronDown className="w-4 h-4" />
                    </span>
                    <span>{faq.q}</span>
                  </summary>
                  <div className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-loose border-t border-slate-200/60 dark:border-slate-700/60 pt-3 urdu-text">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* More Free Tools */}
        <MoreToolsSection currentPath="/urdu-word-counter" />
      </main>
    </>
  );
};
