import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "lucide-react";

const faqs = [
  {
    category: "Général",
    questions: [
      {
        question: "Qu'est-ce que RepriseSanté ?",
        answer:
          "RepriseSanté est une plateforme facilitant la mise en relation entre les professionnels de santé partant à la retraite et ceux cherchant à reprendre leur activité. Elle vise à lutter contre la désertification médicale en simplifiant la transmission des cabinets et établissements médicaux.",
      },
      {
        question: "Qui peut utiliser RepriseSanté ?",
        answer:
          "Tous les professionnels de santé, qu'ils soient médecins généralistes, spécialistes, infirmiers, dentistes, pharmaciens, psychologues, ou autres soignants souhaitant céder ou reprendre une activité.",
      },
      {
        question: "Comment fonctionne la plateforme ?",
        answer:
          "Les professionnels de santé à la retraite peuvent accéder aux profils des médecins remplaçants et ils peuvent les contacter",
      },
    ],
  },
  {
    category: "Inscription & Utilisation",
    questions: [
      {
        question: "Comment créer un compte ?",
        answer:
          "Il suffit de s'inscrire sur la plateforme en remplissant un formulaire d'inscription, il vous faudra ensuite remplir votre profil pour pouvoir contacter les soignants.",
      },
      {
        question: "L'inscription est-elle gratuite ?",
        answer:
          "L'inscription de base est gratuite. Toutefois, lorsque vous souhaiter contacter un soignant, il faudra effectuer un paiment.",
      },
    ],
  },
  {
    category: "Mise en relation & Processus",
    questions: [
      {
        question: "Comment contacter un professionnel ?",
        answer:
          "Une fois inscrit, vous pouvez envoyer un message aux professionnels de santé avec leurs informations de contact.",
      },
      {
        question: "Est-ce que RepriseSanté intervient dans les transactions ?",
        answer:
          "Non, la plateforme facilite uniquement la mise en relation. Les modalités de cession ou de collaboration sont à définir directement entre les parties concernées.",
      },
      {
        question:
          "Puis-je publier une annonce si je cherche uniquement un associé et non un remplaçant ?",
        answer:
          "Oui, RepriseSanté peut aussi être utilisé pour rechercher un associé ou un collaborateur.",
      },
    ],
  },
  {
    category: "Aspects Légaux & Sécurité",
    questions: [
      {
        question: "Les annonces sont-elles vérifiées ?",
        answer:
          "Oui, nous vérifions chaque inscription pour garantir un réseau fiable et sécurisé.",
      },
      {
        question: "Comment sont protégées mes données personnelles ?",
        answer:
          "Nous respectons les réglementations en vigueur (RGPD) et assurons la protection de vos données. Elles ne sont ni vendues ni partagées avec des tiers sans votre consentement.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="w-full px-4 pt-16">
      <h1 className="text-2xl font-bold text-center p-6">
        Foire aux questions
      </h1>
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-8">
        {faqs.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{section.category}</h2>
            {section.questions.map((item, itemIdx) => (
              <Disclosure key={itemIdx} as="div" className="mt-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span>{item.question}</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-blue-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      {item.answer}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
