import React from 'react';
import { IconClock } from '../components/Icons';

const Closed: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden text-center p-8 md:p-12">
        <div className="flex justify-center mb-8">
          <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center animate-pulse">
            <IconClock className="h-12 w-12 text-indigo-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Nos bureaux sont fermés
        </h1>
        
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Le site web Nova Corp est accessible uniquement pendant nos heures de travail pour garantir la meilleure qualité de service.
        </p>
        
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Horaires d'ouverture</h3>
          <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
            <span className="font-medium text-gray-900">Lundi - Vendredi</span>
            <span className="font-bold text-indigo-600">09:00 - 17:00</span>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            <span>Samedi - Dimanche</span>
            <span>Fermé</span>
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-400">
          Veuillez revenir plus tard. Merci de votre compréhension.
        </div>
      </div>
    </div>
  );
};

export default Closed;