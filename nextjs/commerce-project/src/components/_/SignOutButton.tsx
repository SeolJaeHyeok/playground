"use client";

import { Button } from "../ui/button";
import browserClient from "@/utils/supabase/client";

export const SignOutButton = () => {
  const onSignOut = async () => {
    await browserClient.auth.signOut();
    window.location.reload();
  };

  return (
    <Button
      onClick={onSignOut}
      className="h-9 flex text-white items-center py-1 px-4 rounded-md bg-gray-800"
    >
      Sign Out
    </Button>
  );
};
