type Route = {
  name: string;
  path: string;
};

type faqType = {
  question: string;
  answer: string;
};

type EventType = {
  title: string;
  desc: string;
  team_size: {
    max: number;
    min: number;
  };
  student_co: {
    name: string;
    contact: string;
  }[];
  faculty_co: {
    name: string;
    contact: string;
  }[];
  entry_fee: number;
  banner: string;
  id: string;
  venue: string;
  time: string;
  type: "technical" | "non-technical" | "hackathon";
};

type ContactInfo = { name: string; contact: string };

type PaymentInfoType = {
  eventId: string;
  teammates: any;
  paymentScreenshot: string;
  image: string;
  txtId: string;
  verificationStatus: "pending" | "completed";
};
