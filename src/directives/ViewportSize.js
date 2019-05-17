import signals from 'signals';
import { debounce } from 'lodash';

const defaultDelay = 100;
const bindings = [];
const signal = new signals.Signal();

function noop(val) {
  return () => val;
}

function getSize() {
  return [document.documentElement.clientWidth, document.documentElement.clientHeight];
}

window.addEventListener('resize', () => {
  signal.dispatch(...getSize());
});

function bindElement(el, { arg, modifiers, value }) {
  // expand boolean option to object
  const opts = value === true ? { width: true, height: true } : value;
  const isObj = typeof opts === 'object';
  const predicate = opts.predicate || noop(true);
  const updateStyle = (w, h) => {
    // evaluate predicate if any
    if (predicate(w, h) && isObj) {
      if (opts.width) {
        const percent = typeof opts.width === 'boolean' ? 100 : opts.width;
        el.style.width = `${w * (percent / 100)}px`;
      }
      if (opts.height) {
        const percent = typeof opts.height === 'boolean' ? 100 : opts.height;
        el.style.height = `${h * (percent / 100)}px`;
      }
      if (opts.onResize) {
        opts.onResize(opts.width, opts.height);
      }
    } else {
      el.style.height = '';
      el.style.width = '';
    }
  };
  const isCustomCallback = typeof opts === 'function';
  let callback = isCustomCallback ? opts : updateStyle;
  if (arg === 'debounce') {
    const delay = Object.keys(modifiers)
      .map(k => parseInt(k, 10))
      .find(v => !isNaN(v));
    callback = debounce(callback, delay || defaultDelay, { leading: true });
  }
  signal.add(callback);
  bindings.push({ el, callback });
  callback(...getSize());
}

function unbindElement(el) {
  const b = bindings.find(b => b.el === el);
  bindings.splice(bindings.indexOf(b), 1);
  signal.remove(b.callback);
}

const ViewportSizeDirective = {
  bind(el, binding) {
    bindElement(el, binding);
  },
  update(el, binding) {
    const { oldValue: o, value: c } = binding;
    const update = o.height !== c.height || o.width !== c.width;
    if (update) {
      unbindElement(el);
      bindElement(el, binding);
    }
  },
  unbind(el) {
    unbindElement(el);
  }
};

export default ViewportSizeDirective;
