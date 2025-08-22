import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'suporte@vyntrixhost.com',
      description: 'Resposta em até 2 horas'
    },
    {
      icon: Phone,
      title: 'Telefone',
      content: '(11) 9999-9999',
      description: 'Atendimento 24/7'
    },
    {
      icon: MapPin,
      title: 'Localização',
      content: 'São Paulo, SP',
      description: 'Brasil'
    }
  ];

  const supportTypes = [
    {
      icon: MessageCircle,
      title: 'Suporte Técnico',
      description: 'Problemas com hospedagem, configurações e performance',
      response: 'Resposta imediata'
    },
    {
      icon: Mail,
      title: 'Vendas',
      description: 'Dúvidas sobre planos, preços e recursos',
      response: 'Resposta em 1 hora'
    },
    {
      icon: Clock,
      title: 'Suporte Geral',
      description: 'Outras questões e informações gerais',
      response: 'Resposta em 2 horas'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a237e] to-[#1a237e]/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Entre em <span className="text-[#00e676]">Contato</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Nossa equipe está sempre pronta para ajudar você. 
            Entre em contato conosco através dos canais abaixo ou envie uma mensagem.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-[#00e676]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <info.icon className="h-8 w-8 text-[#00e676]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a237e] mb-2">
                  {info.title}
                </h3>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {info.content}
                </p>
                <p className="text-gray-600">
                  {info.description}
                </p>
              </div>
            ))}
          </div>

          {/* Support Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1a237e] text-center mb-12">
              Como Podemos Ajudar?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportTypes.map((support, index) => (
                <div key={index} className="p-6 bg-white rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#00e676]/10 p-3 rounded-full mr-4">
                      <support.icon className="h-6 w-6 text-[#00e676]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1a237e]">
                      {support.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {support.description}
                  </p>
                  <p className="text-sm text-[#00e676] font-medium">
                    {support.response}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] mb-4">
              Envie uma Mensagem
            </h2>
            <p className="text-xl text-gray-600">
              Preencha o formulário abaixo e entraremos em contato o mais rápido possível.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="bg-[#00e676]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="h-10 w-10 text-[#00e676]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a237e] mb-4">
                  Mensagem Enviada!
                </h3>
                <p className="text-gray-600">
                  Recebemos sua mensagem e entraremos em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00e676] focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00e676] focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00e676] focus:border-transparent"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="suporte-tecnico">Suporte Técnico</option>
                    <option value="vendas">Dúvidas sobre Planos</option>
                    <option value="faturamento">Faturamento</option>
                    <option value="geral">Informações Gerais</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00e676] focus:border-transparent"
                    placeholder="Descreva sua dúvida ou solicitação..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-8 py-4 bg-[#00e676] text-white rounded-lg hover:bg-[#00e676]/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Encontre respostas para as dúvidas mais comuns
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-[#1a237e] mb-3">
                Quanto tempo leva para ativar minha hospedagem?
              </h3>
              <p className="text-gray-600">
                Após a confirmação do pagamento, sua hospedagem é ativada em até 24 horas. 
                Você receberá um email com todos os dados de acesso.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-[#1a237e] mb-3">
                Posso mudar de plano a qualquer momento?
              </h3>
              <p className="text-gray-600">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento 
                através do painel do cliente ou entrando em contato conosco.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-[#1a237e] mb-3">
                Vocês oferecem garantia de devolução?
              </h3>
              <p className="text-gray-600">
                Oferecemos 30 dias de garantia. Se não ficar satisfeito, devolvemos 100% do valor pago.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}