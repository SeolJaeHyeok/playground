"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import browserClient from "@/utils/supabase/client";
import React from "react";

const LoginPage = () => {
  async function signInWithGithub() {
    await browserClient.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: window.origin + "/auth/callback" },
    });
  }

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Card className="max-w-[420px] px-4 w-full border-0 shadow-none">
        <CardHeader className="items-center p-0 pb-10">
          <CardTitle className="text-4xl font-bold">Welcome</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            onClick={signInWithGithub}
            className="rounded-sm p-3 text-lg font-bold h-auto"
          >
            Sign In With Github
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default LoginPage;
