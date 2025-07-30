import React from "react";
import NProgress from "nprogress";

let isInitialPageLoad = true;

function lazyWithProgress(factory) {
  return React.lazy(() => {
    const shouldShowProgress = !isInitialPageLoad;

    if (shouldShowProgress) {
      NProgress.start();
    }

    isInitialPageLoad = false;

    return factory()
      .then((module) => {
        if (shouldShowProgress) {
          NProgress.done();
        }
        return module;
      })
      .catch((err) => {
        if (shouldShowProgress) {
          NProgress.done();
        }
        throw err;
      });
  });
}

export default lazyWithProgress;
