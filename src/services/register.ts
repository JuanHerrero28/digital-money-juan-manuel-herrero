export type RegisterData = {
  dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
};
  
  export type RegisterResponse = {
    token: string;
  };
  
  export async function RegisterUser(dataRegister: RegisterData): Promise<RegisterResponse> {
    const response = await fetch('https://digitalmoney.digitalhouse.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataRegister),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al registrar el usuario');
    }
  
    return response.json();
  }
  