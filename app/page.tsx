import EventsBar from "@/components/home/EventsBar";
import Events from "@/components/home/EventsDivider";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Events />
      <EventsBar />
    </main>
  );
}
