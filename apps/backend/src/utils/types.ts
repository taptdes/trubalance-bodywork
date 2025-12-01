export interface Article {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  featured: boolean;
  imageUrl: string;
  authorName: string;
  createdAt: string;
  views: number;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userName: string;
  content: string;
  createdAt: string;
}