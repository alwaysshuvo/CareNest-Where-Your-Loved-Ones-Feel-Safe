const steps = [
  {
    step: "01",
    title: "Assessment",
    text: "We understand your family’s specific care needs.",
  },
  {
    step: "02",
    title: "Caregiver Match",
    text: "We assign the best-fit professional for your home.",
  },
  {
    step: "03",
    title: "Ongoing Support",
    text: "Our team monitors and supports continuously.",
  },
  {
    step: "04",
    title: "Peace of Mind",
    text: "Your loved ones stay safe, comfortable, and happy.",
  },
];

export default function TeamProcess() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-3xl font-bold mb-14">
        How Our Team Works With You
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div
            key={s.step}
            className="rounded-2xl bg-gray-50 p-6 hover:bg-white hover:shadow transition"
          >
            <p className="text-purple-600 font-bold text-xl mb-2">
              {s.step}
            </p>
            <h3 className="font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-gray-600">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
