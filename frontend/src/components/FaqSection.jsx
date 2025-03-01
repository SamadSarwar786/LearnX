import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQSection() {
  return (
    <section className="w-full bg-slate-50 py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            <p className="text-gray-500 md:text-lg">
              Find answers to common questions about LearnX platform and our courses
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">How does LearnX online learning work?</AccordionTrigger>
              <AccordionContent>
                LearnX provides flexible online courses that you can access anytime, anywhere. Our platform includes
                video lectures. You can learn at your own pace and track your progress through our user-friendly dashboard.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">What types of courses are available?</AccordionTrigger>
              <AccordionContent>
                We offer a wide range of courses across various categories including: Programming, Data Science,
                Business, Design, Marketing, and Personal Development. Each course is created by industry experts and
                regularly updated to reflect current trends and technologies.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">What are the payment options?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards, including Visa, Mastercard, and American Express. You can 
                purchase individual courses.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">Is there any support available if I get stuck?</AccordionTrigger>
              <AccordionContent>
                We provide multiple support channels: • 24/7 technical support • Course-specific Q&A forums • Direct
                messaging with instructors • Active community of learners • Regular live Q&A sessions
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">Can I access courses on mobile devices?</AccordionTrigger>
              <AccordionContent>
                Yes, LearnX is fully responsive and works on all devices.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="text-center pt-8">
            <p className="text-gray-500">
              Still have questions?{" "}
              <a href="mailto:saumyaverma578@gmail.com" className="text-primary font-medium hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

