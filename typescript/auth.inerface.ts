// interface loginProps {
//     email: string;
//     password: string;
//     message:string;
//     token:string;
//   }
export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ErrorResponse {
  error: string;
}
