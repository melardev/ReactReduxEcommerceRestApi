import React from "react";
import _ from "lodash";
import {withRouter} from "react-router-dom";


class Pagination extends React.Component {

    renderLastPaginationButton() {
        // Render only if we are 2 pages before
        if (this.props.pageMeta.current_page_number < this.props.pageMeta.number_of_pages - 2) {

            return (
                <li className="page-item" data-toggle="tooltip" data-placement="top" title="Go to last page">
                    <a className="page-link"
                       onClick={e => this.props.loadMore(this.props.location.pathname, this.props.pageMeta.number_of_pages, this.props.pageMeta.requested_page_size)}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only"> {this.props.pageMeta.total_page_count}</span>
                    </a>
                </li>
            );
        }
    }

    renderFirstPaginationButton() {
        // Render only if we are 2 pages above the first
        if (this.props.pageMeta.current_page_number >= 3) {
            return (
                (<li className="page-item" data-toggle="tooltip" data-placement="top" title="Go to first page">
                    <a className="page-link"
                       onClick={e => this.props.loadMore(this.props.location.pathname, 1, this.props.pageMeta.requested_page_size)}>
                        1
                    </a>
                </li>));
        }

    }

    /*
    <ul className="pagination justify-content-center mb-4">
                        <li className="page-item">
                            <a className="page-link" href="#">&larr; Older</a>
                        </li>
                        <li className="page-item disabled">
                            <a className="page-link" href="#">Newer &rarr;</a>
                        </li>
                    </ul>
                    */
    renderPagination() {
        if (!_.isEmpty(this.props.pageMeta)) {
            const lastRecord = this.props.pageMeta.current_items_count + this.props.pageMeta.offset;
            const firstRecord = this.props.pageMeta.offset + 1;
            const totalItemsCount = this.props.pageMeta.total_items_count;

            return (
                <div className="row">
                    <b> {firstRecord}-{lastRecord}/{totalItemsCount}</b> <br/>
                    <nav aria-label="Page navigation example">

                        <ul className="pagination">
                            {this.renderFirstPaginationButton()}
                            {this.props.pageMeta.has_prev_page &&
                            (<li className="page-item" data-toggle="tooltip" data-placement="top"
                                 title="Previous page">
                                <span className="page-link"
                                      onClick={e => this.props.loadMore(this.props.location.pathname, this.props.pageMeta.prev_page_number, this.props.pageMeta.page_size)}>
                                    {this.props.pageMeta.prev_page_number}
                                </span>
                            </li>)}

                            <li className="page-item active">
                                <a className="page-link page-ite">
                                    {this.props.pageMeta.current_page_number}
                                </a>
                            </li>
                            {this.props.pageMeta.has_next_page &&
                            <li className="page-item">
                                <a className="page-link"
                                   onClick={e => this.props.loadMore(this.props.location.pathname, this.props.pageMeta.next_page_number, this.props.pageMeta.request_page_size)}>
                                    {this.props.pageMeta.next_page_number}
                                </a>
                            </li>}
                            {this.renderLastPaginationButton()}
                        </ul>
                    </nav>
                </div>
            )
        }
    }

    render() {
        return <>
            {this.renderPagination()}
        </>
    }
}

export default withRouter(Pagination);
