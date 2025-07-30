export interface Gallery {
  id: string;
  name: string;
  category: 'wedding' | 'prewedding' | 'birthday' | 'babyshower';
  password: string;
  images: GalleryImage[];
  createdAt: Date;
  isPublic: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  thumbnail: string;
  filename: string;
  uploadedAt: Date;
}

export interface Admin {
  username: string;
  password: string;
}

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