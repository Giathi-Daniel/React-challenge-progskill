const PrivacyPolicy = () => (
  <div className="max-w-4xl p-8 mx-auto prose dark:prose-invert">
    <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
    <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
      Effective Date: September 15, 2023 | Last Updated: September 15, 2023
    </p>
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
      <p>
        We are committed to protecting your personal information and right to
        privacy. This Privacy Policy explains how we collect, use, and safeguard
        your information when you use our services, in compliance with GDPR
        (General Data Protection Regulation) and other applicable laws.
      </p>
    </section>
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">2. Data Controller</h2>
      <p>
        [Your Company Name]
        <br />
        Registered Address: [Your Physical Address]
        <br />
        Data Protection Officer:{" "}
        <a href="mailto:dpo@yourcompany.com" className="text-blue-600">
          dpo@yourcompany.com
        </a>
      </p>
    </section>
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">3. Data We Collect</h2>
      <h3 className="mb-2 text-xl font-medium">3.1 Personal Data</h3>
      <ul className="pl-6 mb-4 list-disc">
        <li>
          Identity Data: Name, profile picture (via Google Authentication)
        </li>
        <li>Contact Data: Email address</li>
        <li>Technical Data: IP address, browser type, device information</li>
        <li>Usage Data: Feature interactions, session duration</li>
      </ul>
      <h3 className="mb-2 text-xl font-medium">3.2 Cookies</h3>
      <p>
        We use strictly necessary cookies for authentication and session
        management. Analytical cookies are only used with your explicit consent.
      </p>
    </section>
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">
        4. Legal Basis for Processing
      </h2>
      <p>We process your data based on:</p>
      <ul className="pl-6 list-disc">
        <li>Performance of contract (Article 6(1)(b) GDPR)</li>
        <li>Legitimate interests (Article 6(1)(f) GDPR)</li>
        <li>Your explicit consent (Article 6(1)(a) GDPR)</li>
      </ul>
    </section>
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">5. Data Sharing</h2>
      <p>We only share data with:</p>
      <ul className="pl-6 list-disc">
        <li>Google Cloud Services (Data Processor)</li>
        <li>Firebase Authentication (Data Processor)</li>
        <li>Legal authorities when required by law</li>
      </ul>
      <p className="mt-4">
        All third-party processors comply with EU-US Privacy Shield Framework.
      </p>
    </section>
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">6. Data Security</h2>
      <p>We implement:</p>
      <ul className="pl-6 list-disc">
        <li>End-to-end encryption (AES-256)</li>
        <li>Regular security audits</li>
        <li>Two-factor authentication</li>
        <li>Access control protocols</li>
      </ul>
    </section>
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">7. Your Rights</h2>
      <p>Under GDPR, you have the right to:</p>
      <ul className="pl-6 list-disc">
        <li>Access your personal data</li>
        <li>Request data rectification</li>
        <li>Request data erasure</li>
        <li>Restrict processing</li>
        <li>Data portability</li>
        <li>Object to processing</li>
        <li>Withdraw consent</li>
      </ul>
      <p className="mt-4">
        To exercise these rights, contact us at{" "}
        <a href="mailto:privacy@yourcompany.com" className="text-blue-600">
          privacy@yourcompany.com
        </a>
        .
      </p>
    </section>
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">8. Data Retention</h2>
      <p>We retain personal data:</p>
      <ul className="pl-6 list-disc">
        <li>Active users: Until account deletion</li>
        <li>Inactive users: 3 years after last activity</li>
        <li>Financial records: 7 years as required by law</li>
      </ul>
    </section>
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">
        9. International Transfers
      </h2>
      <p>
        Data may be transferred outside the EEA to Google Cloud servers in the
        US, protected by Standard Contractual Clauses (SCCs).
      </p>
    </section>
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">
        10. &apos;Children&apos;s&apos; Privacy
      </h2>
      <p>
        Our services are not directed to individuals under 16. We do not
        knowingly collect data from children without parental consent.
      </p>
    </section>
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">11. Policy Updates</h2>
      <p>
        We will notify users of material changes via email 30 days before
        implementation.
      </p>
    </section>
    <section>
      <h2 className="mb-4 text-2xl font-semibold">12. Contact Us</h2>
      <p>
        For privacy concerns or DSAR (Data Subject Access Requests):
        <br />
        Email:{" "}
        <a href="mailto:privacy@yourcompany.com" className="text-blue-600">
          privacy@yourcompany.com
        </a>
        <br />
        Postal: [Your Physical Address]
      </p>
    </section>
  </div>
);
export default PrivacyPolicy;
