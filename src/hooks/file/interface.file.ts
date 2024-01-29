export interface CloudinaryResponse {
  access_mode: string;
  asset_id: string;
  bytes: number;
  created_at: Date;
  etag: string;
  folder: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: "video" | "image" | "raw";
  secure_url: string;
  signature: string;
  tags: [];
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
}
