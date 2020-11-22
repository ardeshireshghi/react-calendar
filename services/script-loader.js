export const loadAsyncScript = async (src) => {
  const script = document.createElement('script');

  script.src = src;
  script.async = true;
  script.defer = true;

  return new Promise((resolve, reject) => {
    script.addEventListener('load', resolve, { once: true });
    script.addEventListener('error', reject, { once: true });

    document.body.appendChild(script);
  });
};
