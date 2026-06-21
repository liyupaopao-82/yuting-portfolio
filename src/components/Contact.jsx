import profile from '../data/profile.js';

function Contact({ language }) {
  const content = profile[language];

  return (
    <section id="contact" className="scroll-mt-28 py-16 lg:py-20">
      <div className="section-shell">
        <div className="mb-8">
          <p className="section-kicker">{content.sections.contact.kicker}</p>
          <h2 className="section-title">{content.sections.contact.title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {content.sections.contact.description}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {content.contacts.map((item) => {
            const isDownload = item.href?.endsWith('.pdf');
            const CardTag = isDownload ? 'a' : 'div';

            return (
              <CardTag
                key={item.label}
                className={`content-card ${isDownload ? 'transition hover:border-teal-300 hover:shadow-soft' : ''}`}
                href={isDownload ? item.href : undefined}
                download={isDownload || undefined}
              >
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.label}</p>
                <p className="mt-3 break-words text-base font-black leading-7 text-slate-950 dark:text-white sm:text-lg">{item.value}</p>
              </CardTag>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Contact;
