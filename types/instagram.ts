export interface InstagramAccount {
  id: string;
  username: string;
  profile_picture: string;
  followers: number;
  following: number;
  media_count: number;
  is_connected: boolean;
}

export interface InstagramMedia {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption: string;
  timestamp: string;
  comments_count: number;
  like_count: number;
}