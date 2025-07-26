export async function logoutUser(): Promise<void> {
    const token = localStorage.getItem('token');
  
    await fetch('https://digitalmoney.digitalhouse.com/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
  
    
    localStorage.removeItem('token');
  }
  