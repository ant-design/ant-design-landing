/**
 * For setting and getting edit-preview iframe window object.
 */
class IframeManager {
  iframe = undefined;

  get = () => {
    return this.iframe;
  };

  set = (iframe) => {
    this.iframe = iframe;
  };
}

const iframeManager = new IframeManager();

export default iframeManager;
