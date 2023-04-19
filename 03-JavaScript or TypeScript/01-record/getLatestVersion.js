async function getLatestVersion(id, range = "") {
  const registry = "https://registry.npmmirror.com";
  const url = `${registry}/${encodeURIComponent(id).replace(/^%40/, "@")}/${range}`;
  return await axios.get(url);
}

const res = await getLatestVersion("axios", "latest");
console.log(res.data.version)
