type Src = string | (<T = string>() => Promise<T>);

type Optional<T> = T | null | undefined;

type User = {
  id: string;
  name?: string;
  avatarUrl?: Optional<string>;
  //roles?: Array<string>; not used
  phoneNumber?: Optional<string>;
  //displayName?: Optional<string>; not used
  email?: Optional<string>;
};
