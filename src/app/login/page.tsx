"use client";

import { Button, Input } from "@/components/ui";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://cis.tsu.ru/kondakov_patterns_auth/hs/BankSystem/Authorization",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Login: login, Password: password }),
        }
      );

      if (response.status !== 200) return alert("Что-то пошло не так");

      const data = (await response.json()) as {
        Token: string;
        UserType: "User" | "Worker";
      };
      window.location.replace(
        `http://localhost:1337/checkout?token=${data.Token}&userType=${data.UserType}`
      );
    } catch (error) {
      console.log(error);
      alert("Что-то пошло не так");
    }
  };

  return (
    <main className="w-screen h-screen overflow-auto flex flex-col items-center justify-center">
      <h1 className="text-xl">Скам Банк</h1>
      <form className="flex flex-col gap-4 mt-4" onSubmit={onLogin}>
        <Input
          onChange={(e) => setLogin(e.target.value)}
          type="text"
          placeholder="Логин"
          className="p-4"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Пароль"
          className="p-4"
        />
        <Button type="submit">Войти</Button>
      </form>
    </main>
  );
};

export default LoginPage;
