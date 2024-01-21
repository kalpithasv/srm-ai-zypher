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
  description: string;
  team_size: [number, number];
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
};
