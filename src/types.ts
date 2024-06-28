export interface ApiPost {
  title: string;
  description: string;
  date: string;
}

export interface ApiPosts {
  [id: string]: ApiPost;
}

export interface Post extends ApiPost {
  id: string;
}