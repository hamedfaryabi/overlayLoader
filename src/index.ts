type OVOptions = {
  show: boolean;
  backgroundColor: string;
  backgroundBlur: boolean;
  backgroundOpacity: number;
  loaderColor: string;
  loaderType: "default";
  loaderSize: number;
  zIndex: number;
  borderRadius: "inherit" | number;
  hideDelay: number;
  showDelay: number;
  animationTime: number;
  beforeShow?: () => void;
  beforeHide?: () => void;
  onShow?: () => void;
  onHide?: () => void;
  afterShow?: () => void;
  afterHide?: () => void;
};

/**
 * Overlay loader class
 */
class OVLoader {
  #elements: NodeListOf<Element> | null;
  #_OPTIONS: OVOptions = {
    show: false,
    backgroundColor: "white",
    backgroundBlur: true,
    backgroundOpacity: 0.5,
    loaderColor: "green",
    loaderType: "default",
    loaderSize: 24,
    zIndex: 100,
    borderRadius: "inherit",
    hideDelay: 0,
    showDelay: 0,
    animationTime: 2,
  };
  #state: boolean;

  /**
   *
   * @param {string} selector Selector for the elements on which you want the loader to be displayed
   * @param {Object} options Loader options
   * @param {boolean | undefined} options.show
   * @param {string | undefined} options.backgroundColor
   * @param {boolean | undefined} options.backgroundBlur
   * @param {number | undefined} options.backgroundOpacity
   * @param {string | undefined} options.loaderColor
   * @param {"default" | undefined} options.loaderType
   * @param {number | undefined} options.loaderSize
   * @param {number | undefined} options.zIndex
   * @param {"inherit" | number | undefined} options.borderRadius
   * @param {number | undefined} options.hideDelay
   * @param {number | undefined} options.showDelay
   * @param {number | undefined} options.animationTime
   * @param {() => void | undefined} options.onShow
   * @param {() => void | undefined} options.onHide
   * @param {() => void | undefined} options.beforeShow
   * @param {() => void | undefined} options.beforeHide
   */
  constructor(selector: string, options: Partial<OVOptions>) {
    this.#elements = document.querySelectorAll(selector);
    if (options) {
      Object.assign(this.#_OPTIONS, options);
    }

    // show or hide loader
    // default is hide
    if (this.#_OPTIONS.show) {
      this.#state = true;
      this.show();
    } else {
      this.#state = false;
    }
  }

  show() {
    const before_show_promise = new Promise<void>((reslove) => {
      if (this.#_OPTIONS.beforeShow) {
        this.#_OPTIONS.beforeShow();
        reslove();
      } else {
        reslove();
      }
    });

    before_show_promise.then(() => {
      const on_show_promise = new Promise<void>((resolve) => {
        if (this.#elements) {
          if (!this.#state) {
            this.#state = true;
            this.#elements.forEach((element) => {
              if (!element.classList.contains("show")) {
                element.classList.add("show");
              }
            });
          }
        }
        if (this.#_OPTIONS.onShow) {
          this.#_OPTIONS.onShow();
          resolve();
        } else {
          resolve();
        }
      });

      on_show_promise.then(() => {
        if (this.#_OPTIONS.afterShow) {
          this.#_OPTIONS.afterShow();
        }
      });
    });
  }

  hide() {
    const before_hide_promise = new Promise<void>((reslove) => {
      if (this.#_OPTIONS.beforeHide) {
        this.#_OPTIONS.beforeHide();
        reslove();
      } else {
        reslove();
      }
    });

    before_hide_promise.then(() => {
      const on_hide_promise = new Promise<void>((resolve) => {
        if (this.#elements) {
          if (this.#state) {
            this.#state = false;
            this.#elements.forEach((element) => {
              if (element.classList.contains("show")) {
                element.classList.remove("show");
              }
            });
          }
        }
        if (this.#_OPTIONS.onHide) {
          this.#_OPTIONS.onHide();
          resolve();
        } else {
          resolve();
        }
      });
      on_hide_promise.then(() => {
        if (this.#_OPTIONS.afterHide) {
          this.#_OPTIONS.afterHide();
        }
      });
    });
  }

  destroy() {
    if (this.#elements) {
      this.hide();
      this.#elements = null;
    }
  }

  setElement(selector: string) {
    this.destroy();
    this.#elements = document.querySelectorAll(selector);
    if (this.#_OPTIONS.show) {
      this.show();
    }
  }
}

export default OVLoader;
export { OVLoader };
