export async function createProduct(formData) {
  const res = await fetch("http://localhost:5000/api/products", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Create product failed");
  }
  return res.json();
}
