const PrivacyPolicyPage = () => {
  return (
    <div className="h-fix">
      <div className="container-fix flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className=" text-2xl text-center  text-white font-semibold underline underline-offset-8 decoration-ui-primary">
            Privacy Policy
          </h1>
          <p className=" text-justify text-foreground/60 text-base">
            This Privacy Policy describes how AI ZYPHER collects, uses, and
            discloses personal information when the user visits or makes use of
            our website for any purpose.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-left text-xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
            Information We Collect:
          </h2>
          <p className="text-foreground/60 text-justify mt-4">
            <span className="text-ui-primary font-bold">
              1.Personal Information:
            </span>{" "}
            When you register an account, purchase tickets, or sign up for
            updates, we may collect personal information such as your name,
            email address, phone number, and billing information.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">
              2.Event Preferences:
            </span>{" "}
            We may collect information about your event preferences, such as the
            types of events you&apos;re interested in attending.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">
              3.Usage Information:
            </span>{" "}
            We may collect information about how you use our website, including
            the pages you visit, the links you click, and the actions you take.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-left text-xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
            How We Use Your Information
          </h2>
          <p className="text-foreground/60 text-justify mt-4">
            <span className="text-ui-primary font-bold">
              4.To Provide and Improve Our Service:
            </span>{" "}
            We use the information we collect to provide our services to you,
            including processing ticket purchases, sending event updates, and
            improving the functionality of our website.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">
              5.To Communicate With You:
            </span>{" "}
            We may use your contact information to send you promotional emails,
            newsletters, or other communications about upcoming events.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">Note:</span> By You can
            opt out of receiving these communications at any time.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-left text-xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
            How We Share Your Information
          </h2>
          <p className="text-foreground/60 text-justify mt-4">
            <span className="text-ui-primary font-bold">
              7.With Event Organizers:
            </span>{" "}
            We may share your information with event organizers whose events you
            express interest in or attend, but only to the extent necessary to
            facilitate your participation in those events.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">
              8.With Service Providers:
            </span>{" "}
            We may share your information with third-party service providers who
            help us operate our website, process payments, or send
            communications on our behalf. These service providers are bound by
            confidentiality obligations and are prohibited from using your
            information for any other purpose.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">9.Data Retention</span>{" "}
            We will retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">
              10.Rights of the Participants
            </span>{" "}
            You may have certain rights regarding your personal information,
            including the right to access, correct, or delete your information.
            If you have any questions or concerns about how we handle your
            personal information, please contact us using the contact
            information provided below.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">
              11.Changes to This Privacy Policy
            </span>{" "}
            We may update or modify this Privacy Policy from time to time. If we
            make any material changes to this Privacy Policy, we will notify you
            by posting the updated policy on our website or by other means as
            required by law. Your continued use of our website after any such
            changes constitutes your acceptance of the revised Privacy Policy.
          </p>
          <p className="text-foreground/60 text-justify">
            <span className="text-ui-primary font-bold">Contact Us</span> If you
            have any questions or concerns about this Privacy Policy or our
            privacy practices, you may contact us at{" "}
            <span className="text-ui-primary font-medium">+91 7200836551.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
