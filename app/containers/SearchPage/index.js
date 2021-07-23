/**
 *
 * SearchPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Route, Switch } from 'react-router-dom';
import makeSelectSearchPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import SearchResults from './SearchResults';

export function SearchPage() {
  useInjectReducer({ key: 'searchPage', reducer });
  useInjectSaga({ key: 'searchPage', saga });

  return (
    <div>
      <Helmet>
        <title>SearchPage</title>
        <meta name="description" content="Description of SearchPage" />
      </Helmet>
      <Switch>
        <Route
          exact
          path="/search/:query"
          render={props => <SearchResults {...props} />}
        />
      </Switch>
    </div>
  );
}

SearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchPage: makeSelectSearchPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SearchPage);
