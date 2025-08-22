import React from 'react';
import { Server, Users, Award, Zap, Shield, Clock } from 'lucide-react';

export function About() {
  const stats = [
    { number: '10K+', label: 'Sites hospedados' },
    { number: '99.9%', label: 'Uptime garantido' },
    { number: '24/7', label: 'Suporte disponível' },
    { number: '5+', label: 'Anos de experiência' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Segurança em Primeiro Lugar',
      description: 'Protegemos seus dados com as melhores práticas de segurança e certificados SSL gratuitos.'
    },
    {
      icon: Zap,
      title: 'Performance Superior',
      description: 'Servidores otimizados e CDN global para garantir que seu site carregue rapidamente em qualquer lugar.'
    },
    {
      icon: Users,
      title: 'Suporte Especializado',
      description: 'Nossa equipe técnica está sempre pronta para ajudar você com qualquer questão ou dúvida.'
    },
    {
      icon: Clock,
      title: 'Disponibilidade 24/7',
      description: 'Monitoramento constante e infraestrutura redundante para manter seu site sempre online.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a237e] to-[#1a237e]/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre a <span className="text-[#00e676]">VyntrixHost</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Somos uma empresa especializada em hospedagem web, comprometida em oferecer 
            soluções confiáveis e performáticas para impulsionar seu negócio online.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Acreditamos que toda empresa, desde startups até grandes corporações, 
                merece uma hospedagem web confiável, rápida e acessível. Nossa missão é 
                democratizar o acesso a tecnologias de ponta, oferecendo planos flexíveis 
                que crescem junto com seu negócio.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Com anos de experiência no mercado de tecnologia, construímos a VyntrixHost 
                com foco na simplicidade, performance e, principalmente, na satisfação do cliente.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-[#00e676]/10 p-3 rounded-full">
                  <Server className="h-8 w-8 text-[#00e676]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a237e]">Tecnologia de Ponta</h3>
                  <p className="text-gray-600">Servidores modernos e infraestrutura escalável</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-[#00e676] to-[#00e676]/80 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Por que nos escolher?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Infraestrutura robusta e confiável
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Suporte técnico especializado
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Preços competitivos e transparentes
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Facilidade de uso para todos os níveis
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] mb-4">
              Números que Falam por Si
            </h2>
            <p className="text-xl text-gray-600">
              A confiança de nossos clientes refletida em números
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-[#00e676] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600">
              Os princípios que guiam nosso trabalho e relacionamento com clientes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-start space-x-6 p-6 bg-gray-50 rounded-xl">
                <div className="bg-[#00e676]/10 p-3 rounded-full flex-shrink-0">
                  <value.icon className="h-8 w-8 text-[#00e676]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a237e] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#1a237e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nossa Equipe
          </h2>
          <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Profissionais experientes e apaixonados por tecnologia, dedicados a 
            oferecer o melhor serviço de hospedagem para você.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
              <div className="w-20 h-20 bg-[#00e676] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Equipe Técnica</h3>
              <p className="text-gray-200">
                Especialistas em infraestrutura e desenvolvimento web
              </p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
              <div className="w-20 h-20 bg-[#00e676] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suporte 24/7</h3>
              <p className="text-gray-200">
                Atendimento sempre disponível para resolver suas dúvidas
              </p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
              <div className="w-20 h-20 bg-[#00e676] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Experiência</h3>
              <p className="text-gray-200">
                Anos de experiência em hospedagem web e cloud computing
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}