import TeamHero from "@/components/team/TeamHero";
import TeamGrid from "@/components/team/TeamGrid";
import TeamValues from "@/components/team/TeamValues";
import TeamProcess from "@/components/team/TeamProcess";
import TeamCTA from "@/components/team/TeamCTA";

export default function TeamPage() {
  return (
    <>
      <TeamHero />
      <TeamGrid />
      <TeamValues />
      <TeamProcess />
      <TeamCTA />
    </>
  );
}
