import React from 'react'
import AppCarousel from "../partials/AppCarousel";
import {PageActionCreator} from "../../actions/pages.actions";
import {connect} from "react-redux";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [], categories: [],
            navigationData: [{
                displayName: 'Home',
                url: '/'
            }],
        };
    }

    componentDidMount() {
        this.props.fetchHome();
    }

    render() {

        let TagViews = [], CategoryViews = [], Views;
        const carouselItems = [];
        let uniqueKeys = 0;
        if (this.props.tags) {
            // iterate n times where n is props.tags.length, reduce it is like map, but the advantage is that
            // we choose if return something or not, in this case we return only if we are in the first iteration
            TagViews = [...Array(this.props.tags.length).keys()].reduce((returnValues, key) => {
                let tag = this.props.tags[key];
                if (key === 0) {
                    carouselItems.push({
                        id: tag.id,
                        name: tag.name,
                        description: tag.description,
                        image: tag.image_urls[0]
                    });
                }
                let view = (
                    <div key={uniqueKeys++} className="col-lg-4 col-md-6 mb-4" id={tag.id}>
                        <div className="card h-100">
                            <a href="/"><img className="card-img-top" style={{height: "250px"}}
                                             src={tag.image_urls[0]}
                                             alt=""/></a>
                            <div className="card-body">
                                <h4 className="card-title">
                                    {/*<NavLink to={tag.slug}>{tag.name}</NavLink>*/}
                                </h4>
                                <p className="card-text">{tag.description}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                                {/*<NavLink className="btn btn-primary" style={{float: "right"}} to={tag.slug}>Show More</NavLink>*/}
                            </div>
                        </div>
                    </div>

                );


                returnValues.push(view);

                return returnValues;
            }, []);
        } else {
            TagViews = [<h2>Loading tags...</h2>]
        }
        if (this.props.categories) {
            // iterate n times where n is props.categories.length, reduce it is like map, but the advantage is that
            // we choose if return something or not, in this case we return only if we are in the first iteration
            CategoryViews = [...Array(this.props.categories.length).keys()].reduce((valuesToBeReturned, key) => {
                let category = this.props.categories[key];
                if (key === 0) {
                    // If first then add to carousel item
                    carouselItems.push({
                        id: category.id,
                        name: category.name,
                        description: category.description,
                        image: category.image_urls[0]
                    });
                }
                let view = (
                    <div key={uniqueKeys++} className="col-lg-4 col-md-6 mb-4" id={category.id}>
                        <div className="card h-100">
                            <a href="/"><img className="card-img-top" style={{height: "250px"}}
                                             src={category.image_urls[0]}
                                             alt=""/></a>
                            <div className="card-body">
                                <h4 className="card-title">
                                    {/*<NavLink to={tag.slug}>{tag.name}</NavLink>*/}
                                </h4>
                                <p className="card-text">{category.description}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                                {/*<NavLink className="btn btn-primary" style={{float: "right"}} to={tag.slug}>Show More</NavLink>*/}
                            </div>
                        </div>
                    </div>
                );
                valuesToBeReturned.push(view);

                return valuesToBeReturned;
            }, []);
        } else {
            CategoryViews = <h2>Loading ...</h2>
        }

        Views = TagViews.concat(CategoryViews);
        return (
            <>
                <div className="slider">
                    <AppCarousel items={carouselItems}/>
                </div>
                <div className="container" style={{marginTop: "100px"}}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                {Views}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchHome: () => dispatch(PageActionCreator.fetchHome())
    };
}

function mapStateToProps(state) {
    return {
        tags: state.PageReducer.tags,
        categories: state.PageReducer.categories
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
