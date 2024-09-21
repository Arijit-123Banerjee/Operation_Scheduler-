import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <FaChevronUp className="h-5 w-5 text-sky-500" />
        ) : (
          <FaChevronDown className="h-5 w-5 text-sky-500" />
        )}
      </button>
      {isOpen && (
        <div className="pb-5">
          <p className="text-base text-gray-500">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqSection = () => {
  const faqs = [
    {
      question: "How do I schedule an appointment?",
      answer:
        "You can schedule an appointment through our online portal or by calling our reception desk. If you're a new patient, you'll need to create an account first.",
    },
    {
      question: "What insurance plans do you accept?",
      answer:
        "We accept a wide range of insurance plans. Please check our insurance page or contact our billing department for a complete list of accepted providers.",
    },
    {
      question: "How can I access my medical records?",
      answer:
        "You can access your medical records through our secure patient portal. If you need assistance, please contact our medical records department.",
    },
    {
      question: "What should I bring to my first appointment?",
      answer:
        "Please bring a valid ID, your insurance card, a list of current medications, and any relevant medical history or test results from previous healthcare providers.",
    },
    {
      question: "How do I find out about visiting hours?",
      answer:
        "Visiting hours vary by department. Please check our website or call the specific department you wish to visit for the most up-to-date information.",
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Find answers to common questions about our services and policies.
          </p>
        </div>
        <div className="mt-12">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
