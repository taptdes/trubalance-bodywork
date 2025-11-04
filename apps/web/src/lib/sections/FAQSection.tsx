import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "How long does it typically take to buy a home in Utah County?",
      answer: "The home buying process typically takes 30-45 days from offer acceptance to closing. However, this can vary based on factors like financing, inspections, and market conditions. I'll guide you through each step to ensure a smooth timeline."
    },
    {
      question: "What's the current market like for sellers?",
      answer: "Utah County continues to see strong demand, though the market has balanced compared to previous years. Home values remain strong, and well-priced, well-presented homes are still selling quickly. I'll provide a detailed market analysis for your specific area."
    },
    {
      question: "How much should I budget for closing costs?",
      answer: "Buyers typically budget 2-5% of the home price for closing costs, which include loan fees, title insurance, inspections, and other transaction costs. I work with trusted lenders who can provide detailed estimates early in the process."
    },
    {
      question: "Do you work with first-time homebuyers?",
      answer: "Absolutely! I love working with first-time buyers and understand the process can feel overwhelming. I'll educate you on each step, connect you with trusted lenders, and ensure you feel confident throughout your home buying journey."
    },
    {
      question: "What makes Utah County a great place to live?",
      answer: "Utah County offers an exceptional quality of life with excellent schools, outdoor recreation, growing job market (especially in tech), and strong community values. The area provides both urban amenities and small-town charm, making it perfect for families and professionals."
    },
    {
      question: "How do you determine the right listing price for my home?",
      answer: "I conduct a comprehensive market analysis looking at recent sales, current competition, market trends, and your home's unique features. This data-driven approach ensures we price your home competitively to attract buyers while maximizing your return."
    }
  ]

  return (
    <div className="relative shrink-0 w-full bg-linear-to-br from-white to-gray-50">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-start px-2.5 py-20 relative w-full">
          <div className="max-w-[1140px] relative shrink-0 w-full">
            <div className="text-center mb-16">
              <h2 className="font-primary font-montserrat text-[#1a1a1a] text-[42px] font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <p className="font-secondary font-roboto text-[#606060] text-[18px] max-w-2xl mx-auto leading-relaxed">
                Get answers to common real estate questions
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="font-primary font-montserrat text-[#1a1a1a] text-[18px] font-semibold text-left hover:no-underline hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-secondary font-roboto text-[#606060] text-[16px] leading-relaxed pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}