export interface Image {
  id: string;
  alt_description: string;
  alt: string;
  description: string;
  color: string;
  likes: number;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
    location: string;
  };
}


