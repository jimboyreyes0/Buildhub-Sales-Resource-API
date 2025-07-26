export default interface IApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T;
  timestamp: string;
  path?: string;
  requestId?: string;
  meta?: Record<string, any>;
  [key: string]: any; 
}