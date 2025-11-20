import React, { useState, useRef, useEffect } from 'react';
import { ContactFormState } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const successRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const prevStatusRef = useRef<string>(status);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  // Focus management
  useEffect(() => {
    // Move focus to the success message when it appears
    if (status === 'success' && successRef.current) {
      successRef.current.focus();
    }
    
    // Move focus back to the first input when resetting the form (from success to idle)
    if (status === 'idle' && prevStatusRef.current === 'success' && nameInputRef.current) {
      nameInputRef.current.focus();
    }

    prevStatusRef.current = status;
  }, [status]);

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Contactez-nous</h1>
          <p className="mt-4 text-lg text-gray-500">
            Une question ? Une proposition ? Remplissez le formulaire ci-dessous.
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
          {status === 'success' ? (
            <div 
              ref={successRef}
              tabIndex={-1} // Allows programmatic focus
              className="text-center py-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg"
              role="alert"
              aria-labelledby="success-title"
              aria-describedby="success-desc"
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6" aria-hidden="true">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 id="success-title" className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h2>
              <p id="success-desc" className="text-gray-600">Merci de nous avoir contactés. Nous reviendrons vers vous sous 24 heures ouvrées.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 text-indigo-600 font-medium hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md px-4 py-2 transition-colors"
                aria-label="Envoyer un nouveau message"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulaire de contact">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom complet <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <div className="mt-1">
                  <input
                    ref={nameInputRef}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                    placeholder="Jean Dupont"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse email <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                    placeholder="jean@exemple.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Votre message <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    aria-required="true"
                    autoComplete="off"
                    value={formData.message}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                    placeholder="Dites-nous tout..."
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  // Use aria-disabled instead of disabled to maintain focus during loading
                  aria-disabled={status === 'submitting'}
                  aria-busy={status === 'submitting'}
                  onClick={(e) => {
                    if (status === 'submitting') {
                      e.preventDefault();
                    }
                  }}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                    status === 'submitting' 
                      ? 'bg-indigo-400 cursor-wait opacity-90' 
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  } transition-colors`}
                >
                  {status === 'submitting' ? (
                    <>
                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                    </>
                  ) : 'Envoyer le message'}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Nous répondons du Lundi au Vendredi, de 09h à 17h.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;