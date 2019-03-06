import {connect} from "react-redux";
import React from "react";
import ProductSummary from "./ProductSummary";
import {ProductActionCreator} from "../../actions/products.actions";
import Pagination from "../partials/Pagination";

class ProductList extends React.Component {

    componentDidMount() {
        this.props.fetchProducts();
    }

    fetchMore(location, page, page_size) {
        this.props.fetchProducts({location, page, page_size});
    }

    render() {
        return (
            <>
                <div className="row">
                    {this.props.products_data.products.map((product, index) => {
                        return <ProductSummary product={product} key={index}/>
                    })}
                </div>
                <Pagination loadMore={this.fetchMore.bind(this)} pageMeta={this.props.page_meta}/>
            </>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        fetchProducts: (query) => dispatch(ProductActionCreator.fetchProducts(query)),
    };
}

function mapStateToProps(state) {
    return {
        products_data: state.ProductReducer.products_data,
        page_meta: state.ProductReducer.products_data.page_meta
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
