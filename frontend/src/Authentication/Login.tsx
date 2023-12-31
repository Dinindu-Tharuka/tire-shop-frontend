import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button, Input, Text, useColorMode } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import axiosInstance from "../services/api-client";
import apiClientBase from "../services/api-client-base";

export interface LoginForm {
  user_name: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { register: registerEmail, handleSubmit: handleSubmitEmail } =
    useForm();
  const { toggleColorMode, colorMode } = useColorMode();
  const [accessToken, setAccessToken] = useState<string | null>("");
  const [isShowEmailBox, setIsShowEmailBox] = useState(false);
  const [isResetEmailSuccess, setIsResetEmailSuccess] = useState(false);
  const [err, setErr] = useState('')

  if (accessToken) return <Navigate to="/" />;

  const onSubmitForm = (data: LoginForm) => {
    console.log("data", data);

    axiosInstance
      .post("/jwt/create/", data)
      .then((res) => {
      localStorage.clear();

      console.log(res.data)

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("isReloaded", 'false')
      setAccessToken(res.data.access);
    }).catch(() => setErr('Username or Password Incorrect.'))
  };
  const showEmailBox = () => {
    setIsShowEmailBox(true);
  };
  const resetPassword = (data: FieldValues) => {
    console.log(data);

    apiClientBase
      .post("/users/reset_password/", data)
      .then((res) => setIsResetEmailSuccess(true));
  };

  return (
    <>
    {err && <Text color='red'>{err}</Text>}
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-3 h-75">
          <Input
            {...register("user_name")}
            borderColor="#ea6262"
            type="text"
            placeholder="Username"
            borderRadius={15}
            bg="whiteAlpha.800"
            height="7vh"
            textColor={colorMode === 'dark'? 'black':'black'}
          />
        </div>
        <div className="mb-3 h-75">
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            borderColor="#ea6262"
            borderRadius={15}
            bg="whiteAlpha.800"
            height="7vh"
            textColor={colorMode === 'dark'? 'black':'black'}
          />
        </div>

        <Button
          textColor="whiteAlpha.700"
          type="submit"
          bg="#e3a99c"
          padding={15}
          height="8vh"
          width="100%"
          borderRadius={15}
          _hover={{ bg: "whiteAlpha.400" }}
        >
          SIGN IN
        </Button>
      </form>

      <Text align="center" marginTop={7} fontWeight="bold" textColor="#1e0c00">
        <Link to="" onClick={() => showEmailBox()}>
          Forgotten Password?
        </Link>
      </Text>

      {isShowEmailBox && (
        <form onSubmit={handleSubmitEmail(resetPassword)}>
          <Input
            {...registerEmail("email")}
            borderColor="#ea6262"
            type="text"
            placeholder="Enter the Email"
            borderRadius={15}
            bg="whiteAlpha.800"
            height="7vh"
          />
          <Button
            textColor="whiteAlpha.700"
            marginTop={3}
            type="submit"
            bg="#dd0939"
            padding={15}
            height="8vh"
            width="100%"
            borderRadius={15}
            _hover={{ bg: "whiteAlpha.400" }}
          >
            Get url
          </Button>

          {isResetEmailSuccess && (
            <Text align="center" textColor="#e6e668">
              Email Succefully sent to your Email Account.
            </Text>
          )}
        </form>
      )}
    </>
  );
};

export default Login;
