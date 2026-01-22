import TeamCard from "@/components/team/TeamCard";

const team = [
  { name: "Lily Emily", role: "Senior Caregiver", image: "/assets/team/1.jpg" },
  { name: "Ella Avery", role: "Home Nurse", image: "/assets/team/2.jpg" },
  { name: "Lucy Isla", role: "Medical Assistant", image: "/assets/team/3.jpg" },
  { name: "Nova Grace", role: "Elder Care Specialist", image: "/assets/team/4.jpg" },
  { name: "Stella Delilah", role: "Child Care Expert", image: "/assets/team/5.jpg" },
  { name: "Leah Lillian", role: "Care Supervisor", image: "/assets/team/6.jpg" },
  { name: "Alice Ruby", role: "Registered Nurse", image: "/assets/team/7.jpg" },
  { name: "Ayla Emery", role: "Home Support Staff", image: "/assets/team/8.jpg" },
];

export default function TeamPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {team.map((member, i) => (
          <TeamCard key={i} {...member} />
        ))}
      </div>
    </section>
  );
}
