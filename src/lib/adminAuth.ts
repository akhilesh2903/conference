export function checkAdminAuth(request: Request): { authorized: boolean; username?: string } {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return { authorized: false };
  }

  try {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    const expectedUser = process.env.ADMIN_USERNAME || 'admin';
    const expectedPass = process.env.ADMIN_PASSWORD || 'adminsecret123';

    if (username === expectedUser && password === expectedPass) {
      return { authorized: true, username };
    }
    return { authorized: false };
  } catch {
    return { authorized: false };
  }
}

