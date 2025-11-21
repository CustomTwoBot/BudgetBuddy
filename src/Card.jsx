export default function Card({ title, children, className = '' }) {
  return (
    <section
      className={
        `w-full bg-gradient-to-br from-brand-900/80 via-bg to-bg/80 text-white rounded-2xl p-6 shadow-xl backdrop-blur-sm border border-white/5 ` + className
      }
      aria-labelledby={title ? `${title}-title` : undefined}
    >
      {title && <h3 id={`${title}-title`} className="text-lg font-semibold mb-3">{title}</h3>}
      <div>{children}</div>
    </section>
  );
}