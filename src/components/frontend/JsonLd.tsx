export function JsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'NonprofitOrganization',
    name: 'Panti Asuhan Muhammadiyah Asahan',
    alternateName: 'Panti Asuhan Yatim Muhammadiyah Asahan',
    description:
      'Panti Asuhan Anak Yatim Putra/Putri Muhammadiyah Asahan di Kisaran, Sumatera Utara. Melayani anak yatim, piatu, fakir miskin, dan terlantar.',
    url: 'https://pantiasuhanmuhammadiyahkisaran.web.id',
    logo: 'https://pantiasuhanmuhammadiyahkisaran.web.id/images/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Setia Budi, Kel. Selawan',
      addressLocality: 'Kisaran Timur',
      addressRegion: 'Kab. Asahan, Sumatera Utara',
      postalCode: '21234',
      addressCountry: 'ID',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-821-7572-3169',
      contactType: 'customer service',
      availableLanguage: ['Indonesian'],
    },
    openingHours: 'Mo-Su 05:00-22:00',
    sameAs: [],
    donationUrl: 'https://pantiasuhan-mu.vercel.app/donasi',
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Panti Asuhan Muhammadiyah Asahan',
    url: 'https://pantiasuhanmuhammadiyahkisaran.web.id',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://pantiasuhanmuhammadiyahkisaran.web.id/berita?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
