import { ShieldCheck, HeartHandshake, Award } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    text: "Every caregiver goes through background checks and training.",
  },
  {
    icon: HeartHandshake,
    title: "Compassion First",
    text: "Care is not a task — it’s a human connection.",
  },
  {
    icon: Award,
    title: "Quality Standards",
    text: "Consistent care monitored by our internal supervisors.",
  },
];

export default function TeamValues() {
  return (
    <section className="bg-gray-50 py-20 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-14">
          Why Families Trust Our Team
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition"
            >
              <v.icon className="mx-auto text-purple-600 mb-5" size={36} />
              <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-gray-600 text-sm">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
