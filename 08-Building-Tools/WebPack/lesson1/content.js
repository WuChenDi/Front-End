function Content() {
  const dom = document.getElementById("app");
	const content = document.createElement("div");
	content.innerText = "content";
	dom.append(content);
}

// export default Content;
module.exports = Content;
