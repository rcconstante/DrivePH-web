import { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { brand, getAbsoluteUrl } from '../config/brand';

const faqItems = [
  {
    question: 'How does learning progress work?',
    answer:
      'Progress updates as you open lessons, complete quizzes, and finish scenario practice. Topic cards show completed items against total lessons.',
  },
  {
    question: 'What driving content is included?',
    answer:
      'The app includes Student Permit basics, license types, road signs, traffic rules, defensive driving, scenarios, quizzes, and vehicle care lessons.',
  },
  {
    question: 'Can I retake quizzes?',
    answer: 'Yes. You can retake quiz categories anytime to practice and improve your score.',
  },
  {
    question: 'Is DrivePH Guide an official LTO app?',
    answer:
      'No. DrivePH Guide is an independent educational app. Always verify procedures, fees, and requirements with official LTO or government sources.',
  },
];

export default function SupportPage() {
  useEffect(() => {
    document.title = `Support - ${brand.name}`;

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);

      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }

      el.setAttribute('content', content);
    };

    const description = `Get help with ${brand.name} lessons, quizzes, scenarios, and support questions.`;
    const canonical = document.querySelector('link[rel="canonical"]');

    setMeta('description', description);
    setMeta('og:title', `Support - ${brand.name}`, true);
    setMeta('og:description', description, true);
    setMeta('og:url', getAbsoluteUrl(brand.routes.support), true);
    setMeta('twitter:title', `Support - ${brand.name}`);
    setMeta('twitter:description', description);
    if (canonical) canonical.setAttribute('href', getAbsoluteUrl(brand.routes.support));

    return () => {
      document.title = brand.title;
      if (canonical) canonical.setAttribute('href', getAbsoluteUrl());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100 bg-white/95 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <a href={brand.routes.home} className="flex items-center gap-3">
            <img src={brand.assets.icon} alt={brand.iconAlt} className="w-9 h-9 rounded-xl" />
            <div className="leading-none">
              <div className="text-lg font-extrabold text-gray-900">DrivePH</div>
              <div className="text-[11px] font-bold text-[#2f973b] mt-1">Guide</div>
            </div>
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
        <a href={brand.routes.home} className="inline-flex items-center gap-1 text-[#2f973b] text-sm font-medium mb-8 hover:underline">
          <ChevronLeft size={18} /> Back to home
        </a>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Support</h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-10">
          Get help with lessons, quizzes, scenarios, account questions, or app issues.
        </p>

        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-2">Email Support</h2>
            <p className="text-gray-500 mb-4">For bug reports, content questions, feature requests, or general support.</p>
            <a
              href={`mailto:${brand.supportEmail}?subject=${encodeURIComponent(`${brand.name} Support`)}`}
              className="inline-flex items-center gap-2 text-[#2f973b] font-medium hover:underline"
            >
              {brand.supportEmail}
            </a>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-2">Frequently Asked Questions</h2>
            <div className="space-y-4 text-gray-600">
              {faqItems.map((item) => (
                <details className="group" key={item.question}>
                  <summary className="cursor-pointer font-medium text-gray-900 list-none flex items-center justify-between">
                    {item.question}
                    <span className="transition group-open:rotate-180">&#9662;</span>
                  </summary>
                  <p className="mt-2 text-gray-500">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-2">Version & Troubleshooting</h2>
            <p className="text-gray-500 mb-2">Current app version: <span className="font-medium text-gray-900">1.0.0</span></p>
            <p className="text-gray-500">
              If the app crashes or behaves unexpectedly, force-close and reopen it. If the issue persists,
              email us with your device model, OS version, app version, and the screen where the issue happened.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={brand.assets.icon} alt={brand.iconAlt} className="w-8 h-8 rounded-lg" />
            <span className="font-semibold text-sm text-gray-900">{brand.name}</span>
          </div>
          <p className="text-sm text-gray-400">
            <a href={brand.routes.home} className="hover:text-gray-900 transition-colors">Back to home</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
