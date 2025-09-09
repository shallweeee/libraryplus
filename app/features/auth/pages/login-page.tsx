import type { Route } from "./+types/login-page";

import { LoaderCircle } from "lucide-react";
import { redirect } from "react-router";
import { Form, useNavigation } from "react-router";
import { makeSSRClient } from "supa-client";
import z from "zod";

import { InputPair } from "~/common/components/input-pair";
import { ShineBorder } from "~/common/components/magicui/shine-border";
import { Button } from "~/common/components/ui/button";

const formSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters" }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    const flattened = z.flattenError(error);
    return { formErrors: flattened.fieldErrors, loginErrors: null };
  }

  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: loginError } = await client.auth.signInWithPassword({ email, password });
  if (loginError) {
    return { formErrors: null, loginErrors: loginError.message };
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
            <InputPair
              id="password"
              label="비밀번호"
              name="password"
              type="password"
              placeholder="비밀번호"
              required
            />
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <LoaderCircle className="animate-spin" /> : "로그인"}
            </Button>
            {actionData?.formErrors ? (
              <p className="text-sm text-red-500">
                {Object.values(actionData.formErrors).flat().filter(Boolean).join(", ")}
              </p>
            ) : null}
            {actionData?.loginErrors ? (
              <p className="text-sm text-red-500">{actionData.loginErrors}</p>
            ) : null}
          </Form>
        </div>
      </div>
    </div>
  );
}
