import type { Route } from "./+types/join-page";

import { LoaderCircle } from "lucide-react";
import { redirect, useNavigation } from "react-router";
import { Form } from "react-router";
import { makeSSRClient } from "supa-client";
import z from "zod";

import { InputPair } from "~/common/components/input-pair";
import { ShineBorder } from "~/common/components/magicui/shine-border";
import { Button } from "~/common/components/ui/button";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    const flattened = z.flattenError(error);
    return { formErrors: flattened.fieldErrors, signUpError: null };
  }

  const { client, headers } = makeSSRClient(request);
  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
  });
  if (signUpError) {
    return { formErrors: null, signUpError: signUpError.message };
  }
  return redirect("/", { headers });
};

export const meta: Route.MetaFunction = () => {
  return [{ title: "회원가입 | 도서관⁺" }];
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="relative">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-10 p-10">
          <h1 className="text-2xl font-semibold">회원가입</h1>
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
              {isSubmitting ? <LoaderCircle className="animate-spin" /> : "회원가입"}
            </Button>
            {actionData?.signUpError && <p className="text-red-500">{actionData.signUpError}</p>}
          </Form>
        </div>
      </div>
    </div>
  );
}
