import { l as useRuntimeConfig } from './server.mjs';

const getImageUrl = (url) => {
  if (!url) return "";
  const strapiBaseUrl = useRuntimeConfig().public.strapiBaseUrl;
  return url.startsWith("http") ? url : `${strapiBaseUrl}${url}`;
};

export { getImageUrl as g };
//# sourceMappingURL=getImageUrl-B0XNzhL2.mjs.map
