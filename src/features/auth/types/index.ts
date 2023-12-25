export interface RegisterDTO {
  email: string;
  username: string;
  password: string;
}

export type LoginDTO = Omit<RegisterDTO, 'username'>;

export interface OperationResult {
  success: boolean;
  error?: any;
  data: any;
  statusCode: number;
}
