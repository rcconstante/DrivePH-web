import { ArrowLeft, ExternalLink } from 'lucide-react';
import { brand } from '../config/brand';
import { pageSeo, usePageSeo } from '../config/seo';

const licenses = [
  {
    name: 'React Native',
    license: 'MIT',
    url: 'https://github.com/facebook/react-native/blob/main/LICENSE',
    text: `MIT License

Copyright (c) Meta Platforms, Inc. and affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.`,
  },
  {
    name: 'Expo',
    license: 'MIT',
    url: 'https://github.com/expo/expo/blob/main/LICENSE',
    text: `MIT License

Copyright (c) 2015-present 650 Industries, Inc. (aka Expo)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.`,
  },
  {
    name: 'SQLite',
    license: 'Public Domain',
    url: 'https://www.sqlite.org/copyright.html',
    text: `The SQLite source code is dedicated to the public domain.

All contributors have signed affidavits dedicating their contributions to the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute the original SQLite code, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.`,
  },
  {
    name: 'Lucide Icons',
    license: 'ISC',
    url: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE',
    text: `ISC License

Copyright (c) 2020, Lucide Contributors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.`,
  },
  {
    name: 'React',
    license: 'MIT',
    url: 'https://github.com/facebook/react/blob/main/LICENSE',
    text: `MIT License

Copyright (c) Meta Platforms, Inc. and affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.`,
  },
  {
    name: 'Tailwind CSS',
    license: 'MIT',
    url: 'https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE',
    text: `MIT License

Copyright (c) Tailwind Labs, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.`,
  },
];

export default function LicensePage() {
  usePageSeo(pageSeo.license);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#2f973b] transition-colors mb-10"
        >
          <ArrowLeft size={18} />
          Back to {brand.name}
        </a>

        <h1 className="text-4xl font-bold tracking-tight mb-4">Open Source Licenses</h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-12">
          {brand.name} is built with open-source software. Below are licenses for key third-party libraries used by the app and web experience.
        </p>

        <div className="space-y-8">
          {licenses.map((lib) => (
            <div key={lib.name} className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-base">{lib.name}</h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2f973b]/10 text-[#2f973b]">
                    {lib.license}
                  </span>
                </div>
                <a
                  href={lib.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#2f973b] transition-colors"
                >
                  Source <ExternalLink size={14} />
                </a>
              </div>
              <pre className="px-6 py-5 text-xs text-gray-600 leading-relaxed overflow-x-auto whitespace-pre-wrap bg-white">
                {lib.text}
              </pre>
            </div>
          ))}
        </div>

        <p className="text-gray-400 text-sm mt-12 text-center">
          This list is not exhaustive. For app support and licensing questions, visit{' '}
          <a
            href={brand.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2f973b] hover:underline"
          >
            {brand.displayUrl}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
