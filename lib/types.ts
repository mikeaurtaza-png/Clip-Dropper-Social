export type ClipStatus = "draft" | "scheduled" | "posted" | "failed";
export type Clip = {
  id: string; filename: string; dropbox_path?: string; video_url?: string; status: ClipStatus;
  youtube_title?: string; youtube_description?: string; youtube_tags?: string;
  facebook_caption?: string; scheduled_at?: string; posted_at?: string;
  youtube_video_id?: string; youtube_url?: string; facebook_post_id?: string; facebook_url?: string;
  yt_views?: number; yt_likes?: number; yt_comments?: number; fb_views?: number; fb_reactions?: number; fb_comments?: number; fb_shares?: number;
  error?: string; created_at: string; updated_at?: string;
};
export type Connection = { provider: "google"|"youtube"|"dropbox"|"facebook"|"openai"; account_name?: string; access_token?: string; refresh_token?: string; expires_at?: string; meta?: Record<string, unknown>; connected_at?: string };
