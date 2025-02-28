"use client";

import { UserButton } from "@clerk/nextjs";

const UserProfileButton = () => {
  return <UserButton afterSignOutUrl="/sign-in" />;
};

export default UserProfileButton;
