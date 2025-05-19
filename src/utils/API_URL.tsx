export default function API_BASE_URL(param: string) {
  if (param?.charAt(0) === "/") {
    param = param.replace(/(^\/)/, "");
  }
  if (import.meta.env.MODE === "development")
    return `http://127.0.0.1:8000/api/${param}`;
  return `http://api.thaerhendawi.com/api/${param}`;
}
