import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../api/auth";
import ConfirmationButton from "../shared/ConfirmationButton";

class LogoutButton extends React.Component {
  handleLogout = () => {
    logout();
  };

  render() {
    const { ...props } = this.props;
    return (
      <ConfirmationButton
        danger
        icon={<LogoutOutlined />}
        shape="round"
        type="dashed"
        confirmationProps={{
          title: "Close session?",
          content: "Are you sure you want to disconnect?",
          okText: "Yes",
          cancelText: "No",
          okButtonProps: {
            danger: true,
          },
        }}
        onConfirm={this.handleLogout}
        {...props}
      />
    );
  }
}

export default LogoutButton;
