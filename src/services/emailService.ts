import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface EmailParams {
  [key: string]: unknown;
}

export const sendOrderEmail = async (params: EmailParams): Promise<void> => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error("EmailJS environment variables are missing.");
    throw new Error("Email configuration is missing.");
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
