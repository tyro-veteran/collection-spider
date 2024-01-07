const axios = require("axios");

module.exports = class TyroAxios {
  constructor(options) {
    this.options = options;
    this._axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  set axiosInstance(instance) {
    if (instance) {
      this._axiosInstance = instance;
    }
  }

  get axiosInstance() {
    return this._axiosInstance;
  }

  createInstance(config) {
    this.axiosInstance = axios.create(config);
  }

  /**
   * @description: Interceptor configuration 拦截器配置
   */
  setupInterceptors() {
    const {
      _axiosInstance,
      options: { interceptors },
    } = this;

    const {
      requestInterceptor = (config) => config,
      requestInterceptorCatch = (error) => error,
      responseInterceptor = (res) => res,
      responseInterceptorCatch = (error) => error,
    } = interceptors || {
      requestInterceptor: null,
      requestInterceptorCatch: null,
      responseInterceptor: null,
      responseInterceptorCatch: null,
    };

    // 注册全局响应拦截
    _axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        console.error("Catched error in response:", err.message);
        throw err;
      }
    );

    // 注册请求拦截
    _axiosInstance.interceptors.request.use(
      requestInterceptor,
      requestInterceptorCatch
    );
    // 注册响应拦截
    _axiosInstance.interceptors.response.use(
      responseInterceptor,
      responseInterceptorCatch
    );
  }

  request(config, options) {
    return this._axiosInstance.request(config, options);
  }

  get(config, options = {}) {
    return this.request({ ...config, method: "GET" }, options);
  }

  post(config, options = {}) {
    return this.request({ ...config, method: "POST" }, options);
  }

  put(config, options = {}) {
    return this.request({ ...config, method: "PUT" }, options);
  }

  delete(config, options = {}) {
    return this.request({ ...config, method: "DELETE" }, options);
  }
};
