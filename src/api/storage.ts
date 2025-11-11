// DEMO-ONLY Storage API - No backend connectivity
import { MockApiService } from '../lib/mockApi';

export type FileInfo = {
  id: number;
  name: string;
  size: number;
  uploadedBy: string;
  date: string;
  mimetype?: string;
};

// Demo-only storage functions using mock data
export async function listFiles(_token: string): Promise<FileInfo[]> {
  const response = await MockApiService.getFiles();
  return response.json();
}

export async function uploadFiles(files: File[], _token: string): Promise<void> {
  await MockApiService.uploadFiles(files);
  // No return value needed for demo
}

export async function deleteFile(id: number, _token: string): Promise<void> {
  await MockApiService.deleteFile(id);
  // No return value needed for demo
}

export async function downloadFile(id: number, _token: string): Promise<Blob> {
  const response = await MockApiService.downloadFile(id);
  return response.blob();
}
