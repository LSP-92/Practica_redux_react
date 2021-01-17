import React from "react";
import T from "prop-types";
import { Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Form from "../../shared/Form/Form";
import { Input } from "antd";
import styles from "./LoginForm.module.css";

function LoginForm({ onSubmit }) {
  return (
    <Form
      onSubmit={onSubmit}
      initialvalue={{
        email: "",
        password: "",
        remember: false,
      }}
    >
      {({ email, password, remember, handleChange, canSubmit }) => {
        return (
          <>
            <Input
              name="email"
              className={styles.input}
              prefix={<MailOutlined />}
              placeholder="Email"
              onChange={handleChange}
              value={email}
            />
            <Input.Password
              name="password"
              className={styles.input}
              prefix={<LockOutlined />}
              placeholder="Password"
              onChange={handleChange}
              value={password}
            />
            <Checkbox
              name="remember"
              className={styles.input}
              onChange={handleChange}
              checked={remember}
            >
              Remember me
            </Checkbox>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!canSubmit()}
              block
            >
              Log In
            </Button>
          </>
        );
      }}
    </Form>
  );
}

export default LoginForm;

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
};
