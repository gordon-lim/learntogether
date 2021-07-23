/**
 *
 * CategoryPage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCategoryPage from './selectors';
import reducer from './reducer';

export function CategoryPage() {
  useInjectReducer({ key: 'categoryPage', reducer });

  return (
    <div>
      <Helmet>
        <title>CategoryPage</title>
        <meta name="description" content="Description of CategoryPage" />
      </Helmet>
    </div>
  );
}

CategoryPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  categoryPage: makeSelectCategoryPage(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(CategoryPage);
