import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
              <span className="block">Transformez vos idées en</span>
              <span className="block text-indigo-600">réalité digitale</span>
            </h1>
            <p className="mt-6 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
              Nova Corp accompagne les entreprises ambitieuses dans leur transformation numérique. 
              Design, développement et stratégie sur mesure.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/services"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all shadow-lg hover:shadow-xl"
              >
                Nos Services
              </Link>
              <Link
                to="/contact"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-all"
              >
                Contactez-nous
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Notre Valeur Ajoutée</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Pourquoi choisir Nova Corp ?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-indigo-600 mb-4">01</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expertise Technique</h3>
              <p className="text-gray-600">Nous utilisons les dernières technologies pour garantir performance et sécurité.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-indigo-600 mb-4">02</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Design Centré Utilisateur</h3>
              <p className="text-gray-600">Des interfaces intuitives et élégantes qui engagent vos clients.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-indigo-600 mb-4">03</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Support Réactif</h3>
              <p className="text-gray-600">Une équipe disponible pour vous accompagner à chaque étape.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;