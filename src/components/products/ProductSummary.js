import React from 'react'

import {NavLink} from 'react-router-dom'
import {getApiUrl} from '../../utils/url_util';

const ProductSummary = (props) => (
    <>
        <div className="col-lg-4 col-md-6 mb-4" id={props.product.id}>
            <div className="card h-100">
                <a href="/">
                    <img className="card-img-top" style={{height: "250px"}}
                         src={getApiUrl(props.product.image_urls[0])} alt=""/></a>
                <div className="card-body">
                    <h4 className="card-title">
                        <NavLink to={'/products/' + props.product.slug}>{props.product.name}</NavLink>
                    </h4>
                    <h5>Price :${props.product.price}</h5>
                    <p className="card-text">{props.product.description}</p>
                </div>
                <div className="card-footer">

                    <NavLink className="btn btn-primary" style={{float: "right"}}
                             to={'/products/' + props.product.slug}>>
                        Details
                    </NavLink>
                </div>
            </div>
        </div>
    </>
);

export default ProductSummary
