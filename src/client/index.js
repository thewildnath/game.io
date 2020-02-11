import {connect} from './networking.js';
import {startRendering} from './rendering.js';

connect.then(() => {
    startRendering();
});