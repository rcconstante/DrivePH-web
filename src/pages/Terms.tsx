import { ChevronLeft } from 'lucide-react';
import { brand } from '../config/brand';
import { pageSeo, usePageSeo } from '../config/seo';

export default function TermsPage() {
  usePageSeo(pageSeo.terms);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a
          href={brand.routes.home}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-10"
        >
          <ChevronLeft size={16} />
          Back to {brand.name}
        </a>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <img src={brand.assets.icon} alt={brand.iconAlt} className="w-10 h-10 rounded-xl" />
            <div className="leading-none">
              <div className="text-xl font-extrabold text-gray-900">DrivePH</div>
              <div className="text-xs font-bold text-[#2f973b] mt-1">Guide</div>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-gray-900">Terms of Service</h1>
          <p className="text-gray-400 text-sm">Last updated: July 3, 2026</p>
        </div>

        <div className="h-px bg-gray-100 mb-12" />

        <div className="prose max-w-none space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By downloading, accessing, or using {brand.name}, you agree to these Terms. If you do
              not agree, do not use the app or website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Educational Use</h2>
            <p>
              {brand.name} provides driving lessons, quizzes, scenarios, and reference materials for
              educational purposes. It does not replace official government guidance, legal advice,
              accredited training, or instructions from traffic authorities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Independent App</h2>
            <p>
              {brand.name} is not affiliated with, endorsed by, or sponsored by the Land
              Transportation Office or any other government agency. Names, rules, procedures, and
              agency references are used only for educational context.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. License to Use the App</h2>
            <p>
              We grant you a personal, non-exclusive, non-transferable, limited license to use the
              app for personal learning and review. You may not copy, modify, reverse engineer,
              resell, or misuse the app or its content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Responsibilities</h2>
            <p>You agree to use {brand.name} responsibly and not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Use the app for unlawful, harmful, or misleading activity</li>
              <li>Submit false support requests or abusive messages</li>
              <li>Attempt to disrupt, overload, or compromise the app or website</li>
              <li>Rely on app content as the only source for official transactions or legal requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Accuracy and Official Sources</h2>
            <p>
              We work to keep educational content useful, but laws, procedures, fees, forms, and
              agency processes can change. Verify important information with official government
              publications or offices before acting on it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Purchases and App Stores</h2>
            <p>
              If purchases or downloads are offered through an app store, the store provider may
              process payment, refunds, device eligibility, and account rules under its own terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Disclaimer of Warranties</h2>
            <p>
              The app and website are provided as is and as available. We do not guarantee that the
              content will be error-free, uninterrupted, or suitable for every driving, licensing,
              training, or legal situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, {brand.name} and its developers are not liable
              for indirect, incidental, special, consequential, or punitive damages arising from use
              of the app, website, or educational content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Changes to These Terms</h2>
            <p>
              We may update these Terms when features, operating practices, or legal requirements
              change. Continued use of the app after updates means you accept the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Contact</h2>
            <p>For questions about these Terms, contact:</p>
            <div className="mt-3 bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <p className="font-semibold text-gray-900">{brand.name} Support</p>
              <p className="text-sm text-gray-400 mt-1">
                Email:{' '}
                <a href={`mailto:${brand.supportEmail}`} className="text-gray-900 hover:underline">
                  {brand.supportEmail}
                </a>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Website:{' '}
                <a href={brand.siteUrl} className="text-gray-900 hover:underline" target="_blank" rel="noopener noreferrer">
                  {brand.displayUrl}
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className="h-px bg-gray-100 mt-16 mb-8" />

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Copyright 2026 {brand.name}</span>
          <a href={brand.routes.privacy} className="hover:text-gray-900 transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
