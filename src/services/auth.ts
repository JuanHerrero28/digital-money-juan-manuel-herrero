export type Credentials = {
    email: string;
    password: string;
  };
  
  export type LoginResponse = {
    token: string;
  };
  
  export async function loginUser(credentials: Credentials): Promise<LoginResponse> {
    const response = await fetch('https://digitalmoney.digitalhouse.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al iniciar sesión');
    }
  
    return response.json();
  }
  