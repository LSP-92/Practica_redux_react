import React from "react";
import { Link } from "react-router-dom";
import { Empty, Button, Spin, List, Divider } from "antd";
import { connect } from "react-redux";
import { mapStateToPropsAdverts } from "../../../store/connectStore";
import { allAdeverts, tagsAdverts } from "../../../store/index";
import { getAdverts } from "../../../api/adverts";
import Layout from "../../layout";
import FiltersForm, { defaultFilters } from "./FiltersForm";
import AdvertCard from "./AdvertCard";

class AdvertsPage extends React.Component {
  state = {
    loading: false,
    error: null,
    prevFilters: defaultFilters,
  };

  formatFilters = () => {
    const {
      filters: { name, sale, price, tags },
    } = this.props.filters;

    const filters = {};
    if (name) {
      filters.name = name;
    }
    if (["sell", "buy"].includes(sale)) {
      filters.sale = sale === "sell";
    }
    if (price.length) {
      filters.price = price.join("-");
    }
    if (tags.length) {
      filters.tags = tags.join(",");
    }
    return filters;
  };

  getAdverts = () => {
    this.setState({ loading: true, error: null });
    getAdverts(this.formatFilters())
      .then(({ result }) => {
        this.setState({ loading: false, error: null });
        this.props.allAdeverts(result.rows);
      })
      .catch((err) => {
        this.setState({ loading: false, error: err });
      });
  };

  handleSubmit = (filters) => {
    this.props.tagsAdverts(filters);
  };

  renderLoading = () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Spin size="large" />
    </div>
  );

  renderError = () => {
    const { error } = this.state;
    return (
      <Empty
        description={<span style={{ color: "#ff4d4f" }}>{`${error}`}</span>}
      >
        <Button type="primary" danger onClick={this.getAdverts}>
          Reload
        </Button>
      </Empty>
    );
  };

  renderEmpty = () => {
    const { filters } = this.props;
    const isFiltered = filters;
    return (
      <Empty description={<span>No adverts here!</span>}>
        {isFiltered ? (
          <span>Refine your search</span>
        ) : (
          <Link to="/adverts/new">
            <Button type="primary">Create the first one</Button>
          </Link>
        )}
      </Empty>
    );
  };

  renderAdvert = (advert) => {
    return (
      <List.Item>
        <Link to={`/adverts/${advert._id}`}>
          <AdvertCard {...advert} />
        </Link>
      </List.Item>
    );
  };

  renderAdverts = () => {
    const { loading, error } = this.state;
    const { adverts } = this.props.adverts;
    if (loading) {
      return this.renderLoading();
    }
    if (error) {
      return this.renderError();
    }

    if (!adverts) {
      return null;
    }

    if (!adverts) {
      return this.renderEmpty();
    }

    return (
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={adverts}
        renderItem={this.renderAdvert}
      />
    );
  };
  componentDidMount() {
    this.getAdverts();
  }

  componentDidUpdate() {
    const { filters } = this.props.filters;
    if (filters !== this.state.prevFilters) {
      this.getAdverts();
      this.setState({ prevFilters: filters });
    }
  }
  render() {
    const { filters: tags } = this.props.filters;
    return (
      <Layout title="Adverts list">
        <Divider>Filter your adverts</Divider>
        <FiltersForm initialFilters={tags} onSubmit={this.handleSubmit} />
        <Divider>Adverts</Divider>
        {this.renderAdverts()}
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    allAdeverts: (payload) => dispatch(allAdeverts(payload)),
    tagsAdverts: (payload) => dispatch(tagsAdverts(payload)),
  };
};
export default connect(mapStateToPropsAdverts, mapDispatchToProps)(AdvertsPage);
