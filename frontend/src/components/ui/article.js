import React from 'react';

import classes from './article.module.scss';

function Article({ children }) {
  return <article className={classes.article}>{children}</article>;
}

export default Article;
