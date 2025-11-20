import React from 'react';
import { IconCode, IconChart, IconShield } from '../components/Icons';
import { ServiceItem } from '../types';

const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      id: 1,
      title: 'Développement Web',
      description: 'Création de sites vitrines, e-commerce et applications web sur mesure avec React, Node.js et Tailwind.',
      icon: 'code'
    },
    {
      id: 2,
      title: 'Analyse de Données',
      description: 'Tableaux de bord interactifs et visualisation de données pour prendre les bonnes décisions stratégiques.',
      icon: 'chart'
    },
    {
      id: 3,
      title: 'Cybersécurité',
      description: 'Audit de sécurité et mise en place de protocoles robustes pour protéger vos infrastructures digitales.',
      icon: 'shield'
    }
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'code': return <IconCode className="h-8 w-8 text-white" />;
      case 'chart': return <IconChart className="h-8 w-8 text-white" />;
      case 'shield': return <IconShield className="h-8 w-8 text-white" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Nos Services</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Des solutions complètes adaptées aux défis de l'entreprise moderne.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-indigo-100 transition-all hover:shadow-xl group">
              <div className="p-8 flex-1">
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-indigo-600 shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                  {renderIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
                  En savoir plus <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 bg-indigo-600 rounded-3xl px-6 py-12 md:py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Vous avez un projet spécifique ?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Nos ingénieurs sont prêts à relever le défi. Discutons de vos besoins dès aujourd'hui.
          </p>
          <a href="#/contact" className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg hover:bg-indigo-50 transition-colors shadow-md">
            Demander un devis
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;