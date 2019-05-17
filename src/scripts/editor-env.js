global.MonacoEnvironment = {
  getWorkerUrl(moduleId, label) {
    switch (label) {
      case 'json':
        return './json.worker.bundle.js';
      case 'css':
        return './css.worker.bundle.js';
      case 'html':
        return './html.worker.bundle.js';
      case 'typescript':
      case 'javascript':
        return './ts.worker.bundle.js';
      default:
        return './editor.worker.bundle.js';
    }
  },
};
