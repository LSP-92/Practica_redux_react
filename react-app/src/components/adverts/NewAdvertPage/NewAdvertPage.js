import React, { useState } from "react";
import T from "prop-types";
import { Alert, Divider } from "antd";
import { store, newAdeverts } from "../../../store";
import { createAdvert } from "../../../api/adverts";
import Layout from "../../layout";
import NewAdvertForm from "./NewAdvertForm";

const NewAdvertPage = (props) => {
  const [state, setState] = useState({
    error: null,
  });
  const { history } = props;
  const handleSubmit = (advert) => {
    resetError();
    createAdvert(advert)
      .then(({ result: advert }) => {
        store.dispatch(newAdeverts(advert));
        history.push(`/adverts/${advert._id}`);
      })
      .catch((error) => {
        console.log(error);
      }); //this.setState({ error }));
  };

  const resetError = () => setState({ error: null });
  const { error } = state;
  return (
    <Layout title="New advert">
      <Divider>Create an advert</Divider>
      <NewAdvertForm onSubmit={handleSubmit} />
      {error && (
        <Alert
          afterClose={resetError}
          closable
          message={error}
          showIcon
          type="error"
        />
      )}
    </Layout>
  );
};

/* class NewAdvertPage extends React.Component {
  state = {
    error: null,
  };

  handleSubmit = (advert) => {
    const { history } = this.props;
    this.resetError();
    createAdvert(advert)
      .then(({ result: advert }) => {
        store.dispatch(newAdeverts(advert));
        history.push(`/adverts/${advert._id}`);
      })
      .catch((error) => {
        console.log(error);
      }); //this.setState({ error }));
  };

  resetError = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    return (
      <Layout title="New advert">
        <Divider>Create an advert</Divider>
        <NewAdvertForm onSubmit={this.handleSubmit} />
        {error && (
          <Alert
            afterClose={this.resetError}
            closable
            message={error}
            showIcon
            type="error"
          />
        )}
      </Layout>
    );
  }
}
*/
NewAdvertPage.propTypes = {
  history: T.shape({ push: T.func.isRequired }).isRequired,
};

export default NewAdvertPage;
