import { ChevronLeft } from 'lucide-react';
import { brand } from '../config/brand';
import { pageSeo, usePageSeo } from '../config/seo';

export default function PrivacyPage() {
  usePageSeo(pageSeo.privacy);

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
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-gray-900">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: July 3, 2026</p>
        </div>

        <div className="h-px bg-gray-100 mb-12" />

        <div className="prose max-w-none space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Overview</h2>
            <p>
              {brand.name} is an independent educational app for learning Philippine driving topics.
              This policy explains how we handle information when you use the app or contact support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information Stored on Your Device</h2>
            <p>
              Learning progress, quiz attempts, preferences, saved items, coin balances, and similar
              app data are stored locally on your device so the app can remember your activity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Information You Send to Us</h2>
            <p>
              If you email support, we receive the email address and details you choose to include.
              Use support messages only for app questions, bug reports, and feedback.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data We Do Not Sell</h2>
            <p>
              We do <strong className="text-gray-900">not</strong> sell personal information. We do
              not ask for sensitive government IDs, license numbers, passwords, or payment card
              numbers through the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Third-Party Platforms</h2>
            <p>
              App distribution, device functionality, email, and store transactions may be handled by
              third-party platforms such as Google Play, Apple, or your email provider. Their privacy
              policies apply to information processed by those services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Educational Content Notice</h2>
            <p>
              {brand.name} is not affiliated with, endorsed by, or sponsored by the Land
              Transportation Office or any government agency. Always verify current rules,
              procedures, fees, and requirements with official government sources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Children's Privacy</h2>
            <p>
              The app is intended for driving education and is not directed at children under 13.
              If you believe a child has sent personal information to us, contact support so we can
              review and delete it where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy when app features, legal requirements, or operational
              practices change. The updated date on this page will show when the policy was revised.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact</h2>
            <p>If you have privacy questions, contact us at:</p>
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
          <a href={brand.routes.terms} className="hover:text-gray-900 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
