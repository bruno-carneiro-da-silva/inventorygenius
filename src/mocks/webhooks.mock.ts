import TelegramImage from "../assets/instagram.png";
import SMSImage from "../assets/sms.png";
import { Webhook } from "../types/webhook";

export const webhooks: Webhook[] = [
  {
    id: "1",
    name: "Instagram",
    description:
      "Visual Storytelling, Photo & Video Sharing, Influencer Marketing",
    image: TelegramImage,
    status: true,
  },
  {
    id: "2",
    name: "SMS/MMS",
    description: "Text Messaging, Multimedia Sharing, Instant Communication",
    image: SMSImage,
    status: false,
  },
];
