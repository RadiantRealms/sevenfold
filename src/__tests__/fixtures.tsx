import { UserProvider, UserProviderProps } from "@auth0/nextjs-auth0/client";

export const mockUser = {
  email: "foo@example.com",
  email_verified: true,
  name: "foo",
  nickname: "foo",
  picture: "foo.jpg",
  sub: "foo",
  organizationId: "1",
  updated_at: null,
};

export const withUserProvider = ({ user = {} }) => {
  // eslint-disable-next-line react/display-name
  return (props: UserProviderProps) => <UserProvider {...props} user={user} />;
};
