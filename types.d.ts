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
  rules: string;
  banner: string;
  id: string;
  venue: string;
  time: string;
  type: "technical" | "non-technical" | "hackathon";
  form: string;
};
