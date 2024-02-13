import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const faqs: faqType[] = [
    {
      question: "Who can participate in the technical event?",
      answer:
        "The event is open to for Engineering and Technology students, Participants from diverse backgrounds and expertise levels are encouraged to join.",
    },
    {
      question: "Can I receive a certificate of participation?",
      answer:
        " Participants who attend the event and actively engage in sessions and activities will receive a certificate of participation. Details on how to obtain the certificate will be provided at the event venue or through the event website.",
    },
    {
      question: " How can I stay updated on event announcements and changes?",
      answer:
        "To stay informed about event updates, follow our official social media channels and regularly check the event website for announcements, schedule changes, and additional information.",
    },
    {
      question: "Is there a registration fee?",
      answer:
        "Details regarding registration fees can be found on the event website. Some events may offer discounted rates for students, early birds, or group registrations. Be sure to check the pricing information during the registration process.        ",
    },
    {
      question: "Are there any competitions or hackathons during the event?",
      answer:
        "Yes, the event may include competitions, hackathons, or coding challenges. Keep an eye on the event schedule for details on specific contests and how to participate.        ",
    },
  ];
  return (
    <div className="w-screen bg-black">
      <div className="container-fix">
        <h1 className="text-center text-2xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
          General FAQs
        </h1>

        <div className="border mt-8 container-fix max-w-5xl rounded-lg">
          <Accordion type="single" collapsible>
            {faqs.map(({ question, answer }: faqType, index: number) => {
              return (
                <AccordionItem key={index} value={index.toLocaleString()}>
                  <AccordionTrigger className="text-left">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="text-ui-primary text-left">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
