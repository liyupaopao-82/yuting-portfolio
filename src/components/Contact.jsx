import profile from '../data/profile.js';

function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 py-16 lg:py-20">
      <div className="section-shell">
        <div className="mb-8">
          <p className="section-kicker">Contact</p>
          <h2 className="section-title">联系方式</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Feel free to reach out for data analysis, AI product, user operations, or sales operations opportunities.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {profile.contacts.map((item) => (
            <a key={item.label} className="content-card transition hover:border-teal-300 hover:shadow-soft" href={item.href}>
              <p className="text-sm font-bold text-slate-500">{item.label}</p>
              <p className="mt-3 break-words text-base font-black leading-7 text-slate-950 sm:text-lg">{item.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
