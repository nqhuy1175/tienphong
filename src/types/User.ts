interface User {
  user: {
    id: string;
    name: string;
    email: string;
    photo: string;
    familyName: string;
    givenName: string;
  };
  scopes?: string[];
  accessToken: string | null;
  licence: string | null;
}
