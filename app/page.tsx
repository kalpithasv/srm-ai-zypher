import EventsBar from "@/components/home/EventsBar";
import Events from "@/components/home/EventsDivider";
import Hero from "@/components/home/Hero";
import Sponsors from "@/components/home/Sponsors";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Events />
      <EventsBar />
      <Sponsors />
    </main>
  );
}
