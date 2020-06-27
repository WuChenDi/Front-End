function Header() {
  const dom = document.getElementById("app");
	const header = document.createElement("div");
	header.innerText = "header";
	dom.append(header);
}

export default Header;
