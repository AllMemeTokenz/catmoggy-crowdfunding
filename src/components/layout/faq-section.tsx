import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/app/data/site-data"; // Updated import

export default function FaqSection() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="w-full mx-auto max-w-7xl px-4 md:px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-navy-900 mb-4">
          Frequently Asked Questions
        </h2>
        <h4 className="text-lg text-navy-800 mb-10">
          Find answers to the most common questions about our project.
        </h4>
        <Accordion
          type="single"
          collapsible
          className="max-w-2xl mx-auto space-y-4"
        >
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
