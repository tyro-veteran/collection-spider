const axios = require("axios");

export class TyroAxios {
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
    if (!interceptors) {
      return;
    }
    const {
      requestInterceptor,
      requestInterceptorCatch,
      responseInterceptor,
      responseInterceptorCatch,
    } = interceptors;

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
}
