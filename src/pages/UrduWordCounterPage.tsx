import React from 'react';
import { CounterTool } from '../components/CounterTool';
import { SEOHead } from '../components/SEOHead';
import { MoreToolsSection } from '../components/MoreToolsSection';
import { PopularGuidesSection } from '../components/PopularGuidesSection';
import { STATIC_BLOG_GUIDES } from '../data/staticBlogGuides';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildBreadcrumbSchema, buildCanonicalUrl } from '../utils/seo';

const URDU_FAQS = [
  {
    q: 'کیا یہ ٹول اردو املا اور الفاظ کو درست طریقے سے شمار کرتا ہے؟',
    a: 'جی ہاں، ہمارا کاؤنٹر جدید یونیکوڈ (Unicode) الگورتھم کے تحت اردو رسم الخط، جوڑ توڑ، اور اعراب کو سمجھ کر درست الفاظ، حروف اور جملوں کا حساب لگاتا ہے۔',
  },
  {
    q: 'اردو میں جملے کے خاتمے کی نشانی (۔) اور سوالیہ نشان (؟) کا حساب کیسے ہوتا ہے؟',
    a: 'ہم نے خصوصی طور پر اردو فل اسٹاپ (۔) اور اردو سوالیہ نشان (؟) کو ڈیٹیکٹ کرنے کا فیچر شامل کیا ہے، تاکہ روایتی انگریزی نقطے (.) پر انحصار نہ کرنا پڑے۔',
  },
  {
    q: 'کیا میرا اردو مقالہ یا تحریر کسی سرور ڈیٹابیس میں محفوظ ہوتی ہے؟',
    a: 'نہیں۔ تمام گنتی براہِ راست آپ کے براؤزر کے اندر جاوا اسکرپٹ کے ذریعے ہوتی ہے اور آپ کا متن محفوظ کرنے کے لیے کوئی سرور ڈیٹابیس یا فارم موجود نہیں۔',
  },
  {
    q: 'رومن اردو (Roman Urdu) کا ورڈ کاؤنٹ کیسے کیا جائے؟',
    a: 'یہ ٹول خالص اردو اور رومن اردو دونوں کے لیے مؤثر ہے۔ رومن اردو کے لیے آپ ہمارا مخصوص Roman Urdu Word Counter بھی استعمال کر سکتے ہیں۔',
  },
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
    url: buildCanonicalUrl('/urdu-word-counter'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description:
      'Free Urdu word counter online. Count Urdu words, characters, sentences with (۔) and (؟), and reading time instantly.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Urdu Word Counter', path: '/urdu-word-counter' },
  ]);

  return (
    <>
      <SEOHead
        title="Urdu Word Counter Online – اردو ورڈ کاؤنٹر"
        description="مفت آن لائن اردو ورڈ کاؤنٹر۔ اردو اور رومن اردو الفاظ، حروف اور جملوں (۔ ؟) کا لائیو حساب لگائیں۔ طلبہ اور محققین کے لیے بہترین ٹول۔"
        canonicalPath="/urdu-word-counter"
        schema={[webAppSchema, faqSchema, breadcrumbSchema]}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        <header className="max-w-3xl mb-6 space-y-2">
          <p className="text-xs font-medium text-zinc-500">
            Urdu &amp; Nastaliq Script Support &middot; Private Browser Counter
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Urdu Word Counter – آن لائن اردو ورڈ کاؤنٹر
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed urdu-text" dir="rtl">
            اردو مضامین، اسائنمنٹس، کالم اور شاعری کے الفاظ، حروف اور جملوں کا لائیو اور درست شمار کریں۔
          </p>
        </header>

        <section aria-label="Urdu Text Counter">
          <CounterTool
            highlightStat="words"
            placeholder="اپنا اردو یا رومن اردو اسائنمنٹ، مضمون یا تحقیقی مقالہ یہاں درج کریں..."
            romanUrduTip="Urdu khat-e-nastaliq ya Roman Urdu mein apna text paste karein aur live words check karein."
            isUrduRtl={true}
          />
        </section>

        <section className="mt-14 space-y-10">
          <div
            className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-6 text-right"
            dir="rtl"
          >
            <div>
              <p className="text-xs font-semibold text-zinc-500 urdu-text">
                طالب علموں اور محققین کے لیے مکمل رہنمائی
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight urdu-text leading-relaxed mt-1">
                اردو اسائنمنٹس اور مضامین میں الفاظ کی حد کی اہمیت
              </h2>
            </div>

            <div className="space-y-4 text-zinc-700 text-lg leading-loose urdu-text">
              <p>
                یونیورسٹیوں، کالجوں اور تعلیمی بورڈز میں اردو ادب، ابلاغیات، تاریخ اور اسلامیات کے اسائنمنٹس کے لیے الفاظ کی مخصوص حد مقرر کی جاتی ہے۔ اکثر اوقات طلبہ کو یہ دشواری پیش آتی ہے کہ انگریزی کے عام ورڈ پروسیسرز اردو جملوں اور الفاظ کے اختتام کو درست انداز میں شناخت نہیں کر پاتے۔ انگریزی ٹولز میں اردو کے مخصوص رموز اوقاف جیسے کہ فل اسٹاپ (۔) اور سوالیہ نشان (؟) کی سہولت موجود نہیں ہوتی، جس کی وجہ سے جملوں کی گنتی غلط ہو جاتی ہے۔
              </p>
              <p>
                ہمارا &ldquo;اردو ورڈ کاؤنٹر&rdquo; خاص طور پر اردو زبان کے فونٹ، جوڑ توڑ، اور رموزِ اوقاف کو مدنظر رکھ کر بنایا گیا ہے۔ یہ ٹول آپ کو ریئل ٹائم میں بتاتا ہے کہ آپ کی تحریر میں کل کتنے الفاظ، حروف (اسپیس کے ساتھ اور بغیر اسپیس)، جملے اور پیراگراف شامل ہیں۔ مزید برآں، یہ ٹول پڑھنے کے اوسط وقت (تقریباً 200 الفاظ فی منٹ) اور تقریر یا پریزنٹیشن میں بولنے کے اندازاً وقت (تقریباً 130 الفاظ فی منٹ) کا معیاری اندازہ بھی فراہم کرتا ہے۔
              </p>
              <p>
                یہ ٹول براہِ راست آپ کے موبائل یا کمپیوٹر کے براؤزر میں کام کرتا ہے اور تحریر محفوظ کرنے کے لیے کسی سرور ڈیٹابیس کا استعمال نہیں کرتا۔ رومن اردو الفاظ گننے کے لیے آپ ہمارا{' '}
                <Link to="/roman-urdu-word-counter/" className="font-bold text-zinc-950 underline">
                  Roman Urdu Word Counter
                </Link>{' '}
                بھی کھول سکتے ہیں۔
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-200 text-right">
              <h3 className="text-xl font-bold text-zinc-950 mb-4 urdu-text">
                اردو کاؤنٹر استعمال کرنے کا آسان طریقہ:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <p className="font-mono-num text-xs font-bold text-zinc-500 mb-1">01</p>
                  <h4 className="font-bold text-base text-zinc-950 mb-1 urdu-text">متن پیسٹ کریں</h4>
                  <p className="text-sm text-zinc-600 urdu-text">
                    اپنا اردو مسودہ باکس میں پیسٹ کریں یا براہ راست ٹائپ کریں۔
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <p className="font-mono-num text-xs font-bold text-zinc-500 mb-1">02</p>
                  <h4 className="font-bold text-base text-zinc-950 mb-1 urdu-text">الفاظ کی حد مقرر کریں</h4>
                  <p className="text-sm text-zinc-600 urdu-text">
                    اگر اسائنمنٹ کی کوئی مخصوص حد ہے تو وہ درج کریں تاکہ پروگریس بار نظر آئے۔
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                  <p className="font-mono-num text-xs font-bold text-zinc-500 mb-1">03</p>
                  <h4 className="font-bold text-base text-zinc-950 mb-1 urdu-text">کاپی یا کلیئر کریں</h4>
                  <p className="text-sm text-zinc-600 urdu-text">
                    حساب مکمل ہونے پر ایک کلک سے اپنی تحریر محفوظ اور کاپی کریں۔
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4 text-right" dir="rtl">
            <h2 className="text-2xl font-bold text-zinc-950 urdu-text">
              بہترین اردو تحریر کے اصول
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-xl bg-white border border-zinc-200 text-base urdu-text text-zinc-800">
                جملے کا اختتام ہمیشہ اردو فل اسٹاپ (۔) سے کریں تاکہ جملوں کا صحیح تجزیہ ہو سکے۔
              </div>
              <div className="p-4 rounded-xl bg-white border border-zinc-200 text-base urdu-text text-zinc-800">
                پیراگراف 100 سے 150 الفاظ کے درمیان رکھیں تاکہ پڑھنے والے کو سمجھنے میں آسانی ہو۔
              </div>
              <div className="p-4 rounded-xl bg-white border border-zinc-200 text-base urdu-text text-zinc-800">
                غیر ضروری بار بار دہرائے جانے والے الفاظ سے گریز کریں اور ذخیرہ الفاظ میں تنوع لائیں۔
              </div>
              <div className="p-4 rounded-xl bg-white border border-zinc-200 text-base urdu-text text-zinc-800">
                تقریر یا مباحثے کے لیے تقریباً 130 الفاظ فی منٹ کے عمومی اندازے کے مطابق اپنے مسودے کے وقت کی مشق کریں۔
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 space-y-5 text-right" dir="rtl">
            <h2 className="text-2xl font-bold text-zinc-950 urdu-text">
              اکثر پوچھے جانے والے سوالات (FAQ)
            </h2>

            <div className="divide-y divide-zinc-200 border-t border-zinc-200">
              {URDU_FAQS.map((faq, index) => (
                <details
                  key={index}
                  className="group py-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-zinc-950 urdu-text leading-relaxed">
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0 group-open:rotate-180 transition-transform" />
                    <span>{faq.q}</span>
                  </summary>
                  <div className="mt-3 text-base text-zinc-600 leading-loose urdu-text">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <MoreToolsSection currentPath="/urdu-word-counter" />

        <PopularGuidesSection
          title="Helpful Urdu & Assignment Guides"
          subtitle="Learn how Urdu punctuation and Roman Urdu spacing affect counts, plus university limit rules."
          guides={STATIC_BLOG_GUIDES.filter((g) =>
            [
              '/blog/how-to-count-words-in-urdu.html',
              '/blog/roman-urdu-word-counting-guide.html',
              '/blog/assignment-word-count-guide.html',
              '/blog/university-assignment-word-count.html',
              '/blog/how-many-words-per-minute-speaking.html',
              '/blog/how-long-to-read-1300-words-aloud.html',
            ].includes(g.href)
          )}
        />
      </main>
    </>
  );
};
