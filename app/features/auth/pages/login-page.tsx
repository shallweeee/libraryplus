import type { Route } from "./+types/login-page";

import { LoaderCircle } from "lucide-react";
import { redirect } from "react-router";
import { Form, useNavigation } from "react-router";
import z from "zod";

import { InputPair } from "~/common/components/input-pair";
import { ShineBorder } from "~/common/components/magicui/shine-border";
import { Button } from "~/common/components/ui/button";
import { parseFormData } from "~/common/parsers";
import { makeSSRClient } from "~/supa-client";

const formSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters" }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { error, data } = await parseFormData(formSchema, request);
  if (error) {
    return { ...error, loginError: null };
  }

  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: loginError } = await client.auth.signInWithPassword({ email, password });
  if (loginError) {
    return { formErrors: null, loginError: loginError.message };
  }

  return redirect("/search", { headers });
};

export const meta: Route.MetaFunction = () => {
  return [{ title: "로그인 | 도서관⁺" }];
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="relative">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-10 p-10">
          <h1 className="text-2xl font-semibold">로그인</h1>
          <Form className="w-full space-y-4" method="post">
            <InputPair
              id="email"
              label="이메일"
              name="email"
              type="email"
              placeholder="i.e test@example.com"
              required
            />
            {actionData?.formErrors?.email && (
              <p className="text-red-500">{actionData.formErrors.email}</p>
            )}
            <InputPair
              id="password"
              label="비밀번호"
              name="password"
              type="password"
              placeholder="비밀번호"
              required
            />
            {actionData?.formErrors?.password && (
              <p className="text-red-500">{actionData.formErrors.password}</p>
            )}
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <LoaderCircle className="animate-spin" /> : "로그인"}
            </Button>
            {actionData?.loginError ? (
              <p className="text-sm text-red-500">{actionData.loginError}</p>
            ) : null}
          </Form>
        </div>
      </div>
    </div>
  );
}
