import Module from "node:module";

const originalRequire = Module.prototype.require;

Module.prototype.require = function (id) {
  if (/\.(png|jpe?g|gif|webp)(\?.*)?$/i.test(id)) {
    return id;
  }

  return originalRequire.apply(this, arguments);
};
