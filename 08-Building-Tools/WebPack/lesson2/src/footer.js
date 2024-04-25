function Footer() {
  const dom = document.getElementById("app");
	const footer = document.createElement("div");
	footer.innerText = "footer";
	dom.append(footer);
}

// export default Footer;
module.exports = Footer;
