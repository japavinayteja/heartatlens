export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface WebsiteImage {
  id: string;
  section: 'hero' | 'services' | 'recent-work';
  category?: string;
  url: string;
  filename: string;
  uploadedAt: Date;
}