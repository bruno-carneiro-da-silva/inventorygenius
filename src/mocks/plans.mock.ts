import { Plan } from "@/types/plan";

export const plans: Plan[] = [
  {
    id: 1,
    uid: "45412f3c-1ca7-4d33-a0b4-c1a7be1dc927",
    name: "Grátis",
    description: "Nosso plano mais popular para pequenas empresas",
    externalIntegrationPaymentId: null,
    statusId: 1,
    features: [
      {
        name: "QR Code Personalizado",
        description: "Customize seus QR codes conforme sua marca",
      },
      {
        name: "Insights dos dados",
        description:
          "Analise o comportamento do usuário com escaneamentos ilimitados",
      },
      {
        name: "Codificação Segura",
        description: "Criptografe QR codes para maior segurança",
      },
      {
        name: "Facilidade de Integração",
        description: "Integre a leitura de QR codes de forma simples",
      },
      {
        name: "Engajamento Personalizado",
        description:
          "Forneça conteúdo personalizado via escaneamentos de QR codes",
      },
    ],
    prices: [
      {
        id: 4,
        name: "Ano",
        price: 0,
        benefits: "teste",
      },
      {
        id: 8,
        name: "Mês",
        price: 0,
        benefits: "teste",
      },
    ],
  },
  {
    id: 2,
    uid: "3c36075d-a9f2-4f63-9ed5-d33e846dec09",
    name: "Core",
    description: "Nosso plano mais popular para startups",
    externalIntegrationPaymentId: null,
    statusId: 1,
    features: [
      {
        name: "Insights Analíticos",
        description:
          "Acesse 30 dias de dados detalhados de cliques e escaneamentos para tomada de decisões informadas",
      },
      {
        name: "Construtor de UTM",
        description:
          "Crie links rastreáveis com parâmetros UTM para análise precisa de campanhas",
      },
      {
        name: "Recursos de QR Personalizados",
        description:
          "Desbloqueie opções avançadas de personalização para seus QR codes, adaptadas às suas necessidades de branding",
      },
      {
        name: "Funcionalidade de Redirecionamento",
        description:
          "Redirecione facilmente os usuários via links ou QR codes para destinos desejados, otimizando a experiência e o engajamento do usuário",
      },
    ],
    prices: [
      {
        id: 3,
        name: "Ano",
        price: 999.99,
        benefits: "teste",
      },
      {
        id: 7,
        name: "Mês",
        price: 99.99,
        benefits: "teste",
      },
    ],
  },
  {
    id: 3,
    uid: "5f92a154-71d1-4068-906d-7e70c757237a",
    name: "Crescimento",
    description: "Nosso plano mais popular para empresas",
    externalIntegrationPaymentId: null,
    statusId: 1,
    features: [
      {
        name: "Domínio Personalizado",
        description:
          "Desfrute de um domínio personalizado gratuito para seus links de marca, melhorando sua presença online",
      },
      {
        name: "Links de Marca",
        description:
          "Crie links personalizados que refletem a identidade da sua marca para maior reconhecimento e confiança",
      },
      {
        name: "Análises Estendidas",
        description:
          "Acesse quatro meses de dados abrangentes de cliques e escaneamentos para obter insights mais profundos sobre o comportamento do usuário",
      },
      {
        name: "Encurtamento em Massa",
        description:
          "Encurte rapidamente vários links de uma vez para gerenciamento e distribuição eficientes",
      },
    ],
    prices: [
      {
        id: 2,
        name: "Ano",
        price: 999.99,
        benefits: "teste",
      },
      {
        id: 6,
        name: "Mês",
        price: 99.99,
        benefits: "teste",
      },
    ],
  },
  {
    id: 4,
    uid: "03116240-340a-499d-bfa1-3f84957dab45",
    name: "Premium",
    description: "Nosso plano mais popular para grandes empresas",
    externalIntegrationPaymentId: null,
    statusId: 1,
    features: [
      {
        name: "Análises de Um Ano",
        description:
          "Acesse um ano de dados detalhados de cliques e escaneamentos para acompanhar o desempenho e as tendências a longo prazo",
      },
      {
        name: "Rastreamento de Campanha Personalizado",
        description:
          "Implemente parâmetros de rastreamento personalizados no nível da campanha para análise e atribuição precisas",
      },
      {
        name: "Insights por Cidade e Dispositivo",
        description:
          "Obtenha insights sobre dados de cliques e escaneamentos no nível da cidade e do dispositivo, permitindo otimizações direcionadas e segmentação de público",
      },
      {
        name: "Deep Linking Móvel",
        description:
          "Habilite a navegação perfeita para conteúdo específico do aplicativo com deep linking móvel, melhorando a experiência e o engajamento do usuário",
      },
    ],
    prices: [
      {
        id: 1,
        name: "Ano",
        price: 999.99,
        benefits: "teste",
      },
      {
        id: 5,
        name: "Mês",
        price: 99.99,
        benefits: "teste",
      },
    ],
  },
];
