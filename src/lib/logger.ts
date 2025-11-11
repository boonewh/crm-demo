// Demo-only logger - no backend connectivity
export async function logFrontendError(message: string, context: any = {}) {
  // In demo mode, just log to console instead of backend
  console.error('Frontend Error:', message, context);
}