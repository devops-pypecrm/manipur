import ContactUsPage from "@/components/ContactUsPage";

export const metadata = {
  title: "Contact MIU | Manipur International University, Imphal",
  description:
    "Contact Manipur International University — address, email, campus map and office hours.",
  alternates: { canonical: "https://miu.edu.in/contact" },
  openGraph: {
    title: "Contact MIU | Manipur International University",
    description:
      "Get in touch with MIU Imphal. Email and visit us.",
    url: "https://miu.edu.in/contact",
  },
};

export default function ContactPage() {
  return <ContactUsPage />;
}
