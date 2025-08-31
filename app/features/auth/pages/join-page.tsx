import type { Route } from "./+types/join-page";

import { Form } from "react-router";

import { InputPair } from "~/common/components/input-pair";
import { ShineBorder } from "~/common/components/magicui/shine-border";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "회원가입 | 도서관⁺" }];
};

export default function JoinPage() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="relative">
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-10 p-10">
          <h1 className="text-2xl font-semibold">회원가입</h1>
          <Form className="w-full space-y-4">
            <InputPair
              id="username"
              label="아이디"
              name="username"
              type="text"
              placeholder="아이디"
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
            <InputPair
              id="password2"
              label="비밀번호 확인"
              name="password2"
              type="password"
              placeholder="비밀번호 확인"
              required
            />
            <Button className="w-full" type="submit">
              회원가입
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
