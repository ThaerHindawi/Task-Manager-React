export default function API_BASE_URL(param: string) {
  if (param?.charAt(0) === "/") {
    param = param.replace(/(^\/)/, "");
  }
  if (import.meta.env.MODE === "development")
    return `${import.meta.env.VITE_API_URL}${param}`;
  return `${import.meta.env.VITE_API_URL_Production}${param}`;
}
