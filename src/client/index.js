// @flow

import { connect } from './networking';
import { startRendering } from './rendering';

connect.then(() => {
  startRendering();
});
