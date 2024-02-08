const TermsAndConditionPage = () => {
  return (
    <div className="h-fix">
      <div className="container-fix flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className=" text-2xl text-center  text-white font-semibold underline underline-offset-8 decoration-ui-primary">
            Terms and Conditions
          </h1>
          <p className=" text-justify text-foreground/60 text-base">
            These terms and conditions govern your participation in the AI
            ZYPHER Events. By registering for or attending the events in AI
            ZYPHER, you agree to comply with these Terms.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-left text-xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
            Registration
          </h2>
          <p className="text-foreground/60 text-justify mt-4">
            <span className="text-ui-primary font-bold">1.Eligibility:</span>{" "}
            Participation in the Events is open only to B.E and B.TECH students.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">2.Registration:</span>{" "}
            All participants must register online, or at the designated
            registration desk on the day of the events. Registration may require
            providing personal information such as name, contact details, and
            affiliation.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">
              3.Registration Fees:
            </span>{" "}
            Any registration fees must be paid in full at the time of
            registration, unless otherwise specified. Fees are non-refundable,
            except in the case of event cancellation by the organizers.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-left text-xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
            Code of Conduct
          </h2>
          <p className="text-foreground/60 text-justify mt-4">
            <span className="text-ui-primary font-bold">
              4.Respectful Behavior:
            </span>{" "}
            Participants must conduct themselves in a respectful and
            professional manner at all times during the Events. Harassment,
            discrimination, or any form of disruptive behavior will not be
            tolerated and will result in immediate expulsion from the event.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">
              5.Compliance with Policies:
            </span>{" "}
            Participants must comply with all applicable policies and
            regulations of AI ZYPHER and any venue hosting the events.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">
              6.Photography and Recording:
            </span>{" "}
            By attending the events, you consent to be photographed, filmed, or
            recorded for prol and archival purposes. The organizers may use
            these materials in future marketing materials or publications.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-left text-xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
            Liability and Disclaimer
          </h2>
          <p className="text-foreground/60 text-justify mt-4">
            <span className="text-ui-primary font-bold">
              7.Assumption of Risk:
            </span>{" "}
            Participation in the events may involve certain risks, including but
            not limited to personal injury, property damage, or loss. By
            attending the events, participants assume all risks associated with
            their participation and release AI ZYPHER and its affiliates from
            any liability arising from such risks.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">
              8.Personal Belongings:
            </span>{" "}
            Participants are responsible for their personal belongings at all
            times during the Events. AI ZYPHER and its affiliates are not liable
            for any loss, theft, or damage to personal property.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">
              9.Program Changes:
            </span>{" "}
            The organizers reserve the right to make changes to the events
            program, schedule, speakers, or venue without prior notice. Any such
            changes will be communicated to participants as soon as possible.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-left text-xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
            Miscellaneous
          </h2>
          <p className="text-foreground/60 text-justify mt-4">
            <span className="text-ui-primary font-bold">10.Governing Law:</span>{" "}
            Any disputes arising under these terms shall be subject to the
            exclusive jurisdiction of the judges presiding over the respective
            events.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">
              11.Entire Agreement:
            </span>{" "}
            These Terms constitute the entire agreement between the participants
            and AI ZYPHER regarding the events, superseding any prior agreements
            or understandings, whether written or oral.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionPage;
