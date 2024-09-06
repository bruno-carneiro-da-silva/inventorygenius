import { Plan } from "../types/plans";

export const plans: Plan[] = [
  {
    id: 1,
    uid: "45412f3c-1ca7-4d33-a0b4-c1a7be1dc927",
    name: "Free",
    description: "Our most popular plan for small teams",
    externalIntegrationPaymentId: null,
    statusId: 1,
    features: [
      {
        name: "Branded QR Codes",
        description: "Customize QR codes to match your brand",
      },
      {
        name: "Data Insights",
        description: "Analyze user behavior with unlimited scans",
      },
      {
        name: "Secure Encoding",
        description: "Encrypt QR codes for enhanced security",
      },
      {
        name: "Integration Ease",
        description: "Seamlessly integrate QR scanning",
      },
      {
        name: "Personalized Engagement",
        description: "Deliver tailored content via QR scans",
      },
    ],
    prices: [
      {
        id: 4,
        name: "Year",
        price: 0,
        benefits: "teste",
      },
      {
        id: 8,
        name: "Month",
        price: 0,
        benefits: "teste",
      },
    ],
  },
  {
    id: 2,
    uid: "3c36075d-a9f2-4f63-9ed5-d33e846dec09",
    name: "Core",
    description: "Our most popular plan for startups",
    externalIntegrationPaymentId: null,
    statusId: 1,
    features: [
      {
        name: "Analytics Insights",
        description:
          "Access 30 days of detailed click and scan data for informed decision-making",
      },
      {
        name: "UTM Builder",
        description:
          "Create trackable links with UTM parameters for precise campaign analysis",
      },
      {
        name: "Custom QR Features",
        description:
          "Unlock advanced customization options for your QR codes, tailored to your branding needs",
      },
      {
        name: "Redirect Functionality",
        description:
          "Easily redirect users via links or QR codes to desired destinations, optimizing user experience and engagement",
      },
    ],
    prices: [
      {
        id: 3,
        name: "Year",
        price: 999.99,
        benefits: "teste",
      },
      {
        id: 7,
        name: "Month",
        price: 99.99,
        benefits: "teste",
      },
    ],
  },
  {
    id: 3,
    uid: "5f92a154-71d1-4068-906d-7e70c757237a",
    name: "Growth",
    description: "Our most popular plan for companies",
    externalIntegrationPaymentId: null,
    statusId: 1,
    features: [
      {
        name: "Custom Domain",
        description:
          "Enjoy a complimentary custom domain for your branded links, enhancing your online presence",
      },
      {
        name: "Branded Links",
        description:
          "Create personalized links reflecting your brand identify for increased recognition and trust",
      },
      {
        name: "Extended Analytics",
        description:
          "Access four months of comprehensive click and scan data for deeper insights into user behavior",
      },
      {
        name: "Bulk Shortening",
        description:
          "Quickly shorten multiple links at once for efficient management and distribution",
      },
    ],
    prices: [
      {
        id: 2,
        name: "Year",
        price: 999.99,
        benefits: "teste",
      },
      {
        id: 6,
        name: "Month",
        price: 99.99,
        benefits: "teste",
      },
    ],
  },
  {
    id: 4,
    uid: "03116240-340a-499d-bfa1-3f84957dab45",
    name: "Premium",
    description: "Our most popular plan for enterprises",
    externalIntegrationPaymentId: null,
    statusId: 1,
    features: [
      {
        name: "Year-Long Analytics",
        description:
          "Access one year of detailed click and scan data to track long-term performance and trends",
      },
      {
        name: "Custom Campaign Tracking",
        description:
          "Implement custom tracking parameters at the campaign level for precise analysis and attribution",
      },
      {
        name: "City-Level & Device Insights",
        description:
          "Gain insights into click and scan data at the city and device level, allowing targeted optimizations and audience segmentation",
      },
      {
        name: "Mobile Deep Linking",
        description:
          "Enable seamless navigation to specific app content with mobile deep linking, enhancing user experience and engagement",
      },
    ],
    prices: [
      {
        id: 1,
        name: "Year",
        price: 999.99,
        benefits: "teste",
      },
      {
        id: 5,
        name: "Month",
        price: 99.99,
        benefits: "teste",
      },
    ],
  },
];
