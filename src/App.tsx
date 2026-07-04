import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Image,
  MessageSquareQuote,
  Search,
  Shield,
  Smartphone,
  Tag,
} from 'lucide-react';
import { brand } from './config/brand';
import { pageSeo, usePageSeo } from './config/seo';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import LicensePage from './pages/License';
import SupportPage from './pages/Support';

const lastSlideIndex = 4;

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function HorizontalScreenshots() {
  const { ref, visible } = useInView(0.15);
  const images = brand.assets.screenshots;
  const [start, setStart] = useState(0);
  const showCount = 4;
  const maxStart = images.length - showCount;
  const scrollRef = useRef<HTMLDivElement>(null);

  const goNext = () => setStart((s) => Math.min(s + 1, maxStart));
  const goPrev = () => setStart((s) => Math.max(s - 1, 0));

  return (
    <div ref={ref} className="relative">
      <div
        ref={scrollRef}
        className="overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
      >
        <div className="flex gap-1 px-1 min-w-max">
          {images.map((src, i) => {
            const inWindow = i >= start && i < start + showCount;

            return (
              <div
                key={src}
                className={`snap-center flex-shrink-0 transition-all duration-700 ease-out ${
                  visible && inWindow
                    ? 'opacity-100 translate-y-0 scale-100'
                    : inWindow
                      ? 'opacity-0 translate-y-8 scale-95'
                      : 'opacity-0 scale-95 hidden'
                }`}
                style={{ transitionDelay: `${(i - start) * 80}ms` }}
              >
                <img
                  src={src}
                  alt={`${brand.name} mobile visual ${i + 1}`}
                  className="w-[220px] sm:w-[260px] lg:w-[300px] aspect-[9/16] object-contain"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={goPrev}
        disabled={start === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:scale-105 disabled:opacity-0 disabled:scale-75 transition-all"
        aria-label="Previous screenshots"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goNext}
        disabled={start >= maxStart}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:scale-105 disabled:opacity-0 disabled:scale-75 transition-all"
        aria-label="Next screenshots"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex items-center justify-center gap-2 mt-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(Math.min(i, maxStart))}
            className={`h-2 rounded-full transition-colors ${
              i >= start && i < start + showCount ? 'bg-[#2f973b] w-4' : 'bg-gray-300 w-2'
            }`}
            aria-label={`Go to screenshot ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Slide({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div
      id={id}
      className="w-full lg:min-w-[100vw] lg:h-screen lg:flex lg:items-center lg:justify-center lg:overflow-y-auto hide-scrollbar"
    >
      {children}
    </div>
  );
}

function HomePage() {
  usePageSeo(pageSeo.home);

  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (window.innerWidth < 1024) return;
      const idx = Math.round(el.scrollLeft / window.innerWidth);
      setActiveSlide(Math.max(0, Math.min(idx, lastSlideIndex)));
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let target = el.scrollLeft;
    let current = el.scrollLeft;
    let raf = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      current = lerp(current, target, 0.1);
      if (Math.abs(target - current) > 0.5) {
        el.scrollLeft = current;
        raf = requestAnimationFrame(animate);
      } else {
        el.scrollLeft = target;
        raf = 0;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      e.preventDefault();
      target += (e.deltaY + e.deltaX) * 2;
      target = Math.max(0, Math.min(target, el.scrollWidth - el.clientWidth));
      if (!raf) raf = requestAnimationFrame(animate);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToSlide = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * window.innerWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (window.innerWidth < 1024) return;
      if (e.key === 'ArrowRight') scrollToSlide(Math.min(activeSlide + 1, lastSlideIndex));
      if (e.key === 'ArrowLeft') scrollToSlide(Math.max(activeSlide - 1, 0));
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSlide]);

  return (
    <div className="min-h-screen lg:min-h-0 lg:h-screen bg-white text-gray-900 relative">
      <div
        ref={containerRef}
        className="w-full lg:h-screen lg:overflow-x-auto lg:flex lg:flex-nowrap hide-scrollbar"
      >
        <Slide id="hero">
          <section className="relative overflow-hidden bg-white">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-12 lg:pb-20">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14">
                <div className="relative flex-shrink-0 w-72 sm:w-80 lg:w-[26rem] order-2 lg:order-1">
                  <div className="relative z-10">
                    <img
                      src={brand.assets.hero}
                      alt={`${brand.name} onboarding illustration`}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="text-center lg:text-left max-w-xl w-full px-2 sm:px-0 order-1 lg:order-2">
                  <div className="flex items-center gap-3 justify-center lg:justify-start mb-7">
                    <img src={brand.assets.icon} alt={brand.iconAlt} className="w-12 h-12 rounded-2xl" />
                    <div className="text-left leading-none">
                      <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">DrivePH</div>
                      <div className="text-xs sm:text-sm font-bold text-[#2f973b] tracking-normal mt-1">Guide</div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-medium mb-8 text-[#2f973b]">
                    <Bookmark size={18} />
                    Philippines Driving Companion
                  </div>
                  <h1 className="text-5xl sm:text-6xl lg:text-[5.25rem] font-extrabold tracking-tight leading-[1.05] mb-8 text-gray-900">
                    DrivePH
                    <br />
                    <span className="text-[#2f973b]">Guide.</span>
                  </h1>
                  <p className="text-gray-500 text-xl sm:text-2xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                    A focused Philippine driving guide for LTO reviewer quizzes, student permit prep, road signs, traffic rules, real-road scenarios, and vehicle care.
                  </p>

                  <div id="download" className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                    <a
                      href={brand.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-gray-800 transition-colors"
                    >
                      <Smartphone size={32} className="flex-shrink-0" />
                      <div className="text-left">
                        <div className="text-xs leading-none opacity-70">Open the</div>
                        <div className="text-base leading-tight font-bold">Official Site</div>
                      </div>
                    </a>
                    <a
                      href={brand.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-[#2f973b] text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-[#277f32] transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-8 h-8 flex-shrink-0" fill="currentColor">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.583 1.496c.572.331.572.87 0 1.2l-2.583 1.497-2.606-2.597 2.606-2.596zM5.864 3.465L16.8 9.798l-2.302 2.302-8.634-8.635z" />
                      </svg>
                      <div className="text-left">
                        <div className="text-xs leading-none opacity-70">GET IT ON</div>
                        <div className="text-base leading-tight font-bold">Google Play</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Slide>

        <Slide>
          <section className="bg-white py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gray-900">
                  Built around the driving journey.
                </h2>
                <p className="text-gray-500 text-lg sm:text-xl max-w-lg mx-auto">
                  Mobile-first lessons, quizzes, scenarios, and reminders presented in a clean guide-style experience.
                </p>
              </div>

              <HorizontalScreenshots />
            </div>
          </section>
        </Slide>

        <Slide>
          <section className="max-w-6xl mx-auto px-4 sm:px-8 py-24 lg:py-0">
            <div className="mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gray-900">
                Prepare with focus.
              </h2>
              <p className="text-gray-500 text-lg max-w-lg">
                Everything you need to understand Philippine driving basics before you get on the road.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
              <div className="sm:col-span-2 bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2f973b]/10 flex items-center justify-center">
                    <Smartphone size={20} className="text-[#2f973b]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Guided Learning Path</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Start with student permit basics, then move through license types, road knowledge, and vehicle care.</p>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2f973b]/10 flex items-center justify-center">
                    <FolderOpen size={20} className="text-[#2f973b]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">License Modules</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Break down permits, non-professional and professional licenses, DL codes, renewals, and records.</p>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2f973b]/10 flex items-center justify-center">
                    <Image size={20} className="text-[#2f973b]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Road Signs & Rules</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Study signs, signals, pavement markings, right-of-way rules, parking limits, and crash duties.</p>
                </div>
              </div>

              <div className="bg-[#2f973b] rounded-3xl p-8 flex flex-col justify-between text-white transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Search size={20} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Practice Quizzes</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Review LTO-style questions, final exam sets, and topic checkpoints to reinforce what you learn.</p>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2f973b]/10 flex items-center justify-center">
                    <Tag size={20} className="text-[#2f973b]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Road Scenarios</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Apply lessons to realistic situations involving traffic flow, hazards, intersections, and parking.</p>
                </div>
              </div>

              <div className="sm:col-span-2 bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2f973b]/10 flex items-center justify-center">
                    <Shield size={20} className="text-[#2f973b]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Independent Educational Guide</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{brand.name} is an independent learning app. Always verify official procedures, fees, and rules with LTO or other government sources.</p>
                </div>
              </div>
            </div>
          </section>
        </Slide>

        <Slide>
          <section className="bg-white py-24 lg:py-0 w-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-12 text-gray-900 text-center lg:text-left">
                Made for responsible drivers
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-100 rounded-3xl p-10 flex flex-col justify-between transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <MessageSquareQuote size={32} className="text-[#2f973b]/40" />
                    </div>
                    <p className="text-gray-900 text-xl leading-relaxed mb-8">
                      Learn the path from student permit to license, then keep building safer habits through focused lessons, quizzes, and driving scenarios.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {['Student Permit', 'License Types', 'Road Rules'].map((label) => (
                      <span key={label} className="rounded-full bg-[#2f973b]/10 px-3 py-1 text-xs font-bold text-[#2f973b]">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="bg-white border border-gray-100 rounded-3xl p-7 flex flex-col justify-between transition-colors flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Short, focused study sessions</p>
                        <p className="text-gray-400 text-xs mt-1">Lessons, checkpoints, and final exams</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Review one topic at a time, then test understanding before moving into the next driving module.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-3xl p-7 flex flex-col justify-between transition-colors flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Built for Philippine roads</p>
                        <p className="text-gray-400 text-xs mt-1">LTO-oriented content and road scenarios</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Content is organized around Philippine licensing, traffic rules, signs, markings, and basic vehicle care responsibilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Slide>

        <Slide>
          <footer className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-24 lg:py-0 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16">
            <div className="flex-1">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Your road.
                <br />
                Your <span className="text-[#2f973b]">responsibility.</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8">
                Learn the rules, practice the scenarios, and verify official requirements before every real transaction.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={brand.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
                >
                  <Smartphone size={20} />
                  Official Site
                </a>
                <a
                  href={brand.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#2f973b] text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-[#277f32] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.583 1.496c.572.331.572.87 0 1.2l-2.583 1.497-2.606-2.597 2.606-2.596zM5.864 3.465L16.8 9.798l-2.302 2.302-8.634-8.635z" />
                  </svg>
                  Google Play
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-sm text-gray-400 lg:text-right">
              <a href={brand.routes.privacy} className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href={brand.routes.terms} className="hover:text-gray-900 transition-colors">Terms</a>
              <a href={brand.routes.license} className="hover:text-gray-900 transition-colors">Licenses</a>
              <a href={brand.routes.support} className="hover:text-gray-900 transition-colors">Support</a>
              <a
                href={brand.siteUrl}
                className="hover:text-gray-900 transition-colors mt-2 inline-flex items-center gap-1.5 lg:justify-end"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                {brand.displayUrl}
              </a>
            </div>
          </footer>
        </Slide>
      </div>
    </div>
  );
}

function NotFoundPage() {
  usePageSeo(pageSeo.notFound);

  return (
    <main className="min-h-screen bg-white text-gray-900 flex items-center">
      <section className="max-w-xl mx-auto px-6 py-20">
        <img src={brand.assets.icon} alt={brand.iconAlt} className="w-16 h-16 rounded-2xl mb-8" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Page not found</h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          This DrivePH Guide page does not exist. Go back to the homepage for the Philippine driving guide, LTO reviewer, road signs, traffic rules, scenarios, and support links.
        </p>
        <a
          href={brand.routes.home}
          className="inline-flex items-center justify-center bg-[#2f973b] text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-[#277f32] transition-colors"
        >
          Go to homepage
        </a>
      </section>
    </main>
  );
}

function normalizePath(path: string) {
  if (path === brand.routes.home) return brand.routes.home;
  return path.replace(/\/+$/, '');
}

function App() {
  const path = normalizePath(window.location.pathname);

  if (path === brand.routes.home) return <HomePage />;
  if (path === brand.routes.privacy || path === brand.routes.legacyPrivacy) return <PrivacyPage />;
  if (path === brand.routes.terms) return <TermsPage />;
  if (path === brand.routes.license) return <LicensePage />;
  if (path === brand.routes.support) return <SupportPage />;

  return <NotFoundPage />;
}

export default App;

